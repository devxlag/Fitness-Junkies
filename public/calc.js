M.AutoInit();

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elems, {coverTrigger:false});
});

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  async function getBMI(){

    let age = document.getgetElementById("").value;
    let height = document.getgetElementById("").value; 
    let weight = document.getElementById("").value; 
     
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
          'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
        }
      };
    let response =  await fetch(`ttps://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`, options)
    let result = await response.json();
    console.log(result.data.bmi);  
      
    let bmi = document.querySelector('');  
    let html = '';
    html += `${result.data.bmi}${result.data.health}${result.data.healthy_bmi_range}`;
    bmi.innerHTML = html;
  }

  //Daily Calories Calculator
/*
async function getCalories(){

  let age = document.getgetElementById("").value;
  let gender = document.getgetElementById("").value;
  let height = document.getgetElementById("").value; 
  let weight = document.getElementById("").value; 
  let level = document.getElementById("").value;
   
  const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
        'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
      }
    };
  let response =  await fetch(`https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&height=${height}&weigth=${weight}&activitylevel=${level}`, options)
  let result = await response.json(); 
  console.log(result.data); )
    
  let calories = document.querySelector('');  
  let html = '';
  html += `${result.data.BMR}
            ${result.data.goals['maintain weight']}
              ${result.data.goals['Mild weight loss']['loss weight']}
              ${result.data.goals['Mild weight loss']['calory']}
              ${result.data.goals['Weight loss']['loss weight']}
              ${result.data.goals['Weight loss']['calory']}
              ${result.data.goals['Extreme weight loss']['loss weight']}
              ${result.data.goals['Extreme weight loss']['calory']}
              ${result.data.goals['Mild weight gain']['gain weight']}
              ${result.data.goals['Mild weight gain']['calory']}
              ${result.data.goals['Weight gain']['gain weight']}
              ${result.data.goals['Weight gain']['calory']}
              ${result.data.goals['Extreme weight gain']['gain weight']}
              ${result.data.goals['Extreme weight gain']['calory']}
              `;
  calories.innerHTML = html;
  
}*/
/*
//Body Fat
async function getBodyFat(){

  let age = document.getgetElementById("").value;
  let gender = document.getgetElementById("").value;
  let height = document.getgetElementById("").value; 
  let weight = document.getElementById("").value; 
  let waist = document.getElementById("").value;
  let neck = document.getElementById("").value
  let hips = document.getElementById("").value;
   
  const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
        'X-RapidAPI-Key': 'e6c22e8e13mshf7acf532fb1d00cp148c62jsn39fb0852a2ae'
      }
    };
  let response =  await fetch(`https://fitness-calculator.p.rapidapi.com/bodyfat?age=${age}&gender=${gender}&weight=${weight}&height=${height}&neck=${neck}&waist=${waist}&hip=${hips}`, options)
  let result = await response.json(); 
  console.log(result)
    
  let bodyfat = document.querySelector('');  
  let html = '';
  html += `
            ${result.data.goals['Body Fat (U.S. Navy Method)']}
              ${result.data['Body Fat Category']}
              ${result.data['Body Fat Mass']}
              ${result.data['Lean Body Mass']}
              ${result.data['Body Fat (BMI method)']}`;
              
  calories.innerHTML = html; 
}*/