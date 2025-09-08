// Simple test script to debug the addUserRecipe function
const testAddRecipe = async () => {
  try {
    console.log('Testing addUserRecipe function...');
    
    const response = await fetch('http://localhost:3001/api/user/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        spoonacularId: 123456, 
        status: 'liked' 
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('Response data:', responseData);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
    }
    
    if (!response.ok) {
      console.error('Request failed with status:', response.status);
      console.error('Error data:', responseData);
    } else {
      console.log('Request successful!');
    }
    
  } catch (error) {
    console.error('Network error:', error);
  }
};

testAddRecipe();
