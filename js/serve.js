status = "none";
downloadButton = document.getElementById("Middle"); 
cookieText = document.getElementById("cookieText"); 

status = document.cookie.substring(document.cookie.search("status=")+7);
if(status != "none" && status != "pressed" && status != "retry")
    status = "none";


function startDownload(){
    console.log("downloathe");
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
