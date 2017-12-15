var doInsertCard = function (gameModel, pocketId)
{
    $("#insert_snd").get(0).play();
	if (gameModel.currentMarker.x!= -100)
	{
		gameModel.tableData[gameModel.currentMarker.y][gameModel.currentMarker.x] = gameModel.pockets[pocketId-1];

		var strId = gameModel.pockets[pocketId-1].id;
		var direction = utils.defineDirection(gameModel.pockets[pocketId-1].tile);
		gameModel.requireJoin = utils.defineRequireJoin(direction);
		
		var nextCell = utils.defineNextCell(direction);

        if ((nextCell.x===4)&&(nextCell.y===2)&&(direction===3)) {
            new doShowWin(gameModel);
        }

		if (utils.checkPointAvaliable(nextCell.x, nextCell.y))
		{
			gameModel.currentMarker.x = nextCell.x;
			gameModel.currentMarker.y = nextCell.y;
		} else {
			gameModel.currentMarker.x = -100;		
		}
		
		gameModel.currentStep++;
        if (gameModel.pockets[pocketId-1].rotate) {
            gameModel.tileTube++;
		} else {
            gameModel.tileFireman++;
		}

		new doChangePocket(gameModel,pocketId);
	}	
}