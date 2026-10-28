import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test('Agregar un producto al carrito', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // Abrir la tienda y seleccionar la categoría.
  await homePage.open();
  await homePage.selectCategory('Laptops');

  // Abrir el MacBook Pro.
  await page.getByRole('link', { name: 'MacBook Pro' }).click();

  // Agregar el producto al carrito.
  await productPage.addToCart();

  // Comprobar que el producto aparece en el carrito.
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await expect(page.locator('#tbodyid')).toContainText('MacBook Pro');
});
