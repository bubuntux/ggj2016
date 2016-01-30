Meteor.publish("game", function () {
	return Games.find();
});