let puppeteer = require("puppeteer");
let fs = require("fs");
let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://paytmmall.com/"];
let pName = process.argv[2];

(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let amazonArr = await getListingFromAmazon(links[0], browserInstance, pName);
        let flipKartArr = await getListingFromFlipKart(links[1], browserInstance, pName);
        let paytmMallArr = await getListingFromPaytmMall(links[2], browserInstance, pName);
        console.table(amazonArr);
        console.table(flipKartArr);
        console.table(paytmMallArr);
    } catch (err) {
        console.log(err);
    }
})();

//  product Name, url of amazon home page
//  output-> top 5 matching product -> return array

async function getListingFromAmazon(link, browserInstance, pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.type("input[aria-label='Search']", pName, { delay: 200 });
    await newPage.click("input[value='Go']");
    // wait for content to become visible
    // Name .a-size-medium.a-color-base.a-text-normal
    // Price .a-price-whole
    await newPage.waitForSelector(".a-size-medium.a-color-base.a-text-normal", { visible: true });
    await newPage.waitForSelector(".a-price-whole", { visible: true });
    function consolerunFn(pNameSelector, priceSelector) {
        let pNameArr = document.querySelectorAll(pNameSelector);
        let priceArr = document.querySelectorAll(priceSelector);
        let details = [];
        for (let i = 0; i < 5; i++) {
            let pName = pNameArr[i].innerText;
            let price = priceArr[i].innerText;
            details.push(
                { pName, price }
            );
        }
        return details;

    }
    return newPage.evaluate(consolerunFn, ".a-size-medium.a-color-base.a-text-normal", ".a-price-whole");
}

async function getListingFromFlipKart(link, browserInstance, pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.click("._2KpZ6l._2doB4z");
    await newPage.type("._3704LK", pName, { delay: 200 });
    await newPage.click("button[type='submit']");
    // wait to content to be visible
    // Name ._4rR01T
    // Price ._30jeq3._1_WHN1
    await newPage.waitForSelector("._4rR01T", { visible: true });
    await newPage.waitForSelector("._30jeq3._1_WHN1", { visible: true });
    function consolerunFn(pNameSelector, priceSelector) {
        let pNameArr = document.querySelectorAll(pNameSelector);
        let priceArr = document.querySelectorAll(priceSelector);
        let details = [];
        for (let i = 0; i < 5; i++) {
            let pName = pNameArr[i].innerText;
            let price = priceArr[i].innerText;
            details.push(
                { pName, price }
            );
        }
        return details;
    }
    return newPage.evaluate(consolerunFn, "._4rR01T", "._30jeq3._1_WHN1");
}

async function getListingFromPaytmMall(link, browserInstance, pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.type("#searchInput", pName, { delay: 200 });
    await newPage.keyboard.press("Enter");
    // wait to content to be visible
    // Name .UGUy
    // Price ._1kMS
    await newPage.waitForSelector(".UGUy", { visible: true });
    await newPage.waitForSelector("._1kMS", { visible: true });
    function consolerunFn(pNameSelector, priceSelector) {
        let pNameArr = document.querySelectorAll(pNameSelector);
        let priceArr = document.querySelectorAll(priceSelector);
        let details = [];
        for (let i = 0; i < 5; i++) {
            let pName = pNameArr[i].innerText;
            let price = priceArr[i].innerText;
            details.push(
                { pName, price }
            );
        }
        return details;
    }
    return newPage.evaluate(consolerunFn, ".UGUy", "._1kMS");
}