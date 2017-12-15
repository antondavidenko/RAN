var RanView = function()
{
    var windowFinal = new WindowFinal();
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
					if (renderData.table[j][i].rotateId)
					{
						this.scene["table"+(j+1)+""+(i+1)].rotation = toRadians(90)*(renderData.table[j][i].rotateId);
					}
				}
			}
		}
	}
	
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
	}
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
	}
	
	function toRadians (angle) {
		return angle * (Math.PI / 180);
	}
//-----------------------------------------------------------------------------
	this.updateRotate = function(renderData)
	{
		var currentPocket;		
		
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
	}	
//-----------------------------------------------------------------------------
	this.updateStars = function(renderData)
	{
		this.scene["starText"].text = renderData.starCount;
	
		if (renderData.starsToShow == 2) {
			this.scene["star1"].texture = this.textures["star"];
			this.scene["star2"].texture = this.textures["star"];			
		} else if (renderData.starsToShow == 1) {
			this.scene["star1"].texture = this.textures["star"];
			this.scene["star2"].texture = this.textures["star_empty"];			
		} else {
			this.scene["star1"].texture = this.textures["star_empty"];
			this.scene["star2"].texture = this.textures["star_empty"];			
		}  
	}	
//-----------------------------------------------------------------------------	
	this.init = function(externalContainer, ranViewCallbacks)
	{
        externalContainer.addChild(this.container);
		var currentPocket;
		var currentButton;

        windowFinal.setupContainer(this.scene["final_window_container"]);
        windowFinal.setVisible(false);

		for (i=1; i<=5; i++)
		{
			currentPocket = this.scene["pocket"+i];

			currentPocket.interactive = true;
			currentPocket.buttonMode = true;		
			currentPocket.on('pointerdown', onPocketClick);
			currentPocket.pocketId = i;
			
			function onPocketClick () 
			{
                ranViewCallbacks.pocketCallback.call(this, this.pocketId);
			}			
		}
		
		for (i=1; i<=5; i++)
		{
			currentButton = this.scene["btn_change_"+i];
			
			currentButton.interactive = true;
			currentButton.buttonMode = true;		
			currentButton.on('pointerdown', onButtonClick);
			currentButton.viewContext = this;
			currentButton.pocketId = i;
			
			function onButtonClick () 
			{
                ranViewCallbacks.changeCallback.call(this, this.pocketId);
			}			
		}		
		
		for (i=1; i<=5; i++)
		{
			currentButton = this.scene["btn_rotate_"+i];
			
			currentButton.interactive = true;
			currentButton.buttonMode = true;		
			currentButton.on('pointerdown', onButtonClick);
			currentButton.viewContext = this;
			currentButton.pocketId = i;
			
			function onButtonClick () 
			{
                ranViewCallbacks.rotateCallback.call(this, this.pocketId);
			}			
		}		
	}
//-----------------------------------------------------------------------------
	function finalStateCheck(view, renderData)
	{
        windowFinal.update(renderData, view);
        view.scene["final_animation"].visible = renderData.showWin;

        view.scene["reset"].visible = !renderData.showWin;
        view.scene["reset_text"].visible = !renderData.showWin;

        view.scene["help"].visible = !renderData.showWin;
        view.scene["help_text"].visible = !renderData.showWin;

        view.scene["star1"].visible = !renderData.showWin;
        view.scene["star2"].visible = !renderData.showWin;

        view.scene["starText"].visible = !renderData.showWin;
        view.scene["bgpart2"].visible = !renderData.showWin;
	}
//-----------------------------------------------------------------------------
	this.renderTable = function(renderData)
	{
        finalStateCheck(this, renderData)
		this.updateTable(renderData);
		this.updatePocket(renderData);
		this.updateRotate(renderData);
		this.updateStars(renderData);
	}
}