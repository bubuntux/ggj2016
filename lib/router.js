"use strict";
Router.route('/', function () {
	let userId = Meteor.userId();
	if (!userId) { //not logged in
		this.render('home');
		return;
	}
	this.wait(Meteor.subscribe('game'));
	if (this.ready()) {
		let game = Games.findOne({id: 1});
		if (!game) {
			this.render('home'); //TODO error?
			return;
		}
		if (!game.players) {
			game.players = [];
		}
		if (game.players.length >= 3) { //max players
			this.render('home', {data: game}); //TODO error?
			return;
		}
		this.render('player', {data: game});
		if (!_.find(game.players, function (player) {
				return player.id === userId
			})) {
			var player = {id: userId, objects: _.sample(game.objects, 3)};
			Meteor.call('add', game, player);
		}
	}
}, {
	name: 'game',
	layoutTemplate: 'layout'
});