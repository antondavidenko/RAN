var doChangePocket = function (gameModel,pocketId)
{
	var card = {};
	card.id = gameModel.deck.drawCard();
	card.rotateId = 0;
	card.rotate = gameModel.tilesInfo[Number(card.id.substr(4,5))].rotate;
	card.tile = gameModel.tilesInfo[Number(card.id.substr(4,5))].tile;
	gameModel.pockets[pocketId-1] = card;
};

module.exports = doChangePocket;