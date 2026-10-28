import { test, expect } from '@playwright/test';

test('Compra de productos en Demoblaze', async ({ page }) => {
  //1. Ingresar a la página de Demoblaze
  await page.goto('https://www.demoblaze.com/');

  //2. Verificar que la pagina principal se carga correctamente
  await expect(page).toHaveTitle(/STORE/);
});

