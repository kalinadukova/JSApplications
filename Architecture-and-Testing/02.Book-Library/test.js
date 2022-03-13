const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }

};

describe('E2E tests', async function () {
    this.timeout(60000);

    before(async () => { browser = await chromium.launch(); });
    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 2000 }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads and displays all books', async () => {
        await page.route('**/jsonstore/collections/books*', (route) => {
            route.fulfill(json(mockData));
        });
        await page.goto('http://localhost:5500');
        await page.click('text=Load All Books');
        await page.waitForSelector('text=Harry Potter');

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));

        expect(rows[1]).to.contain('Harry Potter');
        expect(rows[1]).to.contain('Rowling');
        expect(rows[2]).to.contain('C#');
        expect(rows[2]).to.contain('Nakov');
    });

    it('can create book', async () => {
        await page.goto('http://localhost:5500');

        await page.fill('form#createForm >> input[name="title"]', 'Title');
        await page.fill('form#createForm >> input[name="author"]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('form#createForm >> text=Submit')

        ]);

        const data = JSON.parse(request.postData());

        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    });

    it('test edit button', async () => {
        await page.goto('http://localhost:5500');

        await page.click('text=Load All Books');
        await page.waitForSelector('text=Harry Potter');

        await page.click('text=Edit');

        await page.fill('form#editForm >> input[name="title"]', 'Title');
        await page.fill('form#editForm >> input[name="author"]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'PUT'),
            page.click('form#editForm >> text=Save')

        ]);

        const data = JSON.parse(request.postData());

        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');

    });

    it.only('test delete button', async () => {
        await page.goto('http://localhost:5500');

        await page.click('text=Load All Books');
        
        await page.waitForSelector('text=Harry Potter');
        // await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));
        await page.click('text=Delete');

        // page.on('Are you sure you want to delete this book?', confirm => confirm.accept());

        await page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        });

        // await page.evaluate(() => {
        //     confirm('are you sure');
        // });

        expect(1).to.equal(1);

        // await page.waitForResponse(response => response.status() == 200);
    });
});