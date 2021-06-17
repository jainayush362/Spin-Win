let prize_details = {
	count: 10,
	prize_name: ["Phone","TV","Cardio Machine","Watch","Camera","Tablet","Jackpot","Phone","Jackpot","Car"],
}

let config = {
	type: Phaser.CANVAS,
	width : 800,
	height : 480,

	scene: {
		preload: preload,
		create: create,
		update: update,
	}
};

let game = new Phaser.Game(config);

function preload(){
	//console.log("In Preload");
	//console.log(this);
	this.load.image('background','assets/images/back.jpg');
	this.load.image('wheel','assets/images/wheel.png');
	this.load.image('pin','assets/images/pin.png');
	this.load.image('button','assets/images/button.png');
	this.load.audio('sound','assets/audio/sound.mp3');
}

function create(){
	//console.log("In create");
	let W = game.config.width;
	let H = game.config.height;
	let bg = this.add.sprite(W/2,H/2,'background');
	bg.setScale(1.30);

	this.wheel = this.add.sprite(W/2,H/1.63,'wheel');
	this.wheel.setScale(0.35);

	let pin = this.add.sprite(W/2,H/3.3,'pin');
	pin.setScale(0.15);
	

	this.button = this.add.sprite(W/2,H-30,"button").setInteractive({ useHandCursor: true });
    this.button.setScale(0.4);

    this.button.on("pointerdown",spinwheel,this);
	//this.input.on('pointerdown',spinwheel,this);

	this.music = this.sound.add("sound");

	let fontstyle = {
		font: "bold 40px Arial",
		align: "center",
		color: "red",
	}
	this.game_text = this.add.text(180,75,"SPIN & WIN JACKPOT",fontstyle);
}

function update(){
	//console.log("In update");
	//this.wheel.angle += 5;
}

function spinwheel(){
	//console.log("In spinwheel");
	this.music.play();

	this.game_text.setText("You Spinned the Wheel..");

	let rounds = Phaser.Math.Between(2,6);
	this.button.removeInteractive();
	let degree = Phaser.Math.Between(0,9)*18;

	console.log(rounds);
	
	let idx = prize_details.count - 1 - Math.floor(degree/(360/prize_details.count));
	tween = this.tweens.add({
        targets: this.wheel,
        angle: (rounds*360)+degree,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: this,
        onComplete: function(){
        	this.game_text.setText("Hurray! You won "+prize_details.prize_name[idx]);
        	this.music.stop();
        	this.button.setInteractive({ useHandCursor: true });
        },
    });
}