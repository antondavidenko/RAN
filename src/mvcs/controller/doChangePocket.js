var doChangePocket = function (gameModel,pocketId, playSound)
{
	if (playSound) { $("#remove_snd").get(0).play(); }
	var card = {};
	card.id = gameModel.deck.drawCard();
	card.rotateId = 0;
	card.rotate = gameModel.tilesInfo[Number(card.id.substr(4,5))].rotate;
	card.tile = gameModel.tilesInfo[Number(card.id.substr(4,5))].tile;
	gameModel.pockets[pocketId-1] = card;
}