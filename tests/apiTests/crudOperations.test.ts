import { test, expect, request, Browser } from '@playwright/test';

test.describe('API Automation with Playwright', () => {
  let apiContext: any;
  let browser: Browser;
  // Before all tests, set up an API context
  test.beforeAll(async ({ playwright}) => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  // After all tests, clean up the API context
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('GET Request: Fetch Posts', async () => {
    const response = await apiContext.get('/posts');
    expect(response.status()).toBe(200); // Verify HTTP status
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.length).toBeGreaterThan(0); // Verify response has data
  });

  test('POST Request: Create a Post', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    const response = await apiContext.post('/posts', {
      data: newPost,
    });
    expect(response.status()).toBe(201); // Verify post creation
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toMatchObject(newPost); // Validate response matches request
  });

 

  test('DELETE Request: Delete a Post', async () => {
    const response = await apiContext.delete('/posts/1');
    expect(response.status()).toBe(200); // Verify successful deletion
    console.log('Post deleted successfully');
  });
});