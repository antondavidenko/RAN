var doPlaySnd = require('./doPlaySnd.js');

var doShowLose = function(gameModel)
{
    if (!gameModel.showWin) {
        new doPlaySnd(gameModel, ranSndConsts.LOSE_SND);
        gameModel.showLose = true;
    }
};

module.exports = doShowLose;