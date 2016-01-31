"use strict";
Router.route('/', function () {
	this.subscribe('artifacts');
	let user = Meteor.user();
	if (!user) {
		this.render('home', {data: {artifacts: Artifacts.find({})}});
		return;
	}

	this.subscribe('players').wait();
	if (this.ready()) {
		let player = Players.findOne({userId: user._id});
		if (!player) {
			let pCursor = Players.find({});
			if (pCursor.count() >= 3) {
				this.render('home', {data: {artifacts: Artifacts.find({})}});
				return;
			}
			let takenContexts = [];
			pCursor.forEach(function (player) {
				takenContexts.push(player.context);
			});
			let availableContexts = _.difference(Contexts, takenContexts);
			let context = _.sample(availableContexts);

			let email = _.first(user.emails).address;
			let name = email.substring(0, email.indexOf('@'));

			player = {userId: user._id, name: name, context: context};
			Meteor.call('createPlayer', player);
		}
		this.render('player', {
			data: {
				player: player,
				artifacts: Artifacts.find({context: player.context})
			}
		});
	} else {
		this.next();
	}
}, {
	name: 'game',
	layoutTemplate: 'layout'
});