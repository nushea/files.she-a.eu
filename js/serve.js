status = "none";
downloadButton = document.getElementById("Middle"); 
cookieText = document.getElementById("cookieText"); 

status = document.cookie.substring(document.cookie.search("status=")+7);

function updateCookieText(){
    cookieText.innerHTML = "<p>path=" + location.pathname.substring(1) + "</p><p>cookie=" + status+"</p>";
} updateCookieText();

function downloadButtonClick(){
    switch(String(status)){
        case "none": status = "pressed"; break;
        case "pressed": status = "retry"; break;
        case "retry": status = "none"; break;
        default: status = "broken"; break;
    }
    document.cookie = "status="+status;
    updateCookieText();
}

downloadButton.addEventListener('click', downloadButtonClick);
