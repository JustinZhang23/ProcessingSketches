let w = 800; //size of canvas
let squares = 24; //number of squares per row

let pad = 0; //variable pad for creating squares outside to avoid unwanted changes
let padding = w/(squares * 2); //variable for padding
let squareColor = 0 //variable for color of squares
let colorR = 0 //variable for r value of color for squares
let colorG = 0 //variable for g value of color for squares
let colorB = 0 //variable for b value of color for squares


function setup(){ //function that creates the canvas
  createCanvas(w, w); //create a canvas with size w
}


function draw(){ //function draw that will run continously
  background(255); //background is white
  if (mouseIsPressed){ //if the mouse is pressed
    fill(255) //set the fill color of the squares as white
  }else{ //otherwise
    fill(squareColor+colorR, squareColor+colorG, squareColor+colorB) //set color to what the user wants
  }
  y=0 //resets the y after each loop
  makeSquare() //call makeSquares() function
  makeLines() //call makeLines() function
  //saveCanvas('myPicture','png') //save picture
}


function makeSquare(){ //function that makes the squares
  noStroke() //no outline for the squares
  let counter = 1 //counter for padding

  for (let j=0; j<squares; j++) { //for loop that creates each row of squares
    x = pad; //set x to pad
    for (let k=0; k<squares/2; k++) { //for loop that creates half as many colored squares
      square(x,y,w/squares); //create square
      x += w/(squares/2); //increase the x of the next square
    }

    let extraR = pad - w / squares * 2; //code for extra squares when shifting to the right
    while (extraR + w / squares > 0) {  
      square(extraR, y, w / squares);
      extraR -= w / squares * 2;
    }

    let extraL = pad + (squares / 2) * w / squares * 2; //code for extra squares when shifting to the left
    while (extraL < w) {  
     square(extraL, y, w / squares);
     extraL += w / squares * 2;
    }
    
    y += w/squares; //increase the y of the next row by the size of the square
    
    if(counter>2){ //if the count of the row is 2 
      if(counter>3){ //and if the count of the row is 3 then
        counter = 0 //set the count of the row to 0
      }pad -= padding; //then decrease the pad by the padding
    }else{
          pad +=padding; //otherwise increase the pad by the padding
    }counter++ //increase the count of the row
  }
}


function makeLines(){ //function that makes the parallel red lines
  stroke(255, 0, 0) //set stroke color was red
  strokeWeight(1.5) //set stroke size as 1.5
  lineY = w/squares //variable for y of each line
  for (let i = 0; i<squares-1; i++){ //for loop that runs 1 less than the amount of squares
    line(0, lineY, width, lineY) //create a straight line from the left side of the canvas to the right
    lineY+=w/squares //increase the y by the next square size
  }
}


function keyPressed(){ //function that allows the user to control the illusion
  if (key == " "){ //if the key is a space then
    padding = w/(squares * 2); //reset padding to default
    squareColor = 0; //reset squareColor to default
    colorR = 0 //reset colorR to default
    colorG = 0 //reset colorG to default
    colorB = 0; //reset colorB to default
  }
  if (key == "d" || keyCode == 39){ //if the key is d or right arrow then
    padding += 5; //increase the padding by 5
  }
  if (key == "a" || keyCode == 37){ //if the key is a or left arrow then
    padding -= 5; //increase the padding by 5
  }
  if (key == '+' ||key =='='){ //if the key is + or = and
    if(squareColor<255){ //if squareColor is less than 255 then
      squareColor +=25 //increase squareColor by 25
    }
  }
  if (key == '-' || key == '_'){ //if the key is - or _ and 
    if(squareColor>0){ //if squareColor is greater than 0 then
      squareColor -=25 //decrease squareColor by 25
    }
  }
  if (key == 'r'){ //if the key is r and
    if(colorR<254){ //if colorR is less than 254 then 
      colorR +=25 //increase colorR by 25
    }
  }if (key == 'g'){ //if the key is g and
    if(colorG<254){ //if colorG is less than 254 then
      colorG +=25 //increase colorG by 25
    }
  }if (key == 'b'){ //if the key is b and
    if(colorB<254){ //if colorB is less than 254 then
      colorB +=25 //increase colorB by 25
    }
  }
}