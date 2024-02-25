const cards = document.querySelectorAll('.card');
console.log('hello')
cards.forEach(card => {
  // Exercise recommendation
  const bodyPartSelect = document.querySelector('#body-part');
  const recommendExerciseBtn = document.querySelector('.recommend-exercise-btn');
  recommendExerciseBtn.addEventListener('click', () => {
    const selectedBodyPart = bodyPartSelect.value;
    displaydata(selectedBodyPart);
  });


  // Diet plan recommendation
  const dietForm = cardBack.querySelector('#diet-form');
  dietForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    // Replace this with your actual API call for diet recommendations
    const recommendedDiet = getDietPlan(height, weight, age);
    // Display the recommended diet plan in the card somehow
    console.log('Recommended diet plan for', height, 'cm,', weight, 'kg,', age, 'years:', recommendedDiet);
  });
});

async function getExercisesForBodyPart(bodyPart) {
  const url = `https://work-out-api1.p.rapidapi.com/search?Muscles=${bodyPart}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '77c4df35admsh3ebeb87e58bd4a5p14f297jsn98ec9dc165fb',
      'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function displaydata(x) {
  const container = document.querySelector("#recommended-exercises");
  container.innerHTML = '';
  let data =await getExercisesForBodyPart(x);
  if (!data) { return; }
  data = JSON.parse(data);

  for (let i = 0; i < 3 && i < data.length; i++) {
    const exercise = data[i];
    const html = `
      <div>
        <p>Muscle: "${exercise.Muscles}"</p>
        <p>Work Out: "${exercise.WorkOut}"</p>
        <p>Sets: "3-4"</p>
        <p>Reps: "8-12"</p>
        <p>Breaks: 1</p>
        <p>Equipments: "${exercise.Equipment}"</p>
        <p>Explanation: "${exercise.Explaination}"</p>
        <br></br>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  }
}



async function getDietPlan(height, weight, age) {
  const url = 'https://mega-fitness-calculator1.p.rapidapi.com/tdee?weight=81&height=172&activitylevel=ma&age=26&gender=male';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2bca16261amshd1c699c1f492828p1921cejsn0ab8e79d46fe',
      'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  //     return {
  //         meals: [
  //             { breakfast: "Oatmeal with fruit", lunch: "Salad", dinner: "Chicken and vegetables" }
  //         ]
  //     };
}
