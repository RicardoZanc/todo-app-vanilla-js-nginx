function getPath(){
    let path = window.location.pathname

    path = path.endsWith('/') ? path.slice(0, -1) : path

    return path
}

function setPath(path){
    const url = window.location.origin + path;
    window.location.href = url
}