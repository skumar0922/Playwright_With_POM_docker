import { test, expect } from '@playwright/test';

// Sample data
const mockUserData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
};

test.describe('API Testing Examples', () => {
    test('mock successful GET user endpoint - 200', async ({ page }) => {
        let routeCalled = false;
        let responseData;

        await page.route('**/api/users/1', async route => {
            routeCalled = true;
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockUserData)
            });
            responseData = mockUserData;
        });

        await page.goto('about:blank');

        const response = await page.evaluate(async () => {
            const res = await fetch('http://example.com/api/users/1');
            return res.json();
        });

        expect(routeCalled).toBe(true);
        expect(response).toEqual(mockUserData);
    });

    test('mock user not found - 404', async ({ page }) => {
        let routeCalled = false;
        
        // Mock the GET request for non-existent user
        await page.route('**/api/users/999', async route => {
            routeCalled = true;
            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'User not found',
                    message: 'The requested user with ID 999 does not exist'
                })
            });
        });

        await page.goto('about:blank');

        // Capture both the response status and body
        const { status, data } = await page.evaluate(async () => {
            const res = await fetch('http://example.com/api/users/999');
            return {
                status: res.status,
                data: await res.json()
            };
        });

        // Verify the mock was called and the error response is correct
        expect(routeCalled).toBe(true);
        expect(status).toBe(404);
        expect(data).toEqual({
            error: 'User not found',
            message: 'The requested user with ID 999 does not exist'
        });
    });
});