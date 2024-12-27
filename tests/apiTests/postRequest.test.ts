import test, { expect } from "@playwright/test";

test("Post Request", async ({ request }) => {
    const baseURL = 'https://reqres.in/api/users'; // Define the endpoint
    const payload = {
      name: 'John Doe',
      job: 'Software Developer',
    };
  
    // Make the POST request
    const response = await request.post(baseURL, {
      headers: {
        Accept: 'application/json', // Set headers
      },
      data: payload, // Attach the payload
    });
  
    // Assert response status
    expect(response.status()).toBe(201);
  
    // Parse the response body as JSON
    const responseBody = await response.json();

    // Print the response body
    console.log('Response Body:', responseBody);
  
    // Assertions for the response body
    expect(responseBody).toHaveProperty('name', 'John Doe');
    expect(responseBody).toHaveProperty('job', 'Software Developer');
    expect(responseBody).toHaveProperty('id'); 
    expect(responseBody).toHaveProperty('createdAt'); 
  });
