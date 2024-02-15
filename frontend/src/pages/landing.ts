
let logInBtns = document.getElementById("login") as HTMLButtonElement;

let signUpBtns = document.getElementById("sign-up") as HTMLButtonElement;

signUpBtns.addEventListener("click", () => {
    window.location.href = 'Signup.html'
})


logInBtns.addEventListener("click", () => {
    window.location.href = 'login.html'
})
