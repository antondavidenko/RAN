var RanUtils = function()
{
	this.checkPointAvaliable = function(x,y)
	{
		res = false;
		if ((x=>0)&&(x<=4)&&(y>=0)&&(y<=2)) 
		{
			res = (gameModel.tableData[y][x] === 0);
		}
		return res;
	};

	this.defineNextCell = function(id)
	{
		var res = [];
		res.x = gameModel.currentMarker.x;
		res.y = gameModel.currentMarker.y;
		
		switch(id) 
		{
			case 1:
				res.y--;
				break;
			case 2:
				res.x++;
				break;
			case 3:
				res.y++;
				break;
			case 4:
				res.x--;
				break;
		}
		
		return res;
	};
	
	this.defineRequireJoin = function(id)
	{
		var res;
		switch(id) 
		{
			case 1: res = 3; break;
			case 2: res = 4; break;
			case 3: res = 1; break;
			case 4: res = 2; break;
		}
		return res;
	};
	
	this.defineDirection = function(tile)
	{
		return (tile[0]==gameModel.requireJoin)?tile[1]:tile[0];
	};
	
	this.isTileApplicable = function(tile)
	{
		var	res = ((tile[0] == gameModel.requireJoin)||(tile[1] == gameModel.requireJoin))?true:false;
		var direction;
		var nextCell;
		
		if (res) 
		{
			direction = this.defineDirection(tile);
			nextCell = this.defineNextCell(direction);
			res = ((nextCell.x==4)&&(nextCell.y==2)&&(direction==3))?true:this.checkPointAvaliable(nextCell.x, nextCell.y);
		}
		return res;
	};

	this.isAnyTileApplicable = function()
	{
		res = ((this.isTileApplicable([1,2]))
			 ||(this.isTileApplicable([1,3]))
			 ||(this.isTileApplicable([1,4]))
             ||(this.isTileApplicable([2,3]))
             ||(this.isTileApplicable([2,4]))
             ||(this.isTileApplicable([3,4]))
		);
		return res;
	};

	
	this.isTileRotatable = function(tileName)
	{
		var rotate = gameModel.tilesInfo[Number(tileName.substr(4,5))].rotate;
		return rotate;
	}	
};

//this.utils = new RanUtils();
module.exports = RanUtils;