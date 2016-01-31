"use strict";
Meteor.startup(function () {
	Players.remove({});
	Artifacts.remove({});

	let artifacts = [
		///Past
		{name: 'reloj', context: Contexts[0], x: 346, y: 57},
		{name: 'television', context: Contexts[0], x: 241, y: 154},
		{name: 'mono', context: Contexts[0], x: 429, y: 207, required: true},
		{name: 'Sillon', context: Contexts[0], x: 454, y: 124},
		{name: 'telescopio', context: Contexts[0], x: 22, y: 87},
		{name: 'mesedora', context: Contexts[0], x: 95, y: 164},
		/*{name: 'cajademusica', context: Contexts[0], x: 68, y: 60},
		{name: 'Vela', context: Contexts[0], x: 68, y: 60},
		{name: 'piano', context: Contexts[0], x: 68, y: 60},
		{name: 'tocadiscos', context: Contexts[0], x: 68, y: 60},
		{name: 'Globo', context: Contexts[0], x: 68, y: 60},
		{name: 'trompo', context: Contexts[0], x: 68, y: 60},*/

		///Present
			{name: 'Mesa', context: Contexts[1], x: 56, y: 175},
		{name: 'Mueble2', context: Contexts[1], x: 464, y: 104},
		{name: 'libros', context: Contexts[1], x: 503, y: 114},
		{name: 'Guitarra', context: Contexts[1], x: 373, y: 166},
		{name: 'MiniClima', context: Contexts[1], x: 423, y: 42},
		{name: 'TVPresente', context: Contexts[1], x: 241, y: 96},
		{name: 'ES4', context: Contexts[1], x: 266, y: 177},
		{name: 'Lamapara', context: Contexts[1], x: 87, y: 158},
		{name: 'Ciervo', context: Contexts[1], x: 118, y: 74},
		{name: 'Balon', context: Contexts[1], x: 113, y: 172},
		{name: 'Estereo', context: Contexts[1], x: 145, y: 213, required: true},
		{name: 'Celular', context: Contexts[1], x: 173, y: 160},
		{name: 'Jarron', context: Contexts[1], x: 53, y: 156},
	

		///Future
		{name: 'Espada', context: Contexts[2], x: 384, y: 234},
		{name: 'libro', context: Contexts[2], x: 509, y: 219, required: true},
		{name: 'mochila', context: Contexts[2], x: 318, y: 177},
		{name: 'Palo', context: Contexts[2], x: 432, y: 204},
		{name: 'cantinflora', context: Contexts[2], x: 69, y: 219},
		{name: 'Mesa2', context: Contexts[2], x: 111, y: 153},
		{name: 'Pistola', context: Contexts[2], x: 143, y: 127},
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