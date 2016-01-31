Players = new Mongo.Collection('players');

Items = {
	past: [
		{name: 'clock', pos: {x: 12, y: 20}},
		{name: 'chest', pos: {x: 34, y: 40}},
		{name: 'baggage', pos: {x: 68, y: 60}}
	],
	present: [
		{name: 'books', pos: {x: 72, y: 20}},
		{name: 'tv', pos: {x: 88, y: 40}},
		{name: 'cd', pos: {x: 94, y: 60}}
	],
	future: [
		{name: 'gloves', pos: {x: 102, y: 20}},
		{name: 'bottle', pos: {x: 124, y: 40}},
		{name: 'backpack', pos: {x: 138, y: 60}}
	]
};