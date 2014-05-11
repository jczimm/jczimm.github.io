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
				
		{time:0.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 0) ) } },
        {time:0.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 0) ) } },
        {time:1.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 5) ) } },

        {time:1.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 30, 1) ) } },
        {time:2.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 1) ) } },
		{time:2.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(250,800,0), 30, 6) ) } },

        {time:3.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-200,800,0), 30, 2) ) } },
        {time:3.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 30, 2) ) } },
        {time:4.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 7) ) } },
       
        {time:4.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(259,800,0), 30, 3) ) } },
        {time:5.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(200,800,0), 30, 3) ) } },
		{time:5.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(250,800,0), 30, 8) ) } },

		{time:8, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(-10,800,0), 10, 2),
            new Baddie(new THREE.Vector3(10,850,0), 15, 5),
            new Baddie(new THREE.Vector3(-10,900,0), 10, 8) ])}},
            
        {time:11, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(-210,800,0), 10, 11),
            new Baddie(new THREE.Vector3(-200,850,0), 15, 10),
            new Baddie(new THREE.Vector3(-210,900,0), 10, 7) ])}},
            
        {time:14, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(210,800,0), 10, 0),
            new Baddie(new THREE.Vector3(200,850,0), 15, 3),
            new Baddie(new THREE.Vector3(210,900,0), 10, 2) ])}},

        // pass game object controller, game.
        // basic baddies: pos, size, note(0-14)
		
        // reset camera to default position. (time)
        {time:16.0, action:function(game){ game.defaultCamera(1.5)} },

        // this is an easy way to add 'padding' to the end of a chunk
        {time:18.0, action:function(game){ }}
    ];
};