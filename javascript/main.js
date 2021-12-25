"use strict"

// Login Modal

const modals = document.querySelectorAll('.modal');
const loginBtns = document.querySelectorAll(".js-header__navbar-item");
const overlays = document.querySelectorAll('.js-modal__overlay');
const hideBtns = document.querySelectorAll('.auth-form__btn-return');

for(const loginBtn of loginBtns) {
    loginBtn.addEventListener('click', function() {
        if(loginBtn.classList.contains("signup-btn")) {
            for(const modal of modals) {
                if(modal.classList.contains("register-status"))
                    modal.classList.add("open");
            }
        }
        if(loginBtn.classList.contains("signin-btn")) {
            for(const modal of modals) {
                if(modal.classList.contains("login-status"))
                    modal.classList.add("open");
            }
        }
    })
}

for(const hideBtn of hideBtns) {
    hideBtn.addEventListener('click',function() {
        for(const modal of modals) {
                modal.classList.remove('open');
        }
    })
}

for(const overlay of overlays) {
    overlay.addEventListener('click',function() {
        for(const modal of modals) {
                modal.classList.remove('open');
        }
    })
}

// Type selection

const searchSelections = document.querySelectorAll('.header__search-select-option');

for( const searchSelection of searchSelections ){
    searchSelection.addEventListener('click',function(){
        console.log(searchSelection);
        if(searchSelection.classList.contains('header__search-select-option--active'))
            this.classList.remove('header__search-select-option--active');
        else
            this.classList.add('header__search-select-option--active'); 
    })
}

// Amount

function getParen(index) {
    var td = index.parentElement.parentElement;
    var tr = td.children;
    return tr;
}

String.prototype.split2 = function(char) {
    var temp = this.split(char);
    var result = "";
    for(var i = 0; i<temp.length; i++)
        result += temp[i];
    return result;
}

updateAmount();
orderUpdate();
updateAmountinCart();

function amountControl(para, symbol) {
    var parent = para.parentElement;
    var child = parent.children;
    var getParent = getParen(parent);
    if(symbol === "+")
    {
        child[1].value++;
    }
    else {
        if(child[1].value <= 1)
            return false;
        else
            child[1].value--;    
    }
    var currentPrice = getParent[2].children[0].innerHTML.split2('.');
    console.log(currentPrice);
    getParent[4].children[0].innerHTML = (parseInt(currentPrice)*parseInt(child[1].value)).toLocaleString();
    updateAmount();
}

function active(index) {
    if(index.classList.contains("btn--primary"))
        index.classList.remove("btn--primary")
    else
        index.classList.add("btn--primary")
}

function activeList(index) {
    if(index.classList.contains("selection--checked"))
        index.classList.remove("selection--checked")
    else
        index.classList.add("selection--checked")
}

function likeButton(index) {
    const liked = "fas fa-heart";
    const unliked = "far fa-heart";
    if(index.classList.console(unliked))
    {
        this.classList.remove(unliked);
        this.classList.add(liked);
    }
    else
    {
        this.classList.remove(like);
        this.classList.add(unliked);
    }
}

function updateAmountinCart() {
    var amountOfItem = document.querySelector(".header__search-cart-number");
    function amountInCart() {
            return document.querySelectorAll(".header__search-cart-item").length;
    }

    amountOfItem.innerHTML = amountInCart();
}

function deleteItem_CartIndex(index) {
    while(index.tagName != "LI")
    {
        index = index.parentElement;
    }
    index.remove();
    checkEmptyCart();
    updateAmountinCart();
}

function checkEmptyCart() {
    var target = document.querySelector(".header__search-cart-list");
    
    if(target.children.length == 0)
    {
        target.insertAdjacentHTML("afterbegin",
                                                `
                                                <div class="empty-container">
                                                <img src="./assets/img/cart/empty-cart.png" alt="" class="header__search-cart--none-img">
                                                <span class="header__search-cart--none-msg">Chưa có sản phẩm nào</span></div>`);
    }
}

// Delete item in cart

function deleteItem(index) {
    var target = index.parentElement.parentElement;
    target.remove();
    updateAmount();
    orderUpdate();
}

// Calculate total Price

// Checkbox

function checkAll(key) {
    var checkedLists = document.querySelectorAll('.checkBox');
    for(var index of checkedLists)
    {
        if(key.checked == true)
            index.checked = true;
        else
            index.checked = false;
    }
    updateAmount();
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
