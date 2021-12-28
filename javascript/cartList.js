"use strict";

window.addEventListener("load", function() {
    updateItem();
})

function updateItem() {
    orderUpdate();
    updatePrice();
    updateAmount();
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
        var totalPriceEleInput = key.parentElement.parentElement.children[4].children[1];
        var currentPricevalue = key.parentElement.children[1];
        currentPricevalue.value = parseInt(price).toLocaleString();
        totalPriceEle.innerHTML = parseInt(price*amount).toLocaleString();
        totalPriceEleInput.value = parseInt(price*amount).toLocaleString();
        updateInfo();
    }
}

function updateInfo() {
    var form = document.forms.orderForm;
    for(var index of form.elements.itemName)
    {
        var name = index.parentElement.children[0].innerHTML;
        index.value = name;
    }
    for(var index of form.elements.itemImg)
    {
        var img = index.parentElement.parentElement.children[0].src;
        index.value = img;
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
    var priceList = document.getElementsByName("itemPrice_Aft");
    console.log(priceList)
    var amount = 0;
    var price = 0;
    for(var index of amountList)
        amount += Number(index.value);
    for(var index of priceList)
        price += parseInt(index.value.split2("."));
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

