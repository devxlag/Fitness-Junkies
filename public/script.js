//M.AutoInit();
    /*    async function loadListing(){
    //makes a request to the pokemon listing API url
    //gets the data from the request and sends it to displayListing()
        
          let muscles = await fetch('https://wger.de/api/v2/muscle', {
              method: 'GET',
              //body: new FormData(),
            }).then(response => response.json())
        .then(data => {
            console.log(data.results);
            displayListing(data.results);
      });

      }
    
     loadListing();

      function displayListing(muscles){
          //receives an array of pokemon objects and displays it on the page in #listing
          let results = document.querySelector('#listing');
          //add html code inside of result

          let html = '';// create html string
          for(let record of muscles){
              //build html string
              console.log(record);
              html += `
                <a href="#listing" id=${record.name}>${record.name} </a>
                <img href="${record.image_url_main}" alt="${record.name}">
              `;
          }
          results.innerHTML = html;//add html string to DOM
      }

*/
document.getElementById("bigbutton").onclick = function(){
    let food = document.getElementById("textarea1").value; 
    getRecipe(food);
  }

 async function getRecipe(food){
  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
const clientID = "9dccf6f6";
const app_key = "aac177748420f51c660a6f9eb6d5879d"

let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=${clientID}&app_key=${app_key}`, requestOptions)
let result = await response.json(); //.then(response => response.json())
  console.log(result); 
  useApiData(result); 
//.then(response => response.text())
  //.then(result => console.log(result))
  //.catch(error => console.log('error', error));
}

  
 function useApiData(data){
/*<p><a href="${data.hits[0].recipe.url}">More Details </a></p>*/
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
  html += `
  <div class="row">
    <div class="col s12 m7">
      <div  class="card ">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${data.hits[i].recipe.images.REGULAR.url}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${data.hits[i].recipe.label}<i class="material-icons right">more_vert</i></span>
       
        <div class="card-action">
          <a id="details" href="${data.hits[i].recipe.url}" target="_blank">Detailed Instructions<i class="material-icons">call_made</i></a>
        </div>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${data.hits[i].recipe.label}<i class="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
      </div>
    </div>
  </div>
</div>
 `;
  };
  card.innerHTML = html;}
 }

  document.getElementById("myButton").onclick = function(){
    let am = document.getElementById("myText1").value; 
    let w = document.getElementById("myText2").value; 
    getBurndedCalories(am,w);
  }

  async function getBurndedCalories(am,w){
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


  







  /*
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
  

    const res = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
      'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
    }
  };

  fetch('https://fitness-calculator.p.rapidapi.com/food?foodid=SR25_1_1', res)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


    const ops = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
    'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
  }
};

fetch('https://fitness-calculator.p.rapidapi.com/foodids?subtablename=Fo1_2', ops)
  .then(response => response.json())
  .then(response => console.log(response))
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



const tions = {
method: 'GET',
headers: {
    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
    'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
}
};

fetch('https://fitness-calculator.p.rapidapi.com/activities?intensitylevel=3', tions)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
*/