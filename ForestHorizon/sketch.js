let horizon = 350 //global variable for horizon
let upScale = 1 //global variable for scaling above horizon
let downScale = 1 //global variable for scaling below horizon
let value = 0 //global variable for counter that swaps between trees/flowers and clouds/stars

function setup() { 
  createCanvas(750, 750); //create the canvas 
  background(19,24,98) //paint the background to a midnight purple
  noStroke() //no stroke for everything
  makeHorizon() //calling my horizon function
  makeMoon() //call the create moon function
}

function makeHorizon(){ //creates the bottom part of my landscape 
  rectX = 0 //starts on the left side of canvas (x-axis)
  rectY = horizon //start on where horizon starts (y-axis)
  rectX2 = width //ends on the right side of the canvas (x-axis)
  rectY2 = height //end on the bottom of the canvas (y-axis)
  fill(0, 110,0) //fill the bottom as a forest green
  rect(rectX, rectY, rectX2, rectY2) //create the rectangle, that is forest bottom
}


function makeMoon(){ //creates the moon
  moonX = horizon * 0.2 //scales the x-axis with horizon
  moonY = horizon * 0.2 //scales the y-axis with horizon
  moonRadius = horizon/5 //scales the raidus with horizon
  fill(65, 163, 221, 175) //fill the aura as a light blue 
  circle(moonX, moonY, moonRadius*1.1) //create the circle behind the moon as the aura
  
  fill(246, 241, 213) //fill the moon as a moon white
  circle(moonX, moonY, moonRadius) //create the circle that becomes the overall moon shape
  
  fill(0, 0, 0, 50) //fill the moon spots with a light gray
  circle(moonX*1.4, moonY, moonRadius*0.11) //moon spots 1
  circle(moonX*0.8, moonY*0.7, moonRadius*0.1) //moon spots 2
  circle(moonX*1.1, moonY*0.9, moonRadius*0.17) //moon spots 3
  circle(moonX*1.2, moonY*1.2, moonRadius*0.15) //moon spots 4
  circle(moonX*0.8, moonY*1.1, moonRadius*0.30) //moon spots 5
}
  
function aboveHorizon(){ //function that will create clouds or stars
  value++ //increase value per click
  if(value %2 == 0){ //value has a remainder of 0 then create cloud
    makeClouds() //call makeCloud function
  }if(value %2 != 0){ //value has a remainder of not 0 then create star
    for(let x = 0; x < 5; x += 1)  //for loop that runs 5 times
      makeStars() //call makeStars function
  }
}

function makeClouds(){ //create cloud
  cloudX = mouseX/upScale-40 //x-axis variable is mouse position that is scaled 
  cloudY = mouseY/upScale //y-axis variable is mouse position that is scaled 
  lightgray = color(211, 211, 211);  //light gray
  darkGray = color(111, 111, 111)  //dark gray
  cloudColor = lerpColor(lightgray, darkGray, random(0, 1)) //color lerp from light gray to dark gray with a random step from 0 to 1
  fill(cloudColor) //fill the cloud with that color
  rect(cloudX * upScale, cloudY * upScale, 70 * upScale, 10 * upScale); //create the base of the cloud that is scaled based on where you click
  circle(cloudX * upScale, (cloudY - 5) * upScale, 30 * upScale); //create the left circle of the cloud that is scaled based on where you click
  circle((cloudX + 20) * upScale, (cloudY - 15) * upScale, 35 * upScale); //create the first middle circle of the cloud that is scaled based on where you click
  circle((cloudX + 45) * upScale, (cloudY - 20) * upScale, 50 * upScale); //create the  last middle circle of the cloud that is scaled based on where you click
  circle((cloudX + 70) * upScale, (cloudY - 5) * upScale, 30 * upScale); //create the right circle of the cloud that is scaled based on where you click
}

function makeStars(){ //create stars
  fill(255, 255, 0, random(50, 128)) //fill the star with yellow that is transpant with values 50-128 for transpancey
  starX = random(mouseX-25, mouseX+25) //x-axis variable is a random x value 50 pixels from your mouse click
  starY = random(mouseY-50, mouseY) //y-axis variable is a random y value 50 pixels from your mouse click
  circle(starX, starY, random(1, 5)) //create the stars with the variables and random size from 1-5
}

