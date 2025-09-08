#!/usr/bin/env node

/**
 * Debug script to test the addUserRecipe API endpoint
 * Run this with: node debug-add-recipe.mjs
 */

const API_BASE = 'http://localhost:3001';

async function testAddRecipeAPI() {
  console.log('🔍 Testing addUserRecipe API endpoint...\n');

  try {
    // Test the API endpoint directly
    console.log('📡 Making request to /api/user/recipes...');
    
    const response = await fetch(`${API_BASE}/api/user/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spoonacularId: 123456,
        status: 'liked'
      }),
    });

    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
    console.log('📋 Response Headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📄 Raw Response:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('📦 Parsed Response Data:', JSON.stringify(responseData, null, 2));
    } catch (parseError) {
      console.error('❌ Failed to parse response as JSON:', parseError.message);
    }

    if (!response.ok) {
      console.log('\n🚨 ERROR ANALYSIS:');
      console.log(`Status Code: ${response.status}`);
      
      if (response.status === 401) {
        console.log('❌ Authentication Error: User is not authenticated with Clerk');
        console.log('💡 Solution: Ensure the user is signed in before making this request');
      } else if (response.status === 404 && responseData?.error?.includes('onboarding')) {
        console.log('❌ User Profile Error: User exists in Clerk but not in database');
        console.log('💡 Solution: User needs to complete the onboarding process');
      } else if (response.status === 503) {
        console.log('❌ Database Connection Error: Cannot connect to database');
        console.log('💡 Solution: Check database connection and credentials');
      } else {
        console.log(`❌ Unexpected Error: ${responseData?.error || 'Unknown error'}`);
      }
    } else {
      console.log('\n✅ SUCCESS: Recipe added to user collection successfully!');
    }

  } catch (networkError) {
    console.error('\n💥 Network Error:', networkError.message);
    console.log('💡 Possible causes:');
    console.log('  - Development server is not running');
    console.log('  - Wrong port number');
    console.log('  - Firewall blocking the request');
  }
}

// Also test if the server is running
async function testServerHealth() {
  console.log('🏥 Testing server health...');
  
  try {
    const response = await fetch(`${API_BASE}/`);
    if (response.ok) {
      console.log('✅ Server is running and responding');
    } else {
      console.log(`⚠️  Server responded with status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Server is not responding:', error.message);
  }
  
  console.log('');
}

// Run the tests
(async () => {
  await testServerHealth();
  await testAddRecipeAPI();
  
  console.log('\n📝 SUMMARY:');
  console.log('The "Failed to add recipe to user collection" error can occur due to:');
  console.log('1. ❌ User not authenticated (401)');
  console.log('2. ❌ User not in database - needs onboarding (404)');
  console.log('3. ❌ Database connection issues (503)');
  console.log('4. ❌ Invalid request data (400)');
  console.log('5. ❌ Duplicate recipe status (409)');
  console.log('\n🔧 The fix implemented:');
  console.log('- Added UserCheck component to dashboard layout');
  console.log('- Enhanced error messages with specific details');
  console.log('- Added database connection testing');
  console.log('- Improved client-side error handling');
})();
