const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', async function () {
    this.timeout(60000);

    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('load messages', async () => {
        await page.goto('http://localhost:5500');

        await page.click('text=Refresh');

        await page.waitForSelector('textarea');

        const content = await page.$$eval('textarea', (textArea) => textArea.map(t => t.value));

        console.log(content);

        expect(content[0]).to.contains('Spami: Hello, are you there?');

    });

    it.only('can create message', async () => {
        await page.goto('http://localhost:5500');

        await page.fill('div#controls >> input[id="author"]', 'Lilly');
        await page.fill('div#controls >> input[id="content"]', 'Hey');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('div#controls >> text=Send')

        ]);

        const data = JSON.parse(request.postData());

        console.log(data);

        expect(data.author).to.equal('Lilly');
        expect(data.content).to.equal('Hey');
    });
});