function belowHorizon(){ //function that will create clouds or stars
  value++ //increase value per click
  if(value %2 == 0){   //value has a remainder of 0 then create trees
    makeTrees()  //call makeTrees function
  }if(value %2 != 0){ //value has a remainder of not 0 then create flowers
    makeFlowers()  //call makeFlowers function
  }
}

function makeTrees(){ //create tree
  treeX = mouseX/downScale //x-axis variable is mouse position that is scaled 
  treeY = mouseY/downScale  //y-axis variable is mouse position that is scaled 
  treeTrunk = 10 //base variable for trunk
  
  fill(150, 75, 0) //fill the trunk as a brown
  rect((treeX-(treeTrunk/2))*downScale, (treeY)*downScale, (treeTrunk)*downScale, (treeTrunk*2)*downScale); //create the tree's trunk that is scaled based on where you click

  leaves1 = color(144, 238, 144) //light green leaves color
  leaves2 = color(24, 120, 48) //dark green leaves color
  leavesColor = lerpColor(leaves1, leaves2, random(0, 1)) //color lerp from light green to dark green with a random step from 0 to 1
  fill(leavesColor) //fill the tree leaves with that color
  triangle((treeX-40)*downScale, (treeY)*downScale, (treeX+40)*downScale, (treeY)*downScale, (treeX)*downScale, (treeY-40)*downScale) //create the tree's lower leaves that is scaled based on where you click
  triangle((treeX-35)*downScale, (treeY-20)*downScale, (treeX+35)*downScale, (treeY-20)*downScale, (treeX)*downScale, (treeY-60)*downScale)  //create the tree's middle leaves that is scaled based on where you click
  triangle((treeX-30)*downScale, (treeY-40)*downScale, (treeX+30)*downScale, (treeY-40)*downScale, (treeX)*downScale, (treeY-70)*downScale)  //create the tree's upper leaves that is scaled based on where you click
}

function makeFlowers(){ //create flowers
  flowerX = mouseX //x-axis variable is where mouse position 
  flowerY = mouseY //y-axis variable is where mouse position
  flowerSize = ((flowerY+1)- horizon)/20 //size of flower radius is based on y-axis position
  
  fill(0, 200, 0) //fill the leaves as a green
  ellipse(flowerX - (flowerSize / 3.5), flowerY + (flowerSize / 1.2), flowerSize / 2.5, flowerSize / 2.5); //left circle that is a leaf that is scaled based on where you click 
  ellipse(flowerX + (flowerSize / 3.5), flowerY + (flowerSize / 0.99), flowerSize / 2.5, flowerSize / 2.5); //right circle that is leaf that is scaled based on where you click
  rect(flowerX - (flowerSize/8), flowerY, flowerSize/4, flowerSize*1.5) //rect that acts as the stem for the flower that is scaled based on where you clcik
  
  flower1 = color(251,178,109) //orange color
  flower2 = color (225,91,100) //red color
  flowerColor = lerpColor(flower1, flower2, random(0, 1)) //color lerp from orange to red  with a random step from 0 to 1
  fill(flowerColor) //fill the flower with that color
  circle(flowerX, flowerY, flowerSize) //create that flower petals
  fill(255, 255, 0) //fill color to yellow
  circle(flowerX, flowerY, (flowerSize*(0.5))) //create interior part of flower that fits inside of the flower petals
}

function mousePressed(){  
  if ((mouseY < horizon) && ((mouseX > (horizon * 0.3 + horizon/5) && mouseX < width) ||
      (mouseY > 0 &&  mouseY > (horizon * 0.3 + horizon/5))) && (mouseIsPressed)){ //conditional statement that runs if the mouse is above the horizon, and is not touching the moon and is clicked
    diff = (dist(mouseX, horizon, mouseX, mouseY))/horizon //diff is the difference of where you click (y-axis wise)
    upScale = (diff*1.5) //upScale is diff *1.5
    aboveHorizon() //call the aboveHorizon function
      
  }if(mouseY > horizon && mouseIsPressed){ //conditional statement that runs if the mouse is below the horizon and is clicked
    diff = (dist(mouseX, horizon, mouseX, mouseY))/horizon //diff is the difference of where you click (y-axis wise)
    downScale = (diff*1.5) //downScale is diff*1.5
    belowHorizon() //call the belowHorizon function
  } 
}

function keyPressed(){
  if(key == "r"){ //if r is pressed then reset the canvas
    setup()
  }if(key == 's'){ //if s is pressed then save the canvas
    saveCanvas('myLandscape','png')
  }
}