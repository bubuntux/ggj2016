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

	let artifacts = this.data.artifacts;
	artifacts.observe({
		changed: function (artifact) {
			let stage = stages[artifact.context];
			let child = stage.getChildByName(artifact.name);
			child.x = artifact.x;
			child.y = artifact.y;
			stage.update();
		}
	});

	let selectedArtifactsByPlayer = {};

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

			var preload = new createjs.LoadQueue();
			preload.addEventListener('fileload', function (s) {
				let artifact = s.item.id;

				let bitmap = new createjs.Bitmap(s.item.src);
				bitmap.name = artifact.name;
				bitmap.x = artifact.x;
				bitmap.y = artifact.y;

				bitmap.regX = 20;
				bitmap.regY = 20;
				//bitmap.cache(-bitmap.regX, -bitmap.regY, bitmap.regX, bitmap.regY);

				let stage = stages[artifact.context];
				stage.addChild(bitmap);
				stage.update();
			});
			artifacts.forEach(function (artifact) {
				if (artifact.context != player.context) {
					return;
				}
				preload.loadFile({id: artifact, src: "/image/" + artifact.context + "/" + artifact.name + ".png"});
			});
			stage.update();
		},
		removed: function (player) {
			let stage = stages[player.context];
			stage.removeAllChildren();
			addWaitingForPlayerText(stage);
			stage.update();
		},
		changed: function (player) {
			selectedArtifactsByPlayer[player.userId] = player.selected;
			let selectedArtifacts = _.values(selectedArtifactsByPlayer);
			if (selectedArtifacts.length >= 3 && _.every(selectedArtifacts, function (artifact) {
					return !!artifact;
				})) {
				if (_.every(selectedArtifacts, function (artifact) {
						return artifact.required;
					})) {
					alert('Won');
				} else {
					alert('lose');
				}
			}
		}
	});

});