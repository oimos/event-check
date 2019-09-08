const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const path = require('path');
const screenshotPath = path.resolve('./img/screenshot/') + '/';

try {
  (async () => {
    // init
    const browser = await puppeteer.launch({
      headless: false,
    })
    const page = await browser.newPage()
    await page.setViewport({
      width: 1280,
      height: 800,
    })
    let targetElement = ''
    await page.emulate(devices['iPhone X'])
    await page.setUserAgent('Mozilla/5.0')



    await page.goto('https://www.rottentomatoes.com/')
    targetElement = '#fullscreen-search-term'
    await page.waitFor(targetElement)

    await page.type(targetElement, 'Forrest Gump')
    const p = await page.$(targetElement)
    await p.press('Enter')

    targetElement = '#movieSection > ul > li:nth-child(1) > div.poster > a'
    await page.waitFor(targetElement)
    await page.click(targetElement)

    for (let i = 0; i < 3; i++) {
      await page.waitForSelector('.body_main', {
        waitUntil: 'domcontentloaded'
      })
      await page.screenshot({
        path: `${screenshotPath}result_${i}.png`,
        fullPage: true
      })
    }

    await browser.close()
  })()
} catch (err) {
console.log('e')
  console.error(err)
}
