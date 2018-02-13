var doPlaySnd = function (gameModel, data)
{
    if (gameModel.getSnd()) {
        var sndSrc = $(data+"_src").attr('src');
        $(ranSndConsts.RAN_PLAYER_SND+"_src").attr('src', sndSrc);
        $(ranSndConsts.RAN_PLAYER_SND).get(0).load();
        $(ranSndConsts.RAN_PLAYER_SND).get(0).oncanplaythrough = $(ranSndConsts.RAN_PLAYER_SND).get(0).play();
    }
};

module.exports = doPlaySnd;