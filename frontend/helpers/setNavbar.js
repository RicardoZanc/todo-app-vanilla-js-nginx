
const nav = `<nav style="width: 100%; height: 100px; background-color: black;">
        <div style="display: flex; justify-content: space-around; height: 100%;
        align-items: center;">
            <h2  id="userEmailText" style="color: white; "></h2>
            <button id="logoutButton" style="padding: 20px; color: black; background-color: white; border: none;">Logout</button>
        </div>
    </nav>`

    const navParsed = Document.parseHTMLUnsafe(nav)
    
    const navEl = navParsed.getElementsByTagName('nav')[0]
    
    const body =  document.getElementsByTagName('body')[0]
    
    body.insertBefore(navEl, body.firstChild)
    
    const userEmailText = document.querySelector('#userEmailText')
    const logoutButton = document.querySelector('#logoutButton')
 const teste = document.querySelector('#teste')

userEmailText.innerHTML = userEmail
logoutButton.addEventListener('click', logout)

function logout(){
    window.localStorage.clear()
    window.location.reload();
} 
