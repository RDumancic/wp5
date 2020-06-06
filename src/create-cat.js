function createCat(e) {
    e.preventDefault();
    document.querySelector("#submitBtn").disabled = true;
    var form = document.querySelector("#newForm");
    var data = new FormData(form);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 201) {
                window.location.href="index.html";
            }
        }
    }
    request.open("POST", "/api/neko/create.php");
    request.send(data);
}


document.body.onload = function() {
    document.querySelector("#newForm").addEventListener("submit", createCat);
}