
let synca = document.getElementById("sign-up-btn") as HTMLButtonElement;

// let synco = document.getElementById("login-btn") as HTMLButtonElement;

synca.addEventListener("click", () => {
    window.location.href = 'login.html'
})

let successmsg = document.querySelector('.success-msg') as HTMLParagraphElement
successmsg.style.display = 'none'

  //Register User === endpoint http://localhost:5000/signup

  const signUpform = document.querySelector(".sign-up-form") as HTMLFormElement;

  const signUsername = document.getElementById("username") as HTMLInputElement;

  const signEmail = document.getElementById("email") as HTMLInputElement;

  const signPassword = document.getElementById("password") as HTMLInputElement;

 console.log('qazaqaz')
signUpform.addEventListener("submit", async (event)=>{

  event.preventDefault();

    const userSign = signUsername.value.trim();
    const emailSign = signEmail.value.trim();
    const passwordSign = signPassword.value.trim();

    const newUser = {
        userName: userSign,
        email: emailSign,
        password:passwordSign
    };
    let user = userSign != "" && emailSign != "" && passwordSign!= ""
    
    if (user){ try {
      const response = await fetch("http://localhost:5000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      
  
      const signedUp = await response.json();
      
      if (response.ok) {
      successmsg.textContent = signedUp.message;
        successmsg.style.display = 'flex';
        successmsg.style.background = 'green'
        successmsg.style.color = 'black'

      console.log('USER CREATED SUCCESFULL', signedUp);

      // alert('Account created Succesfull')
      setTimeout(() => {
      window.location.href='login.html'
      }, 3000);
    }

    else {
      console.error('Signup failed:',signedUp.error);
      successmsg.textContent = signedUp.error;
      successmsg.style.display = 'flex';
  }
  }
    
    
    catch (error) {
      console.error('There was a problem with the fetch operation signup:', error);
      window.alert('error during signup')
    }
  }

}) ;

 //...................register user ends..........
