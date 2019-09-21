import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { formatDate } from './utils/formatDate'

interface EventDate {
  id: number,
  title: string[]
  link: string[]
  dateNumber: string[]
  startDate: string[]
  endDate: string[]
  image: string[]
  pref: string[]
  city: string[]
  location: string[]
}

const dir = '.' + path.resolve(__dirname, 'dist')

let obj: {items: any} = {
  items: [],
}

let title: string[] = []
let link: string[] = []
let dateNumber: string[] = []
let startDate: string[] = []
let endDate: string[] = []
let image: string[] = []
let pref: string[] = []
let city: string[] = []
let location: string[] = []

try {
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    const getContentArray = async (page: any, selector: string, array: string[], option: string, site: string) => {
      await page.waitForSelector(selector)
      const contents = await page.$$(selector)

      for (let i = 0; i < contents.length; i++) {
        if (option === 'startDate') {
          const value = await (await contents[i].getProperty('textContent')).jsonValue()
          if (site === 'walkerplus') {
            const date = value.replace(/(\r\n|\n|\r|\s)/gm, '').split('～')[0].replace(/開催中|終了間近/g, '').substr(5)
            array.push(date)
          } else if (site === 'jalan') {
            array.push(value)
          } else if (site === 'enjoy') {
            const date = value.replace(/(\n|\r|\s)/gm, '').split('～')[0]
            array.push(date)
          }
        } else if (option === 'endDate') {
          const value = await (await contents[i].getProperty('textContent')).jsonValue()
          if (site === 'walkerplus') {
            array.push(value.replace(/(\r\n|\n|\r|\s)/gm, '').split('～')[1])
          } else if (site === 'jalan') {
            array.push(value)
          } else if (site === 'enjoy') {
            array.push(value.replace(/(\n|\r|\s)/gm, '').split('～')[1])
          }
        } else if (option === 'dateNumber') {
          const value = await (await contents[i].getProperty('textContent')).jsonValue()
          if (site === 'walkerplus') {
            const date = await value.replace(/(\r\n|\n|\r|\s)/gm, '')
            array.push(formatDate(date))
          } else if (site === 'jalan' || site === 'enjoy') {
            array.push(formatDate(value))
          }
        } else if (option === 'city') {
          if (site === 'walkerplus' || site === 'enjoy') {
            array.push(await (await contents[i].getProperty('textContent')).jsonValue())
          } else if (site === 'jalan') {
            const value = await (await contents[i].getProperty('textContent')).jsonValue()
            array.push(value.replace(/(\n|\t|\s|\r)/gm, ''))
          }
        } else if (option === 'pref') {
          const value = await (await contents[i].getProperty('textContent')).jsonValue()
          if (site === 'walkerplus') {
            array.push(await (await contents[i].getProperty('textContent')).jsonValue())
          } else if (site === 'jalan') {
            array.push(value.split(/(\s+)/).filter((str: any) => /\S/.test(str))[0])
          } else if (site === 'enjoy') {
            array.push('東京都') // The site shows info only in Tokyo
          }
        } else if (option === 'location') {
          const value = await (await contents[i].getProperty('textContent')).jsonValue()
          if (site === 'walkerplus' || site === 'enjoy') {
            array.push(await (await contents[i].getProperty('textContent')).jsonValue())
          } else if (site === 'jalan') {
            array.push(value.split(/(\s+)/).filter((str: any) => /\S/.test(str))[1].split('（')[0])
          }
        } else if (option === 'image') {
          const value = await (await contents[i].getProperty('src')).jsonValue()
          array.push(value)
        } else if (option === 'link') {
          const value = await (await contents[i].getProperty('href')).jsonValue()
          array.push(value)
        } else {
          array.push(await (await contents[i].getProperty('textContent')).jsonValue())
        }
      }
    }

    const addEventData = async (siteUrl: string) => {
      let linkSelector = ''
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
      } else if (siteUrl.includes('enjoytokyo')) {
        site = 'enjoy'
      }

      // Go to the target page
      await page.goto(siteUrl)
      // Get Site Name
      // const siteName = await page.evaluate(() => window.location.href)

      if (site === 'walkerplus') {
        linkSelector = '.m-mainlist__item .m-mainlist-item__ttl'
        titleSelector = '.m-mainlist__item .m-mainlist-item__ttl > span'
        dateSelector = '.m-mainlist__item .m-mainlist-item-event__period'
        imageSelector = '.m-mainlist-item__img > span > img'
        prefSelector = '.m-mainlist-item__map > .m-mainlist-item__maplink:nth-child(1)'
        citySelector = '.m-mainlist-item__map > .m-mainlist-item__maplink:nth-child(2)'
        locationSelector = '.m-mainlist-item-event__placelink'
      } else if (site === 'jalan') {
        linkSelector = '.item-listContents .item-name > a'
        titleSelector = '.item-listContents .item-name > a'
        dateSelector = '.item-listContents .item-eventInfo > dd:nth-of-type(1)'
        imageSelector = '.item-listContents .item-mainImg > img'
        prefSelector = '.item-listContents .item-eventInfo > dd:nth-of-type(2)'
        citySelector = '.item-listContents >.item-info > .item-categories'
        locationSelector = '.item-listContents .item-eventInfo > dd:nth-of-type(2)'
      } else if (site === 'enjoy') {
        linkSelector = 'div.rl_header > h2 > span > a'
        titleSelector = 'div.rl_header > h2 > span > a'
        dateSelector = '.rl_date'
        imageSelector = 'div.rl_main > div.rl_img.photo > a > img'
        prefSelector = '#frn-criteria-area > ul > li:nth-child(1) > h3'
        citySelector = 'div.rl_main > ul > li > p.rl_shop_access'
        locationSelector = 'div.rl_main > ul > li > p.clfix > span > a'
      }

      // Get Event Title Array
      await getContentArray(page, titleSelector, title, null, site)

      // Get Event Link Array
      await getContentArray(page, linkSelector, link, 'link', site)

      // Get Event Date
      await getContentArray(page, dateSelector, startDate, 'startDate', site)

      await getContentArray(page, dateSelector, endDate, 'endDate', site)

      await getContentArray(page, dateSelector, dateNumber, 'dateNumber', site)

      // Get Image Url
      await getContentArray(page, imageSelector, image, 'image', site)

      // Get Pref
      await getContentArray(page, prefSelector, pref, 'pref', site)

      // Get City
      await getContentArray(page, citySelector, city, 'city', site)

      // Get Location
      await getContentArray(page, locationSelector, location, 'location', site)

      // console.log('title', title)

      obj.items = title && title.map((item, index) => {
        return {
          id: index,
          title: item,
          link: link[index],
          dateNumber: dateNumber[index],
          startDate: startDate[index],
          endDate: endDate[index],
          image: image[index],
          pref: pref[index],
          city: city[index],
          location: location[index],
        }
      })
    }

    await addEventData(
      'https://www.walkerplus.com/event_list/today/ar0313/',
    )

    await addEventData(
      'https://www.walkerplus.com/event_list/today/ar0313/2.html',
    )

    await addEventData(
      'https://www.walkerplus.com/event_list/today/ar0313/3.html',
    )

    await addEventData(
      'https://www.walkerplus.com/event_list/today/ar0313/4.html',
    )

    await addEventData(
      'https://www.walkerplus.com/event_list/today/ar0313/5.html',
    )

    await addEventData(
      'https://www.jalan.net/event/130000/',
    )

    await addEventData(
      'https://www.jalan.net/event/130000/page_2/',
    )

    await addEventData(
      'https://www.enjoytokyo.jp/search/event/tomorrow/',
    )

    const json = JSON.stringify(obj)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    fs.writeFile('dist/event.json', json, 'utf8', function (err) {
      if (err) throw err
      console.log('complete')
    })

    await browser.close()
  })().catch(e => console.log(e))
} catch (err) {
  console.error(err)
}
