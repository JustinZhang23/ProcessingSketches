let canvasSize = 500 //size of the canvas

let offset = 50; //variable for the offset
let total = 0; //total for a scaled pie chart
let baseTable; //table holding median income and demographic dist)
let stateTable; //table holding state names)
let selectedState = ""; //Variable to store the selected state
let raceArray = []; //array to hold the names of the races (names shorten/changed for convience reasons)
let stateArray = Array(50); //array to hold the names of the states
let incomeArray = Array(50); //array to hold the income of each state in a 2D array
let distArray = Array(50); //array to hold the dist of demographics of each state in a 2D array
let stateIncomeArray = []; //array to hold the income of the selected state in a 1D array
let stateDistArray = []; //array to hold the dist of demographics of the selected state in a 1D array

let colors = [ //array for pie chart
    [255, 0, 0],       // Red
    [255, 165, 0],     // Orange
    [255, 255, 0],     // Yellow
    [0, 255, 0],       // Green
    [0, 128, 128],     // Teal
    [0, 0, 255],       // Blue
    [75, 0, 130],      // Purple
    [238, 130, 238],   // Violet
    [139, 69, 19],     // Brown
  ];

function preload() { //preload function
  baseTable = loadTable("HouseHoldIncome.csv", "csv", "header"); //load income csv file
  stateTable = loadTable("50States.csv", "csv", "header") //load states csv file
}


function setup() { //setup function
  createCanvas(canvasSize*1.5+(offset*2), canvasSize+(offset*2)); //create the canvas
  background(200); //background as gray
  
  title(); //create the title of the canvas
  dropDown(); //create a drop down with all the states
  getArrays(); //create arrays for income and race distrution for graphs later
}


function draw() { //draw function
  //Check if the selected state has changed
  let state = selectState.value();
  
  // Only redraw the bar chart if the state has changed
  if (state !== selectedState) {
    selectedState = state; // Update the selected state
    drawBarGraph(state); // Draw the bar chart for the new state
    drawPieChart(state); // Draw the pie chart for the new state
  }
}


function title(){
  push(); //push to keep all changes within dropDown
  textSize(canvasSize/20); //size of the text is proportional to the canvas size
  textAlign(CENTER, TOP); //center the text to the top left
  
  text("Median Household Income and Demographic", width/2, 0); //print prompt
  
  text(" Distribution by U.S. State ", width/2, textAscent()+textDescent()); //print prompt
  pop();  //pop to keep all changes within dropDown
}


function dropDown(){ //dropDown function
  push(); //push to keep all changes within dropDown
  textSize(canvasSize/30); //size of the text is proportional to the canvas size
  textAlign(LEFT, TOP); //center the text to the top left
  text("Select a state below:", 0, 0); //print prompt
 
  for (let r = 0; r < 50; r++) { //for loop that runs 50 times
    let s = stateTable.getRow(r); //each state is put into an array
    stateArray[r] = s.getString(0);
  }
  
  selectState = createSelect(); //create a dropdown box
  selectState.position(0, textAscent()+textDescent()); //placement of box is below text box

    pop();  //pop to keep all changes within dropDown
  
  for (let c = 0; c < 50; c++) { //for loop that runs 50 times
    selectState.option(stateArray[c], c); //each state is an option and returns a value when selected
  }
  
  selectState.selected(stateArray[0]); //set default state as Alabama
}


function getArrays() { //getArray function that creates the arrays from the tables
  let incomeIndex = 0; //Index for incomeArray
  let distIndex = 0;   //Index for distArray

  formatTitles() //reformat the titles to fit
    
  for (let c = 1; c < baseTable.getColumnCount()-2; c++) { //for loop that loops through every column (not including Puerto Rico at columns 103 & 104)
    if(c == 18 || c == 19){ //index for DC
      continue; //break out of iteration and continue
    }
    
    if (c % 2 === 0) { //if the column index is divisible by 2
      incomeArray[incomeIndex] = []; //create an array inside of the incomeArray
      for (let r = 0; r < baseTable.getRowCount(); r++) { //for loop that runs for each row
        let value = baseTable.getString(r, c).replace(/,/g, ""); //let the value equal to the string at that row and column
        incomeArray[incomeIndex].push(parseFloat(value)); //push the value into the array at incomeIndex in the incomeArray
      }
      incomeIndex++; //increment incomeIndex
    } 
    
    else { //otherwise
      distArray[distIndex] = []; //create an array inside of the distArray
      for (let r = 0; r < baseTable.getRowCount(); r++) {//for loop that runs for each row
        let value = baseTable.getString(r, c).replace(/,/g, ""); //let the value equal to the string at that row and column
        distArray[distIndex].push(parseFloat(value)); //push the value into the array at distIndex in the distArray
      }
      distIndex++; //increment distIndex
    }
  }
}


