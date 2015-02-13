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
	this.sprite.position.x = 200 * Math.random();
	this.sprite.position.y = 200 * Math.random();
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.animationSpeed = 0.07;

	this.behavior = {
		'isMoving': false,
		'changeX': 0,
		'changeY': 0,
		'speed': 1
	};

	stage.addChild(this.sprite);
}
function CharacterMove(side) {
	// delete current textures
	this.sprite.textures = [];
	
	// add new ones
	for (texture in this.textures[side]) {
		this.sprite.textures.push(this.textures[side][texture]);
	}

	//move horizontal
	if(side == 'right') {
		this.behavior.changeX = 1;
	} else if(side == 'left') {
		this.behavior.changeX = -1;
	} else {
		this.behavior.changeX = 0;
	}

	//move vertical
	if(side == 'down') {
		this.behavior.changeY = 1;
	} else if(side == 'up') {
		this.behavior.changeY = -1;
	} else {
		this.behavior.changeY = 0;
	}
	
	this.sprite.play();
}
function CharacterStop() {
	this.sprite.stop();
	this.behavior.changeX = 0;
	this.behavior.changeY = 0;
}
function CharacterBehavior() {
	return this.behavior;
}