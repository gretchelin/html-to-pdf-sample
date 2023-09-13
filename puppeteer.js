const puppeteer = require('puppeteer');
const fs = require('fs');

const [n, f, ...args] = process.argv;
const argTag = args.reduce((a, curr, idx) => {
    const argitem = curr.split("=");
    a.set(argitem[0], argitem[1]);
    return a;
}, new Map());

const host = "localhost";
const port = argTag.get("port") || 8080;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const path = argTag.get("path");

    await page.goto('http://' + host + (port ? ':' + port : '') + '/' + path, {
        waitUntil: 'networkidle2',
    });

    // page.pdf() is currently supported only in headless mode.
    // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
    const date = new Date().toISOString();
    const pdfName = path + '_' + date.split('T').at(0) + '_' + date.split('T').at(1).split('Z').at(0).split(':').join('') + ".pdf";
    const res = await page.pdf({
        path: pdfName,
        format: 'a4',
        printBackground: true
    });

    fs.writeFileSync(pdfName, res, 'binary');
    await browser.close();
})();