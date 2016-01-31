Template.home.onRendered(function () {
	createjs.Ticker.setFPS(30); //TODO 60 ?

	_.each(this.data, function (player) {
		let time = player.items.name;
		let stage = new createjs.Stage(time);
		createjs.Touch.enable(stage);
		createjs.Ticker.addEventListener("tick", stage);
		let color = 'red'; //TODO remove later or something..
		if (time === 'present') {
			color = 'blue';
		} else if (time === 'future') {
			color = 'green';
		}
		_.each(player.items.arr, function (item) {
			let shape = new createjs.Shape();
			shape.x = item.pos.x;
			shape.y = item.pos.y;
			shape.graphics.beginFill(color).drawRect(0, 0, 15, 15); //TODO change for images
			stage.addChild(shape);
		});
	});

});