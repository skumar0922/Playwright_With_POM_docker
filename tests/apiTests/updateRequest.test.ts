import test, { expect } from "@playwright/test";

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
