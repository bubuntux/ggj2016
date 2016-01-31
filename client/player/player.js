"use strict";
Template.player.onRendered(function () {
	createjs.Ticker.setFPS(60);

	let stage = new createjs.Stage('canvas');
	createjs.Touch.enable(stage);
	createjs.Ticker.addEventListener("tick", stage);

	let drop = new createjs.Shape();
	drop.graphics.beginFill('brown').drawRect(200, 200, 50, 50);
	stage.addChild(drop);

	let items = this.data.items;
	let time = items.name;
	let color = 'red'; //TODO remove later or something..
	if (time === 'present') {
		color = 'blue';
	} else if (time === 'future') {
		color = 'green';
	}

	_.each(items.arr, function (item) {
		let shape = new createjs.Shape();
		shape.x = item.pos.x;
		shape.y = item.pos.y;
		shape.graphics.beginFill(color).drawRect(0, 0, 15, 15); //TODO change for images
		//shape.cache(-20, -20, 40, 40);
		stage.addChild(shape);
		shape.on("pressmove", function (evt) {
			evt.target.x = evt.stageX;
			evt.target.y = evt.stageY;
			item.pos.x = evt.stageX;
			item.pos.y = evt.stageY;
			Meteor.call('move', items);
		});
		shape.on("pressup", function (evt) {
			if (stage.getObjectsUnderPoint(evt.stageX, evt.stageY).length >= 2) {
				alert('Wow'); //TODO
			} else {
				shape.x = item.defPos.x;
				shape.y = item.defPos.y;
				item.pos.x = item.defPos.x;
				item.pos.y = item.defPos.y;
				Meteor.call('move', items);
			}
		});
	});
});
