Meteor.startup(function () {
	Games.upsert({id: 1}, {
		$set: {objects: AllObjects},
		$unset: {players: true}
	});
});