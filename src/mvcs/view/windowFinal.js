var WindowAbstract = require('./windowAbstract.js');

var WindowFinal = function(setContainer) {

    this.init = function(view, restartCallback) {
        var bgBlocker = view.scene["final_black"];
        bgBlocker.interactive = true;
        bgBlocker.on('pointerdown', () => { });

        var resetButton = view.scene["final_restart"];
        resetButton.interactive = true;
        resetButton.buttonMode = true;
        resetButton.on('pointerdown', () => { restartCallback.call(this) });
    };

    this.update = function(renderData, view) {
        if (renderData.showWin) {
            setTimeout(() => {showFinal(this, renderData, view);}, 6000);
        }
    };

    function showFinal(setThis, renderData, view)
    {
        setThis.setVisible(true);
        var starCount = 0;

        if (!renderData.starsToShow[0]) {
            view.scene["final_star1"].texture = view.textures["star_empty"];
        } else {
            view.scene["final_star1"].texture = view.textures["star"];
            starCount++;
        }

        if (!renderData.starsToShow[1]) {
            view.scene["final_star2"].texture = view.textures["star_empty"];
        } else {
            view.scene["final_star2"].texture = view.textures["star"];
            starCount++;
        }

        if (!renderData.starsToShow[2]) {
            view.scene["final_star3"].texture = view.textures["star_empty"];
        } else {
            view.scene["final_star3"].texture = view.textures["star"];
            starCount++;
        }

        var summaryScore = starCount*1000 + renderData.tileFireman*10 + renderData.tileTube*5;

        view.scene["final_score1_text"].text = "Cards with firemans: "+renderData.tileFireman+"*10 = "+renderData.tileFireman*10+"\nCards with pipes: "+renderData.tileTube+"*5 = "+renderData.tileTube*5+"\n                                                                        ";
        view.scene["final_score2_text"].text = "SUMMARY SCORE: " + summaryScore+"\n                                                         ";
    }
};

WindowFinal.prototype = new WindowAbstract();

module.exports = WindowFinal;