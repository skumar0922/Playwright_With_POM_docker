import test, { expect } from "@playwright/test";

test('PATCH Request : Update User', async ({ request }) => {
    const baseURL = 'https://reqres.in/api/users/2'; // Define the endpoint
  
    // Define the payload for the PATCH request
    const payload = {
      name: 'morpheus',
      job: 'zion resident',
    };
  
    // Send the PATCH request
    const response = await request.patch(baseURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: payload, // Attach the payload
    });
  
    // Assert response status
    expect(response.status()).toBe(200); // 200 means the request was successful
  
    // Parse the response body as JSON
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);
  
    // Assertions for the response body
    expect(responseBody).toHaveProperty('name', 'morpheus');
    expect(responseBody).toHaveProperty('job', 'zion resident');
    expect(responseBody).toHaveProperty('updatedAt'); // Ensure updated timestamp exists
  });