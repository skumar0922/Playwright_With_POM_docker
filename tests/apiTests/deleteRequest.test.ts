import test, { expect } from "@playwright/test";

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

