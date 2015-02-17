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
for(var i = 0; i < 1; i++) {
	characters.push(Object.create(Character.prototype));
}
// load assets
loader.load();

document.body.appendChild(renderer.view);

loader.onComplete = function() {
	for(character in characters) {
		characters[character].init('bulbasaur');
	}

	for(i = 0; i < 10; i++) {
		var block;
		var block_texture = PIXI.Texture.fromFrame('brick-block.png');
		block = new PIXI.Sprite(block_texture);
		block.position.x = (50 * i) + 25;
		block.position.y = 50;
		block.anchor.x = 0.5;
		block.anchor.y = 0.5;

		stage.addChild(block);
	}

	for(i = 0; i < 10; i++) {
		var block;
		var block_texture = PIXI.Texture.fromFrame('brick-block.png');
		block = new PIXI.Sprite(block_texture);
		block.position.x = (50 * i) + 25;
		block.position.y = 322;
		block.anchor.x = 0.5;
		block.anchor.y = 0.5;

		stage.addChild(block);
	}

	for(i = 2; i < 10; i++) {
		var block;
		var block_texture = PIXI.Texture.fromFrame('brick-block.png');
		block = new PIXI.Sprite(block_texture);
		block.position.x = 25;
		block.position.y = (50 - 16) * i + 16;
		block.anchor.x = 0.5;
		block.anchor.y = 0.5;

		stage.addChild(block);
	}

	for(i = 2; i < 10; i++) {
		var block;
		var block_texture = PIXI.Texture.fromFrame('brick-block.png');
		block = new PIXI.Sprite(block_texture);
		block.position.x = 475;
		block.position.y = (50 - 16) * i + 16;
		block.anchor.x = 0.5;
		block.anchor.y = 0.5;

		stage.addChild(block);
	}


	//init the stage
	requestAnimFrame(animate);
}

function animate() {
	requestAnimFrame(animate);

	for(character in characters) {
		characters[character].sprite.position.x += (characters[character].behavior.change.x * global.speed);
		characters[character].sprite.position.y += (characters[character].behavior.change.y * global.speed);
	}

	// add to fix multiple keys pressed bug
	mapKeys();

	renderer.render(stage);
}