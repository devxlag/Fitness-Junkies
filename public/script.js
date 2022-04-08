M.AutoInit();

var exclude = [];
var include = [];
var healthFrag = "";
var dietFrag = "";
var incFrag = "";
var excFrag = "";
var goal ="";
var mealTypes = ["Breakfast","Lunch", "Dinner", "Snack"];
var level = 0;

var balanced = false;
var highprotien = false;
var lowcarb = false;
var lowfat = false;
var lowsodium = false;
var highfibre = false;

console.log(balanced);
console.log(highfibre);
console.log(highprotien);
console.log(lowcarb);
console.log(lowfat);
console.log(lowsodium);

function Checkme(){
  if(document.getElementById('balancedStat').checked){
    balanced = true;
  }
  else{
    balanced = false;
  }
  console.log(balanced);
 
  if(document.getElementById('fibreStat').checked){
    highfibre = true;
  }
  else{
    highfibre = false;
  }
  console.log(highfibre);
  
  if(document.getElementById('protStat').checked){
    highprotien = true;
    
  }
  else{
    highprotien = false;
  }
  console.log(highprotien);
  
  if(document.getElementById('carbStat').checked){
    lowcarb = true;
    
  }
  else{
    lowcarb  = false;
  }
  console.log(lowcarb);
  
  if(document.getElementById('fatStat').checked){
    lowfat = true;
    
  }
  else{
    lowfat = false;
  }
  console.log(lowfat);
  
  
  if(document.getElementById('saltStat').checked){
    lowsodium = true;
    
  }
  else{
    lowsodium = false;
  }
  console.log(lowsodium);

}

function dietURL(){
  dietFrag = "";

  if(balanced === true){
    dietFrag = dietFrag.concat("&diet=balanced");
  }
  if(highprotien === true){
    dietFrag = dietFrag.concat("&diet=high-protein");
  }
  if(lowcarb === true){
    dietFrag = dietFrag.concat("&diet=low-carb");
  }
  if(lowfat === true){
    dietFrag = dietFrag.concat("&diet=low-fat");
  }
  if(lowsodium === true){
    dietFrag = dietFrag.concat("&diet=low-sodium");
  }
  if(dietFrag === ""){
    dietFrag = dietFrag.concat("&diet=balanced");
  }
}


async function getMacros(){
  let gender = document.getElementById("t1").value;
  let age = document.getElementById("t2").value;
  let height = document.getElementById("t3").value;
  let weight = document.getElementById("t4").value;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
      'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
    }
  };

  let response = await fetch(`https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${level}&goal=${goal}`, options)
  let result = await response.json();
  console.log(result);
  UseMacrosData(result);
}

async function UseMacrosData(macros){

  var pro = Math.round(macros.data.balanced.protein);
  var carbs = Math.round(macros.data.balanced.carbs);
  var fat = Math.round(macros.data.balanced.fat);

  console.log(pro);
  console.log(fat);
  console.log(carbs);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const clientID = "9dccf6f6";
  const app_key = "aac177748420f51c660a6f9eb6d5879d"
  for(i in mealTypes){
    let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=${clientID}&app_key=${app_key}&mealTypes=${mealTypes[i]}&nutrients%5BCHOCDF%5D=${carbs}&nutrients%5BFAT%5D=${fat}&nutrients%5BPROCNT%5D=${pro}`, requestOptions)
    let result = await response.json(); //.then(response => response.json())
    console.log(result); 
  }//useApiData(result); */
}

function GetSelectedGoal(){
    //console.log("hello");
    var e = document.getElementById("goal");
    goal = e.options[e.selectedIndex].value;
    console.log(goal);
    //document.getElementById("result").innerHTML = result;
  }
function GetSelectedLevel(){
    //console.log("hello");
    var e = document.getElementById("level");
    level = e.options[e.selectedIndex].value;
    console.log(level);
    //document.getElementById("result").innerHTML = result;
}
 

async function getRecipe(){
  dietURL();
  let food = document.getElementById("textarea1").value;
  let calories = document.getElementById("textarea2").value;
  if(calories === "")
    calories = 1000;


    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const clientID = "9dccf6f6";
  const app_key = "aac177748420f51c660a6f9eb6d5879d"

  let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${food}${dietFrag}&app_id=${clientID}&app_key=${app_key}&calories=${calories}`, requestOptions)
  let result = await response.json(); //.then(response => response.json())
  console.log(result); 
  useApiData(result); 

}

  
 function useApiData(data){

  let card = document.querySelector("#content");  
  let html = '';

  var output = `<div class = "container">`;
  if(data.count == 0){
    output += `<div class="row">
      <div class="col s12 l6 m6 x14 l6 offset-m3 offset-l2 offset-xl3">
      <div class="card-panel green darken-3" style="text-align: center">
      <span class="white-text">No recipes found. Please include at least one (1) ingredient.<br><br>Don't forget to + your ingredients!</span>
      </div>
      </div>
      </div>`;
      document.getElementById('searchResults').innerHTML = output;
  }
  else{
  for(i in data.hits){

  var dlabels = ``;
  for(j in data.hits[i].recipe.dietLabels){
    dlabels +=  `${data.hits[i].recipe.dietLabels[j]}`+`<br>`;
  }
  var hlabels = ``;
  for(k in data.hits[i].recipe.healthLabels){
    hlabels += `${data.hits[i].recipe.healthLabels[k]}`+`<br>`;
  }
  html += `
  <div class="row">
    <div class="col s12 m7">
      <div  class="card ">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${data.hits[i].recipe.images.REGULAR.url}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${data.hits[i].recipe.label}<i class="material-icons right">more_vert</i></span>
        </div> 
        <div class="card-action">
          <a id="details" href="${data.hits[i].recipe.url}" target="_blank">Detailed Instructions<i class="material-icons">call_made</i></a>
        </div>
     
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${data.hits[i].recipe.label}<i class="material-icons right">close</i></span>
        <p>Diet Labels:</p>
        <p>${dlabels}</p>
        <p>Health Labels:</p>
        <p>${hlabels}</p>
        
      </div>
    </div>
  </div>
</div>
 `;
  };
  card.innerHTML = html;}
 }

/*
async function getBurndedCalories(){

   
  //document.getElementById("myButton").onclick = function(){
  let am = document.getElementById("myText1").value; 
  let w = document.getElementById("myText2").value; 
    //getBurndedCalories(am,w);
  //};
  const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
        'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
      }
    };
  let response =  await fetch(`https://fitness-calculator.p.rapidapi.com/burnedcalorie?activityid=bi_1&activitymin=${am}&weight=${w}`, options)
  let result = await response.json(); //.then(response => response.json())
  console.log(result.data.burnedCalorie);  //.then(response => console.log(response))
    
  let r = document.querySelector('#res');  
  let html = '';
  html += `<p id="res">${result.data.burnedCalorie}<p>`;
  r.innerHTML = html;
  }

  const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
  }
};

fetch('https://exercisedb.p.rapidapi.com/exercises', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


    const result = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
      'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
    }
  };

  fetch('https://fitness-calculator.p.rapidapi.com/bmi?age=25&weight=65&height=180', result)
    .then(response => response.json())
    .then(response => console.log(response.data.bmi))
    .catch(err => console.error(err));
  

const op = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
      'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
    }
  };

fetch('https://fitness-calculator.p.rapidapi.com/dailycalorie?age=25&gender=male&height=180&weight=70&activitylevel=level_3', op)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));


*/
