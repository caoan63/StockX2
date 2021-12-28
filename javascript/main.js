"use strict"

window.addEventListener("load", function() {
    this.document.getElementById("register-btn").onclick = registerValid;
    this.document.getElementById("login-btn").onclick = loginValid;
})

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

// Active Button

function active(index) {
    if(index.classList.contains("btn--primary"))
        index.classList.remove("btn--primary")
    else
        index.classList.add("btn--primary")
}

function activeList(index) { // active filter list
    if(index.classList.contains("selection--checked"))
        index.classList.remove("selection--checked")
    else
        index.classList.add("selection--checked")
}

// Amount control

function getLeftItem(index) {
    var itemLeft = index.innerHTML.trim().slice(0,2);
    return parseInt(itemLeft);
}

function amountControl(index, symbol) {
    var indexChild = index.parentElement.children[1];
    if(symbol === "+" && indexChild.value < getLeftItem(index.parentElement.parentElement.children[2]))
    {
        indexChild.value++;
    }
    if(symbol === "-" && indexChild.value > 1)
    {
        indexChild.value--;
    }
}

// Cart


// Check Valid form

function registerValid() {
    validPhone();
    validEmail();
}

function validPhone() {
    var getPhone = document.forms.register.elements.fphone;
    if(getPhone.validity.valueMissing) {
        getPhone.setCustomValidity("Số điện thoại không được bỏ trống");
    } else if(isNaN(getPhone.value) || getPhone.value.length <= 9 || getPhone.value.length > 12) 
        getPhone.setCustomValidity("Số điện thoại không hợp lệ")
    else {
        getPhone.setCustomValidity("");
    }
}

function validEmail() {
    var getEmail = document.forms.register.elements.fmail;
    if(getEmail.validity.valueMissing) {
        getEmail.setCustomValidity("Địa chỉ email không được bỏ trống");
    } else if(getEmail.value.indexOf("@") < 0 || getEmail.value.indexOf("@") == getEmail.value.length -1) {
        getEmail.setCustomValidity("Địa chỉ email không hợp lệ");
    } else {
        getEmail.setCustomValidity("");
    }
}

function loginValid() {
    validUserName();
    validPassword();
}

function ValidateEmail(mail) 
{
    console.log(mail);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true);
    }
    return (false);
}

function validUserName() {
    var getUserName = document.forms.login.elements.fusername;
    if(getUserName.validity.valueMissing) {
        getUserName.setCustomValidity("Tên đăng nhập không được bỏ trống");
    } else if(getUserName.value.indexOf("@") > 0 && ValidateEmail(getUserName.value) == false) {
        getUserName.setCustomValidity("Địa chỉ email không hợp lệ");
    } else if(getUserName.value.length <= 6) {
        getUserName.setCustomValidity("Tên đăng nhập không hợp lệ");
    } else {
        getUserName.setCustomValidity("");
    }
}

function validPassword() {
    var getPassword = document.forms.login.elements.fpassword;
    if(getPassword.validity.valueMissing) {
        getPassword.setCustomValidity("Mật khẩu không được bỏ trống");
    } else if(getPassword.value.length <= 6) {
        getPassword.setCustomValidity("Mật khẩu phải nhiều hơn 6 ký tự");
    } else {
        getPassword.setCustomValidity("");
    }
}

function loginInfo(index) {
    var userName = index.slice(1).split(/&/g);
    return userName[0].slice(userName[0].indexOf("=") + 1);
}

function hideLoginNavbar(loginField) {
    var loginNav = document.querySelectorAll(".login-navBar");
    var headerNavbar_list = document.querySelectorAll(".header__navbar-list");
    for(var key of loginNav)
    {
        key.remove();
    }

   
    headerNavbar_list[1].insertAdjacentHTML("beforeend",`
                        <li class="header__navbar-item">
                            <div class="header__navbar-item-user">
                                <img src="./assets/img/profile/avatar.jpg" alt="" class="header__navbar-item-user-img">
                                <span class="header__navbar-item-user-name">
                                    ${loginInfo(loginField)}
                                </span>

                                <ul class="header__navbar-user-menu">
                                    <li class="header__user-item">
                                        <a href="" class="header__user-item-link">Tài Khoản Của Tôi</a>
                                    </li>
                                    <li class="header__user-item">
                                        <a href="" class="header__user-item-link">Đơn Mua</a>
                                    </li>
                                    <li class="header__user-item">
                                        <a href="" class="header__user-item-link">Lịch Sử</a>
                                    </li>
                                    <li class="header__user-item">
                                        <a href="" class="header__user-item-link logout-btn">Đăng Xuất</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
    `)
}

String.prototype.split2 = function(char) {
    var temp = this.split(char);
    var result = "";
    for(var i = 0; i<temp.length; i++)
        result += temp[i];
    return result;
}