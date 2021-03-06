function checkCollisions(obj) {
	var collided_objects = [];
	var hit_box = {
		x: obj.sprite.position.x,
		y: obj.sprite.position.y,
		height: obj.sprite.texture.height,
		width: obj.sprite.texture.width
	};

	var temp_hit_box = {
		x: blocks[0].position.x,
		y: blocks[0].position.y,
		height: blocks[0].texture.height,
		width: blocks[0].texture.width
	};

	if(hit_box.x < temp_hit_box.x + temp_hit_box.width && hit_box.x + hit_box.width > temp_hit_box.x &&
		hit_box.y < temp_hit_box.y + temp_hit_box.height && hit_box.y + hit_box.height > temp_hit_box.y) {
		collided_objects.push(blocks[0]);
	}
	
	return collided_objects;
}

/*
var B = SAT.Box;
var V = SAT.Vector;

function checkCollision(obj) {
	var sprite = obj.sprite;
	var collisions = [];
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

	var hit_box = new B(new V(temp_object.position.x, temp_object.position.y), temp_object.size.width, temp_object.size.height).toPolygon();
	
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
				var temp_hit_box = new B(new V(temp_object_2.position.x, temp_object_2.position.y), temp_object_2.size.width, temp_object_2.size.height).toPolygon();
				var collided = SAT.testPolygonPolygon(hit_box, temp_hit_box);

				if(collided) {
					var temp_collision = {
						delta: {
							x: temp_distance.x,
							y: temp_distance.y
						}
					}
					collisions.push(temp_collision);
				}
			}
		}
	}
	return collisions;
}
*/