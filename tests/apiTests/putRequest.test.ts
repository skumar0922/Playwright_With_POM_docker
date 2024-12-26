import { test, expect } from "@playwright/test";
import { randomInt } from "crypto";

test("PUT Request: Update a Post", async ({ request }) => {
  const baseURL = "https://reqres.in/api/users";
  
  // Generate a random ID
  const id = randomInt(1, 100);

  // Payload for POST request
  const payload = {
    name: "John Doe",
    job: "Software Developer",
    id: id,
  };

  // Make the POST request
  const response = await request.post(baseURL, {
    headers: {
      Accept: "application/json",
    },
    data: payload,
  });

  // Assert POST response status
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('name', 'John Doe');
  expect(responseBody).toHaveProperty('job', 'Software Developer');

  // ------- PUT --------------
  const updatedPut = {
    name: "updated name",
    job: "updated job",
  };

  // Perform the PUT request
  const putResponse = await request.put(`${baseURL}/${responseBody.id}`, {
    headers: {
      Accept: "application/json",
    },
    data: updatedPut,
  });

  // Assert PUT response status
  expect(putResponse.status()).toBe(200);

  // Validate the PUT response body
  const putResponseBody = await putResponse.json();
  console.log("PUT Response Body:", putResponseBody);
  expect(putResponseBody).toMatchObject(updatedPut);
});