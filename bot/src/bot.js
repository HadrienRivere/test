'use strict'
// ========== [ Dependencies ] ========== //
const puppeteer = require('puppeteer-core');
const { createCursor } = require("ghost-cursor")
// ========== [ Settings ] ========== //
const google = `http://google.com`
const links = ['https://coinblockexplorer.tk', 'https://juegosgeek.xyz'];
let randomItem;
let randomItemTwo = links[Math.floor(Math.random() * links.length)]

// ========== [ Utils ] ========== //
const { getExecutablePath } = require('./utils');
// ========== [ Run Program ] ========== //
const run = async () => {
  const executablePath = await getExecutablePath({});
  await lauchpuppeteer({ executablePath });
}
// ========== [ Program ] ========== //
const lauchpuppeteer = async launchOptions => {
  const browser = await puppeteer.launch({
    headless: false,
    //userDataDir: './data',
    args: [
      `--app=${google}`,
      '--window-size=800,600',
      '--disable-audio-output',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--no-sandbox', "--disable-setuid-sandbox"],
    ignoreDefaultArgs: ['--enable-automation'],
    ...launchOptions
  });
  const [page] = await browser.pages();

  await page.waitFor(6000);
  await page.goto(`${randomItemTwo}`, { timeout: 0, waitUntil: "networkidle2" });

  const selector = "#app"
  // const browser = await puppeteer.launch({ headless: false });
  // const page = browser.newPage()
  const cursor = createCursor(page)
  // await page.goto(url)
  await page.waitForSelector(selector)
  // await cursor.click(selector)
  // shorthand for
  await cursor.move(selector)
  await cursor.click()
  console.log('paso')
  // await page.waitForSelector('h1')

  // await cursor.move(from, to)

  setInterval(async () => {
    randomItem = links[Math.floor(Math.random() * links.length)]
    await program(page, randomItem);
  }, 300000);
}

const program = async (page, item) => {
  await page.goto(`${item}`, { timeout: 0, waitUntil: "networkidle2" });
  console.log(item)
}

run();

// module.exports = run