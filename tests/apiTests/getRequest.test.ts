import test, { expect } from "@playwright/test";

let baseURL = "https://reqres.in/api/users";

test("Get Request", async ({ request }) => {
    const baseURL = 'https://reqres.in/api/users'; 
    const response = await request.get(`${baseURL}?page=2`, {
      headers: {
        Accept: 'application/json', 
      },
    });
  
    // Assert response status
    expect(response.status()).toBe(200);
  
    // Parse response body as JSON
    const responseBody = await response.json();
  
    // Assert the first name of the first user in the "data" array
    expect(responseBody.data[0].first_name).toBe('Michael');
  });

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


  test("Update Request", async ({ request }) => {
    const baseURL = 'https://reqres.in/api/users/2'; // Define the endpoint
    const updatePayload = {
        "name": "morpheus",
        "job": "zion resident"
    };
    
    // Make the POST request
    const response = await request.put(baseURL, {
      headers: {
        Accept: 'application/json', 
      },
      data: updatePayload,
    });
  
    const responseBody = response.json();
    console.log('Response Body:', responseBody);
    console.log("response: ", responseBody);
    expect(await response.status()).toBe(200);
  });


  test("Delete Request", async ({ request }) => {
    const baseURL = 'https://reqres.in/api/users/2'; // Define the endpoint

    // Make the POST request
    const response = await request.delete(baseURL, {
      headers: {
        Accept: 'application/json', 
      }
    });
  
 // check status
    expect(response.status()).toBe(204);

 // Check if the response body is empty 
  const responseBody = await response.body();
  console.log('Response Body:', responseBody.length === 0 ? "No Content" : responseBody);

  // Optionally, assert that the response body is empty
  expect(responseBody.length).toBe(0); 
  });



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