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
        // basic baddies: pos, size, note(0-14)
        
        {time:3.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 8, 0) ) } },
               
        {time:6.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 8, 5) ) } },
        
        {time:9.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 8, 0) ) } },
        {time:9.75, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 8, 5) ) } },

		{time:11.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 8, 1) ) } },

		{time:14.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 8, 0) ) } },
		{time:14.75, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 8, 5) ) } },
        {time:15.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 8, 1) ) } },

	    {time:20.0, action:function(game){ game.moveCamera(new THREE.Vector3(150,-200, 200), new THREE.Vector3(0,0,0), 1.5) } },

		{time:18.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 8, 2) ) } },

		{time:20.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 8, 7) ) } },
        {time:20.75, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 8, 10) ) } },
        {time:21.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 8, 5) ) } },

        {time:24.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-150,800,0), 8, 5) ) } },
        {time:24.75, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 8, 2) ) } },
        {time:25.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 8, 5) ) } },
        {time:26.25, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(150,800,0), 8, 1) ) } },
        
        {time:29.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 8, 11) ) } },
        {time:29.75, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 8, 12) ) } },
        {time:30.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 8, 10) ) } },
        
        {time:36.0, action:function(game){ game.moveCamera(new THREE.Vector3(-150,-200, 200), new THREE.Vector3(0,0,0), 1.5) } },

        {time:33.0, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(100,800,0), 8, 2),
            new Baddie(new THREE.Vector3(100,850,0), 10, 6),
            new Baddie(new THREE.Vector3(100,900,0), 8, 5) ])}},
        
        {time:35.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 12, 0) ) } },
        
        {time:37.0, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(-100,800,0), 8, 7),
            new Baddie(new THREE.Vector3(-100,850,0), 10, 10),
            new Baddie(new THREE.Vector3(-100,900,0), 8, 5) ])}},
        
        // reset camera to default position. (time)
        {time:42.0, action:function(game){ game.defaultCamera(1.5)} },

        // this is an easy way to add 'padding' to the end of a chunk
        {time:42.0, action:function(game){ }}
    ];
};