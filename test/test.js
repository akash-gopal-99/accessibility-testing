import {runAxe} from "@testcafe-community/axe";
import {createHtmlReport} from "axe-html-reporter";

fixture `TestCafe Tests with Axe`;

const webpages = [
    'https://www.skysports.com',
    'https://www.skysports.com/cricket/manchester-originals-vs-london-spirit/stats/36489',
    'https://www.skysports.com/the-hundred'
];

for(let i = 0; i < webpages.length; i++) {
    const webpage = webpages[i];

    let filename = urlToFilename(webpage);

    test.page(webpage)(`Test for ${webpage}`, async t => {
        const axeContext = { include: [['body']] };
        const axeOptions = {
            tags: {
                'wcag21a': { enabled: true },
                'wcag21aa': { enabled: true },
            },
        };

        const { error, results } = await runAxe(axeContext, axeOptions);
        // creates html report with the default file name `accessibilityReport.html`
        createHtmlReport({
            results,
            options: {
                projectKey: 'EXAMPLE',
                reportFileName: filename + '.html',
            },
        });
    });
}

function urlToFilename(url) {
    let domain = (new URL(url));
    let hostname = domain.hostname;
    let pathname = domain.pathname;

    let filename = hostname.replace('www.','').replace('.com', '').replace('.co.uk', '').replace('.de', '');

    // if there is a path
    if(pathname !== '/') {
        filename += pathname.split('/').join('-');
    }

    return filename;
}