var doPlaySnd = require('./doPlaySnd.js');

var doShowWin = function(gameModel)
{
    new doPlaySnd(gameModel, ranSndConsts.WIN_SND);
    gameModel.showWin = true;
};

module.exports = doShowWin;