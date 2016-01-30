Meteor.methods({
	add: function (game, player) {
		Games.update({id: game.id}, {$push: {players: player}, $pullAll: {objects: player.objects}});
	}
});