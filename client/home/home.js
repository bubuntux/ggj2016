"use strict";
Template.home.onRendered(function () {
	createjs.Ticker.setFPS(60); //TODO remove

	let stages = {};
	_.each(Contexts, function (context) {
		let stage = new createjs.Stage(context);
		stages[context] = stage;
		createjs.Touch.enable(stage);
		createjs.Ticker.addEventListener("tick", stage); //TODO remove
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
			stages[artifact.context].addChild(shape);
		},
		removed: function (artifact) {
			stages[artifact.context].removeAllChildren();
		},
		changed: function (artifact) {
			let child = stages[artifact.context].getChildByName(artifact.name);
			child.x = artifact.x;
			child.y = artifact.y;
		}
	});

});