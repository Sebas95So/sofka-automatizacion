import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

//Función para preparar el carrito con dos productos.
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

//Función para completar el formulario de compra.
async function completarFormularioCompra(page: Page) {
  await page.locator('#name').fill('Sebastian Salazar');
  await page.locator('#country').fill('Ecuador');
  await page.locator('#city').fill('Quito');
  await page.locator('#card').fill('4111111111111111');
  await page.locator('#month').fill('10');
  await page.locator('#year').fill('2028');
}


//Test Case 01
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

//Test Case 02
test('TC02 - Verificar prodcutos y el total del carrito', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // Preparar el carrito con los dos productos.
  await prepararCarrito(page, homePage, productPage);

  // Comprobar que ambos productos aparecen en el carrito.
  await page.getByRole('link', {
    name: 'Cart',
    exact: true
  }).click();


  // Verificar que ambos productos estén presentes.
  const carrito = page.locator('#tbodyid');

  await expect(carrito).toContainText('MacBook Pro');
  await expect(carrito).toContainText('Iphone 6 32gb');

  // Leer los precios de cada producto y sumarlos.
  const filas = carrito.locator('tr');
  const cantidadFilas = await filas.count();

  let totalCalculado = 0;

  for (let i = 0; i < cantidadFilas; i++) {
    const precioTexto = await filas.nth(i).locator('td').nth(2).innerText();
    totalCalculado += Number(precioTexto);
  }

  // Leer el total mostrado por la tienda.
  const totalTexto = await page.locator('#totalp').innerText();
  const totalMostrado = Number(totalTexto);

  // Comparar la suma calculada con el total de la tienda.
  expect(totalCalculado).toBe(totalMostrado);

  console.log('Total calculado:', totalCalculado);
  console.log('Total mostrado:', totalMostrado);


})

//Test Case 03
test('TC03 - Completar formulario de compra', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // Preparar el carrito con los dos productos.
  await prepararCarrito(page, homePage, productPage);

  //Abrir el carrito
  await page.getByRole('link', {
    name: 'Cart',
    exact: true
  }).click();

  //Abrir el formulario de compra
  await page.getByRole('button', {
    name: 'Place Order',
  }).click();

  //Completar el formulario
  await completarFormularioCompra(page);

  //Verificar los campos
  await expect(page.locator('#name')).toHaveValue('Sebastian Salazar');
  await expect(page.locator('#country')).toHaveValue('Ecuador');
  await expect(page.locator('#city')).toHaveValue('Quito');
  await expect(page.locator('#card')).toHaveValue('4111111111111111');
  await expect(page.locator('#month')).toHaveValue('10');
  await expect(page.locator('#year')).toHaveValue('2028');
})

//Test Case 04
test('TC04 - Finalizar la compra', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // Preparar el carrito con los dos productos.
  await prepararCarrito(page, homePage, productPage);

  //Abrir el carrito
  await page.getByRole('link', {
    name: 'Cart',
    exact: true
  }).click();

  //Abrir el formulario de compra
  await page.getByRole('button', {
    name: 'Place Order',
  }).click();

  //Completar el formulario
  await completarFormularioCompra(page);

  //Finalizar la compra
  await page.getByRole('button', {
    name: 'Purchase',
    exact: true
  }).click();

  // Verificar que se muestre el mensaje de confirmación.
  const mensajeConfirmacion = page.getByText(
    'Thank you for your purchase!',
    { exact: true }
  );

  await expect(mensajeConfirmacion).toBeVisible();
})
