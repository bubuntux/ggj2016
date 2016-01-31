"use strict";
Meteor.methods({
	createPlayer: function (player) {
		Players.upsert({userId: player.userId}, player);
	},
	moveArtifact: function (artifact) {
		Artifacts.update({name: artifact.name}, {$set: {x: artifact.x, y: artifact.y}});
	},
	selectArtifact: function (artifact) {
		Players.update({userId: Meteor.userId()}, {$set: {selected: artifact}});
	},
	deselectArtifact: function () {
		Players.update({userId: Meteor.userId()}, {$unset: {selected: true}});
	}
});