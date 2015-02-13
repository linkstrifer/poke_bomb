function checkCollision(obj) {
	var sprite = obj.sprite;
	var temp_object = {
		position: {
			x: sprite.position.x,
			y: sprite.position.y
		},
		size: {
			height: sprite.texture.height,
			width: sprite.texture.width
		}
	};
	
	for(object in stage.children) {
		if(stage.children[object].position != sprite.position && stage.children[object].texture != sprite.texture) {
			var temp_distance = {
				x: stage.children[object].position.x - sprite.position.x,
				y: stage.children[object].position.y - sprite.position.y,
			};
			if(Math.abs(temp_distance.x) < 100 && Math.abs(temp_distance.y) < 100) {
				var temp_sprite = stage.children[object];
				var temp_object_2 = {
					position: {
						x: temp_sprite.position.x,
						y: temp_sprite.position.y
					},
					size: {
						height: temp_sprite.texture.height,
						width: temp_sprite.texture.width
					}
				}
				if(collisionComparision(temp_object, temp_object_2)) {
					return true;
				} else {
				}
			}
		}
	}
	return false;
}

function collisionComparision(object_1, object_2) {
	var collision = false;
	if(object_1.position.x < object_2.position.x + object_2.size.width && object_1.position.x + object_1.size.width > object_2.position.x &&
		object_1.position.y < object_2.position.y + object_2.size.height && object_1.position.y + object_1.size.height > object_2.position.y) {
		collision = true;
	}
	return collision;
}
function collisionDirection() {
}