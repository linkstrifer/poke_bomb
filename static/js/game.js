var stage;
var kdtree;
var characters = [];
var blocks = [];
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

	for(i = 0; i < 1; i++) {
		var block;
		var hit_box;
		var block_texture = PIXI.Texture.fromFrame('brick-block.png');
		block = new PIXI.Sprite(block_texture);
		block.position.x = (50 * i) + 25 + 100;
		block.position.y = 50 + 100;
		block.anchor.x = 0.5;
		block.anchor.y = 0.5;
		
		stage.addChild(block);
		blocks.push(block);

		hit_box_shape = {
			left: 0,
			top: 0,
			height: block.texture.height,
			width: block.texture.width
		};

		var graphics = new PIXI.Graphics();
		// graphics.lineStyle(5, 0xFF0000);
		graphics.drawRect(hit_box_shape.left - (hit_box_shape.width / 2), hit_box_shape.top - (hit_box_shape.height / 2), hit_box_shape.width, hit_box_shape.height);

		block.addChild(graphics);

	}

	//init the stage
	requestAnimFrame(animate);
}

function animate() {
	requestAnimFrame(animate);

	for(character in characters) {
		var collided_objects = checkCollisions(characters[character]);
		if(collided_objects.length == 0) {
			characters[character].sprite.position.x += (characters[character].behavior.change.x * global.speed);
			characters[character].sprite.position.y += (characters[character].behavior.change.y * global.speed);
		}
	}

	// add to fix multiple keys pressed bug
	mapKeys();

	renderer.render(stage);
}