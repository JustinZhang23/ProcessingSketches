let G = 25; // pixels per individual grid cell
let R = 21; // number of rows in the playing area
let C = 40; // number of columns in the playing area
let S = 10; // original size of snake
let speed = 10; // frames per second, set with frameRate(speed) during setup

let gameState = "splash"; //gameState variable
let w = (G * C); //width of the canvas is number of pixels x columns 
let h = (G * R); //height of the canvas is number of pixel x rows 
let border = G*2; //border variable that is 2 grid long

let score = 0; //score variable
let best = 0; //global best score variable
let snakeX = []; //array for snakeX coords
let snakeY = []; //array for snakeY coords
let direction = "right"; //direction of the snake, default is right
let lastDirection = "right"; //tracks the last location to prevent accident collision with self
let prizeX; //variable for prize X coord
let prizeY; //variable for prize Y coord


function setup() { //setup function
  createCanvas(w+(border*3), h+(border*3)); //create canvas with the width being w + border*3 for the hortizonal border and height being h + border*3 for the vertical border
  frameRate(speed); //frame rate is the speed
  
  sizeOfText = fits("Controls: ←↑↓→ | AWSD | JIKL", width, border); //size of the text calls the fits function
  textSize(sizeOfText); //text size is the size of the text
  borderControls(); //call borderControls function
  resetGame(); //calls resetGame
}


function resetGame() { //resetGame function that resets the game to default settings
  score = 0; //reset score
  speed = 10; //reset speed
  let startRow = floor(R / 2 + 3); // Middle row relative to the screen
  let startCol = floor(C / 2); // Left quarter of the columns

  snakeX = []; //reset the snakeX array
  snakeY = []; //reset the snakeY array
  
  for (let i = 0; i < S; i++) { //for loop that runs S many times, to reset the snake coords
    snakeX[i] = startCol * G - i * G; //the starting x coord is at left quarter of the column and as snakeX increases in index, the offset is increased
    snakeY[i] = startRow * G; //the starting y coord is the same for all segments which is the middle row relative to the screen
    }

  direction = "right"; //resets the direction to right
  lastDirection = "right"; //ressts the last direction to right

  newPrize(); //call newPrize function
}


function draw() { //function draw
  background(0, 0, 0); //set background to black 
  borderControls(); //call borderControls function
  
   if (gameState == "splash") { //if the gameState is splash
    splashScreen(); //then call splashScreen function
  } 
  
  else if (gameState == "play") { //if the gameState is play
      playGame(); //then call playGame function
  } 
  
  else if (gameState == "end") { //if the gameState is end
    gameOver(); //then call gameOver function
  } 
  
  else if (gameState == "win"){ //if the gameState is win
    winGame(); //then call winGame function
  }
}


function fits(msg, maxWidth, maxHeight) { //function fits that takes one message and two parameters
  let size = 1; //set size to 1
  textSize(size); //set initial text size
    
  while (textWidth(msg)*2 < maxWidth && textAscent() + textDescent() < maxHeight) { //while the doubled textWidth of the msg at that size and the textAscent and textDescent at that size is less than the parameters
    size++; //increase size
    textSize(size); //set textsize to that new size
  }
    
  return size - 1; //once the while loop breaks, return the size-1 that caused it to break
}


function borderControls() {//border control function
  push(); //push to keep exterior changes outside and interior changes only within this function
  textAlign(CENTER, CENTER); //center the text
  noStroke(); //no stroke
  fill(255, 255, 0); //change color to yellow
  text("Controls: ←↑↓→ | AWSD | JIKL", width/2, G); //print the controls at the center of width one G down
  
  if (gameState != "splash") { //if the gameState is not splash
    textAlign(LEFT, CENTER); //shift the center of the text to the left of the text and center the text vertically
    text("Score: " + score, G/2, height-G); //print score at the bottom left corner
    
    textAlign(RIGHT, CENTER); //shift the center of the text to the right of the text and center the text vertically
    text("Best: " + best, width-G, height-G); //print best at the bottom right corner
  
    textAlign(LEFT, CENTER); //shift the center of the text to the right of the text and center the text vertically
    text("Speed: " + speed, G/2, G); //print best at the bottom right corner
  }
  
  fill(255, 255, 0); //fill is yellow
  rect(border, border, width-(border*2), height-(border*2)); //make a large yellow rectangle
  fill(0); //fill is black
  rect(border+G, border+G, width-(border*3), height-(border*3)); //make a smaller black rectangle inside of the large yellow rectangle
  pop(); //pop to keep exterior changes outside and interior changes only within this function
}


function splashScreen() { //splashScreen function
  push(); //push to keep exterior changes outside and interior changes only within this function
  textAlign(CENTER, CENTER); //Center the text
  noStroke(); //no stroke
  fill(255, 255, 0); //color is yellow
  text("Press space to begin", width / 2, height / 2); //print splash text at the center of the canvas
  pop(); //pop to keep exterior changes outside and interior changes only within this function
}


