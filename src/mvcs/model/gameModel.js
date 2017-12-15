var GameModel = function()
{
	this.tableData = [];
	this.pockets = [];
	this.showWin = false;

	this.tilesInfo = [];
	this.currentMarker = {}
	this.currentStep = 0;
	this.tileTube = 0;
	this.tileFireman = 0;
	this.requireJoin = 4;
	
	this.baseDeckCount = 92-5; // five cards player earn on game begins
	this.bonus1starsCount = 5;
	this.bonus2starsCount = 5+5;
	
	this.deck = new DeckModel();
	
	this.getTable = function()
	{
		var res = this.tableData ;
		if (this.currentMarker.x!= -100)
		{
			res[this.currentMarker.y][this.currentMarker.x] = 100;
		}
		return res;
	}
	
	this.setupGame = function()
	{
		this.tableData[0] = [0, 0, 0, 0, 0];
		this.tableData[1] = [0, 0, 0, 0, 0];
		this.tableData[2] = [-1,0, 0, 0,-1];
		this.currentMarker.x = 1;
		this.currentMarker.y = 2;
		this.currentStep=0;
        this.tileTube = 0;
        this.tileFireman = 0;

		var card;
		
		this.deck.resetDeck();
		for (i=1; i<=5; i++)
		{
			new doChangePocket(this, i, false);
		}

        this.showWin = false;
	}
	
	getStarCount = () =>
	{
		var res = this.deck.getDeckCount() - this.baseDeckCount + this.bonus1starsCount + this.currentStep;
		if (res<=0) 
		{
			res = this.deck.getDeckCount() - this.baseDeckCount + this.bonus2starsCount + this.currentStep;
			res = (res<=0)?" ":res;
		}
		return res;
	}
	
	getStarsToShow = () =>
	{
		var res = 2;
		var tmp = this.deck.getDeckCount() - this.baseDeckCount + this.bonus1starsCount + this.currentStep;
		if (tmp<=0) 
		{
			tmp = this.deck.getDeckCount() - this.baseDeckCount + this.bonus2starsCount + this.currentStep;
			res = (tmp<=0)?0:1;
		}

        res = (this.currentStep >= 13)?res+1:res;

        return res;
	}		
	
	this.getViewData = function()
	{
		res = {}
		res.showWin = this.showWin;
		res.pockets = this.pockets;
		res.table = this.getTable();
		res.requireJoin = this.requireJoin;
		res.starCount = getStarCount();
		res.starsToShow = getStarsToShow();
        res.tileTube = this.tileTube;
        res.tileFireman = this.tileFireman;

		return res;
	}	
}