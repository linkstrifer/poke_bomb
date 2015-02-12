var moves = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down'
};

document.addEventListener("keydown",keyDownHandler, false);

function keyDownHandler(event) {
	if(moves[event.keyCode]) {
		move(moves[event.keyCode]);
	}
}