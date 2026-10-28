import { test, expect, type Page} from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';


async function prepararCarrito(
  page: Page,
  homePage: HomePage,
  productPage: ProductPage
) {
  // Agregar el MacBook Pro.
  await homePage.open();
  await homePage.selectCategory('Laptops');
  await page.getByRole('link', {
    name: 'MacBook Pro',
    exact: true
  }).click();

  await productPage.addToCart();

  // Agregar el iPhone 6 32gb.
  await homePage.returnToCatalog();
  await homePage.selectCategory('Phones');
  await page.getByRole('link', {
    name: 'Iphone 6 32gb',
    exact: true
  }).click();

  await productPage.addToCart();
}



test('TC01 - Agregar dos productos al carrito', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // Preparar el carrito con los dos productos.
  await prepararCarrito(page, homePage, productPage);

  // Comprobar que ambos productos aparecen en el carrito.
  await page.getByRole('link', {
    name: 'Cart',
    exact: true
  }).click();

  await expect(page.locator('#tbodyid'))
    .toContainText('MacBook Pro');

  await expect(page.locator('#tbodyid'))
    .toContainText('Iphone 6 32gb');
});
