"use strict";
let logInBtns = document.getElementById("login");
let signUpBtns = document.getElementById("sign-up");
signUpBtns.addEventListener("click", () => {
    window.location.href = 'Signup.html';
});
logInBtns.addEventListener("click", () => {
    window.location.href = 'login.html';
});
