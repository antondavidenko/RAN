var WindowAbstract = require('./windowAbstract.js');

var WindowHelp = function(setContainer) {
    this.init = function(view) {
        var helpButton = view.scene["help_close"];
        helpButton.interactive = true;
        helpButton.buttonMode = true;
        helpButton.on('pointerdown', () => { this.setVisible(false); });

        var bgBlocker = view.scene["help_black"];
        bgBlocker.interactive = true;
        bgBlocker.on('pointerdown', () => { });
    }
};

WindowHelp.prototype = new WindowAbstract();

module.exports = WindowHelp;