import { test, expect } from '../fixtures';

test.describe('Parcial 2 - OrangeHRM', () => {

  test.beforeEach(async ({ orangePage }) => {
    await orangePage.navigate();
  });

  test('Test 1 - Login exitoso', async ({ page, orangePage }) => {

    await orangePage.login('Admin', 'admin123');

    await expect(page).toHaveURL(/\/dashboard\/index/);

    await page.screenshot({
      path: './evidencias/test1-login-exitoso.png',
      fullPage: true,
    });
  });


  test('Test 2 - Login con credenciales inválidas', async ({
    page,
    orangePage,
  }) => {

    await orangePage.login('UsuarioIncorrecto', 'PasswordIncorrecto');

    await expect(orangePage.errorMessage).toBeVisible();

    await expect(orangePage.errorMessage).toContainText(
      'Invalid credentials'
    );

    await page.screenshot({
      path: './evidencias/test2-login-invalido.png',
      fullPage: true,
    });
  });


  const modulos = [
    'PIM',
    'Leave',
    'Directory',
  ];

  for (const modulo of modulos) {

    test(`Test 3 - Navegar al módulo ${modulo}`, async ({
      page,
      orangePage,
    }) => {

      await orangePage.login('Admin', 'admin123');

      await expect(page).toHaveURL(/\/dashboard\/index/);

      await orangePage.clickMenu(modulo);

      await orangePage.verifyPageHeader(modulo);

      await page.screenshot({
        path: `./evidencias/test3-${modulo.toLowerCase()}-menu.png`,
        fullPage: true,
      });
    });
  }



  test('Test 4 - Verificar Dashboard después del login', async ({
    page,
    orangePage,
  }) => {

    await orangePage.login('Admin', 'admin123');

    await expect(page).toHaveURL(/\/dashboard\/index/);

    await expect(orangePage.pageHeader).toContainText('Dashboard');

    await expect(orangePage.userDropdown).toBeVisible();

    await page.screenshot({
      path: './evidencias/test4-dashboard.png',
      fullPage: true,
    });
  });

});