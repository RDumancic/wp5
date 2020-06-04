class CFC {
    constructor() {
        this.fighters = [];
        this.firstSide = null;
        this.secondSide = null;
        this.ready = true;
    }

    init() {
        this._disableFight();
        this._choiceHandler();
    }

    _disableFight() {
        document.querySelector("#generateFight").disabled = true;
    }

    _enableFight() {
        document.querySelector("#generateFight").disabled = false;
    }

    _choiceHandler() {

    }
}