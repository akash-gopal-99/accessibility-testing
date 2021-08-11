import {runAxe} from '@testcafe-community/axe';
import {createHtmlReport} from 'axe-html-reporter';
import{urlToFilename} from '../src/util/urlToFilename';

fixture `WCAG2.1 Accessibility Compliance Test`;

const webpages = [
    'https://www.w3.org/WAI/standards-guidelines/wcag/',
    'https://www.skysports.com',
    'https://www.skysports.com/cricket/manchester-originals-vs-london-spirit/stats/36489',
    'https://www.skysports.com/the-hundred',
    'https://www.skysports.com/the-hundred/teams'
];

for(let i = 0; i < webpages.length; i++) {
    const webpage = webpages[i];

    let filename = urlToFilename(webpage);

    test.page(webpage)(`Test for ${webpage}`, async t => {
        const axeContext = { include: [['body']] };
        const axeOptions = {
            runOnly: {
                type: 'tag',
                values: ['wcag2a','wcag2aa']
            },
        };

        const { error, results } = await runAxe(axeContext, axeOptions);
        // creates html report with the default file name `accessibilityReport.html`
        createHtmlReport({
            results,
            options: {
                reportFileName: filename + '.html',
            },
        });
    });
}