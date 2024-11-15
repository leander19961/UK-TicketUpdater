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

  // initialize output variable
  let html = '';

  try {
    // reopen ticket-website
    const page2 = await browser.newPage();
    await page2.goto('https://ticket.astakassel.de');
    
    // check if puppeteer got redirected to "privacy policy-site"
    const privacyTextExists = await page2.evaluate(() => {
    return document.body.textContent.includes('Website of the semester ticket');
    });

    // check if puppeteer got redirected to "ticket-site"
    const ticketTextExists = await page2.evaluate(() => {
    return document.body.textContent.includes('NVV-Semesterticket');
    });
    
    if (ticketTextExists) {
      // download ticket-html
      html = await page2.content();
    } else if (privacyTextExists) {
      // click on accept on "privacy policy-site"
      await page2.waitForSelector('input[type="submit"][value="Accept"]');
      await page2.click('input[type="submit"][value="Accept"]');
      
      // reopen ticket-website
      const page3 = await browser.newPage();
      await page3.goto('https://ticket.astakassel.de');
      
      // download ticket-html
      html = await page3.content();
    } else {
      // generate error html
      html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error</title>
        </head>
        <body>
          <h1>Error</h1>
          <p>Error downloading ticket...</p>
        </body>
        </html>
      `;
    }
    
    // save html in file
    const filePath = path.resolve('/Path/To/File', 'Filename.html');
    fs.writeFileSync(filePath, html);
  } catch (error) {
    console.error('An error occurred:', error);
  }

  await browser.close();
})();
