"use strict";
Template.player.helpers({
	myItems: function () {
		return Items[this.itemIndex];
	}
});