import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test ("TC01 - Agregar dos productos al carrito", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  //1. Abrimos la tienda y agregamos el primer producto (Macbook Pro) al carrito.
  await homePage.open();
  await homePage.selectCategory('Laptops');
  await page.getByRole('link', {
    name: 'MacBook Pro',
    exact: true
  }).click();
  await productPage.addToCart();

  //2. Volver a la tienda y agregar el segundo producto (iPhone 6) al carrito.
  await homePage.open();
  await homePage.selectCategory('Phones');
  await page.getByRole('link', {
    name: 'Iphone 6 32gb',
    exact: true
  }).click();
  await productPage.addToCart();

  //3. Abrir el carrito y verificar los productos agregados.
  await page.getByRole('link', {
    name: 'Cart',
    exact: true
  }).click();

  await expect(page.locator('#tbodyid')).toContainText('MacBook Pro');
  await expect(page.locator('#tbodyid')).toContainText('Iphone 6 32gb');

});
