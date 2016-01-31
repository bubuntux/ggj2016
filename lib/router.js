"use strict";
Router.route('/', function () {
	this.wait(Meteor.subscribe('players'));
	if (this.ready()) {
		let userId = Meteor.userId();
		let playersCursor = Players.find({});
		if (!userId || !playersCursor) {
			this.render('home', {data: playersCursor});
			return;
		}

		let player = Players.findOne({id: userId});
		if (!player) {
			if (playersCursor.count() >= 3) {
				this.render('home', {data: playersCursor});
				return;
			}
			var items = _.filter(Items, function (item) {
				let taken = false;
				playersCursor.forEach(function (p) {
					if (!taken && !!p.items && p.items.name === item.name) {
						taken = true;
					}
				});
				return !taken;
			});

			player = {id: userId, items: _.sample(items)};
			_.each(player.items.arr, function (item) {
				item.defPos = _.clone(item.pos);
			});
			Meteor.call('createPlayer', player);
		}
		this.render('player', {data: player});
	}
}, {
	name: 'game',
	layoutTemplate: 'layout'
});