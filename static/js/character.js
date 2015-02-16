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
	this.sprite.position.x = 500 * Math.random();
	this.sprite.position.y = 500 * Math.random();
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

	var collisions = checkCollision(this);

	for(collision in collisions) {
		if(collisions[collision].delta.x > 0 && side == 'right') {
			this.behavior.change[this.config[side].axis] = 0;
		}
		if(collisions[collision].delta.x < 0 && side == 'left') {
			this.behavior.change[this.config[side].axis] = 0;
		}
		if(collisions[collision].delta.y > 0 && side == 'down') {
			this.behavior.change[this.config[side].axis] = 0;
		}
		if(collisions[collision].delta.y < 0 && side == 'up') {
			this.behavior.change[this.config[side].axis] = 0;
		}
	}

	
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