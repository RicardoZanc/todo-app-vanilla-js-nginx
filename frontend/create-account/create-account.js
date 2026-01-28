const form = document.getElementsByTagName('form')[0]


const button = document.querySelector('#createAccount');

form.addEventListener('submit', logForm)

async function logForm(event){
    event.preventDefault();
    const data = new FormData(form)
    const userData = Object.fromEntries(data.entries())

    const response = await fetch('http://localhost:3000/create-account', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })

    const resp = await response.json()

    if(resp.success){
        console.log('User created:\n', resp)
        localStorage.setItem('auth', resp.created_user.email)
        setPath('/')
    } else {
        window.alert(resp.error)
    }
    
}