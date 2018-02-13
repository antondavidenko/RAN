var DeckModel = function()
{
	this.deck = [];

	this.drawCard = function()
	{
		var res;
	
		var randomId = this.getRandomId();
		res = this.deck[randomId];
		this.deck.splice(randomId, 1);
		return res;
	}
	
	this.getRandomId = function()
	{
		return (Math.floor(Math.random() * this.deck.length));
	}

	this.resetDeck = function()
	{
		this.deck = [];

		var i,j;
		for (i=0; i<=91; i++) 
		{
			this.deck.push("card"+i);
		}
	}
	
	this.getDeckCount = () =>
	{
		return this.deck.length;
	}
};

module.exports = DeckModel;