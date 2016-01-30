Players = new Mongo.Collection('players');

Items = {
	past: [
		{name: 'clock', pos: {x: 12, y: 20}},
		{name: 'chest', pos: {x: 14, y: 40}},
		{name: 'baggage', pos: {x: 18, y: 60}}
	],
	present: [
		{name: 'books', pos: {x: 22, y: 20}},
		{name: 'tv', pos: {x: 28, y: 40}},
		{name: 'cd', pos: {x: 24, y: 60}}
	],
	future: [
		{name: 'gloves', pos: {x: 32, y: 20}},
		{name: 'bottle', pos: {x: 34, y: 40}},
		{name: 'backpack', pos: {x: 38, y: 60}}
	]
};