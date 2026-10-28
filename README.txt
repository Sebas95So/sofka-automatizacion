PROYECTO: Automatización de pruebas funcionales E2E - Demoblaze

DESCRIPCIÓN

Proyecto de automatización de pruebas funcionales del flujo de compra de la aplicación Demoblaze:
https://www.demoblaze.com/

Se utiliza Playwright con TypeScript para automatizar las interacciones con la aplicación y verificar los resultados esperados.

REQUISITOS PREVIOS

- Node.js y npm instalados.
- Git instalado.
- Visual Studio Code u otro editor compatible.
- Conexión a internet.

ESTRUCTURA PRINCIPAL

- tests/compra.spec.ts: contiene los casos de prueba automatizados.
- pages/home.page.ts: contiene las acciones de navegación y selección de categorías.
- pages/product.page.ts: contiene la acción de agregar productos al carrito.
- playwright.config.ts: configuración de Playwright.
- package.json: dependencias y scripts del proyecto.

INSTALACIÓN

1. Clonar el repositorio de GitHub.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar las dependencias:

   npm install

4. Instalar los navegadores de Playwright:

   npx playwright install

EJECUCIÓN DE LAS PRUEBAS

Ejecutar todos los casos de prueba:

   npx playwright test tests/compra.spec.ts

Ejecutar únicamente en Chromium:

   npx playwright test tests/compra.spec.ts --project=chromium

Ejecutar un caso específico:

   npx playwright test tests/compra.spec.ts --project=chromium --grep "TC01"

Para consultar el reporte HTML:

   npx playwright show-report

CASOS DE PRUEBA

TC01 - Agregar dos productos al carrito.
TC02 - Verificar los productos y el total del carrito.
TC03 - Completar el formulario de compra.
TC04 - Finalizar la compra y verificar el mensaje de confirmación.

NOTAS

- Los casos de prueba preparan su propio carrito para no depender de la ejecución previa de otro caso.
- Los datos utilizados en el formulario son datos de prueba.
- Las pruebas requieren conexión a internet y disponibilidad de Demoblaze.
- El reporte HTML se genera mediante Playwright. Los directorios de resultados generados no deben confundirse con los archivos fuente del proyecto.
