Meteor.publish("players", function () {
	let userId = this._session.userId;
	this._session.socket.on("close", Meteor.bindEnvironment(function () {
		Players.remove({id: userId});
	}));
	return Players.find({});
});