var RanAnimation = function()
{
	var animationItemsList = [];
	var uniqIdcounter = 0;
//-------------------------------------------------------------------
	function getUniqId()
	{
		return uniqIdcounter++;
	}
//-------------------------------------------------------------------
	function animationTween(animationItem, delta)
	{
		var endCount = animationItem.startCount + animationItem.duration;
		var step = (animationItem.finalValue-animationItem.startValue)/animationItem.duration;

		if ((animationItem.ticker>animationItem.startCount)&&(animationItem.ticker<endCount)) {
            //animationItem.object[animationItem.param] += step*delta;
            setObjectParam(animationItem.object, animationItem.param,  getObjectParam(animationItem.object, animationItem.param) + step*delta);
		} else
		if (animationItem.ticker>=endCount)
		{
            //animationItem.object[animationItem.param] = animationItem.finalValue;
            setObjectParam(animationItem.object, animationItem.param, animationItem.finalValue);
            animationItem.callBack.call(this);
            delete animationItemsList[animationItem.uniqId];
		} else 
		if	(animationItem.ticker<=animationItem.startCount)
		{
            //animationItem.object[animationItem.param] = animationItem.startValue;
            setObjectParam(animationItem.object, animationItem.param, animationItem.startValue);
		}

        animationItem.ticker += delta;
	};

	function setObjectParam(object, param, value)
    {
        if (param !== "scale") {
            object[param] = value;
        } else {
            object[param]["x"] = value;
            object[param]["y"] = value;
        }
    }

    function getObjectParam(object, param)
    {
        res = (param !== "scale")?object[param]:object[param]["x"];
        return res;
    }
//-------------------------------------------------------------------
    this.insertCard = function(object, object2, callBack)
    {
        var duration = 35;
        var defX = object.x;
        var defY = object.y;
        var defScale = object.scale.x;

        var newAnimationItem = {};
        newAnimationItem.object = object;
        newAnimationItem.param = "x";
        newAnimationItem.startCount = 0;
        newAnimationItem.duration = duration;
        newAnimationItem.startValue = object.x;
        newAnimationItem.finalValue = object2.x;
        newAnimationItem.ticker = 0;
        newAnimationItem.callBack = function () {
            object.x = defX;
            callBack.call(this);
        };
        newAnimationItem.uniqId = getUniqId();

        animationItemsList[newAnimationItem.uniqId] = newAnimationItem;

        newAnimationItem = {};
        newAnimationItem.object = object;
        newAnimationItem.param = "y";
        newAnimationItem.startCount = 0;
        newAnimationItem.duration = duration;
        newAnimationItem.startValue = object.y;
        newAnimationItem.finalValue = object2.y;
        newAnimationItem.ticker = 0;
        newAnimationItem.callBack = function () {
            object.y = defY;
        };
        newAnimationItem.uniqId = getUniqId();

        animationItemsList[newAnimationItem.uniqId] = newAnimationItem;

        newAnimationItem = {};
        newAnimationItem.object = object;
        newAnimationItem.param = "scale";
        newAnimationItem.startCount = 0;
        newAnimationItem.duration = duration;
        newAnimationItem.startValue = object.scale.x;
        newAnimationItem.finalValue = object2.scale.x;
        newAnimationItem.ticker = 0;
        newAnimationItem.callBack = function () {
            object.scale.x = defScale;
            object.scale.y = defScale;
        };
        newAnimationItem.uniqId = getUniqId();

        animationItemsList[newAnimationItem.uniqId] = newAnimationItem;
    };
//-------------------------------------------------------------------
	this.rotatePocket = function(object, startValue, finalValue, callBack)
	{
		var newAnimationItem = {};
        newAnimationItem.object = object;
        newAnimationItem.param = "rotation";
        newAnimationItem.startCount = 0;
        newAnimationItem.duration = 25;
        newAnimationItem.startValue = startValue;
        newAnimationItem.finalValue = finalValue;
        newAnimationItem.ticker = 0;
        newAnimationItem.callBack = callBack;
        newAnimationItem.uniqId = getUniqId();

        animationItemsList[newAnimationItem.uniqId] = newAnimationItem;
	};
//-------------------------------------------------------------------
    this.changePocket = function(object, callBack)
    {
        var newAnimationItem = {};
        newAnimationItem.object = object;
        newAnimationItem.param = "alpha";
        newAnimationItem.startCount = 0;
        newAnimationItem.duration = 25;
        newAnimationItem.startValue = object.alpha;
        newAnimationItem.finalValue = 0;
        newAnimationItem.ticker = 0;
        newAnimationItem.callBack = callBack;
        newAnimationItem.uniqId = getUniqId();

        animationItemsList[newAnimationItem.uniqId] = newAnimationItem;
    };
//-------------------------------------------------------------------
	this.update = function(delta)
	{
		var i;
        for (i in animationItemsList) {
            animationTween(animationItemsList[i], delta);
        }
	}
};

module.exports = RanAnimation;