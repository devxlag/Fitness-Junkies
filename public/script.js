M.AutoInit();

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elems, {coverTrigger:false});
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
/*
async function Test(){
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authentication': 'Bearer eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.fZPCOE6mDM-kK3C-UWpR8ZDzIQgI2TIvtV-irrgDokHltMnHLIej_Aajv6k2uBRul2segtBnXah-_ysuJeFG89lCGTtakCVC.iJwIaSH4fauQzzOaba7e9w.ep7D3nZ1C_xppT0MEs4fIpDU5gsPogGVhVtu0JKmoSEYbidS1EyKmLtneFGxH4t_HlIUdTDPHTbfPtTLU1-6wa8t4ajKAwNxytbtg84nWwBZV3lzhXMzH3FMZsT1UB6uZwXdXOuhZJp75znM-CylI9oBiqo8fK6kp34QF5pIrTo.I8FRQ9lr7BSCVMlMwXq5ripcfwP-hV4suZaGxHtU2GU'
    },
    body: {
      
        "id":"2",
        "name":"Joseph",
        "email":"joseph@gmail.com",
        "google_oauth":{
            "id":"12345",
            "name":"Joseph",
            "email":"joseph@gmail.com"
        }
    
    }
  };
  let response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:tEjNk_X_/user`, options);
  let result = await response.json();
  console.log(result);
}
Test();
*/


var exclude = [];
var include = [];
var healthFrag = "";
var dietFrag = "";
var incFrag = "";
var excFrag = "";
var goal ="";
var mealTypes = ["Breakfast","Lunch", "Dinner", "Snack"];
var level = 0;
var foodlunch = ["chicken", "wrap", "pasta","fish", "tuna", "salmon","rice"];
var foodbreakfast = ["oats", "protein shake","fruits"]

var dishTypesB = ["&dishType=Cereals","&dishType=Egg","&dishType=Pancake"];

var dishTypesL = ["&dishType=Main%20course","&dishType=Salad"];

var dishTypesD = ["&dishType=Salad","&dishType=Soup"];

var dishTypesS = ["&dishType=Desserts","&dishType=Drinks","&dishType=Biscuits%20and%20cookies","&dishType=Sandwiches"];
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

  var cal = (Math.round(macros.data.calorie)/4);

  var pro = Math.round(macros.data.highprotein.protein);
  var carbs = Math.round(macros.data.highprotein.carbs);
  var fat = Math.round(macros.data.highprotein.fat);
  let b  = Math.floor(Math.random() * (2 + 1));
  let l  = Math.floor(Math.random() * (1 + 1));
  let d  = Math.floor(Math.random() * (2 + 1));
  let s  = Math.floor(Math.random() * (3 + 1));


  console.log(d);
  console.log(s);
  console.log(pro);
  console.log(fat);
  console.log(carbs);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const clientID = "9dccf6f6";
  const app_key = "aac177748420f51c660a6f9eb6d5879d"
  //for(i in mealTypes){
    let r1 = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${dishTypesB[b]}&app_id=${clientID}&app_key=${app_key}&mealTypes=Breakfast&nutrients%5BCHOCDF%5D=${carbs}&nutrients%5BFAT%5D=${fat}&nutrients%5BPROCNT%5D=${pro}`, requestOptions)
    let result1 = await r1.json(); //.then(response => response.json())
    console.log(result1);
    displayData(result1,1);

    let r2 = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${dishTypesL[l]}&app_id=${clientID}&app_key=${app_key}&mealTypes=Lunch&nutrients%5BCHOCDF%5D=${carbs}&nutrients%5BFAT%5D=${fat}&nutrients%5BPROCNT%5D=${pro}`, requestOptions)
    let result2 = await r2.json(); //.then(response => response.json())
    console.log(result2);
    displayData(result2,2);

    let r3 = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=${clientID}&app_key=${app_key}${dishTypesD[d]}&mealTypes=Dinner&nutrients%5BCHOCDF%5D=${carbs}&nutrients%5BFAT%5D=${fat}&nutrients%5BPROCNT%5D=${pro}`, requestOptions)
    let result3 = await r3.json(); //.then(response => response.json())
    console.log(result3);
    displayData(result3,3);

    let r4 = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${dishTypesS[s]}&app_id=${clientID}&app_key=${app_key}&mealTypes=Snack&to=40&nutrients%5BCHOCDF%5D=${carbs}&nutrients%5BFAT%5D=${fat}&nutrients%5BPROCNT%5D=${pro}`, requestOptions)
    let result4 = await r4.json(); //.then(response => response.json())
    console.log(result4);
    displayData(result4,4);
   
  //}//useApiData(result); */
}
function displayData(meals,foo){
  if(foo===1){
  let minicard = document.getElementById("searchResults1");  
  let html = '';
  let header = ''; header+=`<h1>Breakfast</h1>`;
  minicard.innerHTML = header;
  for(i in meals.hits){
    html+=`
   
      
      <div class="card" class="media-element">
        <div class="card-image">
          <img src="${meals.hits[i].recipe.images.SMALL.url}">
          <span class="card-title">${meals.hits[i].recipe.label}</span>
          <a href="${meals.hits[i].recipe.url}"target="_blank"class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">open_in_new</i></a>
        </div>
        <div class="card-content">
          <p>I am a very simple card.</p>
        </div>
      </div>
      
    `;
  };
  minicard.innerHTML = html;
}
if(foo===2){
  let minicard = document.getElementById("searchResults2");  
  let html = '';
  
  for(i in meals.hits){
    html+=`
   
    <div class="card" class="media-element">
    <div class="card-image">
      <img src="${meals.hits[i].recipe.images.SMALL.url}">
      <span class="card-title">${meals.hits[i].recipe.label}</span>
      <a href="${meals.hits[i].recipe.url} "target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">open_in_new</i></a>
    </div>
    <div class="card-content">
      <p>I am a very simple card.</p>
    </div>
  </div>
      
    `;
  };
  minicard.innerHTML = html;
}
if(foo===3){
  let minicard = document.getElementById("searchResults3");  
  let html = '';

  for(i in meals.hits){
    html+=`
   
    <div class="card" class="media-element">
    <div class="card-image">
      <img src="${meals.hits[i].recipe.images.SMALL.url}">
      <span class="card-title">${meals.hits[i].recipe.label}</span>
      <a href="${meals.hits[i].recipe.url}" target="_blank"class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">open_in_new</i></a>
    </div>
    <div class="card-content">
      <p>I am a very simple card.</p>
    </div>
  </div>
      
    `;
  };
  minicard.innerHTML = html;
}
if(foo===4){
  let minicard = document.getElementById("searchResults4");  
  let html = '';

  for(i in meals.hits){
    html+=`
   
    <div class="card" class="media-element">
    <div class="card-image">
      <img src="${meals.hits[i].recipe.images.SMALL.url}">
      <span class="card-title">${meals.hits[i].recipe.label}</span>
      <a href="${meals.hits[i].recipe.url}" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">open_in_new</i></a>
    </div>
    <div class="card-content">
      <p>I am a very simple card.</p>
    </div>
  </div>
      
    `;
  };
  minicard.innerHTML = html;
}

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
  let result = await response.json(); 
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

 //BMI Function





//Exercise List
async function Workouts(){
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
		'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
	}
};

  let response = await fetch('https://exercisedb.p.rapidapi.com/exercises', options)
	let result = await response.json()
  console.log(result);
};
Workouts(); 