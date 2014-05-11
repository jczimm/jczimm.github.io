/**
 * Created with JetBrains WebStorm.
 * User: Roushey
 * Date: 4/27/13
 * Time: 7:50 PM
 */

function BigChunk(level){
    Chunk.call(this, level);
}

BigChunk.prototype = new Chunk();
BigChunk.prototype.constructor = IntroChunk;

BigChunk.prototype.build = function() {
    this.items = [
		{time:0.0, action:function(game){ game.enableKey(3) } },
		{time:0.0, action:function(game){ game.enableKey(4) } },
		{time:0.0, action:function(game){ game.moveCamera(new THREE.Vector3(0, 0, 200), new THREE.Vector3(0,0,0), 1.0) } },
				
		{time:0.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 0) ) } },
		{time:0.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 0) ) } },
		{time:0.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 2) ) } },
        {time:0.6, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 2) ) } },
		{time:1.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 4) ) } },
        {time:1.1, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 4) ) } },

        {time:1.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 30, 1) ) } },
		{time:1.8, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 30, 1) ) } },
        {time:2.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 3) ) } },
		{time:2.8, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 3) ) } },
		{time:3.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(250,800,0), 30, 5) ) } },
		{time:3.8, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-400,800,0), 30, 5) ) } },

        {time:3.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 2) ) } },
		{time:3.1, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 2) ) } },
        {time:4.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 30, 8) ) } },
        {time:4.6, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 2) ) } },
		{time:5.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 2) ) } },
       
        {time:6.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(250,800,0), 30, 4) ) } },
		{time:6.1, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 30, 4) ) } },
        {time:7.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 2) ) } },
		{time:7.6, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(250,800,0), 30, 2) ) } },
		{time:8.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 30, 8) ) } },

		{time:9, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(-10,800,0), 10, 2),
            new Baddie(new THREE.Vector3(10,850,0), 15, 5),
            new Baddie(new THREE.Vector3(-10,900,0), 10, 8) ])}},
            
        {time:12, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(-210,800,0), 10, 11),
            new Baddie(new THREE.Vector3(-200,850,0), 15, 10),
            new Baddie(new THREE.Vector3(-210,900,0), 10, 7) ])}},
            
        {time:15, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(210,800,0), 10, 0),
            new Baddie(new THREE.Vector3(200,850,0), 15, 3),
            new Baddie(new THREE.Vector3(210,900,0), 10, 2) ])}},

        // pass game object controller, game.
        // basic baddies: pos, size, note(0-14)
		
        // reset camera to default position. (time)
        {time:20.0, action:function(game){ game.defaultCamera(1.5)} },

        // this is an easy way to add 'padding' to the end of a chunk
        {time:23.0, action:function(game){ }}
    ];
};