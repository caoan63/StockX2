
window.addEventListener("load", function() {
    this.document.querySelector(".item-toCart").onclick = addtoCart;
    updateInfo();
})

function addtoCart() {
    var itemName = document.querySelector(".item-name").innerHTML;
    var itemPrice = document.querySelector(".item-price-to").innerHTML;
    var amount = document.getElementById("amount-control__value").value;
    var itemImg = document.querySelector(".item-img").src;
    var cartList = document.querySelector(".header__search-cart-list");

    cartList.insertAdjacentHTML("beforeend",
    `
                                    <li class="header__search-cart-item">
                                        <img src="${itemImg}" alt="" class="header__search-cart-item-img">
                                        <div class="header__search-cart-item-info">
                                            <div class="header__search-cart-item-head">
                                                <h5 class="header__search-cart-item-name">${itemName}</h5>
                                                <span class="header__search-cart-item-price">${itemPrice}đ</span>
                                            </div>
                                            <div class="header__search-cart-item-body">
                                                <span class="header__search-cart-item-description">Phân loại: Bạc</span>
                                                <span class="header__search-cart-item-remove" onclick="deleteItem_CartIndex(this)">Xoá</span>
                                            </div>
                                        </div>
                                    </li>
    
    ` )
    updateAmountinCart();
}

function updateInfo() {
    var form = document.forms.itemForm;
    form.elements.itemImg.value = document.querySelector(".item-img").src;
    form.elements.itemName.value = document.querySelector(".item-name").innerHTML.trim();
    form.elements.itemPrice.value = document.querySelector(".item-price-to").innerHTML.trim();
    console.log(form.elements.quantity.value)
}
                                    
