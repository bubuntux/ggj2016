Template.home.helpers({
	allItems: function () {
		return _.values(Items);
	}
});

Template.home.onRendered(function () {
	var canvas = document.getElementById("canvas");

	var stage = new createjs.Stage(canvas);

	var text = new createjs.Text("Hello World!", "36px Arial", "#777");
	text.textAlign = "center";

	stage.addChild(text);

	text.x = canvas.width / 2;
	text.y = 180;

	stage.update();
});