Meteor.publish("game", function () {
	let userId = this._session.userId;
	this._session.socket.on("close", Meteor.bindEnvironment(function () {
		let game = Games.findOne({id: 1});
		Games.update({id: 1}, {
			$set: {
				players: _.filter(game.players, function (player) {
					return player.id != userId;
				})
			}
		});
		///didn't work :(  Games.update({id: 1}, {$pull: {players: {$elemMatch: {id: userId}}}});
	}));
	return Games.find();
});