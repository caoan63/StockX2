window.addEventListener("load", function() {
    this.document.querySelector(".payment-btn").submit = validInput;
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
