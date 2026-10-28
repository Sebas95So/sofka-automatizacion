
import { type Page } from '@playwright/test';

export class ProductPage {
    constructor(private page: Page) { }

    async addToCart() {
        const responsePromise = this.page.waitForResponse(
            (response) =>
                response.url().includes('addtocart') &&
                response.request().method() === 'POST'
        );

        this.page.once('dialog', (dialog) => {
            void dialog.accept().catch(() => { });
        });

        await this.page.getByRole('link', {
            name: 'Add to cart'
        }).click();

        const response = await responsePromise;
        console.log('Respuesta al agregar producto:', response.status());
    }
}
