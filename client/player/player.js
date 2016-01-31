"use strict";
Template.player.onRendered(function () {
	let stage = new createjs.Stage('canvas');
	createjs.Touch.enable(stage);

	let drop = new createjs.Shape();
	drop.graphics.beginFill('brown').drawRect(200, 200, 50, 50);
	stage.addChild(drop);
	stage.update();

	let context = this.data.player.context;
	let color = 'red'; //TODO remove later or something..
	if (context === 'present') {
		color = 'blue';
	} else if (context === 'future') {
		color = 'green';
	}

	this.data.artifacts.forEach(function (artifact) {
		let shape = new createjs.Shape();
		shape.x = artifact.x;
		shape.y = artifact.y;
		shape.graphics.beginFill(color).drawRect(0, 0, 15, 15); //TODO change for images
		shape.cache(0, 0, 15, 15); //TODO adjust with image
		stage.addChild(shape);
		stage.update();
		shape.on("pressmove", function (evt) {
			evt.target.x = evt.stageX;
			evt.target.y = evt.stageY;
			artifact.x = evt.stageX;
			artifact.y = evt.stageY;
			stage.update();
			Meteor.call('move', artifact);
		});
		shape.on("pressup", function (evt) {
			if (stage.getObjectsUnderPoint(evt.stageX, evt.stageY).length >= 2) {
				alert('Wow'); //TODO
			} else {
				shape.x = artifact.defX;
				shape.y = artifact.defY;
				artifact.x = artifact.defX;
				artifact.y = artifact.defY;
				stage.update();
				Meteor.call('move', artifact);
			}
		});
	});
});
