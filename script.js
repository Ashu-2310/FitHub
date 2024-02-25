const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  const getStartedBtn = card.querySelector('.get-started-btn');
  const cardFront = card.querySelector('.card-front');
  const cardBack = card.querySelector('.card-back');

  getStartedBtn.addEventListener('click', () => {
    card.classList.toggle('flip');
  });

  // Exercise recommendation
  const bodyPartSelect = cardBack.querySelector('#body-part');
  const recommendExerciseBtn = cardBack.querySelector('.recommend-exercise-btn');
  recommendExerciseBtn.addEventListener('click', () => {
    const selectedBodyPart = bodyPartSelect.value;
    getExercisesForBodyPart(selectedBodyPart)
      .then(exercises => {
        // Display the recommended exercises in the card somehow
        console.log('Recommended exercises for', selectedBodyPart, ':', exercises);
        // You can replace this with your logic for displaying the exercises on the card
      });
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

// Replace these functions with your actual API calls and display logic
function getExercisesForBodyPart(bodyPart) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fecf7ee8ccmsh7a924da7236bdfap1b1a46jsne5baff93fdec', // Replace with your actual API key
      'Content-Type': 'application/json'
    }
  };

  const url = `https://rapidapi.com/apininjas/api/exercises-by-muscle-group/${bodyPart}`;

  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      // Extract the exercise names from the response data
      const exerciseNames = data.exercises.map(exercise => exercise.name);
      return exerciseNames;
    })
    .catch(error => {
      console.error('Error fetching exercises:', error);
      return []; // Return an empty array if the API call fails
    });
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
