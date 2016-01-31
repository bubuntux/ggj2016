"use strict";
Template.player.onRendered(function () {
	createjs.Ticker.setFPS(30); //TODO 60 ?

	let stage = new createjs.Stage('canvas');
	createjs.Touch.enable(stage);
	createjs.Ticker.addEventListener("tick", stage);

	let drop = new createjs.Shape();
	drop.graphics.beginFill('brown').drawRect(200, 200, 50, 50);
	stage.addChild(drop);

	let time = this.data.items.name;
	let color = 'red'; //TODO remove later or something..
	if (time === 'present') {
		color = 'blue';
	} else if (time === 'future') {
		color = 'green';
	}

	_.each(this.data.items.arr, function (item) {
		let shape = new createjs.Shape();
		shape.x = item.pos.x;
		shape.y = item.pos.y;
		shape.graphics.beginFill(color).drawRect(0, 0, 15, 15); //TODO change for images
		stage.addChild(shape);
		shape.on("pressmove", function (evt) {
			evt.target.x = evt.stageX;
			evt.target.y = evt.stageY;
			//TODO send update
		});
		shape.on("pressup", function (evt) {
			if (stage.getObjectsUnderPoint(evt.stageX, evt.stageY).length >= 2) {
				alert('Wow'); //TODO
			} else {
				shape.x = item.pos.x;
				shape.y = item.pos.y;
			}
		});
	});
});
