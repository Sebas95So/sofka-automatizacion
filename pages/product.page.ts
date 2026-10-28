import { type Page } from '@playwright/test';

export class ProductPage {
    constructor(private page: Page) { }

    // Agrega el producto y acepta la alerta de confirmación.
    async addToCart() {
        const responsePromise = this.page.waitForResponse(
            (response) =>
                response.url().includes('addtocart') &&
                response.request().method() === 'POST'
        );

        const dialogPromise = this.page.waitForEvent('dialog');

        await this.page.getByRole('link', {
            name: 'Add to cart'
        }).click();

        const dialog = await dialogPromise;
        await dialog.accept();

        const response = await responsePromise;
        console.log('Respuesta al agregar producto:', response.status());
    }
}
