"use strict";
Template.home.onRendered(function () {
	let stages = {};
	_.each(Contexts, function (context) {
		let stage = new createjs.Stage(context);
		stages[context] = stage;
		createjs.Touch.enable(stage);
	});

	this.data.artifacts.observe({
		added: function (artifact) {
			let color = 'red'; //TODO remove ( when adding images )
			if (artifact.context === 'present') {
				color = 'blue';
			} else if (artifact.context === 'future') {
				color = 'green';
			}
			let shape = new createjs.Shape(); //TODO change for images
			shape.name = artifact.name;
			shape.x = artifact.x;
			shape.y = artifact.y;
			shape.graphics.beginFill(color).drawRect(0, 0, 15, 15);
			let stage = stages[artifact.context];
			stage.addChild(shape);
			stage.update();
		},
		removed: function (artifact) {
			let stage = stages[artifact.context];
			stage.removeAllChildren();
			stage.update();
		},
		changed: function (artifact) {
			let stage = stages[artifact.context];
			let child = stage.getChildByName(artifact.name);
			child.x = artifact.x;
			child.y = artifact.y;
			stage.update();
		}
	});

});