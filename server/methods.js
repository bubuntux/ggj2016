"use strict";
Meteor.methods({
	createPlayer: function (player) {
		Players.upsert({userId: player.userId}, player);
	},
	move: function (artifact) {
		Artifacts.update({name: artifact.name}, {$set: {x: artifact.x, y: artifact.y}});
	}
});