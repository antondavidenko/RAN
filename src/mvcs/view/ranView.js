var WindowFinal = require('./windowFinal.js');
var WindowHelp = require('./windowHelp.js');
var WindowLose = require('./windowLose.js');
var RanAnimation = require('./ranAnimation.js');

var RanView = function()
{
    var windowFinal = new WindowFinal();
    var windowHelp = new WindowHelp();
    var windowLose = new WindowLose();
    var ranAnimation = new RanAnimation(this);
    var targetFieldCell;
//-----------------------------------------------------------------------------
	this.updateTable = function(renderData)
	{
		for (j=0; j<=2; j++)
		{
			for (i=0; i<=4; i++)
			{			
				if (renderData.table[j][i]!=-1)
				{
					this.scene["table"+(j+1)+""+(i+1)].texture = this.getCardTexture(renderData.table[j][i]);

					if (renderData.table[j][i] === 100) {
                        targetFieldCell = this.scene["table" + (j + 1) + "" + (i + 1)];
                    }

					if (renderData.table[j][i].rotateId) {
						this.scene["table"+(j+1)+""+(i+1)].rotation = toRadians(90)*(renderData.table[j][i].rotateId);
					}
				}
			}
		}
	};
	
	this.getCardTexture = function(card)
	{
		var res;
		if (card===100) {
			res = this.textures["green_card"];
		} else
		if (card===0) {
			res = this.textures["blue_card"];
		}
		else {
			res = this.textures[card.id];
		} 
		return res;
	};
//-----------------------------------------------------------------------------
	this.updatePocket = function(renderData)
	{
		var currentPocket;		
		
		for (i=0; i<5; i++)
		{
			currentPocket = this.scene["pocket"+(i+1)];
			currentPocket.texture = this.textures[renderData.pockets[i].id];
			if (utils.isTileApplicable(renderData.pockets[i].tile))
			{
				currentPocket.interactive = true;
				currentPocket.buttonMode = true;
				currentPocket.alpha = 1;
			} else {
				currentPocket.interactive = false;
				currentPocket.buttonMode = false;
				currentPocket.alpha = 0.25;
			}
			
			currentPocket.rotation = toRadians(90)*renderData.pockets[i].rotateId;
		}
	};
	
	function toRadians (angle) {
		return angle * (Math.PI / 180);
	}
//-----------------------------------------------------------------------------
	this.updateRotate = function(renderData)
	{
		var currentPocket;
		var i;
		
		for (i=0; i<5; i++)
		{
			currentPocket = this.scene["btn_rotate_"+(i+1)];
			if (utils.isTileRotatable(renderData.pockets[i].id))
			{
				currentPocket.interactive = true;
				currentPocket.buttonMode = true;
				currentPocket.alpha = 1;
			} else {
				currentPocket.interactive = false;
				currentPocket.buttonMode = false;
				currentPocket.alpha = 0.25;
			}
		}
	};
//-----------------------------------------------------------------------------
	this.updateStars = function(renderData)
	{
		this.scene["starText"].text = renderData.starCount;

		if (renderData.starsToShow[1]) {
			this.scene["star1"].texture = this.textures["star"];
		} else {
            this.scene["star1"].texture = this.textures["star_empty"];
        }

        if (renderData.starsToShow[2]) {
            this.scene["star2"].texture = this.textures["star"];
        } else {
            this.scene["star2"].texture = this.textures["star_empty"];
        }
	};
//-----------------------------------------------------------------------------
    this.toggleSnd = function(snd)
    {
        if (snd) {
            this.scene["sound_text"].text = " SND ON";
        } else {
            this.scene["sound_text"].text = "SND OFF";
        }
    };
//-----------------------------------------------------------------------------	
	this.init = function(externalContainer, ranViewCallbacks)
	{
        externalContainer.addChild(this.container);
		var currentPocket;
		var currentButton;
		var i;

        windowHelp.setupContainer(this.scene["help_window_container"]);
        windowHelp.init(this);
        windowHelp.setVisible(false);

        windowFinal.setupContainer(this.scene["final_window_container"]);
        windowFinal.init(this, ranViewCallbacks.restartCallback);
        windowFinal.setVisible(false);

        windowLose.setupContainer(this.scene["lose_window_container"]);
        windowLose.init(this, ranViewCallbacks.restartCallback);
        windowLose.setVisible(false);

        var screenBlocker = this.scene["screen_blocker"];
        screenBlocker.interactive = true;
        screenBlocker.on('pointerdown', () => { });
        screenBlocker.visible = false;

        var resetButton = this.scene["reset"];
        resetButton.interactive = true;
        resetButton.buttonMode = true;
        resetButton.on('pointerdown', restart);

        function restart() {
            ranViewCallbacks.restartCallback();
        }

        var helpButton = this.scene["help"];
        helpButton.interactive = true;
        helpButton.buttonMode = true;
        helpButton.on('pointerdown', doShowHelp);

        function doShowHelp()
        {
            windowHelp.setVisible(true);
        }

        var toggleSndButton = this.scene["sound"];
        toggleSndButton.interactive = true;
        toggleSndButton.buttonMode = true;
        toggleSndButton.on('pointerdown', toggleSnd);

        function toggleSnd() {
            ranViewCallbacks.toggleSndCallback(this);
        }

		for (i=1; i<=5; i++)
		{
			currentPocket = this.scene["pocket"+i];

			currentPocket.interactive = true;
			currentPocket.buttonMode = true;		
			currentPocket.on('pointerdown', onPocketClick);
            currentPocket.viewContext = this;
			currentPocket.pocketId = i;
			
			function onPocketClick () 
			{
                this.viewContext.scene["screen_blocker"].visible = true;
                var currentPocket = this.viewContext.scene["pocket"+this.pocketId];
                ranViewCallbacks.playSndCallback.call(this, ranSndConsts.INSERT_SND);

                ranAnimation.insertCard(currentPocket, targetFieldCell, () => {
                    this.viewContext.scene["screen_blocker"].visible = false;
                    ranViewCallbacks.pocketCallback.call(this, this.pocketId);
            })
			}			
		}
		
		for (i=1; i<=5; i++)
		{
			currentButton = this.scene["btn_change_"+i];
			
			currentButton.interactive = true;
			currentButton.buttonMode = true;		
			currentButton.on('pointerdown', onChangeClick);
			currentButton.viewContext = this;
			currentButton.pocketId = i;
			
			function onChangeClick()
			{
                this.viewContext.scene["screen_blocker"].visible = true;
                var currentPocket = this.viewContext.scene["pocket"+this.pocketId];
                ranViewCallbacks.playSndCallback.call(this, ranSndConsts.REMOVE_SND);

                ranAnimation.changePocket(currentPocket, () => {
                    this.viewContext.scene["screen_blocker"].visible = false;
                	ranViewCallbacks.changeCallback.call(this, this.pocketId);
            	});
			}			
		}		
		
		for (i=1; i<=5; i++)
		{
			currentButton = this.scene["btn_rotate_"+i];
			
			currentButton.interactive = true;
			currentButton.buttonMode = true;		
			currentButton.on('pointerdown', onRotationClick);
			currentButton.viewContext = this;
			currentButton.pocketId = i;
			
			function onRotationClick()
			{
                this.viewContext.scene["screen_blocker"].visible = true;
                var currentPocket = this.viewContext.scene["pocket"+this.pocketId];
                ranViewCallbacks.playSndCallback.call(this, ranSndConsts.FLIP_SND);

                ranAnimation.rotatePocket(currentPocket, currentPocket.rotation, currentPocket.rotation+toRadians(90), () => {
                    this.viewContext.scene["screen_blocker"].visible = false;
                    ranViewCallbacks.rotateCallback.call(this, this.pocketId);
                });
			}			
		}		
	};
//-----------------------------------------------------------------------------
	function finalStateCheck(view, renderData)
	{
        windowFinal.update(renderData, view);
        windowLose.update(renderData, view);
        view.scene["final_animation"].visible = renderData.showWin;

        view.scene["reset"].visible = !renderData.showWin;
        view.scene["reset_text"].visible = !renderData.showWin;

        view.scene["help"].visible = !renderData.showWin;
        view.scene["help_text"].visible = !renderData.showWin;

        view.scene["sound"].visible = !renderData.showWin;
        view.scene["sound_text"].visible = !renderData.showWin;

        view.scene["star1"].visible = !renderData.showWin;
        view.scene["star2"].visible = !renderData.showWin;

        view.scene["starText"].visible = !renderData.showWin;
        view.scene["bgpart2"].visible = !renderData.showWin;

        view.scene["screen_blocker"].visible = renderData.showWin;
	}
//-----------------------------------------------------------------------------
	this.renderTable = function(renderData)
	{
        finalStateCheck(this, renderData);
		this.updateTable(renderData);
		this.updatePocket(renderData);
		this.updateRotate(renderData);
		this.updateStars(renderData);
	};

	this.update = function(delta)
	{
        ranAnimation.update(delta);
	}
};

module.exports = RanView;