"use strict";
Template.home.onRendered(function () {
	createjs.Ticker.setFPS(60); //TODO 60 ?

	let stages = {};
	stages['present'] = new createjs.Stage('present');
	stages['past'] = new createjs.Stage('past');
	stages['future'] = new createjs.Stage('future');

	_.each(_.values(stages), function (stage) {
		createjs.Touch.enable(stage);
		createjs.Ticker.addEventListener("tick", stage);
	});

	this.data.observe({
		added: function (player) {
			let time = player.items.name;

			let color = 'red'; //TODO remove later or something..
			if (time === 'present') {
				color = 'blue';
			} else if (time === 'future') {
				color = 'green';
			}
			_.each(player.items.arr, function (item) {
				let shape = new createjs.Shape();
				shape.name = item.name;
				shape.x = item.pos.x;
				shape.y = item.pos.y;
				shape.graphics.beginFill(color).drawRect(0, 0, 15, 15); //TODO change for images
				stages[time].addChild(shape);
			});
		},
		removed: function (player) {
			stages[player.items.name].removeAllChildren();
		},
		changed: function (newPlayer) {
			let time = newPlayer.items.name;
			let stage = stages[time];
			_.forEach(newPlayer.items.arr, function (item) {
				var shape = stage.getChildByName(item.name);
				shape.x = item.pos.x;
				shape.y = item.pos.y;
			});

		}
	});

});