var WindowAbstract = require('./windowAbstract.js');

var WindowLose = function(setContainer) {
    this.init = function(view, restartCallback) {
        var helpButton = view.scene["lose_restart"];
        helpButton.interactive = true;
        helpButton.buttonMode = true;
        helpButton.on('pointerdown', () => { restartCallback.call(this) });

        var bgBlocker = view.scene["lose_black"];
        bgBlocker.interactive = true;
        bgBlocker.on('pointerdown', () => { });
    }

    this.update = function(renderData, view) {
        if (renderData.showLose) {
            setTimeout(() => {this.setVisible(true);}, 2000);
        }
    };
};

WindowLose.prototype = new WindowAbstract();

module.exports = WindowLose;