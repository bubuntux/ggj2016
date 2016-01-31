"use strict";
Meteor.startup(function () {
	Players.remove({});
	Artifacts.remove({});

	let artifacts = [
		///Past
		{name: 'clock', context: Contexts[0], x: 12, y: 20},
		{name: 'chest', context: Contexts[0], x: 34, y: 40},
		{name: 'baggage', context: Contexts[0], x: 68, y: 60},

		///Present
		{name: 'books', context: Contexts[1], x: 72, y: 20},
		{name: 'tv', context: Contexts[1], x: 88, y: 40},
		{name: 'cd', context: Contexts[1], x: 94, y: 60},

		///Future
		{name: 'gloves', context: Contexts[2], x: 102, y: 20},
		{name: 'bottle', context: Contexts[2], x: 124, y: 40},
		{name: 'backpack', context: Contexts[2], x: 138, y: 60}
	];

	_.each(artifacts, function (artifact) {
		artifact.defX = _.clone(artifact.x);
		artifact.defY = _.clone(artifact.y);
		Artifacts.insert(artifact);
	});
});