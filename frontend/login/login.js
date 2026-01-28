const button = document.querySelector('#button');
const createAccount = document.querySelector('#createAccount');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');

button.addEventListener('click', login)
createAccount.addEventListener('click', redirect)

function redirect(){
    setPath('/create-account')
}

async function login(event){
    event.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        })
    })
    
    const body = await response.json()

   if(!body.logged){
    return window.alert(body.error)
   }

   if(body.logged){
    localStorage.setItem('auth', body.email)
    setPath('/')
   }
}