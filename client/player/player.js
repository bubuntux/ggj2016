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

	let player = this.data.player;

	this.data.artifacts.forEach(function (artifact) {
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true; 
var bitmap;
		//var container = new createjs.Container();
		//stage.addChild(container);

		//	let shape = new createjs.Shape();
		//	shape.x = i.pos.x;
		//	shape.y = i.pos.y;
		
					var image = new Image();
						image.src = "/image/"+ artifact.context +"/"+artifact.name+".png";
		//image.src = "/image/daisy.png";
//		image.onload = handleImageLoad;

			bitmap = new createjs.Bitmap(image);
			bitmap.x = artifact.x;
			bitmap.y = artifact.y;
			//container.addChild(bitmap);
			bitmap.regX = bitmap.image.width / 5;
			bitmap.regY = bitmap.image.height / 5;
			bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.1;
			
			bitmap.cursor = "pointer";

		//shape.cache(0, 0, 15, 15); //TODO adjust with image

		bitmap.on("pressmove", function (evt) {
			artifact.x = evt.stageX;
			artifact.y = evt.stageY;
			Meteor.call('moveArtifact', artifact);
			evt.target.x = evt.stageX;
			evt.target.y = evt.stageY;
			stage.update();
			if (player.selected) {
				var child = stage.getChildByName(player.selected.name);
				player.selected.x = player.selected.defX;
				player.selected.y = player.selected.defY;
				Meteor.call('moveArtifact', player.selected);
				child.x = player.selected.defX;
				child.y = player.selected.defY;
				Meteor.call('deselectArtifact');
				delete player.selected;
				stage.update();
			}
		});
		bitmap.on("pressup", function (evt) {
			if (stage.getObjectsUnderPoint(evt.stageX, evt.stageY).length >= 2) {
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


			bitmap.on("rollover", function (evt) {
				this.scaleX = this.scaleY = this.scale * 1.2;
			});

			bitmap.on("rollout", function (evt) {
					this.scaleX = this.scaleY = this.scale;
			});

					stage.addChild(bitmap);
		stage.update();
	});
});
