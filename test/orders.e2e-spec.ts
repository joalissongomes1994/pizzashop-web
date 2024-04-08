import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders?page=1', { waitUntil: 'networkidle' })

  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()

  await page.waitForTimeout(1000)
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders?page=1', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()
  expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()
  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()
  expect(
    page.getByRole('cell', { name: 'Customer 51', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()
  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()

  await page.waitForTimeout(1000)
})

test('filter by orderId', async ({ page }) => {
  await page.goto('/orders?page=1', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-7')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'order-7' })).toBeVisible()

  await page.waitForTimeout(500)
})

test('filter by CustomerName', async ({ page }) => {
  await page.goto('/orders?page=1', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 7')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'Customer 7' })).toBeVisible()

  await page.waitForTimeout(500)
})
