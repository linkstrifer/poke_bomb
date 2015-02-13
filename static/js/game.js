var stage;
var characters = [];
var renderer;
var assets_list;
var loader;
var global = {
	speed: 1.5
};

// create stage
stage = new PIXI.Stage(0xFFFFFF);
// create renderer
renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
// add assets lst
assets_list = ['static/sprites/pokemons.json'];
// create assets loader
loader = new PIXI.AssetLoader(assets_list);
// create characters
for(var i = 0; i < 2; i++) {
	characters.push(Object.create(Character.prototype));
}
// load assets
loader.load();

document.body.appendChild(renderer.view);

loader.onComplete = function() {
	for(character in characters) {
		characters[character].init('bulbasaur');
	}

	//init the stage
	requestAnimFrame(animate);
}

function animate() {
	requestAnimFrame(animate);
	
	for(character in characters) {
		characters[character].sprite.position.x += (characters[character].behavior.changeX * global.speed);
		characters[character].sprite.position.y += (characters[character].behavior.changeY * global.speed);
	}

	// add to fix multiple keys pressed bug
	mapKeys();

	renderer.render(stage);
}