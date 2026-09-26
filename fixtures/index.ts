import { test as base, expect } from '@playwright/test';
import { OrangeHRMPage } from '../Pages/OrangeHRMPag';

type AppFixtures = {
  orangePage: OrangeHRMPage;
};

export const test = base.extend<AppFixtures>({
  orangePage: async ({ page }, use) => {
    const orangePage = new OrangeHRMPage(page);

    // Entregamos nuestro Page Object al test
    await use(orangePage);
  },
});

export { expect } from '@playwright/test';
