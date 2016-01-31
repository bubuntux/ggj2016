"use strict";
Template.player.onRendered(function () {
	let stage = new createjs.Stage('canvas');
	createjs.Touch.enable(stage);

	createjs.Ticker.setFPS(1); //TODO remove
	createjs.Ticker.addEventListener("tick", stage); //TODO remove

	let drop = new createjs.Shape();
	drop.graphics.beginFill('brown').drawRect(200, 200, 50, 50);
	stage.addChild(drop);
	stage.update();

	let player = this.data.player;

	var preload = new createjs.LoadQueue();
	preload.addEventListener('fileload', function (s) {
		let artifact = s.item.id;
		let bitmap = new createjs.Bitmap(s.item.src);
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
			/*if (player.selected) {
				player.selected.x = player.selected.defX;
				player.selected.y = player.selected.defY;
				Meteor.call('moveArtifact', player.selected);
				var child = stage.getChildByName(player.selected.name); //TODO wtf??
				child.x = player.selected.defX;
				child.y = player.selected.defY;
				stage.update();
				Meteor.call('deselectArtifact');
				delete player.selected;
			}*/
		});
		bitmap.on("pressup", function (evt) {
			if (stage.getObjectsUnderPoint(evt.stageX, evt.stageY).length >= 2) {
			/*	Meteor.call('selectArtifact', artifact);
				player.selected = artifact;*/
			} else {
				bitmap.x = artifact.defX;
				bitmap.y = artifact.defY;
				artifact.x = artifact.defX;
				artifact.y = artifact.defY;
				stage.update();
				Meteor.call('moveArtifact', artifact);
			}
		});

		/*bitmap.on("rollover", function (evt) {
		 this.scaleX = this.scaleY = this.scale * 1.2;
		 stage.update();
		 });

		 bitmap.on("rollout", function (evt) {
		 this.scaleX = this.scaleY = this.scale / 1.2;
		 stage.update();
		 });*/

	});
	this.data.artifacts.forEach(function (artifact) {
		stage.enableMouseOver(1);
		stage.mouseMoveOutside = true;

		preload.loadFile({id: artifact, src: "/image/" + artifact.context + "/" + artifact.name + ".png"});
	});
});
