const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require('path');

let obj = {
  items: []
};

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
      let title = []
      let startDate = []
      let endDate = []
      let image = []
      let pref = []
      let city = []
      let location = []
      // Go to the target page
      await page.goto(siteUrl)
      // Get Site Name
      siteName = await page.evaluate(() => window.location.href)

      // Get Event Title Array
      listSelector = '.m-mainlist__item .m-mainlist-item__ttl > span'
      await getContentArray(page, listSelector, title)

      // Get Event Date
      listSelector = '.m-mainlist__item .m-mainlist-item-event__period'
      await getContentArray(page, listSelector, startDate, 'startDate')
      await getContentArray(page, listSelector, endDate, 'endDate')

      // Get Image Url
      listSelector = '.m-mainlist-item__img > span > img'
      await getContentArray(page, listSelector, image, 'image')

      // Get Pref
      listSelector = '.m-mainlist-item__map > .m-mainlist-item__maplink:nth-child(1)'
      await getContentArray(page, listSelector, pref)

      // Get City
      listSelector = '.m-mainlist-item__map > .m-mainlist-item__maplink:nth-child(2)'
      await getContentArray(page, listSelector, city)

      // Get Location
      listSelector = '.m-mainlist-item-event__placelink'
      await getContentArray(page, listSelector, location)

      const infoArray = [
        title,
        startDate,
        endDate,
        image,
        pref,
        city,
        location,
      ]

      obj.items = title.map((item, index) => {
        return {
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
      'https://www.walkerplus.com/event_list/today/ar0313/'
    )

    const json  = JSON.stringify(obj)
    fs.writeFile('event.json', json, 'utf8', function (err) {
      if (err) throw err
      console.log('complete')
    })

    await browser.close()
  })()
} catch(err) {
  console.error(err)
}