function formatTitles(){
   const raceShortNames = { //changing the labels into readible titles
    "Households": "Overall",
    "White": "White",
    "Black or African American": "African\nAmerican",
    "American Indian and Alaska Native": "Native\nAmerican",
    "Asian": "Asian\nAmerican",
    "Native Hawaiian and Other Pacific Islander": "Pacific\nIslander",
    "Some other race": "Other",
    "Two or more races": "2+ Races",
    "Hispanic or Latino origin (of any race)": "Hispanic\nLatino",
    "White alone, not Hispanic or Latino": "White\n(Non-Hispanic)"
  };
  
  for (let r = 0; r < baseTable.getRowCount(); r++) { // For loop that runs for each row
    let value = baseTable.getString(r, 0); // Get the value (race name) from the table
    //used to keep the formating of the titles in the pie and bar graphs
    if (raceShortNames[value]) { //if the value of raceShortnames at the index is valid
      raceArray.push(raceShortNames[value]); //push the value of raceShortNames to raceArray
    } 
    else { //otherwise
      raceArray.push(value); //keep the original name
    }
  }
}


function drawBarGraph(state){ //drawBarGraph function that takes in the parameter of the state
  push(); //push to keep all changes within drawBar
  noStroke(); //noStroke
  fill(255, 255, 255); //color is white
  rect(offset, height*0.1, width-(offset*2), height*0.35); //white rectangle for the bargraph
  
  let max = incomeArray[state][0]; //max is the first value in the incomeArray for that state

  for (let i = 0; i < incomeArray[state].length; i++){ //for loop that runs for each value in come Array
    stateIncomeArray[i] = incomeArray[state][i]; //an 1D array stateIncomeArray to hold the 2D values of each state's values 
    if(stateIncomeArray[i]>max && (stateIncomeArray[i] != "N" && stateIncomeArray[i] != "-")){ //if the element in the stateIncomeArray is larger than the max and is not N or -
      max = stateIncomeArray[i]; //then set it as new max
    }
  }
  max += max/4; //max is equal to 1.25 itself
  
  drawBar(max); //call drawBar function passing the max into it
  pop(); //pop to keep all changes within drawBar
}


function drawBar(max){ //drawBar function that takes in the parameter of the max from drawBarGraph function 
  push(); //push to keep all changes within drawBar
  
  let totalWidth = width - (offset * 2); //Total width
  let numBars = stateIncomeArray.length; //Number of bars to display
  let barWidth = totalWidth / (numBars + (numBars - 1) * 0.5); //Adjusted width with gap in mind
  let barGap = barWidth * 0.4; //Calculate the gap as a percentage of the width
  
  let graphStart = height * 0.1; //Starting Y position for the graph
  let graphHeight = height * 0.35; //Height of the graph area

  for (let i = 0; i < stateIncomeArray.length; i++) { //for loop that runs for all stateIncomeArray elements 
    let value = stateIncomeArray[i]; //value for the current bar
    
    if(isNaN(value)){ //if the value is not a number
      value = 0; //then et value to 0 if data is missing
    }
    
    let barHeight = (value / max) * graphHeight; //Scale the height proportionally to the max
    fill(0, 0, 255); //set color to blue
    
    rect( //creating the bar
      offset + barGap + i * (barWidth + barGap), //start of each bar, accounting of the barWidth and barGap
      graphStart + graphHeight - barHeight, //height of each bar, based on the percentage of its income by the max income 
      barWidth, //Width of the bar
      barHeight //Height of the bar
    );
    
    textSize(canvasSize/40); // Set text size
    textAlign(CENTER, BOTTOM); // Align the text to the center horizontally and bottom vertically

    
    fill(0, 0, 0); //set color to black

    if (value == 0) {    //if the data is missing, then
      text("Data not\navailable", //Text when data is missing
           offset + i * (barWidth + barGap) + (barWidth*0.9), //center of the bar
           graphStart + graphHeight - barHeight-offset); //above the box
    }
    
    else {    //if the data is not missing, then
    //show the mediam income at the top of the bar
      text("$" + value.toLocaleString(), //Format the income with commas
           offset + i * (barWidth + barGap) + (barWidth*0.9), //center of the bar
           graphStart + graphHeight - barHeight); //above the bars
    }
  
    //show the type of medium income 
    textAlign(CENTER, TOP); // Align the text to the center horizontally and top vertically
    text(raceArray[i], //Race name from the raceArray[i]
         offset + i * (barWidth + barGap) + (barWidth*0.9), //center of the bar
         graphStart + graphHeight ); //below the bars
  }
}


