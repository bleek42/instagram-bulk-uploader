const { NODE_ENV } = require('./config');
const puppeteer = require('puppeteer');


// (async () => {

// })();

const scrape = async url => {
    // init the headless browser and a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // await the url we want to go to
    await page.goto(url);
    // get element on page by Xpath, source property
    const [elem] = await page.$x('//*[@id="imgBlkFront"]');
    const src = await elem.getProperty('src');

    const srcText = await src.jsonValue();
    console.log({ srcText });

};

module.exports = scrape;