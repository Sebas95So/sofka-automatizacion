
import { type Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    // Abre la tienda.
    async open() {
        await this.page.goto('https://www.demoblaze.com/', {
            waitUntil: 'domcontentloaded'
        });
    }

    // Regresa al catálogo sin recargar toda la página.
    async returnToCatalog() {
        await this.page.getByRole('link', {
            name: 'PRODUCT STORE'
        }).click();
    }

    // Selecciona una categoría.
    async selectCategory(name: string) {
        await this.page.getByRole('link', {
            name,
            exact: true
        }).click();
    }
}
