document.getElementById("fields").style.position = "unset";
document.getElementById("fields").style.left = "unset";

status = "none";
downloadButton = document.getElementById("itemButton"); 
cookieText = document.getElementById("cookieText"); 

status = document.cookie.substring(document.cookie.search("status=")+7);
if(status != "pressed")
    status = "none";

if(location.pathname.length > 1){
    document.getElementById("key").value = location.pathname.substring(1, location.pathname.indexOf('&'));
    document.getElementById("pas").value = location.pathname.substring(1+ location.pathname.indexOf('&'));
}

function startDownload(key, pass) {
    givenName = "hmmm";
    const url = 'https://files.she-a.eu/fileServer/' + key + '&' + pass;
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("download failed");
            const cd = res.headers.get("Content-Disposition");
            givenName = cd.slice(cd.indexOf("\"") + 1, -1);
            return res.blob();
        })
        .then(blob => {

            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = givenName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        })
        .catch(err => console.log("nop"));
}

function updateCookieText(){
    cookieText.innerHTML = "<p>Please fill in the fields below:</p>";
//    console.log(Date.now()/1000);
    switch(String(status)){
        case "none":    cookieText.innerHTML += "<p> Download</p>"; break;
        case "newPress": cookieText.innerHTML += "<p> Downloading </p>"; break;
        case "pressed": cookieText.innerHTML += "<p> Already Downloaded </p>"; break;
        default: location.reload(); break;
    }
    
} updateCookieText();

function downloadButtonClick(key, pass){
    if(key == ""){
        document.getElementById("key").placeholder = "Name (REQUIRED)";
        document.getElementById("key").style.color = "#f38ba8";
        return;
    }
    if(status == "none")
        status = "newPress";
    downloadButton.disabled = true;
    units = 400;
    const countdown = setInterval(() => {
        units -= 1;
        if (units > 0) {
            downloadButton.textContent = "FETCH ("+ (units/100).toFixed(2) +"s)";
        } else {
            clearInterval(countdown);
            downloadButton.disabled = false;
            downloadButton.textContent = "FETCH";
        }
    }, 10);
    startDownload(key, pass);
    document.cookie = "status=pressed";
    updateCookieText();
}

