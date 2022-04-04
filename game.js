var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
// added a variable life and set it to as 3 as there will be 3 lives.
var life =  3;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop -3);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

//Creating the function to hide start button when clicked on
function hideStartBtn() {
// styled as visibility hidden so it hides
    this.style.visibility = 'hidden';
//Copied from University code and pasted so if only the button is hidden the character moves. 
    timeout = setInterval(move, 10);
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup); 
    // making an time interval the bomb falls after clicking start button
    // i have set interval of 1.4sec i.e 1400ms
    var bommbInterval = setInterval(function () {
    fallingBombs();
    }, 1300);
    spaceshiptop()
    // calling the function for random moving spaceship
     // randomSpace()
}

// creating a function to move the spaceship random postion

function spaceshiptop(){
	// creating a variable to make the random number up to 1200
   var getRandomLeft = (min, max) => Math.floor(Math.random()*1200);

   setInterval(()=>{
   	// grabbing the spaceship id from the HTML file and setting its position
    document.getElementById('alien').style.left= getRandomLeft(0, 1150)+'px';
    document.getElementById('alien').style.top = '10px';

    },1200);
}

// function to move the spaceship whereever the bomb generates on top.
    //   function randomSpace() {
    // var spacemove = document.getElementById('alien');
    // spacemove.style.top = bombPosition(0,1) + "vh"
    // spacemove.style.right = bombPosition(10,100)+'vh'
    // spacemove.style.left = bombPosition()+'vh'
    // setInterval(randomSpace,1400)
    // }

//Creating a function that generates random number and assigns to variable randomNumber
// this fucntion defines inititaing position of the bomb which will be used in next function for maths.
function bombPosition(max = 100, min = 3) {
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  // consoling the value to test
  // console.log(randomNumber);
  // returning back the var
  return randomNumber;
}

//Creating a function that generates bombs
function fallingBombs() {
 // creating a variable bombCreate and assigning it to a new creatd div element
  var bombCreate = document.createElement("div");
 // giving the div a classname "bomb" which is taken from CSS for bomb
  bombCreate.className = 'bomb';
  // giving it an id 'name'
  bombCreate.id="name";
  // testing if it creates or not
  // console.log(bombCreate);
  // Creating another variable "bombSpawn" and grabbing the new div I created in HTML file and assigning it
  var bombSpawn = document.getElementById("bombz");
  // appending the bombSpawn to the div loop we created 
  bombSpawn.appendChild(bombCreate);
  // testing if it works
  // console.log(bombSpawn);
  // to set the position of bombspawn
  var top = bombPosition(4, 1);
  bombCreate.style.left = bombPosition() + "vw"; 
  bombCreate.style.top = top + "vh";  
  bombCreate.style.display = "block";
 
 // setting the variable as top 
  var whereBomb = top;
  var fallSpeed = 3; //for bomb falling speed

//To make the generated bomb fall
// Creating a variable and setting it to a time interval so it goes on a loop
  var fallAnimate = setInterval(function() {
  	// reasssigning the value of whereBomb to make the bomb fall down by pixel by pixel
    whereBomb = whereBomb + fallSpeed;
    // to set the falling of bomb with new value of whereBomb
    bombCreate.style.top = whereBomb + "vh";

// Creating a variable for exploison 
// setting variable to bombPosition so whereever the bomb lands it explodes
    var randExplosion = bombPosition(99, 75) +1; 

// Creating a if loop to show the explosion after bomb hides
    if (whereBomb > randExplosion) {
   // to hide the bomb after the condition is met
      bombCreate.classList.remove("bomb");
   // show the explosion after the bomb is removed
      bombCreate.classList.add("explosion");
   // setting attribute for explosion
      bombCreate.setAttribute("id", "explode");

   // To make player lose health if bomb touches the player
   // creating an array
      var playeE = [];
      var bombRadius = [];
      // grabbing the id player and assigning it to player variable
      var player = document.getElementById("player");
      //To get the radius and postion of the player
      var charPos = player.getBoundingClientRect();
      var bmbPos = bombCreate.getBoundingClientRect(); //react within radius of player

// assinging array values of position of character
      playeE[0] = charPos.x;
      playeE[1] = charPos.y;
      bombRadius[0] = bmbPos.x;
      bombRadius[1] = bmbPos.y;

// Creating another if condition where the array and the bombRadius condition meet then life will decrease by one
      if (
        playeE[0] + 83 > bombRadius[0] &&
        playeE[0] - 83 < bombRadius[0] &&
        playeE[1] + 83 > bombRadius[1] &&
        playeE[1] - 83 < bombRadius[1]
      ){
// grabbing all li tags from parent huds
     var lifeList = document.getElementsByTagName('li');
        // var child = lifeList.children; (remove)
        //for decreasing life of the player
        // removing the first li if player gets hit
        lifeList[0].parentNode.removeChild(lifeList[0]);
  // decreasing and updating life value
        life = life - 1;
     // Creating a loop if life is equal to 0 print specific command
          if (life == 0){
         // adding the class dead from css after all life is gone
            player.classList.add('dead');
          // setting interval so that as soon as the character is dead alert box pops up and displays message
            setInterval(function(){
           // creating an alert box to display message
              alert('You Died \n Press OK to Play again');
           // to reload the page after user press ok
              window.location.reload();
          },2000);         
        }
      }
        //to hide exploded bomb
        // Creating a loop function where the explosion hides
        setInterval(function () {
        // creating a variable and grabbing the id explode 
        var explosions_hide = document.getElementById("explode");
        // using styling display none to hide the explosion animation
        explosions_hide.style.display = "none";
        setTimeout(function () {
        // creating a function where bombSpawn removes the newly set variable
          try {
            bombSpawn.removeChild(explosions_hide);
          } catch {
         
          }
        }, 30);
      }, 1000);
      clearInterval(fallAnimate);
    }
  }, 200);
}


// Created a function that calls the hideStartBtn function
function myLoadFunction() { 
  var start = document.getElementsByClassName('start');
  start[0].addEventListener('click', hideStartBtn);
}


// University Code
/*
function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}
*/

document.addEventListener('DOMContentLoaded', myLoadFunction);