function playGame() { //playGame function
  drawSnake(); //calls drawSnake function
  drawPrize(); //calls drawPrize function
  moveSnake(); //calls moveSnake function

  if (collision()) { //if collision is true
    gameState = "end"; //Set game state to end
    return; //Exit the function to stop further updates
  }
    

  if (prizeCollected()) { //if prizeCollected is true
    score++; //Increase the score 
    speed++; //increase the score
    if (score > best){ //if the current score is greater than the best
      best = score; //best is now the current score
    }
    growSnake(); //calls growSnake function
    newPrize(); //calls newPrize function
  }
  
  if (snakeX.length>=(C * R)){ //if the snake is bigger than or equal to the size of the playable canvas
    gameState = 'win'; //then set game state to win
    return;
  }
}


function winGame() { //wingame function
  drawSnake(); //calls drawSnakeFunction
  
  push(); //push to keep exterior changes outside and interior changes only within this function
  textAlign(CENTER, CENTER); //center the text
  noStroke(); //no stroke
  fill(255, 255, 0); //set fill to yellow
  text("Congratulations, You Won!", width/2, height-G); //print the game over prompt at the bottom of the canvas in the middle
  pop(); //pop to keep exterior changes outside and interior changes only within this function
}


function gameOver() { //gameOver function
  drawSnake(); //call the drawSnake function

  push(); //push to keep exterior changes outside and interior changes only within this function
  textAlign(CENTER, CENTER); //center the text
  noStroke(); //no stroke
  fill(255, 255, 0); //set fill to yellow
  text("Game Over (press 'r' to restart)", width/2, height-G); //print the game over prompt at the bottom of the canvas in the middle
  pop(); //pop to keep exterior changes outside and interior changes only within this function
}


function moveSnake() { //moveSnake function
  for (let i = snakeX.length - 1; i > 0; i--) { //for loop that runs the length of the snake - 1 times.
    snakeX[i] = snakeX[i - 1]; //shift the snakeX array by one
    snakeY[i] = snakeY[i - 1]; //shift the snakeY array by one
  }

  if (direction == 'right') { //if the direction is right
    snakeX[0] += G; //increase the first one element in snakeX by G
  } 
  
  else if (direction === 'left') { //if the direction is left
    snakeX[0] -= G; //decrease the first one element in SnakeX by G
  } 
  
  else if (direction === 'up') { //if the direction is up
    snakeY[0] -= G; //decrease the first one element in SnakeY by G
  } 
  
  else if (direction === 'down') { ////if the direction is down
    snakeY[0] += G; //increase the first one element in SnakeY by G
  }

  lastDirection = direction; //set lastDirection to direction
}


function drawSnake() { //drawSnake function
  let rainbowArray = [ //color array
  color(255, 0, 0),   // Red
  color(255, 127, 0), // Orange
  color(255, 255, 0), // Yellow
  color(0, 255, 0),   // Green
  color(0, 0, 255),   // Blue
  color(75, 0, 130),  // Indigo
  color(148, 0, 211)  // Violet
];
  stroke(255); // outline is white
  strokeWeight(0.5) //thickness of outline is smaller
  
  fill(255, 0, 0); // Color for the head
  rect(snakeX[0], snakeY[0], G, G); // Draw the head
  
  
  push(); //push to keep exterior changes outside and interior changes only within this function
  noStroke(); //no outlines
  if(direction == "left" || direction == "right"){ //if the head is going left or right
    fill(255); // color for eyeballs
    circle(snakeX[0]+(G/2), snakeY[0]+(G/4), G/4); //circles for eyeballs
    circle(snakeX[0]+(G/2), snakeY[0]+(G*3/4), G/4);
    
    fill(0); // color for pupil
    circle(snakeX[0]+(G/2), snakeY[0]+(G/4), G/7); //circles for pupils
    circle(snakeX[0]+(G/2), snakeY[0]+(G*3/4), G/7);
    
  }
  else{ //if not going that direction
    fill(255); // color for eyeballs
    circle(snakeX[0]+(G/4), snakeY[0]+(G/2), G/4); //circle for eyeballs
    circle(snakeX[0]+(3*G/4), snakeY[0]+(G/2), G/4); 
    
    fill(0, 0, 0); // color for eyes
    circle(snakeX[0]+(G/4), snakeY[0]+(G/2), G/7); //circle for pupils
    circle(snakeX[0]+(3*G/4), snakeY[0]+(G/2), G/7); 
  }
  pop(); //pop to keep exterior changes outside and interior changes only within this function
  
  
  for (let i = 1; i < snakeX.length; i++) { //for loor that runs the length of snakeX times
    fill(rainbowArray[i % 7]); //rainbow affect on snake
    rect(snakeX[i], snakeY[i], G, G); //draws each segment of the body
  }
}


function growSnake() { //growSnake function
  snakeX.push(snakeX[snakeX.length - 1]); //push the last element in snakeX array again
  snakeY.push(snakeY[snakeY.length - 1]); //push the last element in snakeY array again
}


