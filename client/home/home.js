"use strict";
function addWaitingForPlayerText(stage) {
	var text = new createjs.Text("Waiting for a player", "24px Arial", "#000");
	text.name = 'text';
	text.textAlign = "center";
	text.x = (stage.canvas.width / 2);
	text.y = (stage.canvas.height / 2) - 50;
	stage.addChild(text);
}
Template.home.onRendered(function () {
	let stages = {};
	_.each(Contexts, function (context) {
		let stage = new createjs.Stage(context);
		stages[context] = stage;
		addWaitingForPlayerText(stage);
		stage.update();
	});

	this.data.artifacts.observe({
		changed: function (artifact) {
			let stage = stages[artifact.context];
			let child = stage.getChildByName(artifact.name);
			child.x = artifact.x;
			child.y = artifact.y;
			stage.update();
		}
	});

	let self = this; //TODO stupid js (change for ecma5)
	this.data.players.observe({
		added: function (player) {
			let stage = stages[player.context];
			var text = new createjs.Text(player.name, "24px Arial", "#000");
			text.textAlign = "center";
			stage.addChild(text);
			text.x = (stage.canvas.width / 2) - 25;

			var oldText = stage.getChildByName('text');
			if (oldText) {
				stage.removeChild(oldText);
			}

			self.data.artifacts.forEach(function (artifact) {
				if (artifact.context != player.context) {
					return;
				}
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
				shape.cache(0, 0, 15, 15); //TODO adjust with image
				let stage = stages[artifact.context];
				stage.addChild(shape);
			});

			stage.update();
		},
		removed: function (player) {
			let stage = stages[player.context];
			stage.removeAllChildren();
			addWaitingForPlayerText(stage);
			stage.update();
		}
	});

});