/**
 * Created with JetBrains WebStorm.
 * User: Roushey
 * Date: 4/27/13
 * Time: 7:50 PM
 */

function SandIntroChunk(level){
    Chunk.call(this, level);
}

SandIntroChunk.prototype = new Chunk();
SandIntroChunk.prototype.constructor = SandIntroChunk;

SandIntroChunk.prototype.build = function() {
    this.items = [
        // camera Vector3 pos, Vector3 target default is (0,-200, 200) --> (0,0,0)
        //{time:2.0, action:function(game){ game.moveCamera(new THREE.Vector3(0,-200, 170), new THREE.Vector3(0,0,0), 1.0) } },

        // pass game object controller, game.
        // basic baddies: pos, size, note(0-14)
        
        {time:0.0, action:function(game){ game.addScore(500); } },
        {time:1.0, action:function(game){
            game.changeFogColor(0xe9c8ab);
            game.addAmbientLight(0x443735);
        } },
        {time:3.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 5, 0) ) } },
               
        {time:6.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 5, 0) ) } },
        
        {time:9.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-50,800,0), 5, 0) ) } },
        {time:10.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 5, 1) ) } },

		{time:11.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-10,800,0), 5, 2) ) } },

		{time:13.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-30,800,0), 5, 3) ) } },
		{time:14.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-50,800,0), 5, 5) ) } },
        {time:16.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-70,800,0), 5, 1) ) } },
        // main sandstorm melody will start here
	    {time:20.0, action:function(game){ game.moveCamera(new THREE.Vector3(150,-200, 200), new THREE.Vector3(0,0,0), 1.5) } },

		{time:18.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 5, 2) ) } },

		{time:20.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 5, 7) ) } },
        {time:20.75, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 5, 10) ) } },
        {time:21.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(0,800,0), 5, 5) ) } },

        {time:24.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-150,800,0), 5, 5) ) } },
        {time:24.75, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 5, 2) ) } },
        {time:25.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 5, 5) ) } },
        {time:26.25, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(150,800,0), 5, 1) ) } },
        
        {time:29.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 5, 11) ) } },
        {time:29.75, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(-100,800,0), 5, 12) ) } },
        {time:30.5, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 5, 10) ) } },
        
        {time:36.0, action:function(game){ game.moveCamera(new THREE.Vector3(-150,-200, 200), new THREE.Vector3(0,0,0), 1.5) } },

        {time:33.0, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(100,800,0), 5, 2),
            new Baddie(new THREE.Vector3(100,850,0), 5, 6),
            new Baddie(new THREE.Vector3(100,900,0), 5, 5) ])}},
        
        {time:35.0, action:function(game){ game.makeBaddie( new Baddie(new THREE.Vector3(100,800,0), 5, 0) ) } },
        
        {time:37.0, action:function(game){ game.makeLinkedBaddies( [
            new Baddie(new THREE.Vector3(-100,800,0), 5, 7),
            new Baddie(new THREE.Vector3(-100,850,0), 5, 10),
            new Baddie(new THREE.Vector3(-100,900,0), 5, 5) ])}},
        
        // reset camera to default position. (time)
        {time:42.0, action:function(game){ game.defaultCamera(1.5)} },

        // this is an easy way to add 'padding' to the end of a chunk
        {time:42.0, action:function(game){ }}
    ];
};