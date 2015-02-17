function Character() {};

Character.prototype.init = CharacterInit;
Character.prototype.move = CharacterMove;
Character.prototype.stop = CharacterStop;
Character.prototype.getBehavior = CharacterBehavior;

// functions
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
function CharacterInit(name) {
	this.textures = map(name);

	this.sprite = new PIXI.MovieClip(this.textures.down);
	this.sprite.position.x = 200;
	this.sprite.position.y = 200;
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.animationSpeed = 0.07;

	this.behavior = {
		'isMoving': false,
		'change': {
			'x': 0,
			'y': 0
		},
		'speed': 1
	};

	this.config = {
		'left': {
			'axis': 'x',
			'value': '-1'
		},
		'right': {
			'axis': 'x',
			'value': '1'
		},
		'up': {
			'axis': 'y',
			'value': '-1'
		},
		'down': {
			'axis': 'y',
			'value': '1'
		}
	}

	hit_box = {
		x: 0,
		y: 0,
		height: this.sprite.texture.height,
		width: this.sprite.texture.width
	};

	var graphics = new PIXI.Graphics();
	graphics.lineStyle(5, 0xFF0000);
	graphics.drawRect(hit_box.x - (hit_box.width / 2), hit_box.y - (hit_box.height / 2), hit_box.width, hit_box.height);

	this.sprite.addChild(graphics);

	stage.addChild(this.sprite);
}
function CharacterMove(side) {
	// delete current textures
	this.sprite.textures = [];

	
	// add new ones
	for (texture in this.textures[side]) {
		this.sprite.textures.push(this.textures[side][texture]);
	}

	this.behavior.change[this.config[side].axis] = this.config[side].value;
	
	this.sprite.play();
}
function CharacterStop() {
	this.sprite.stop();
	this.behavior.change.x = 0;
	this.behavior.change.y = 0;
}
function CharacterBehavior() {
	return this.behavior;
}