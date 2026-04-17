import { test, expect } from '@playwright/test';

test('GET request to API endpoint', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('id', 1);
});

test('POST request to API endpoint', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
  }); 
  expect(response.status()).toBe(201);
  const data = await response.json();
  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('title', 'foo');
  expect(data).toHaveProperty('body', 'bar');
  expect(data).toHaveProperty('userId', 1);
});

test('PUT request to API endpoint', async ({ request }) => {
  const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
    data: {
      id: 1,
      title: 'updated title',
      body: 'updated body',
      userId: 1,
    },
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('id', 1);
  expect(data).toHaveProperty('title', 'updated title');
  expect(data).toHaveProperty('body', 'updated body');
  expect(data).toHaveProperty('userId', 1);
});

test('DELETE request to API endpoint', async ({ request }) => {
  const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
});
