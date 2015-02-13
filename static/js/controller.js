var keys = [];
var moves = [
	{
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	},
	{
		65: 'left',
		87: 'up',
		68: 'right',
		83: 'down'
	}
];

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function keyDownHandler(event) {
	for(player in moves) {
		if(moves[player][event.keyCode]) {
			setKey(player, event.keyCode);
			characters[player].move(moves[player][event.keyCode]);
		}
	}
}
function keyUpHandler(event) {
	for(player in moves) {
		if(moves[player][event.keyCode]) {
			removeKey(player, event.keyCode);
			characters[player].stop();
		}
	}
}
function setKey(player, key) {
	var add = true;
	for (k in keys[player]) {
		if(keys[player][k] == key) {
			add = false;
		}
	}
	if(add) {
		if(!keys[player]) {
			keys[player] = [];
		}
		keys[player].push(key);
	}
}
function removeKey(player, key) {
	for (k in keys[player]) {
		if(keys[player][k] == key) {
			keys[player].splice(k, 1);
		}
	}
}
function mapKeys() {
	for(player in keys) {
		if(keys[player].length == 1) {
			characters[player].move(moves[player][keys[player][0]]);
		}
	}
}