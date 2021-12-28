window.addEventListener("load", function() {
    updateAmountinCart();   
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