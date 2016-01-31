"use strict";
Meteor.startup(function () {
	Players.remove({});
	Artifacts.remove({});

	let artifacts = [
		///Past
		{name: 'clock', context: Contexts[0], x: 12, y: 20, required: true},
		{name: 'chest', context: Contexts[0], x: 34, y: 40},
		{name: 'cajademusica', context: Contexts[0], x: 68, y: 60},
		{name: 'mesedora', context: Contexts[0], x: 68, y: 60},
		{name: 'telescopio', context: Contexts[0], x: 68, y: 60},
		{name: 'Vela', context: Contexts[0], x: 68, y: 60},
		{name: 'mono', context: Contexts[0], x: 68, y: 60},
		{name: 'television', context: Contexts[0], x: 68, y: 60},
		{name: 'piano', context: Contexts[0], x: 68, y: 60},
		{name: 'tocadiscos', context: Contexts[0], x: 68, y: 60},
		{name: 'Globo', context: Contexts[0], x: 68, y: 60},
		{name: 'Sillon', context: Contexts[0], x: 68, y: 60},
		{name: 'trompo', context: Contexts[0], x: 68, y: 60},

		///Present
		{name: 'Balon', context: Contexts[1], x: 72, y: 20},
		{name: 'Estereo', context: Contexts[1], x: 88, y: 40, required: true},
		{name: 'Libros', context: Contexts[1], x: 94, y: 60},
		{name: 'TVPresente', context: Contexts[1], x: 94, y: 60},
		{name: 'Celular', context: Contexts[1], x: 94, y: 60},
		{name: 'Guitarra', context: Contexts[1], x: 94, y: 60},
		{name: 'Mesa', context: Contexts[1], x: 94, y: 60},
		{name: 'Ciervo', context: Contexts[1], x: 94, y: 60},
		{name: 'Jarron', context: Contexts[1], x: 94, y: 60},
		{name: 'MiniClima', context: Contexts[1], x: 94, y: 60},
		{name: 'ES4', context: Contexts[1], x: 94, y: 60},
		{name: 'Lampara', context: Contexts[1], x: 94, y: 60},
		{name: 'Mueble2', context: Contexts[1], x: 94, y: 60},

		///Future
		{name: 'Botas', context: Contexts[2], x: 102, y: 20},
		{name: 'Espada', context: Contexts[2], x: 124, y: 40},
		{name: 'Mesa23', context: Contexts[2], x: 138, y: 60, required: true},
		{name: 'Pistola', context: Contexts[2], x: 124, y: 40},
		{name: 'botiquin', context: Contexts[2], x: 124, y: 40},
		{name: 'guantes', context: Contexts[2], x: 124, y: 40},
		{name: 'mochila', context: Contexts[2], x: 124, y: 40},
		{name: 'cantinflora', context: Contexts[2], x: 124, y: 40},
		{name: 'Molotov', context: Contexts[2], x: 124, y: 40},
		{name: 'chaqueta', context: Contexts[2], x: 124, y: 40},
		{name: 'libro', context: Contexts[2], x: 124, y: 40},
		{name: 'Palo', context: Contexts[2], x: 124, y: 40}

	];

	_.each(artifacts, function (artifact) {
		artifact.defX = _.clone(artifact.x);
		artifact.defY = _.clone(artifact.y);
		Artifacts.insert(artifact);
	});
});