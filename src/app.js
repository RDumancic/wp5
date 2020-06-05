class CFC {
    constructor() {
        this.cats = [];
        this.firstSide = null;
        this.secondSide = null;
        this.ready = true;
    }

    init() {
        this._disableFight();
        this._fetchCats();
    }

    _disableFight() {
        document.querySelector("#generateFight").disabled = true;
    }

    _enableFight() {
        document.querySelector("#generateFight").disabled = false;
    }

    _disableRandom() {
        document.querySelector("#randomFight").disabled = true;
    }

    _disableRandom() {
        document.querySelector("#randomFight").disabled = false;
    }

    //fetch the cat info from server
    _fetchCats() {
        var t = this;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                t._clearCat();
                t.cats = JSON.parse(this.response);
                if(t.cats?.length) {
                    t.cats.forEach((element, i) => t._addCat(element,i));
                    t._setupEvents();
                } else {
                    this._disableRandom();
                }
            }
        };
        request.open("GET", "api/neko/read.php", true);
        request.send();
    }

    // clears an entry
    _clearCat() {
        let first = document.querySelector("#firstSide");
        let second = document.querySelector("#secondSide");
        while(first.firstChild) {
            first.firstChild.remove();
        }
        while(second.firstChild) {
            second.firstChild.remove();
        }
    }

    //add html elements for a new cat
    _addCat(cat, i) {
        let first = document.querySelector("#firstSide");
        let second = document.querySelector("#secondSide");
        ([first, second]).forEach((item) => {
            var frag = new DocumentFragment();
            var parent = document.createElement("div");
            parent.className = "col-md-4 mb-1";
            var fighterBox = document.createElement("div");
            fighterBox.className = "fighter-box";
            fighterBox.dataset.i = i;
            var image = document.createElement("img");
            image.className = "cat-thumbnail";
            image.src = cat["pos"];
            var update = document.createElement("a");
            update.className = "btn btn-secondary btn-sm updateBtn";
            update.href = "update-cat?id=" + cat["id"];
            update.text = "Edit";
            fighterBox.appendChild(img);
            parent.appendChild(fighterBox);
            parent.appendChild(update);
            frag.appendChild(parent);
            item.appendChild(frag);
        });
    }

    _setupEvents() {
        let children = document.querySelector("#firstSide").children;
        for (let i = 0; i < children.length; i++) {
            children[i].children[0].addEventListener("click", (event) => {
                
            })
        }
        children = document.querySelector("#secondSide").children;
        for(let i = 0; i < children.length; i++) {
            children[i].children[0].addEventListener("click", (event) => {

            })
        }            
    }
}