function drawPieChart(state){ //drawPieChart function that creates the pieChart
  push();//push to keep all changes within drawPieChart
  let diameter = width * 0.3; //diameter is proportional to the canvas size

  calculatePie(state); //Call calculatePie to get the total and stateDistArray values

  let lastAngle = 0; // Initialize lastAngle before the loop
  
  for (let i = 0; i < stateDistArray.length; i++) { //Loop through stateDistArray
    let value = stateDistArray[i]; // Get the current value
    
    if (isNaN(value)) { //Check if value is NaN and set it to 0
      value = 0;
    }

    let angle = (value / total) * 360; //Calculate the angle for each segment
    
    // Draw the pie slice
    fill(colors[i]); //fill with the color
    arc(
      width * 0.3, //x is proportional to the canvas
      height * 0.75, //y is proportional to the canvas
      diameter, //size is proportional to canvas
      diameter, //size is proportional to canvas
      radians(lastAngle), //Convert to radians
      radians(lastAngle + angle) //Convert to radians
    );
    
    lastAngle += angle; // Update lastAngle for the next slice
  }
  stroke(0); //stroke color is black
  strokeWeight(diameter*0.005); //weight is proportional to the canvas
  noFill(); //no color
  circle(width * 0.3, height * 0.75, (diameter*1.005)); //circle outline of the pie chart
  pop(); //pop to keep all changes within calculatePie

  legendBox(state, colors); //call the legendBox function for the legend
  
}


function calculatePie(state){
  push(); //push to keep all changes within calculatePie

  total = 0; // Reset total before recalculating
  
  // Fill stateDistArray with values and calculate total
  for (let i = 0; i < distArray[state].length - 2; i++) { // Adjusted to correctly loop over values
    stateDistArray[i] = distArray[state][i + 1]; // Populate stateDistArray
    
    let value = stateDistArray[i]; //variable to hold the value at stateDistArray at index i
    
    if (isNaN(value)) { //if the value is not a number
      value = 0; //set value equal to 0
    }
    total += value; //Add value to total
  }
  pop(); //pop to keep all changes within calculatePie
}


function legendBox(state) {
  push(); //push to keep all changes within legendBox

  let boxX = width * 0.5; //X position of the legend to the right of the pie chart 
  let boxY = height * 0.54; //Y position of the legend to at the same height as the pie chart  width * 0.3 
  let boxWidth = width*0.4; //Width of the box
  let boxHeight = height*0.42; //Height of the box

  // Draw the legend box
  fill(125); //gray background for the box
  stroke(0); //Black border
  rect(boxX, boxY, boxWidth, boxHeight, 25); // Draw a gray rounded rectangle

  fill(0); // Black text
  textSize(canvasSize/25); // Set font size
  textAlign(LEFT, TOP); // Align text to the left and top
  text("Race Breakdown:", boxX + 10, boxY + 10); //Title of the legend box 
  
  let yOffset = (height*0.42)*0.1; //Start Y position for the race names and percentages

  for (let i = 0; i < stateDistArray.length; i++) { //Loop through stateDistArray
    let value = stateDistArray[i]; // Get the current value
    
    if (isNaN(value)) { //if the value is not a number
      value = 0; //set the value to 0
    }

    let percentage = (value / total) * 100; // Calculate percentage

    // Display race and percentage in the box
    fill(colors[i % colors.length]); // Set color for the race
    
    let raceArrayCopy = [...raceArray]; //shallow copy of raceArray to not mess with the formatting of the bar graph
    
    raceArrayCopy[i+1] = raceArrayCopy[i+1].replace("\n", " ");  //replace the \n in the raceArray for better formating
    
    strokeWeight(canvasSize/(canvasSize*0.6)); // Set stroke weight for a thicker outline
    
    if(percentage == 0){ //if the percentage is 0
      text(raceArrayCopy[i+1] + ": Data not available", boxX + 10, boxY + 10+ yOffset); //then the data is not available
    }
    else{ //otherwise
      text(raceArrayCopy[i+1] + ": " + percentage.toFixed(1) + "%", boxX + 10, boxY + 10 +yOffset); //Display race and percentage
    }
    
    yOffset += (height*0.42)*0.1; //Increment yOffset for next race
  }
  pop(); //pop to keep all changes within legendBox
}