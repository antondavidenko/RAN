var RanViewCallbacksVO = function(setPocketCallback, setChangeCallback, setRotateCallback, setToggleSndCallback, setRestartCallback, setPlaySndCallback)
{
    this.pocketCallback = setPocketCallback;
    this.changeCallback = setChangeCallback;
    this.rotateCallback = setRotateCallback;
    this.toggleSndCallback = setToggleSndCallback;
    this.restartCallback = setRestartCallback;
    this.playSndCallback = setPlaySndCallback;
};

module.exports = RanViewCallbacksVO;