"use strict";
Router.route('/', function () {
	this.wait(Meteor.subscribe('players'));
	if (this.ready()) {
		let userId = Meteor.userId();
		let players = Players.find({}).fetch();
		if (!userId || !players) {
			this.render('home', {data: players});
			return;
		}

		let player = _.find(players, function (p) {
			return p.id === userId;
		});
		if (!player) {
			if (players.length >= 3) {
				this.render('home', {data: players});
				return;
			}
			var items = _.filter(Items, function (item) {
				return !_.some(players, function (p) {
					return p.items.name === item.name;
				});
			});

			player = {id: userId, items: _.sample(items)};
			Meteor.call('createPlayer', player);
		}
		this.render('player', {data: player});
	}
}, {
	name: 'game',
	layoutTemplate: 'layout'
});