"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let synca = document.getElementById("sign-up-btn");
// let synco = document.getElementById("login-btn") as HTMLButtonElement;
synca.addEventListener("click", () => {
    window.location.href = 'login.html';
});
let successmsg = document.querySelector('.success-msg');
successmsg.style.display = 'none';
//Register User === endpoint http://localhost:5000/signup
const signUpform = document.querySelector(".sign-up-form");
const signUsername = document.getElementById("username");
const signEmail = document.getElementById("email");
const signPassword = document.getElementById("password");
console.log('qazaqaz');
signUpform.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const userSign = signUsername.value.trim();
    const emailSign = signEmail.value.trim();
    const passwordSign = signPassword.value.trim();
    const newUser = {
        userName: userSign,
        email: emailSign,
        password: passwordSign
    };
    let user = userSign != "" && emailSign != "" && passwordSign != "";
    if (user) {
        try {
            const response = yield fetch("http://localhost:5000/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            const signedUp = yield response.json();
            if (response.ok) {
                successmsg.textContent = signedUp.message;
                successmsg.style.display = 'flex';
                successmsg.style.background = 'green';
                successmsg.style.color = 'black';
                console.log('USER CREATED SUCCESFULL', signedUp);
                // alert('Account created Succesfull')
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            }
            else {
                console.error('Signup failed:', signedUp.error);
                successmsg.textContent = signedUp.error;
                successmsg.style.display = 'flex';
            }
        }
        catch (error) {
            console.error('There was a problem with the fetch operation signup:', error);
            window.alert('error during signup');
        }
    }
}));
//...................register user ends..........
