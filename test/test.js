import { runAxe } from '@testcafe-community/axe';
import { createHtmlReport } from 'axe-html-reporter';

fixture('TestCafe tests with Axe').page('https://www.skysports.com/the-hundred');

test('Automated accessibility testing', async (t) => {
    const axeContext = { exclude: [['select']] };
    const axeOptions = {
        rules: {
            'object-alt': { enabled: true },
            'role-img-alt': { enabled: true },
            'input-image-alt': { enabled: true },
            'image-alt': { enabled: true },
        },
    };
    const { error, results } = await runAxe(axeContext, axeOptions);
    // await t.expect(error).notOk(`axe check failed with an error: ${error.message}`);
    // creates html report with the default file name `accessibilityReport.html`
    createHtmlReport({
        results,
        options: {
            projectKey: 'EXAMPLE',
        },
    });
});