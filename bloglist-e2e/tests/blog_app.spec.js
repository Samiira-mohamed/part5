const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Samiira Mohamed',
        username: 'samiira',
        password: 'samiira123'
      }
    })
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Other User',
        username: 'otheruser',
        password: 'otherpass'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.locator('input[type="text"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[type="text"]').fill('samiira')
      await page.locator('input[type="password"]').fill('samiira123')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Samiira Mohamed logged in')).toBeVisible({ timeout: 10000 })
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[type="text"]').fill('samiira')
      await page.locator('input[type="password"]').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('Samiira Mohamed logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.locator('input[type="text"]').fill('samiira')
      await page.locator('input[type="password"]').fill('samiira123')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByText('Samiira Mohamed logged in').waitFor()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[placeholder="title"]').fill('E2E Test Blog')
      await page.locator('input[placeholder="author"]').fill('Samiira')
      await page.locator('input[placeholder="url"]').fill('http://e2etest.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('E2E Test Blog Samiira')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[placeholder="title"]').fill('E2E Test Blog')
      await page.locator('input[placeholder="author"]').fill('Samiira')
      await page.locator('input[placeholder="url"]').fill('http://e2etest.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('E2E Test Blog Samiira').waitFor()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('user who added blog can delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[placeholder="title"]').fill('Blog to delete')
      await page.locator('input[placeholder="author"]').fill('Samiira')
      await page.locator('input[placeholder="url"]').fill('http://delete.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('Blog to delete Samiira').waitFor()

      await page.reload()
      await page.getByText('Blog to delete Samiira').waitFor()

      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Blog to delete Samiira')).not.toBeVisible()
    })

    test('only the user who added blog can see delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[placeholder="title"]').fill('Samiira Blog')
      await page.locator('input[placeholder="author"]').fill('Samiira')
      await page.locator('input[placeholder="url"]').fill('http://samiira.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('Samiira Blog Samiira').waitFor()

      await page.getByRole('button', { name: 'logout' }).click()

      await page.locator('input[type="text"]').fill('otheruser')
      await page.locator('input[type="password"]').fill('otherpass')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByText('Other User logged in').waitFor()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})