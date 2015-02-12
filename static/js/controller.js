// controller settings
var moves = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down'
};

// multi keys down stored array
var keys = [];

// keys listeners
document.addEventListener("keydown",keyDownHandler, false);

document.addEventListener("keyup",keyUpHandler, false);

// keys handlers
function keyDownHandler(event) {
	if(moves[event.keyCode]) {
		setKey(event.keyCode);
		move(moves[event.keyCode]);
	}
}

function keyUpHandler(event) {
	if(moves[event.keyCode]) {
		removeKey(event.keyCode);
		stop();
	}
}

// misc functions
function setKey(key) {
	var add = true;
	for (k in keys) {
		if(keys[k] == key) {
			add = false;
		}
	}
	if(add) {
		keys.push(key);
	}
}

function removeKey(key) {
	for (k in keys) {
		if(keys[k] == key) {
			keys.splice(k, 1);
		}
	}
}

function mapKeys() {
	if(keys[0] && keys.length == 1) {
		move(moves[keys[0]]);
	}
}