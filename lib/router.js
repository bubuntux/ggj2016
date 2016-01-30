"use strict";
Router.route('/', {
	name: 'home',
	layoutTemplate: 'layout',
	template: 'home',
	data: function () {
		//return Boards.find({}); //TODO subscribe?
	}
});