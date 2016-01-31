Meteor.methods({
	move: function (items) {
		Players.update({id: Meteor.userId()}, {$set: {items: items}});
	}
});