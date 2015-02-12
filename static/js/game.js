var stage = new PIXI.Stage(0xF012BE);

var character_1;
var character_1_texture;

var renderer = PIXI.autoDetectRenderer(400, 400);

document.body.appendChild(renderer.view);

// assets

var assets_list = ['static/sprites/pokemons.json'];

var loader = new PIXI.AssetLoader(assets_list);


loader.onComplete = function() {
	character_1_texture = map('bulbasaur');

	character_1 = new PIXI.MovieClip(character_1_texture.down);
	character_1.position.x = 200;
	character_1.position.y = 200;
	character_1.anchor.x = 0.5;
	character_1.anchor.y = 0.5;
	character_1.animationSpeed = 0.07;
	character_1.play();

	stage.addChild(character_1);
}

loader.load();

//map the character

function map(name) {
	var steps = 2;
	var sides = {
		'up': [],
		'down': [],
		'left': [],
		'right': []
	};
	
	for(side in sides) {
		for(var i = 0; i < steps; i++) {
			var texture = PIXI.Texture.fromFrame(name + '-' + side + '-' + i + '.png');
			sides[side].push(texture);
		}
	}

	return sides;
}

function move(side) {
	character_1.textures = [];
	for (texture in character_1_texture[side]) {
		character_1.textures.push(character_1_texture[side][texture]);
	}
	character_1.play();
}

//refresh the stage
requestAnimFrame(animate);

function animate() {
	requestAnimFrame(animate);

	renderer.render(stage);
}