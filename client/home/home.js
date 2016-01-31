Template.home.helpers({
	allItems: function () {
		return _.values(Items);
	}
});

<<<<<<< HEAD
	Template.home.onRendered(function(){
		var canvas = document.getElementById("canvas");
		var stage = new createjs.Stage(canvas);

		

		stage.update();
	});
=======
Template.home.onRendered(function () {
	var stage = new createjs.Stage('canvas');

	_.each(_.keys(Items), function (item) {

		let color = 'red';
		if (item === 'present') {
			color = 'blue';
		} else if (item === 'future') {
			color = 'green';
		}

		_.each(Items[item], function (i) {
			let shape = new createjs.Shape();
			shape.graphics.beginFill(color).drawRect(i.pos.x, i.pos.y, 15, 15); //TODO change for images
			stage.addChild(shape);
		});

	});

	createjs.Ticker.setFPS(30); //TODO 60 ?
	createjs.Ticker.addEventListener("tick", stage);
});
>>>>>>> refs/remotes/origin/master
