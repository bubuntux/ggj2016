Template.home.helpers({
	allItems: function () {
		return _.values(Items);
	}
});

	Template.home.onRendered(function(){
		var canvas = document.getElementById("canvas");
		var stage = new createjs.Stage(canvas);

		

		stage.update();
	});