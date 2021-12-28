window.addEventListener("load", function() {
    updateAmountinCart();   
    uploadItem();
});

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

function uploadItem() {
    var form = document.forms.indexCartForm;
    for(var index of form.elements.Cart_itemImg)
    {
        index.value = index.parentElement.children[0].src;
    }
    for(var index of form.elements.Cart_itemName)
    {
        index.value = index.parentElement.children[0].innerHTML.trim();
        console.log(index.value)
    }
    for(var index of form.elements.Cart_itemPrice)
    {
        index.value = index.parentElement.children[2].innerHTML.trim();
    }
}