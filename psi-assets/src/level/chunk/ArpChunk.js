/**
 * Created with JetBrains WebStorm.
 * User: Roushey
 * Date: 4/27/13
 * Time: 7:50 PM
 */

function ArpChunk(level){
    Chunk.call(this, level);
}

ArpChunk.prototype = new Chunk();
ArpChunk.prototype.constructor = IntroChunk;

ArpChunk.prototype.build = function() {
    this.items = [
		{time:0.0, action:function(game){ game.enableKey(3) } },
		{time:0.0, action:function(game){ game.enableKey(4) } },
				
		{time:0.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-400,800,0), 30, 0, 0) ) } },
		
		{time:0.3, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-240,800,0), 30, 1, 1) ) } },
		{time:0.6, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-80,800,0), 30, 2, 2) ) } },
        {time:0.9, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(80,800,0), 30, 3, 3) ) } },
		{time:1.2, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(240,800,0), 30, 4, 4) ) } },
		
		//{time:1.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(400,800,0), 30, 5, 5) ) } },
		
        {time:1.8, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(240,800,0), 30, 6, 4) ) } },
		{time:2.1, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(80,800,0), 30, 7, 3) ) } },
        {time:2.4, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-80,800,0), 30, 8, 2) ) } },
		{time:2.7, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-240,800,0), 30, 9, 1) ) } },
		
		{time:3.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-400,800,0), 30, 10, 0) ) } },
		
		{time:3.3, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-240,800,0), 30, 11, 1) ) } },
        {time:3.6, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-80,800,0), 30, 12, 2) ) } },
		{time:3.9, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(80,800,0), 30, 13, 3) ) } },
        {time:4.2, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(240,800,0), 30, 14, 4) ) } },
		
        //{time:4.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(400,800,0), 30, 13, 5) ) } },
		
		{time:4.8, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(240,800,0), 30, 12, 4) ) } },
        {time:6.1, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(80,800,0), 30, 11, 3) ) } },
		{time:6.4, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(40,800,0), 30, 10, 2) ) } },
        {time:6.7, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 30, 9, 1) ) } },
		
		{time:7.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 30, 8, 0) ) } },
		{time:8, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 30, 0, 0) ) } },

		{time:12, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(-10,800,0), 10, 2),
            new Baddie(new THREE.Vector3(10,850,0), 15, 5),
            new Baddie(new THREE.Vector3(-10,900,0), 10, 8) ])}},
            
        {time:14, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(-210,800,0), 10, 11),
            new Baddie(new THREE.Vector3(-200,850,0), 15, 10),
            new Baddie(new THREE.Vector3(-210,900,0), 10, 7) ])}},
            
        {time:17, action:function(game){ game.makeLinkedBaddies( [
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