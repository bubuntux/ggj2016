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

		let players = playersCursor.fetch();
		let player = _.find(players, function (p) {
			return p.id === userId;
		});
		if (!player) {
			if (players.length >= 3) {
				this.render('home', {data: playersCursor});
				return;
			}
			var items = _.filter(_.keys(Items), function (item) {
				return !_.some(players, function (p) {
					return p.items === item;
				});
			});

			player = {id: userId, itemIndex: _.sample(items)};
			Meteor.call('createPlayer', player);
		}
		this.render('player', {data: player});
	}
}, {
	name: 'game',
	layoutTemplate: 'layout'
});