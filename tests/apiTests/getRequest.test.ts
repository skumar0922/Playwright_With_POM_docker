import test, { expect } from "@playwright/test";


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

    console.log("responseBody : ",responseBody)
  });