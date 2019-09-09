const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require('path')
const dir = './dist'

let obj = {
  items: []
};

let title = []
let startDate = []
let endDate = []
let image = []
let pref = []
let city = []
let location = []

try {
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    const getContentArray = async (page, selector, array, option) => {
      await page.waitForSelector(selector)
      const contents = await page.$$(selector)

      for (let i = 0; i < contents.length; i++) {
        if (option === 'startDate') {
          const value = await (await contents[i].getProperty('textContent')).jsonValue()
          array.push(value.replace(/(\r\n|\n|\r|\s)/gm, '').split('～')[0].replace(/開催中|終了間近/g, '').substr(5))
        } else if (option === 'endDate') {
          const value = await (await contents[i].getProperty('textContent')).jsonValue()
          array.push(value.replace(/(\r\n|\n|\r|\s)/gm, '').split('～')[1])
        } else if (option === 'image') {
          const value = await (await contents[i].getProperty('src')).jsonValue()
          array.push(value)
        } else {
          array.push(await (await contents[i].getProperty('textContent')).jsonValue())
        }
      }
    }

    const addEventData = async (siteUrl) => {
      let titleSelector = ''
      let dateSelector = ''
      let imageSelector = ''
      let prefSelector = ''
      let citySelector = ''
      let locationSelector = ''
      let site = ''
      if (siteUrl.includes('walkerplus')) {
        site = 'walkerplus'
      } else if (siteUrl.includes('jalan')) {
        site = 'jalan'
      }

      // Go to the target page
      await page.goto(siteUrl)
      // Get Site Name
      siteName = await page.evaluate(() => window.location.href)

      if (site === 'walkerplus') {
        titleSelector = '.m-mainlist__item .m-mainlist-item__ttl > span'
        dateSelector = '.m-mainlist__item .m-mainlist-item-event__period'
        imageSelector = '.m-mainlist-item__img > span > img'
        prefSelector = '.m-mainlist-item__map > .m-mainlist-item__maplink:nth-child(1)'
        citySelector = '.m-mainlist-item__map > .m-mainlist-item__maplink:nth-child(2)'
        locationSelector = '.m-mainlist-item-event__placelink'
      } else if (site === 'jalan') {
        titleSelector = '.item-listContents .item-name > a'
        dateSelector = '.item-listContents .item-eventInfo > dd:nth-of-type(1)'
        imageSelector = '.item-listContents .item-mainImg > img'
        prefSelector = '.item-listContents .item-eventInfo > dd:nth-of-type(2)'
        citySelector = '.item-listContents >.item-info > .item-categories'
        locationSelector = '.item-listContents .item-eventInfo > dd:nth-of-type(2)'
      }

      // Get Event Title Array
      await getContentArray(page, titleSelector, title, null, site)

      // Get Event Date
      await getContentArray(page, dateSelector, startDate, 'startDate', site)
      await getContentArray(page, dateSelector, endDate, 'endDate', site)

      // Get Image Url
      await getContentArray(page, imageSelector, image, 'image', site)

      // Get Pref
      await getContentArray(page, prefSelector, pref, null, site)

      // Get City
      await getContentArray(page, citySelector, city, null, site)

      // Get Location
      await getContentArray(page, locationSelector, location, null, site)

      obj.items = title.map((item, index) => {
        return {
          id: index,
          title: item,
          startDate: startDate[index],
          endDate: endDate[index],
          image: image[index],
          pref: pref[index],
          city: city[index],
          location: location[index]
        }
      })
    }

    await addEventData (
      'https://www.walkerplus.com/event_list/today/ar0313/',
    )

    await addEventData (
      'https://www.jalan.net/event/130000/',
    )

    const json  = JSON.stringify(obj)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    fs.writeFile('dist/event.json', json, 'utf8', function (err) {
      if (err) throw err
      console.log('complete')
    })

    await browser.close()
  })()
} catch(err) {
  console.error(err)
}