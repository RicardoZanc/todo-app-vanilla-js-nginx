const userEmail = window.localStorage.auth

if(!userEmail){
    setPath('/login')
}