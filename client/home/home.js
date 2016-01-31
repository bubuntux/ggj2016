Template.home.helpers({
	allItems: function () {
		return _.values(Items);
	}
});

Template.home.onRendered(function () {

	/*//TODO only for players?
	let drop = new createjs.Shape();
	drop.graphics.beginFill('white').drawRect(400, 600, 50, 50);
	stage.addChild(drop);
	//TODO only for players?
*/

	createjs.Ticker.setFPS(30); //TODO 60 ?

	_.each(_.keys(Items), function (item) {
		var stage = new createjs.Stage(item);

		let color = 'red'; //TODO remove later or something..
		if (item === 'present') {
			color = 'blue';
		} else if (item === 'future') {
			color = 'green';
		}

		_.each(Items[item], function (i) {
			let shape = new createjs.Shape();
			shape.x = i.pos.x;
			shape.y = i.pos.y;
			shape.graphics.beginFill(color).drawRect(0, 0, 15, 15); //TODO change for images
			stage.addChild(shape);
			shape.on("pressmove", function (evt) {
				evt.target.x = evt.stageX;
				evt.target.y = evt.stageY;
			});
			shape.on("pressup", function (evt) {
				if (stage.getObjectsUnderPoint(evt.stageX, evt.stageY).length >= 2) {
					alert('Wow'); //TODO
				} else {
					shape.x = i.pos.x;
					shape.y = i.pos.y;
				}
			});
		});

		createjs.Touch.enable(stage);
		createjs.Ticker.addEventListener("tick", stage);
	});

});