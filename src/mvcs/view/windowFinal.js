var WindowFinal = function(setContainer) {
    this.update = function(renderData, view) {
        if (renderData.showWin) {
            setTimeout(() => {showFinal(this, renderData, view);}, 6000);
        }

        //showFinal(this, renderData, view);
    }

    function showFinal(setThis, renderData, view)
    {
        setThis.setVisible(true);

        if (renderData.starsToShow < 3) {
            view.scene["final_star1"].texture = view.textures["star_empty"];
        } else {
            view.scene["final_star1"].texture = view.textures["star"];
        }

        if (renderData.starsToShow < 2) {
            view.scene["final_star2"].texture = view.textures["star_empty"];
        } else {
            view.scene["final_star2"].texture = view.textures["star"];
        }

        if (renderData.starsToShow < 1) {
            view.scene["final_star3"].texture = view.textures["star_empty"];
        } else {
            view.scene["final_star3"].texture = view.textures["star"];
        }

        var summaryScore = renderData.starsToShow*1000 + renderData.tileFireman*10 + renderData.tileTube*5;

        view.scene["final_score1_text"].text = "Cards with firemans: "+renderData.tileFireman+"*10 = 140\nCards with pipes: "+renderData.tileTube+"*5 = 50\n                                                                        ";
        view.scene["final_score2_text"].text = "SUMMARY SCORE: " + summaryScore;
    }
}

WindowFinal.prototype = new WindowAbstract();