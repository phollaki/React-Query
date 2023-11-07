import { test, expect } from '@playwright/test';

test.describe('HomeScreen', () => {
  test.beforeEach(async({page})=>{
    await page.goto('http://localhost:3000/')
  })

  test('has title', async ({ page  }) => {
    await expect(page).toHaveTitle(/React Query/);
  });

  test('Add todo', async ({ page }) => {
    await page.getByPlaceholder('your new todo').click();
    await page.getByPlaceholder('your new todo').fill('New todo');
    await page.getByRole('button', { name: 'Add new todo' }).click();
    expect(await page.getByTestId('todo-length').textContent().then(length => Number(length))).toBe(1)
    expect(await page.getByTestId('nested-todo-length').textContent().then(length => Number(length))).toBeTruthy()
  });

  test('Remove todos', async ({ page }) => {
    await page.getByPlaceholder('your new todo').click();
    await page.getByPlaceholder('your new todo').fill('New todo');
    await page.getByRole('button', { name: 'Add new todo' }).click();
    await page.getByPlaceholder('your new todo').click();
    await page.getByPlaceholder('your new todo').fill('');
    await page.getByText('New todo', { exact: true }).click();
    expect(await page.getByTestId('todo-length').textContent().then(length => Number(length))).toBe(1)
    await page.getByRole('button', { name: 'Remove todos' }).click();
    expect(await page.getByTestId('todo-length').textContent().then(length => Number(length))).toBe(0)
  });
})
