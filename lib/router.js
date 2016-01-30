"use strict";
let game = Games.findOne({id: 1});
Router.route('/', function () {
	let userId = Meteor.userId();
	if (!userId) { //not logged in
		this.render('home');
		return;
	}
	if(!game){
		this.render('home');
		return;
	}
	if (!game.players) {
		game.players = [];
	}
	if (game.players.length >= 3) { //max players
		this.render('home');
		return;
	}
	if (_.find(game.players, function (player) {
			return player.id === userId
		})) { //already on the game
		this.render('player');
		return;
	}

	let player = {id: userId};
	player.objects = _.sample(game.objects, 3);

	Games.update(game.id, {$push: {players: player}, $pullAll: {objects: player.objects}});
}, {
	name: 'game',
	layoutTemplate: 'layout',
	data: function () {
		return game; //TODO
	}
});