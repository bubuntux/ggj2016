"use strict";
Meteor.publish("players", function () {
	let userId = this._session.userId;
	this._session.socket.on("close", Meteor.bindEnvironment(function () {
		Players.remove({userId: userId}); //TODO working only when closing browser (also do this when logging out)
	}));
	return Players.find({});
});

Meteor.publish("artifacts", function () {
	return Artifacts.find({});
});