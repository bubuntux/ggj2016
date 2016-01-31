"use strict";
Meteor.methods({
	createPlayer: function (player) {
		Players.upsert({userId: player.userId}, player);
	}
});