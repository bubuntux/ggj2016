"use strict";
Meteor.startup(function () {
	Players.remove({});
	Artifacts.remove({});

	let artifacts = [
		///Past
		{name: 'reloj', context: Contexts[0], x: 375, y: 148},
		{name: 'Cofre', context: Contexts[0], x: 302, y: 175},
		{name: 'television', context: Contexts[0], x: 241, y: 136},
		{name: 'mono', context: Contexts[0], x: 429, y: 207, required: true},
		{name: 'Sillon', context: Contexts[0], x: 490, y: 166},
		{name: 'telescopio', context: Contexts[0], x: 83, y: 181},
		{name: 'mesedora', context: Contexts[0], x: 116, y: 146},
		/*{name: 'cajademusica', context: Contexts[0], x: 68, y: 60},
		{name: 'Vela', context: Contexts[0], x: 68, y: 60},
		{name: 'piano', context: Contexts[0], x: 68, y: 60},
		{name: 'tocadiscos', context: Contexts[0], x: 68, y: 60},
		{name: 'Globo', context: Contexts[0], x: 68, y: 60},
		{name: 'trompo', context: Contexts[0], x: 68, y: 60},*/

		///Present
		{name: 'Mueble2', context: Contexts[1], x: 550, y: 140},
		{name: 'libros', context: Contexts[1], x: 550, y: 118},
		{name: 'Guitarra', context: Contexts[1], x: 470, y: 200},
		{name: 'MiniClima', context: Contexts[1], x: 423, y: 42},
		{name: 'TVPresente', context: Contexts[1], x: 314, y: 103},
		{name: 'ES4', context: Contexts[1], x: 313, y: 158},
		{name: 'Lamapara', context: Contexts[1], x: 87, y: 134},
		{name: 'Ciervo', context: Contexts[1], x: 118, y: 74},
		{name: 'Balon', context: Contexts[1], x: 113, y: 172},
		{name: 'Estereo', context: Contexts[1], x: 174, y: 196, required: true},
		{name: 'Celular', context: Contexts[1], x: 173, y: 160},
		{name: 'Jarron', context: Contexts[1], x: 73, y: 135},
		{name: 'Mesa', context: Contexts[1], x: 56, y: 175},

		///Future
		{name: 'Espada', context: Contexts[2], x: 433, y: 51},
		{name: 'libro', context: Contexts[2], x: 509, y: 219, required: true},
		{name: 'mochila', context: Contexts[2], x: 467, y: 198},
		{name: 'Palo', context: Contexts[2], x: 432, y: 204},
		{name: 'cantinflora', context: Contexts[2], x: 166, y: 217},
		{name: 'Mesa2', context: Contexts[2], x: 29, y: 179},
		{name: 'Pistola', context: Contexts[2], x: 13, y: 157},
		/*{name: 'guantes', context: Contexts[2], x: 36, y: 157}/*,
		{name: 'Botas', context: Contexts[2], x: 102, y: 20},
		{name: 'botiquin', context: Contexts[2], x: 124, y: 40},
		{name: 'Molotov', context: Contexts[2], x: 124, y: 40},
		{name: 'chaqueta', context: Contexts[2], x: 124, y: 40}*/

	];

	_.each(artifacts, function (artifact) {
		artifact.defX = _.clone(artifact.x);
		artifact.defY = _.clone(artifact.y);
		Artifacts.insert(artifact);
	});
});