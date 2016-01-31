"use strict";
Meteor.methods({
	move: function (artifact) {
		Artifacts.update({name: artifact.name}, {$set: {x: artifact.x, y: artifact.y}});
	}
});