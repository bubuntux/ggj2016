"use strict";
Template.player.helpers({
	myObjects: function () {
		let player = _.find(this.players, function (player) {
			return player.id === Meteor.userId();
		});

		return player.objects;
	}
});