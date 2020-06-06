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
        // Fight algorithm when "fight" is pressed
        document.querySelector("#generateFight").addEventListener("click", (e) => {
            e.preventDefault();
            this._disableFight();
            this._disableRandom();
            this._removeResult();
            this._disableControls();
            this.ready = false;

            //basically the same fight algorithm from LV-3 but with added calls to change data on server
            let clock = document.querySelector("#clock");
            let countdown = 3;
            let count = setInterval(function() {
                clock.innerHTML = countdown;
                countdown -= 1;
                if (countdown < 0) {
                    clock.innerHTML = "";

                    let first = this.cats[this.firstSide];
                    let second = this.cats[this.secondSide];
                    let firstScore = (first.wins / (first.wins + first.loss)) * 100;
                    let secondScore = (second.wins / (second.wins + second.loss)) * 100;

                    let rng = Math.random();
                    var decision = 0;

                    if (firstScore > secondScore) {
                        if ((firstScore - secondScore) < 10) {
                            if (rng < 0.59) {
                                decision = 1;
                            }
                            else {
                                decision = 2;
                            }
                        }
                        else {
                            if (rng < 0.69) {
                                decision = 1;
                            }
                            else {
                                decision = 2;
                            }
                        }
                    } else {
                        if ((secondScore - firstScore) < 10) {
                            if (rng < 0.59) {
                                decision = 2;
                            }
                            else {
                                decision = 1;
                            }
                        }
                        else {
                            if (rng < 0.69) {
                                decision = 2;
                            }
                            else {
                                decision = 1;
                            }
                        }
                    }

                    let winner;
                    let looza;
                    if (decision === 1) {
                        winner = first.id;
                        looza = second.id;
                        first.wins += 1;
                        second.loss += 1;
                        document.querySelector("#message").innerHTML = "Winner is " + first.name;
                        document.querySelector("#leftImage").classList.add("winner");
                        document.querySelector("#rightImage").classList.add("loser");
                    } else {
                        winner = second.id;
                        looza = first.id;
                        first.loss += 1;
                        second.wins += 1;
                        document.querySelector("#message").innerHTML = "Winner is " + second.name;
                        document.querySelector("#leftImage").classList.add("loser");
                        document.querySelector("#rightImage").classList.add("winner");
                    }
                    clearInterval(count);

                    var t = this;
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if(this.readyState == 4) {
                            if(this.status == 200) {
                                t.cats[t.firstSide] = first;
                                t.cats[t.secondSide] = second;
                                t._setFeatured( 1, t.firstSide);
                                t._setFeatured( 2, t.secondSide);
                            }
                            t.ready = true;
                            t._enableFight();
                            t._enableRandom();
                            t._enableControls();
                        }
                    };
                    request.open("DELETE", "api/neko/delete.php?" + "winner=" + winner + "&loser=" + looza);
                    request.send();
                }
            }, 1000);
        });

        // event for random selection of cats
        document.querySelector("#randomFight").addEventListener("click", (e) => {
            e.preventDefault();
            this._removeResult();

            let i = Math.floor(Math.random() * this.cats.length);
            let j = Math.floor(Math.random() * this.cats.length);
            while(i === j) {
                j = Math.round(Math.random() * this.cats.length);
            }

            if(this.firstSide != null) {
                document.querySelector("#rightCats").children[this.firstSide].children[0].setAttribute("class", "");
                document.querySelector("#leftCats").children[this.firstSide].children[0].setAttribute("class", "");
            }
            if(this.secondSide != null) {
                document.querySelector("#leftCats").children[this.secondSide].children[0].setAttribute("class", "");
                document.querySelector("#rightCats").children[this.secondSide].children[0].setAttribute("class", "");
            }
            document.querySelector("#leftCats").children[j].children[0].setAttribute("class", "already-chosen");
            document.querySelector("#rightCats").children[i].children[0].setAttribute("class", "already-chosen");

            this._setFeatured( 1, i);
            this._setFeatured( 2, j);
            this.firstSide = i;
            this.secondSide = j;
            this._enableFight();
        });
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

    _enableRandom() {
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

    // adds events to cat thumbnails
    _setupEvents() {
        let children = document.querySelector("#firstSide").children;
        for (let i = 0; i < children.length; i++) {
            children[i].children[0].addEventListener("click", (e) => {
                e.preventDefault();
                this._removeResult();
                if(this.ready) {
                    let i = JSON.parse(event.target.parentNode.getAttribute("data-idx"));
                    if(i != this.firstSide && i != this.secondSide) {
                        this._setFeatured(1, i);
                        document.querySelector("#rightCats").children[i].children[0].setAttribute("class", "already-chosen");
                        if(this.firstSide != null) {
                            document.querySelector("#rightCats").children[this.firstSide].children[0].setAttribute("class", "");
                            document.querySelector("#leftCats").children[this.firstSide].children[0].setAttribute("class", "");
                        }
                        this.firstSide = i;
                        if (this.firstSide != null && this.secondSide != null) {
                            this._enableFight();
                        }
                    }
                }
            })
        }

        children = document.querySelector("#secondSide").children;
        for(let i = 0; i < children.length; i++) {
            children[i].children[0].addEventListener("click", (e) => {
                e.preventDefault();
                this._removeResult();
                if(this.ready) {
                    let i = JSON.parse(event.target.parentNode.getAttribute("data-idx"));
                    if(i != this.firstSide && i != this.secondSide) {
                        this._setFeatured(2, i);
                        document.querySelector("#leftCats").children[i].children[0].setAttribute("class", "already-chosen");
                        if(this.secondSide != null) {
                            document.querySelector("#rightCats").children[this.secondSide].children[0].setAttribute("class", "");
                            document.querySelector("#leftCats").children[this.secondSide].children[0].setAttribute("class", "");
                        }
                        this.secondSide = i;
                        if (this.firstSide != null && this.secondSide != null) {
                            this._enableFight();
                        }
                    }
                }
            })
        }            
    }

    // puts chosen cat's info in the featured spot
    _setFeatured(side, i) {
        let data = this.cats[i];
        var info = document.querySelector("#leftInfo");
        var image = document.querySelector("#leftImage");
        if (side == 2) {
            info = document.querySelector("#rightInfo");
            image = document.querySelector("#rightImage");
        }

        info.children[0].innerHTML = data.name;
        info.children[1].innerHTML = data.age;
        info.children[2].innerHTML = data.info;
        info.children[3].children[0].innerHTML = data.wins;
        info.children[3].children[1].innerHTML = data.loss;
        image.src = data.pos
    }

    // clears css that is made after battle ends
    _removeResult(){
        document.querySelector("#leftImage").classList.remove("cat-loser");
        document.querySelector("#leftImage").classList.remove("cat-winner");
        document.querySelector("#rightImage").classList.remove("cat-loser");
        document.querySelector("#rightImage").classList.remove("cat-winner");
        document.querySelector("#message").innerHTML = "";
    }

    // Disables controls for editing cat info during fight
    _disableControls() {
        let first = document.querySelector("#leftCats");
        let second = document.querySelector("#rightCats");
        let firstUpdate = first.querySelectorAll("a");
        let secondUpdate = second.querySelectorAll("a");
        firstUpdate.forEach(ele => ele.style.display = "none");
        secondUpdate.forEach(ele => ele.style.display = "none");
        document.querySelector("#addCatBtn").classList.add("disabled");
    }

    _enableControls() {
        let first = document.querySelector("#leftCats");
        let second = document.querySelector("#rightCats");
        let firstUpdate = first.querySelectorAll("a");
        let secondUpdate = second.querySelectorAll("a");
        firstUpdate.forEach(ele => ele.style.display = "inline");
        secondUpdate.forEach(ele => ele.style.display = "inline");
        document.querySelector("#addCatBtn").classList.remove("disabled");
    }
}