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
