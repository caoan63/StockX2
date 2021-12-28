"use strict";

window.addEventListener("load", function() {
    var formData = this.document.location.search.slice(1);
    formData = formData.replace(/\+/g," ");
    formData = decodeURIComponent(formData);
    formData = formData.slice(1).split(/[&=]/g);
    uploadItemtoCartList(formData)
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
    if(document.getElementById("item_table").children.length == 1)
    {
        var name = form.elements.itemName;
        name.value = name.parentElement.children[0].innerHTML;
        var img = form.elements.itemImg;
        img.value = img.parentElement.parentElement.children[0].src;
    }
    else
    {
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

function uploadItemtoCartList(formField) {
    var table = document.getElementById("item_table");
    console.log(formField)
    if(formField.length === 1)
        table.insertAdjacentHTML("beforeend", `
        <tr>
                                    <td class="empty-cartList">
                                        <img src="./assets/img/cart/empty-cart.png" alt="" class="empty-cartList__img">
                                        <span>Không có sản phẩm nào</span>
                                    </td>
                                </tr>
                                `)
    else if(formField[formField.length-1] === "only")
            table.insertAdjacentHTML("beforeend", 
                                `<tr>
                                    <th>
                                        <span class="table-row__item-order">1</span>
                                        <input type="hidden" name="itemOrder" value="1">
                                    </th>
                                    <td>
                                        <img src="https://product.hstatic.net/200000019918/product/i9-9900k-1_aa5acbf5b3cb4535acc5f015674df6ea_67d9fe235da84b5894332b50c781b9bc.jpg" alt="" class="table-row__item-img">
                                        <div>
                                            <span class="table-row__item-name">CPU Intel Core i9-12900K LGA 1700 Chính Hãng</span>
                                            <input type="hidden" name="itemName" value="TV siêu mỏng và đẹp">
                                            <input type="hidden" name="itemImg" value="./assets/img/product/tv1.jpg">
                                        </div>
                                    </td>
                                    <td>
                                        <span class="table-heading__title current-price money-type">9.150.000</span>
                                        <input type="hidden" name="itemPrice_Pre" value="">
                                    </td>
                                    <td>
                                        <span class="amount-control">
                                            <button type="button" onclick="cartList_amountControl(this,'-')" class="amount-control-btn amount-control__down">-</button>
                                            <input type="number" name="quantity" id="amount-control__value" class="amount-control__input" value="1">
                                            <button type="button" onclick="cartList_amountControl(this,'+')" class="amount-control-btn amount-control__up">+</button>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="table-heading__title total-price money-type"></span>
                                        <input type="hidden" name="itemPrice_Aft" value="">
                                    </td>
                                    <td>
                                        <button class="table-btn--delete" onclick="deleteItem(this)">Xoá</button>
                                    </td>
                                </tr>`
            )
        else
            for(var i=0; i<formField.length/6; i++)
                table.insertAdjacentHTML("beforeend", 
                    `<tr>
                        <th>
                            <span class="table-row__item-order">1</span>
                            <input type="hidden" name="itemOrder" value="1">
                        </th>
                        <td>
                            <img src="${formField[i*6 + 1]}" alt="" class="table-row__item-img">
                            <div>
                                <span class="table-row__item-name">${formField[i*6 + 3]}</span>
                                <input type="hidden" name="itemName" value="">
                                <input type="hidden" name="itemImg" value="">
                            </div>
                        </td>
                        <td>
                            <span class="table-heading__title current-price money-type">${formField[i*6 + 5]}</span>
                            <input type="hidden" name="itemPrice_Pre" value="">
                        </td>
                        <td>
                            <span class="amount-control">
                                <button type="button" onclick="cartList_amountControl(this,'-')" class="amount-control-btn amount-control__down">-</button>
                                <input type="number" name="quantity" id="amount-control__value" class="amount-control__input" value="1">
                                <button type="button" onclick="cartList_amountControl(this,'+')" class="amount-control-btn amount-control__up">+</button>
                            </span>
                        </td>
                        <td>
                            <span class="table-heading__title total-price money-type"></span>
                            <input type="hidden" name="itemPrice_Aft" value="">
                        </td>
                        <td>
                            <button class="table-btn--delete" onclick="deleteItem(this)">Xoá</button>
                        </td>
                    </tr>`)
}

                               