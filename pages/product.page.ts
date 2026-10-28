import { type Page } from '@playwright/test';

export class ProductPage {
    constructor(private page: Page) { }

    // Agrega el producto y espera la respuesta del servidor.
    async addToCart() {
        const responsePromise = this.page.waitForResponse(
            (response) =>
                response.url().includes('addtocart') &&
                response.request().method() === 'POST'
        );

        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });

        await this.page.getByRole('link', { name: 'Add to cart' }).click();

        const response = await responsePromise;
        console.log('Respuesta al agregar producto:', response.status());
    }
}
