Meteor.methods({
	createPlayer: function (player) {
		Players.upsert({id: player.id}, player);
	}
});