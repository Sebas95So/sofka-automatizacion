
import { type Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    // Abre la tienda.
    async open() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    // Selecciona una categoría del catálogo.
    async selectCategory(name: string) {
        await this.page.getByRole('link', { name, exact: true }).click();
    }
}
