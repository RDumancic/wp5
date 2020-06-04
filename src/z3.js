class ImageSelector {
    constructor(button, image, side) {
        this.buttons = button;
        this.images = image;
        this.sides = side;
    }

    init() {
        this._choiceHandler();
    }

    _enableFight(fightButton, randomBtn, firstScore, secondScore) {
        fightButton.disabled = false;
        fightButton.setAttribute("style", "opacity: 1;");
        fightButton.addEventListener("click", (e) => {
            e.preventDefault();
            this._disableFight(fightButton);
            this._toggleChoice(randomBtn);
            this._fightHandler(fightButton, randomBtn, firstScore, secondScore);
        });
    }

    _disableFight(fightButton) {
        fightButton.disabled = true;
        fightButton.setAttribute("style", "opacity: 0.3;");
    }

    _toggleChoice() {
        var counter = 0;
        const shutdown = document.querySelector(this.images.choice);
        if (counter < 1) {
            shutdown.style.pointerEvents = "none";
            counter += 1; 
        } else {
            shutdown.style.pointerEvents = "auto";
            counter -= 1;
        }
    }

    _choiceHandler() {
        const fightButton = document.querySelector(this.buttons.fight);
        this._disableFight(fightButton);

        var firstScore = 0;
        var secondScore = 0;

        const randomBtn = document.querySelector(this.buttons.random)
        randomBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this._randomHandler(fightButton, firstScore, secondScore);
        });

        var firstChoice = "";
        var secondChoice = "";
        const first = document.querySelector(this.sides.left);
        const firstInfo = first.querySelector(this.images.info);
        const firstFighters = first.querySelectorAll(this.images.choice);
        Array.from(firstFighters).forEach((item) => {
            const data = JSON.parse(item.dataset.info)
            item.addEventListener("click", (event) => {
                event.preventDefault();
                if(secondChoice !== data.name){
                    firstChoice = data.name;
                    firstInfo.querySelector(".name").innerHTML = data.name;
                    firstInfo.querySelector(".age").innerHTML = data.age;
                    firstInfo.querySelector(".skills").innerHTML = data.catInfo;
                    firstInfo.querySelector(".record").innerHTML = "Wins: " + 
                        data.record.wins + " Loss: " + data.record.loss;
                    firstScore = (data.record.wins / (data.record.wins + data.record.loss)) * 100;
                    const selec = first.querySelector(this.images.selected);
                    selec.src = item.querySelector("img").src;
                    if (secondChoice !== "") {
                        this._enableFight(fightButton, randomBtn, firstScore, secondScore);
                    }
                }
            })
        })

        const second = document.querySelector(this.sides.right);
        const secondInfo = second.querySelector(this.images.info);
        const secondFighters = second.querySelectorAll(this.images.choice)
        Array.from(secondFighters).forEach((item) => {
            const data = JSON.parse(item.dataset.info);
            item.addEventListener("click", (event) => {
                event.preventDefault();
                if(firstChoice !== data.name) {
                    secondChoice = data.name;
                    secondInfo.querySelector(".name").innerHTML = data.name;
                    secondInfo.querySelector(".age").innerHTML = data.age;
                    secondInfo.querySelector(".skills").innerHTML = data.catInfo;
                    secondInfo.querySelector(".record").innerHTML = "Wins: " + 
                        data.record.wins + " Loss: " + data.record.loss;
                    secondScore = (data.record.wins / (data.record.wins + data.record.loss)) * 100;
                    const selec = second.querySelector(this.images.selected);
                    selec.src = item.querySelector("img").src;
                    if(firstChoice !== "") {
                        this._enableFight(fightButton, randomBtn, firstScore, secondScore);
                    }
                }
            });
        });
    
    }

    _randomHandler(fightButton, randomBtn, firstScore, secondScore) {
        var i = Math.round(Math.random() * 5 + 1);
        var j = Math.round(Math.random() * 5 + 1);
        while(i === j) {
            j = Math.round(Math.random() * 5 + 1);
        }

        const first = document.querySelector(this.sides.left);
        const firstInfo = first.querySelector(this.images.info);
        const firstFighters = first.querySelectorAll(this.images.choice);
        Array.from(firstFighters).forEach((item) => {
            const data = JSON.parse(item.dataset.info)
            if (i === data.id) {
                firstInfo.querySelector(".name").innerHTML = data.name;
                firstInfo.querySelector(".age").innerHTML = data.age;
                firstInfo.querySelector(".skills").innerHTML = data.catInfo;
                firstInfo.querySelector(".record").innerHTML = "Wins: " + 
                    data.record.wins + " Loss: " + data.record.loss;
                firstScore = (data.record.wins / (data.record.wins + data.record.loss)) * 100;
                const selec = first.querySelector(this.images.selected);
                selec.src = item.querySelector("img").src;
            }
        });

        const second = document.querySelector(this.sides.right);
        const secondInfo = second.querySelector(this.images.info);
        const secondFighters = second.querySelectorAll(this.images.choice)
        Array.from(secondFighters).forEach((item) => {
            const data = JSON.parse(item.dataset.info);
            if(j === data.id) {
                secondInfo.querySelector(".name").innerHTML = data.name;
                secondInfo.querySelector(".age").innerHTML = data.age;
                secondInfo.querySelector(".skills").innerHTML = data.catInfo;
                secondInfo.querySelector(".record").innerHTML = "Wins: " + 
                    data.record.wins + " Loss: " + data.record.loss;
                secondScore = (data.record.wins / (data.record.wins + data.record.loss)) * 100;
                const selec = second.querySelector(this.images.selected);
                selec.src = item.querySelector("img").src;
            }
        });

        this._enableFight(fightButton, randomBtn, firstScore, secondScore);
    }

    _fightHandler(fightButton, randomBtn, firstScore, secondScore) {
        let rng = Math.random();
        var decision = 0;
        var countdown = 3;

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
        let gBor;
        let rBor;
        if (decision === 1) {
            const chosenWinner = document.querySelector(this.sides.left)
            const looza = document.querySelector(this.sides.right)
            winner = chosenWinner.querySelector(".list-group-item.name").textContent;
            gBor = chosenWinner.querySelector(this.images.selected);
            rBor =  looza.querySelector(this.images.selected);
        } else {
            const chosenWinner = document.querySelector(this.sides.right)
            const looza = document.querySelector(this.sides.left)
            winner = chosenWinner.querySelector(".list-group-item.name").textContent;
            gBor = chosenWinner.querySelector(this.images.selected);
            rBor =  looza.querySelector(this.images.selected);
        }

        const banner = document.querySelector(".banner")
        var countdownBanner = setInterval(function() {
            banner.innerHTML = countdown;
            countdown -= 1;
            if(countdown < 0) {
                banner.innerHTML = "Winner is " + winner;
                gBor.style.border = "5px solid green";
                rBor.style.border = "5px solid red";
                clearInterval(countdownBanner);
            }
        }, 1000)

        this._enableFight(fightButton, randomBtn, 0, 0);
    }
}

let ferit = {
    button: {
        fight: "#generateFight",
        random: "#randomFight"
    },
    image: {
        choice: ".fighter-box",
        selected: ".featured-cat-fighter-image",
        info: ".cat-info"
    },
    side: {
        left: "#firstSide",
        right: "#secondSide"
    }
};

const imageSelectorObj = new ImageSelector(ferit.button, ferit.image, ferit.side);
imageSelectorObj.init();