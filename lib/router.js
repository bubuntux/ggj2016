"use strict";
Router.route('/', function () {
	this.subscribe('artifacts');
	let userId = Meteor.userId();
	if (!userId) {
		this.render('home', {data: {artifacts: Artifacts.find({})}});
		return;
	}

	this.subscribe('players').wait();
	if (this.ready()) {
		let player = Players.findOne({userId: userId});
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
			player = {userId: userId, context: _.sample(availableContexts)}; //TODO add email?
			Meteor.call('createPlayer', player);
		}
		this.render('player', {
			data: {
				player: player,
				artifacts: Artifacts.find({context: player.context})
			}
		});
	} else {
		//TODO loading??
	}
}, {
	name: 'game',
	layoutTemplate: 'layout'
});