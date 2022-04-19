M.AutoInit();

/*
function submit(event){
  event.preventDefault();//prevents page redirection    
 }
 //attach the submit function to the submit event of myForm    
 document.forms['myForm1'].addEventListener('submit', submit);
 document.forms['myForm2'].addEventListener('submit', submit);
*/
var level = "";
var gender = "";

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elems, {coverTrigger:false});
});


var btn = $('#myybutton');

$(window).scroll(function() {
  if ($(window).scrollTop() > 50) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

  
function GetSelectedLevel(){
  var e = document.getElementById("level");
  level = e.options[e.selectedIndex].value;
  console.log(level);
}

function GetSelectedGender(){
  var e = document.getElementById("gender");
  gender = e.options[e.selectedIndex].value;
  console.log(gender);
}

//Fetch BMI 
async function getBMI(){

  let age = document.getElementById("age1").value;
  let height = document.getElementById("height1").value; 
  let weight = document.getElementById("weight1").value; 
  let html ='';
  if(age === "" || weight === "" || height === ""){
    html += `<br><br><br>
            <div class = "container">
                <div class="row">
                <div class="col s12 l6 m6 x14 l6 offset-m3 offset-l2 offset-xl3">
                  <div class="card-panel blue lighten-4">
                  <p style = "text-align: center;">Please enter valid values and/or fill all fields.</p>
                  </div>
                </div>
              </div>
            </div>`;

    document.getElementById('res1').innerHTML = html;
    $('body, html').animate({ scrollTop: $("#res1").offset().top }, 1000);
  }
  else{    
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
          'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
        }
    };
    let response =  await fetch(`https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`, options)
    let result = await response.json();    
    displayBMI(result);
  }
}

//Display BMi Results
function displayBMI(result){

  let BMI = document.getElementById('res1');
  let html = '';
  if(result.data.bmi < 18.5){     
    recommend  = "Weighing too little can contribute to a weakened immune system, fragile bones and feeling tired.<br><br>Talk with your healthcare provider to determine possible causes and implications of your being underweight.";
  }
  else if(result.data.bmi >= 18.5 && result.data.bmi < 24.9){    
    recommend = "Maintaining a healthy weight can reduce the risk of chronic diseases associated with being overweight or obese. It can also reduce weakening of the immune system and feelings of fatigue associated with being underweight";
  }
  else if(result.data.bmi > 24.9 && result.data.bmi < 29.9){
    recommend = "People who are overweight are at higher risk for chronic conditions such as high blood pressure, diabetes, and high cholesterol.<br><br>Anyone who is overweight should try to avoid gaining additional weight. Additionally, if you are overweight with other risk factors (such as high LDL cholesterol, low HDL cholesterol, or high blood pressure), you should try to lose weight. Even a small weight loss (just 10% of your current weight) may help lower the risk of disease. Talk with your healthcare provider to determine appropriate ways to lose weight.";
  }
  else if(result.data.bmi > 30){      
    recommend = "Obesity is a complex disease involving an excessive amount of body fat. Obesity isn't just a cosmetic concern. It is a medical problem that increases your risk of other diseases and health problems, such as heart disease, diabetes, high blood pressure and certain cancers.<br><br>People who are overweight or obese are at higher risk for chronic conditions such as high blood pressure, diabetes, and high cholesterol.<br><br>Anyone who is overweight should try to avoid gaining additional weight. Additionally, if you are overweight with other risk factors (such as high LDL cholesterol, low HDL cholesterol, or high blood pressure), you should try to lose weight. Even a small weight loss (just 10% of your current weight) may help lower the risk of disease. Talk with your healthcare provider to determine appropriate ways to lose weight.";
  }
      
  html += `<br><br><br>
          <div class = "container">
            <div class="row">
              <div class="col s12 l6 m6 x14 l6 offset-m3 offset-l2 offset-xl3">
                 <div class="card-panel blue lighten-4">
                  <p>Your BMI is: ${result.data.bmi}<br><b>This indicates your weight is in the ${result.data.health} category of your height.</b>
                  <br><br>${recommend}<br><br></p>
                </div>
                <p style="color: black">Stay healthy with some recipes from our <a id="foodredir" href="meal.html">Meals Search</a> or <a id="foodredir" href="macros.html">Macro Meal Planner</a> page!</p>
              </div>
            </div>
          </div>`;
  BMI.innerHTML = html;
  $('body, html').animate({ scrollTop: $("#res1").offset().top }, 1000); 
}

//Daily Calories Calculator
async function getCalories(){

  let age = document.getElementById("age3").value;
  let height = document.getElementById("height3").value; 
  let weight = document.getElementById("weight3").value; 
  let html ='';
  if(age === ""|| weight === "" || height === "" || gender =="" || level ===""){
    html += `<br><br><br>
            <div class = "container">
                <div class="row">
                <div class="col s12 l6 m6 x14 l6 offset-m3 offset-l2 offset-xl3">
                  <div class="card-panel blue lighten-4">
                  <p style = "text-align: center;">Please enter valid values and/or fill all fields.</p>
                  </div>
                </div>
              </div>
            </div>`;

    document.getElementById('res3').innerHTML = html;
    $('body, html').animate({ scrollTop: $("#res3").offset().top }, 1000);
  }
  else{
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
          'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
        }
    };
    let response =  await fetch(`https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${level}`, options)
    let result = await response.json(); 
    displayDCR(result);
  }
}

