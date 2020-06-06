function createCat(e) {
    e.preventDefault();
    document.querySelector("#submitBtn").disabled = true;
    document.querySelector("deleteBtn").disabled = true;
    var form = document.querySelector("#newForm");
    var data = new FormData(form);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200) {
                window.location.href="index.php";
            } else {
                document.querySelector("#submitBtn").disabled = false;
            }
        }
    }
    request.open("POST", "/api/neko/update.php");
    request.send(data);
}

function _fetchCats() {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200) {
                let neko = JSON.parse(this.response);
                let form = document.querySelector("#newForm");
                form.querySelector("#id").value = neko["id"];
                form.querySelector("#name").value = neko["name"];
                form.querySelector("#age").value = neko["age"];
                form.querySelector("#info").value = neko["info"];
                form.querySelector("#wins").value = neko["wins"];
                form.querySelector("#loss").value = neko["loss"];
                if(neko["pos"]) {
                    document.querySelector("#imagePreview").src=neko["pos"];
                    form.querySelector("#path").value = neko["name"];
                }
            }
        }
    };
    request.open("GET", "api/neko/read.php", true);
    request.send();
}

function _deleteCat() {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200) {
                window.location.href="index.php";
            } else {
                document.querySelector("#submitBtn").disabled = false;
                document.querySelector("deleteBtn").disabled = false;
            }
        }
    };
    request.open("DELETE", "api/neko/delete.php?" + "id=" + id, true);
    request.send();
}

document.body.onload = function() {
    document.querySelector("#newForm").addEventListener("submit", createCat);
    document.querySelector("#deleteBtn").addEventListener("click", _deleteCat);
    _fetchCats();
}