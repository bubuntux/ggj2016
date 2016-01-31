"use strict";
Meteor.publish("players", function () {
	let userId = this._session.userId;
	this._session.socket.on("close", Meteor.bindEnvironment(function () {
		Players.remove({userId: userId});
	}));
	return Players.find({});
});

Meteor.publish("artifacts", function () {
	return Artifacts.find({});
});