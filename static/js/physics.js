var b2Vec2 = Box2D.b2Vec2;
var b2World = Box2D.b2World;

PhysicsEngineClass = Class.extend({
	world: null,
	settings: {
		frameRate: 1 / 60,
		iterations: 10,
		velocity: 10
	},
	create: function() {
		physhicsEngine.world = new b2World(new b2Vec2(0, 0), false);
	},
	update: function() {
		var start = new Date.now();

		this.world.Step(this.frameRate, this.velocity, this.iterations);
		this.world.ClearForces();

		return (new Date.now() - start);
	}
});

var physhicsEngine = new PhysicsEngineClass;