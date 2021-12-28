"use strict";



window.addEventListener("load", function() {
    updateItem();
})

function updateItem() {
    orderUpdate();
    updateAmount();
    updatePrice();
}

String.prototype.split2 = function(char) {
    var temp = this.split(char);
    var result = "";
    for(var i = 0; i<temp.length; i++)
        result += temp[i];
    return result;
}

// Amount control
function cartList_amountControl(index, symbol) {
    var indexChild = index.parentElement.children[1];
    if(symbol === "+" && indexChild.value)
    {
        indexChild.value++;
    }
    if(symbol === "-" && indexChild.value > 1)
    {
        indexChild.value--;
    }
    updatePrice();
    updateAmount();
}

function updatePrice() {
    var priceList = document.querySelectorAll(".current-price");
    for(var key of priceList)
    {
        var getChildList = key.parentElement.parentElement.children;
        var price = parseInt(key.innerHTML.split2("."));
        var amount = getChildList[3].children[0].children[1].value;
        var totalPriceEle = key.parentElement.parentElement.children[4].children[0];
        totalPriceEle.innerHTML = parseInt(price*amount).toLocaleString();
    }
}

function deleteItem(index) {
    var target = index.parentElement.parentElement;
    target.remove();
    updateAmount();
    orderUpdate();
}

function updateAmount() {
    var amountList = document.getElementsByName("quantity");
    var priceList = document.querySelectorAll(".total-price");
    var amount = 0;
    var price = 0;
    for(var index of amountList)
        amount += Number(index.value);
    for(var index of priceList)
        price += parseInt(index.innerHTML.split2('.'));
    document.getElementById("totalAmount").innerHTML = amount;
    document.getElementById("totalPrice").innerHTML = price.toLocaleString();
}

function orderUpdate() {
    var orderItem = document.querySelectorAll(".table-row__item-order");
    var start = 1;
    for(var index of orderItem)
    {
        index.innerHTML = start++;
    }
}

