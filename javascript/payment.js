window.addEventListener("load", function() {
    this.document.querySelector(".payment-btn").submit = validInput;
    var formData = this.document.location.search.slice(1);
    formData = formData.replace(/\+/g," ");
    formData = decodeURIComponent(formData);
    formData = formData.slice(1).split(/[&=]/g);
    updateIteminCart(formData);
    calculateTotal();
})  

function validInput() {
    if(validUserName() && validPhone() && validAddress())
        uploadUserInfo();
}

function hasNumber(myString) {
    return /\d/.test(myString);
}

function validUserName() {
    var userName = document.forms.inputForm.userNameInp;
    if(userName.validity.valueMissing) {
        userName.setCustomValidity("Họ và tên không được để trống")
        return false;
    } else if(hasNumber(userName.value)) {
        userName.setCustomValidity("Họ và tên không hợp lệ")
        return false;
    } else {
        userName.setCustomValidity("")
        return true;
    }
}

function validPhone() {
    var getPhone = document.forms.inputForm.userPhoneInp;
    if(getPhone.validity.valueMissing) {
        getPhone.setCustomValidity("Số điện thoại không được bỏ trống");
        return false;
    } else if(isNaN(getPhone.value) || getPhone.value.length <= 9 || getPhone.value.length > 12) {
        getPhone.setCustomValidity("Số điện thoại không hợp lệ")
        return false;
    } else {
        getPhone.setCustomValidity("");
        return true;
    }
}

function validAddress() {
    var getAddress = document.forms.inputForm.userAddressInp;
    if(getAddress.validity.valueMissing) {
        getAddress.setCustomValidity("Địa chỉ không được bỏ trống");
        return false;
    } else if(getAddress.value.length <= 10 || !isNaN(getAddress.value)) {
        getAddress.setCustomValidity("Địa chỉ không hợp lệ");
        return false;
    } else {
        getAddress.setCustomValidity("");
        return true;
    }
}

function uploadUserInfo() {
    var fieldForm = document.forms.inputForm;
    fieldForm.userNameOut.value = fieldForm.userNameInp.value;
    fieldForm.userPhoneOut.value = fieldForm.userPhoneInp.value;
    fieldForm.userAddressOut.value = fieldForm.userAddressInp.value;
    fieldForm.userNoteOut.value = fieldForm.userNoteInp.value
}

function updateIteminCart(dataField) {
    var table = document.getElementById("payment-table");
    var orderTotal = Math.floor(dataField.length/12);
    console.log(dataField);
    if(dataField[dataField.length-1] === "only")
    {table.insertAdjacentHTML("beforeend",`
            <tr>
                <td>
                    <img src="${dataField[1]}" alt="" class="table-row__item-img">
                    <div>
                        <span class="table-row__item-name">${dataField[3]}</span>
                    </div>
                </td>
                <td>
                    <span class="table-heading__title current-price money-type">${dataField[5]}</span>
                </td>
                <td>
                    <span class="table-heading__title item-amount">${dataField[7]}</span>
                </td>
                <td>
                    <span class="table-heading__title total-price money-type">${(parseInt(dataField[5].split2("."))*dataField[7]).toLocaleString()}</span>
                </td>
            </tr>   
            `)  
    } else 
    for(var i=0; i<orderTotal; i++)
    {
        table.insertAdjacentHTML("beforeend",`
            <tr>
                <td>
                    <img src="${dataField[i*12+5]}" alt="" class="table-row__item-img">
                    <div>
                        <span class="table-row__item-name">${(dataField[i*12+3])}</span>
                    </div>
                </td>
                <td>
                    <span class="table-heading__title current-price money-type">${dataField[i*12+7]}</span>
                </td>
                <td>
                    <span class="table-heading__title item-amount">${dataField[i*12+9]}</span>
                </td>
                <td>
                    <span class="table-heading__title total-price money-type">${dataField[i*12+11]}</span>
                </td>
            </tr>
        `)
    }
}   

function getTotalPrice() {
    var priceList = document.querySelectorAll(".total-price");
    var quantityList = document.querySelectorAll(".item-amount")
    var result = 0;
    for(var key of priceList) {
        result += parseInt(key.innerHTML.split2("."));
    }
    return result;
}

function getServiceTax() {
    var result = parseInt(document.querySelector(".total__tax").innerHTML.split2("."))
    return result;
}

function getShippmentTax() {
    var result = parseInt(document.querySelector(".total__shippment").innerHTML.split2("."))
    return result;
}

function calculateTotal() {
    var paymentList = document.querySelectorAll(".payment-total__item span");
    var totalPrice = getTotalPrice().toLocaleString();
    var serviceTax = getServiceTax().toLocaleString();
    var shipmmentTax = getShippmentTax().toLocaleString();
    var totalPayment = getServiceTax() + getTotalPrice() + getShippmentTax()
    paymentList[0].innerHTML = totalPrice;
    paymentList[1].innerHTML = serviceTax;
    paymentList[2].innerHTML = shipmmentTax;
    paymentList[3].innerHTML = totalPayment.toLocaleString();
}