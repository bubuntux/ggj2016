"use strict";
Template.player.onRendered(function () {
	let player = this.data.player;
	$('#canvas').css('background-image', 'url(/image/' + player.context + '.jpg)');

	let stage = new createjs.Stage('canvas');
	createjs.Touch.enable(stage);

	createjs.Ticker.setFPS(1); //TODO remove
	createjs.Ticker.addEventListener("tick", stage); //TODO remove

	var preload = new createjs.LoadQueue();
	preload.addEventListener('fileload', function (s) {
		if (s.item.id === 'drop') {
			let cofre = new createjs.Bitmap(s.item.src);
			cofre.name = 'drop';
			cofre.x = 250;
			cofre.y = 200;
			stage.addChild(cofre);
			stage.update();
			return;
		}

		let artifact = s.item.id;
		let bitmap = new createjs.Bitmap(s.item.src);
		bitmap.name = artifact.name;
		bitmap.x = artifact.x;
		bitmap.y = artifact.y;
		bitmap.regX = 20;
		bitmap.regY = 20;
		//bitmap.cache(-bitmap.regX, -bitmap.regY, bitmap.regX, bitmap.regY);

		stage.addChild(bitmap);
		stage.update();

		bitmap.on("pressmove", function (evt) {
			artifact.x = evt.stageX;
			artifact.y = evt.stageY;
			Meteor.call('moveArtifact', artifact);
			evt.target.x = evt.stageX;
			evt.target.y = evt.stageY;
			stage.update();
			if (player.selected) {
				player.selected.x = player.selected.defX;
				player.selected.y = player.selected.defY;
				Meteor.call('moveArtifact', player.selected);
				var child = stage.getChildByName(player.selected.name);
				child.x = player.selected.defX;
				child.y = player.selected.defY;
				stage.update();
				Meteor.call('deselectArtifact');
				delete player.selected;
			}
		});
		bitmap.on("pressup", function (evt) {
			if (_.find(stage.getObjectsUnderPoint(evt.stageX, evt.stageY), function (child) {
					return child.name === 'drop';
				})) {
				Meteor.call('selectArtifact', artifact);
				player.selected = artifact;
			} else {
				bitmap.x = artifact.defX;
				bitmap.y = artifact.defY;
				artifact.x = artifact.defX;
				artifact.y = artifact.defY;
				stage.update();
				Meteor.call('moveArtifact', artifact);
			}
		});

	});

	preload.loadFile({id: 'drop', src: "/image/cofre.png"});

	this.data.artifacts.forEach(function (artifact) {
		stage.enableMouseOver(1);
		stage.mouseMoveOutside = true;

		preload.loadFile({id: artifact, src: "/image/" + artifact.context + "/" + artifact.name + ".png"});
	});
});
