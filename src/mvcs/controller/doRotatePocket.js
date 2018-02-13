var doRotatePocket = function (gameModel,pocketId)
{
    gameModel.pockets[pocketId-1].rotateId++;
	gameModel.pockets[pocketId-1].rotateId = (gameModel.pockets[pocketId-1].rotateId == 4)?0:gameModel.pockets[pocketId-1].rotateId;
	gameModel.pockets[pocketId-1].tile[0]++;
	gameModel.pockets[pocketId-1].tile[0] = (gameModel.pockets[pocketId-1].tile[0] == 5)?1:gameModel.pockets[pocketId-1].tile[0];
	gameModel.pockets[pocketId-1].tile[1]++;
	gameModel.pockets[pocketId-1].tile[1] = (gameModel.pockets[pocketId-1].tile[1] == 5)?1:gameModel.pockets[pocketId-1].tile[1];
};

module.exports = doRotatePocket;