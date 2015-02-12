var stage = new PIXI.Stage(0xF012BE);

var global = {
	'speed': 1.5
};

var character_1;
var character_1_texture;
var character_1_behavior = {
	'isMoving': false,
	'changeX': 0,
	'changeY': 0,
	'speed': 1
};

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

	//init the stage
	requestAnimFrame(animate);
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
	// delete current textures
	character_1.textures = [];
	
	// add new ones
	for (texture in character_1_texture[side]) {
		character_1.textures.push(character_1_texture[side][texture]);
	}

	//move horizontal
	if(side == 'right') {
		character_1_behavior.changeX = 1;
	} else if(side == 'left') {
		character_1_behavior.changeX = -1;
	} else {
		character_1_behavior.changeX = 0;
	}

	//move vertical
	if(side == 'down') {
		character_1_behavior.changeY = 1;
	} else if(side == 'up') {
		character_1_behavior.changeY = -1;
	} else {
		character_1_behavior.changeY = 0;
	}
	
	character_1.play();
}

function stop() {
	character_1.stop();
	character_1_behavior.changeX = 0;
	character_1_behavior.changeY = 0;
}

function animate() {
	requestAnimFrame(animate);

	character_1.position.x += (character_1_behavior.changeX * global.speed);
	character_1.position.y += (character_1_behavior.changeY * global.speed);

	// add to fix multiple keys pressed bug
	mapKeys();

	renderer.render(stage);
}