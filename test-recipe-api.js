const fetch = require('node-fetch');

async function testRecipeAPI() {
  try {
    console.log('Testing recipe API...');
    const response = await fetch('http://localhost:3000/api/recipes/716429');
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return;
    }
    
    const data = await response.json();
    
    console.log('Recipe Title:', data.title);
    console.log('Extended Ingredients:', data.extendedIngredients ? 'Present' : 'Missing');
    console.log('Number of ingredients:', data.extendedIngredients?.length || 0);
    console.log('Analyzed Instructions:', data.analyzedInstructions ? 'Present' : 'Missing');
    console.log('Number of instruction sets:', data.analyzedInstructions?.length || 0);
    console.log('Dish Types:', data.dishTypes ? 'Present' : 'Missing');
    console.log('Nutrition:', data.nutrition ? 'Present' : 'Missing');
    
    if (data.extendedIngredients && data.extendedIngredients.length > 0) {
      console.log('First ingredient:', data.extendedIngredients[0].original);
    }
    
    console.log('API test completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testRecipeAPI();
