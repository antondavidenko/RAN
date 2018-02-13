var doToggleSnd = function (gameModel)
{
    gameModel.setSnd(!gameModel.getSnd());
    document.cookie = (!gameModel.getSnd())?ranSndConsts.RAN_SOUND_OFF:ranSndConsts.RAN_SOUND_ON;
};

module.exports = doToggleSnd;