import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Rocket Pizza')
  await page.getByLabel('Descrição').fill('New custom restaurant description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  const toast = page.getByText('Perfil atualizado com sucesso!')

  expect(toast).toBeVisible()

  await page.waitForTimeout(1000)
})

test('update profile error', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Jota Pizza')
  await page.getByLabel('Descrição').fill('New custom restaurant description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  const toast = page.getByText('Falha ao atualizar o perfil, tente novamente!')

  expect(toast).toBeVisible()

  await page.waitForTimeout(1000)
})
