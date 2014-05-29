// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WEBGL, 'game_div');

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
		// Load a sprite in the game
		// Parameters: name of the sprite, path to the image
		$(window).resize(function() { display.resize(); } );
		window.height = innerHeight;
		window.width = innerWidth;
		
		game.load.image('hello', 'assets/hello.png'); 
    },

    create: function() { 
        // This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
		// Display a sprite on the screen
		// Parameters: x position, y position, name of the sprite
		this.hello_sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'hello');  
    },

    update: function() {
        // This is where we will spend the most of our time. This function is called 60 times per second to update the game.
		// Increase the angle of the sprite by one degree
		this.hello_sprite.x = game.world.centerX;
		this.hello_sprite.y = game.world.centerY;
		this.hello_sprite.angle += 1;  
    } 
}

var display = {
    resize: function () {
		window.height = $(window).innerHeight();
		window.width = $(window).innerWidth();
        try {
            game.width = Number(width);
            game.height = Number(height);
            game.stage.bounds.width = Number(width);
            game.stage.bounds.height = Number(height);
            game.renderer.resize(Number(width), Number(height));
			game.world.setBounds(0, 0, width, height);
			game.camera.setSize(width, height);
			game.camera.setBoundsToWorld();
			if (game.renderType === Phaser.WEBGL) {
			  game.renderer.resize(width, height);    
			}
        } catch (e) {
            console.log("Error: "+e.message);
        }
    }

};

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', main_state);  
game.state.start('main');  