function displayDCR(result){
  let calories = document.getElementById('res3');  
  let html = '';
  html += ` <br><br><br>
            <div class = "container center">
              <div class="row">
                <div class="col s12 l6 m6 x14 l6 offset-m3 offset-l2 offset-xl3">
                  <div class="card-panel blue lighten-4">
                    <p>Your Basal Metabolic Rate is: ${(result.data.BMR).toFixed(0)}<br>
                    <b>Daily Maintainence Calories: ${(result.data.goals['maintain weight']).toFixed(0)}</b><br>
                    <b>Mild Weight Loss(${result.data.goals['Mild weight loss']['loss weight']}) Calories: ${(result.data.goals['Mild weight loss']['calory']).toFixed(0)} </b><br>
                    <b>Weight Loss(${result.data.goals['Weight loss']['loss weight']}) Calories: ${(result.data.goals['Weight loss']['calory']).toFixed(0)} </b><br>
                    <b>Extreme Weight Loss(${result.data.goals['Extreme weight loss']['loss weight']}) Calories: ${(result.data.goals['Mild weight loss']['calory']).toFixed(0)} </b><br>
                    <b>Mild Weight Gain(${result.data.goals['Mild weight gain']['gain weight']}) Calories: ${(result.data.goals['Mild weight gain']['calory']).toFixed(0)} </b><br>
                    <b>Weight Gain(${result.data.goals['Weight gain']['gain weight']}) Calories: ${(result.data.goals['Mild weight gain']['calory']).toFixed(0)} </b><br>
                    <b>Extreme Weight Gain(${result.data.goals['Extreme weight gain']['gain weight']}) Calories: ${(result.data.goals['Extreme weight gain']['calory']).toFixed(0)} </b><br>
                    <p>
                  </div>
                  <p style="color: black">Stay healthy with some recipes from our <a id="foodredir" href="meal.html">Meals Search</a> or <a id="foodredir" href="macros.html">Macro Meal Planner</a> page!</p>
                </div>
              </div>
            </div>`;
  calories.innerHTML = html;
  $('body, html').animate({ scrollTop: $("#res3").offset().top }, 1000);
}

//Body Fat Percentage
async function getBodyFat(){
  let age = document.getElementById("age2").value;
  let height = document.getElementById("height2").value; 
  let weight = document.getElementById("weight2").value; 
  let waist = document.getElementById("waist").value;
  let neck = document.getElementById("neck").value
  let hips = document.getElementById("hip").value;
  let html ='';
  if(age === ""|| weight === "" || height === ""|| waist === ""|| neck === "" || hip==="" || gender===""){
    html += `<br><br><br>
            <div class = "container">
                <div class="row">
                <div class="col s12 l6 m6 x14 l6 offset-m3 offset-l2 offset-xl3">
                  <div class="card-panel blue lighten-4">
                    <p style = "text-align: center;">Please enter valid values and/or fill all fields.</p>
                  </div>
                </div>
              </div>
            </div>`;

    document.getElementById('res2').innerHTML = html;
    $('body, html').animate({ scrollTop: $("#res2").offset().top }, 1000);
  }
  else{
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
          'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
        }
      };
    let response =  await fetch(`https://fitness-calculator.p.rapidapi.com/bodyfat?age=${age}&gender=${gender}&weight=${weight}&height=${height}&neck=${neck}&waist=${waist}&hip=${hips}`, options)
    let result = await response.json(); 
    displayBFP(result);
  }
}

function displayBFP(result){ 
  let html = '';
  html += `<br><br><br>
          <div class = "container">
            <div class="row">
              <div class="col s12 l6 m6 x14 l6 offset-m3 offset-l2 offset-xl3">
                <div class="card-panel blue lighten-4">
                  <p>Your Body Fat Category: ${result.data['Body Fat Category']}<br>
                  <b>Body Fat (U.S. Navy Method): ${(result.data['Body Fat (U.S. Navy Method)']).toFixed(0)} %</b><br>
                  <b>Body Fat Mass:  ${result.data['Body Fat Mass']} KG</b><br>
                  <b>Lean Lean Body Mass: ${result.data['Lean Body Mass']} KG</b><br>
                  <b>Body Fat (BMI method): ${(result.data['Body Fat (BMI method)']).toFixed(0)} %</b><br>
                  </p>
                </div>
                <p style="color: black">Stay healthy with some recipes from our <a id="foodredir" href="meal.html">Meals Search</a> or <a id="foodredir" href="macros.html">Macro Meal Planner</a> page!</p>
              </div>
            </div>
          </div> `;
              
  document.getElementById('res2').innerHTML = html;
  $('body, html').animate({ scrollTop: $("#res2").offset().top }, 1000);
}

async function getJoke(){

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  let response = await fetch(`https://api.spoonacular.com/food/jokes/random?&apiKey=9e2aa0c0c1864afeae040f883e224c38`, options)
  let result = await response.json();
  writeJoke(result);
}

function writeJoke(data){
  let html = "";
  html+=`<p style="text-align: center;">${data.text}</p>`;
  document.getElementById('joke').innerHTML = html;
}