
let signUpBnt = document.getElementById("sign-up-btn") as HTMLButtonElement;

// let logo = document.getElementById("login-btn") as HTMLButtonElement;

signUpBnt.addEventListener("click", () => {
    window.location.href = 'Signup.html'
})

// logo.addEventListener("click", () => {
//   window.location.href = 'AdminPage.html'
// })



 //..............Login user....................
 
 const loginform = document.querySelector(".login-form") as HTMLFormElement;

 const loginEmail = document.getElementById("email") as HTMLInputElement;

 const loginPassword = document.getElementById("password") as HTMLInputElement;


 let email_error_msg = document.getElementById('email-error') as HTMLParagraphElement
email_error_msg.style.display = "none"

let sucessSms = document.getElementById("success-message") as HTMLParagraphElement
sucessSms.style.display = "none"


loginform.addEventListener("submit", async (event)=>{
  // alert("hello goddy")

 event.preventDefault();


   const emailLogin = loginEmail.value.trim();
   const passwordLogin = loginPassword.value.trim();



   if (emailLogin == '') {
    loginEmail.style.border = 'red solid 1px'
    sucessSms.style.display = 'flex'
    sucessSms.style.alignSelf = 'left'
    sucessSms.style.color = 'red'
    sucessSms.textContent = 'Email is required'
} else {
  loginEmail.style.border = 'black solid 1px'
    sucessSms.style.display = 'none'
    sucessSms.textContent = ''
}

// announce empty email value
if (passwordLogin == '') {
  loginPassword.style.border = 'red solid 1px'
} else {
  loginPassword.style.border = 'black solid 1px'
}

   const userLog = {
       email: emailLogin,
       password:passwordLogin
   };

  
    console.log(userLog);

    const userLogJSON = JSON.stringify(userLog);
     localStorage.setItem("loggedUser", userLogJSON);
   

  
 try {
     const response = await fetch("http://localhost:5000/login", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(userLog)
     });
 

     const loggedIn = await response.json();
     console.log(loggedIn);
     sucessSms.style.display = "flex"
     sucessSms.style.color = "white"
     sucessSms.style.background = "green"
     sucessSms.textContent = "Login Sucessful"
     
     if(loggedIn.token){
      localStorage.setItem("token", loggedIn.token);
      
      if(loggedIn.isAdmin){

        setTimeout(() => {
          window.location.href='../../public/pages/AdminPage.html'
      }, 900);
       
      }else{
        setTimeout(() => {
        window.location.href='../../public/pages/UserPage.html'
      }, 900);
      }
     }
     
     
   }
   
   
   catch (error) {
     console.error('There was a problem with the fetch operation login:', error);
   }

}) ;



//..............Login user end....................