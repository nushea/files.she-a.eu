status = "none";
downloadButton = document.getElementById("Middle"); 
cookieText = document.getElementById("cookieText"); 

status = document.cookie.substring(document.cookie.search("status=")+7);
if(status != "none" && status != "pressed" && status != "retry")
    status = "none";


function startDownload() {
//    window.location = "https://files.she-a.eu/fileServer/" + location.pathname;
    givenName = "hmmm";
    const url = 'https://files.she-a.eu/fileServer' + location.pathname;
    console.log(url);
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
        .catch(err => console.error("download error:", err));
}

function updateCookieText(){
    cookieText.innerHTML = "<p>You are about to download the file: " + location.pathname.substring(1) + "</p>";
    switch(String(status)){
        case "none":    cookieText.innerHTML += "<p> Press anywhere in the middle part of the website to download the document</p>"; break;
        case "pressed": cookieText.innerHTML += "<p> You are downloading the document. </p><p> Press press again thrice to download again </p>"; break;
        case "retry":   cookieText.innerHTML += "<p> You are reseting the cookie, </p><p> after that you can press once more </p>"; break;
        default: location.reload(); break;
    }
    
} updateCookieText();

function downloadButtonClick(){
    switch(String(status)){
        case "none": status = "pressed"; startDownload(); break;
        case "pressed": status = "retry"; break;
        case "retry": status = "none"; break;
        default: location.reload(); break;
    }
    document.cookie = "status="+status;
    updateCookieText();
}

downloadButton.addEventListener('click', downloadButtonClick);
