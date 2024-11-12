const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://ticket.astakassel.de');
  
  // enter user credentials
  await page.type('#username', 'Your-UK-Number');
  await page.type('#password', 'Your-UK-Password');

  // click on login-button
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  // reopen ticket-website
  const page2 = await browser.newPage();
  await page2.goto('https://ticket.astakassel.de');

  // check if puppeteer got redirected to "gtc-site"
  const textExists = await page2.evaluate(() => {
    return document.body.textContent.includes('Website of the semester ticket');
  });

  // click on accept on "gtc-site"
  if (textExists) {
    await page2.waitForSelector('input[type="submit"][value="Accept"]');
    await page2.click('input[type="submit"][value="Accept"]');
  }

  // reopen ticket-website
  const page3 = await browser.newPage();
  await page3.goto('https://ticket.astakassel.de');

  // download ticket-html
  const html = await page3.content();

  // save html in file
  const filePath = path.resolve('PathToFile', 'Filename.html');
  fs.writeFileSync(filePath, html);

  await browser.close();
})();