function newPrize() { //newPrize function
  if(score <= 0){ //if the score is less than 0
    let startCol = floor(3*C / 4); // Right quarter of the columns
    let startRow = floor(R/2 + 3); // Middle row relative to the screen

    prizeX = startCol * G //generate the prize at the opposite x-axis the head spawns on
    prizeY = startRow * G //generate the prize at the same height as the head spawns on
    return;
  }
  
  
  let newPrizeFound = false; //bool variable called newPrizeFound and set to false
  
  while (!newPrizeFound) { //while not newPrizeFound 
    let leftBoundary = border+G; //leftBoundary is 3* G over from the left
    let rightBoundary = width-(border+G); //rightBoundary is width - 3*G
    let topBoundary = border+G; //topBoundary is 3*G from the top
    let bottomBoundary = height-(border+G); //bottomBoundary is height - 3*G
        
    prizeX = floor(random(leftBoundary/G, rightBoundary/G))*G; //X coord of the prize is a random value from the leftBoundary/G to the rightBoundary/G right make sure that number is a int * G for the size of the grid
    prizeY = floor(random(topBoundary/G, bottomBoundary/G))*G; //Y coord of the prize is a random value from the topBoundary/G to the bottomBoundary/G right make sure that number is a int * G for the size of the grid
      
    newPrizeFound = true; //set newPrizeFound to true
    for (let i = 0; i < snakeX.length; i++) { //for loop that checks if the prize collides with the snake
      if (snakeX[i] === prizeX && snakeY[i] === prizeY) { //if they collide
        newPrizeFound = false; // If the prize overlaps with the snake set newPrize as false
        break; //break from the for loop and start from the beginning of the while function
      }
    }
  }
}


function drawPrize() { //drawPrize function
  push(); //push to keep exterior changes outside and interior changes only within this function
  noStroke(); //no Stroke
  fill(0); //fill as black
  rect(prizeX, prizeY, G, G); // Draw the prize box

  textAlign(CENTER, CENTER); //center the text
  textSize(G); //Size is the pixel size
  text("🍎", prizeX+(G/2), prizeY+(G/2)); //draw the prize
  
  pop(); //pop to keep exterior changes outside and interior changes only within this function
}


function prizeCollected() { //PrizeCollected function
  return snakeX[0] === prizeX && snakeY[0] === prizeY; //if the head's x and y coord are the same as the prize, then return true
}


function collision() { //collision function
  leftBoundary = border+G; //leftBoundary is 3*G over from the left
  rightBoundary = width-(border+G); //rightBoundary is width - 3*G
  topBoundary = border+G //topBoundary is 3*G from the top
  bottomBoundary = height-(border+G); //bottomBoundary is height - 3*G
 
  
  //collision with border
  if (snakeX[0] < leftBoundary || snakeX[0] >= rightBoundary ||  //if the x coord of the head is ever outside of the bounds of the left and right boundary
    snakeY[0] < topBoundary || snakeY[0] >= bottomBoundary) { //if the y coord of the head is ever outside of the bounds of the top and bottom boundary
    return true; // return true
  }

  //collision with self
  for (let i = 1; i < snakeX.length; i++) { //for loop that runs the length of snakeX times
    if (snakeX[0] == snakeX[i] && snakeY[0] == snakeY[i]) { //if the snake head is ever at the same location as a segment of the body
      return true; // return true
    }
  }
  return false; //if both collisions have been reached, return false
}


function keyPressed() { //keyPressed function
  if (gameState == "splash") { //if the gameState is splash
    if (key == ' ') { //if the key is space
      gameState = "play"; //set the gameState to play
      resetGame(); //call resetGame function
    }
  }

  if (gameState == "end") { //if the gameState is end
    if (key == 'r') { //if the key is r
      gameState = "splash"; //set the gameState to splash
    }
  }
  
  if (gameState == "win") { //if the gameState is win
    if (key == 'r'){ //if the key is r
      gameState = "splash"; //set the gameState to splash  
    }
  }


  if (gameState == "play") { //if the gameState is play
    if ((keyCode == LEFT_ARROW || key == 'a' || key == 'j') && lastDirection !== "right") { //if the key is left arrow, a, or j and its lastDirection not going right
      direction = "left"; //direction is left
    } 
      
    else if ((keyCode == UP_ARROW || key == 'w' || key == 'i') && lastDirection !== "down") { //if the key is up arrow, w, or i and its lastDirection not going down
      direction = "up"; //direction is up
    }   
      
    else if ((keyCode == DOWN_ARROW || key == 's' || key == 'k') && lastDirection !== "up") { //if the key is down arrow, s, or k and its lastDirection not going up
      direction = "down"; //direction is down
    } 
      
    else if ((keyCode == RIGHT_ARROW || key == 'd' || key == 'l') && lastDirection !== "left") { //if the key is right arrow, d, or l and its lastDirection not going left
      direction = "right"; //set direction to right
    }
  }
}
