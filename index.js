const puppeteer = require('puppeteer');
const { executablePath } =  require('puppeteer');
const path = require('path');
//remove this line later when testing is done 💀
const cookies = require('./cookies.json');
const fs = require('fs');

async function reading(minutes, lessons) {
  const Nullify = path.join(process.cwd(), 'Nullify');
  const browser = await puppeteer.launch({
    headless: 'new',
    // args: [
    //   `--disable-extensions-except=${Nullify}`,
    //   `--load-extension=${Nullif}`
    // ],
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  console.log('setting cookies...');
  await page.setCookie(...cookies);

  console.log('loading i-ready...')
  await page.goto('https://login.i-ready.com/student/dashboard/home', { waitUntil: 'networkidle0' });
  console.log('I-Ready loaded, now going to Reading subject...');

  let reading = await page.$x("/html/body/div[1]/div[1]/section/div/div[2]/main/div/div/div/div/div/div[1]/span/div/button")
  await reading[0].click({ waitUntil: 'domcontentloaded'})

  await page.waitForTimeout(5000)

  //farm minutes

  //go into lesson
  let clickLesson = await page.$x("/html/body/div[1]/div[1]/section/div/div[2]/main/div/div/div/div/div/div/div/div")
  await clickLesson[0].click({ waitUntil: 'networkidle0'})

  await page.waitForTimeout(10000)

  // for the love of god how do you enter a lesson lmao
  let clickLesson2 = await page.$x("/html/body/div[1]/div[1]/section/div/div[1]/div/div/div/div[3]/div/div/div/div/div/div[2]/div/div[2]/div/div/button")
  await clickLesson2[0].click({ waitUntil: 'networkidle0'})

  await page.waitForTimeout(4000)

  console.log('taking screenshot...');
  await page.screenshot({
    path: 'screenshot.jpg'
  });
  await browser.close();
};

async function math(minutes, lessons) {
  const Nullify = path.join(process.cwd(), 'Nullify');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      `--disable-extensions-except=${Nullify}`,
      `--load-extension=${Nullify}`
    ],
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  console.log('setting cookies...');
  await page.setCookie(...cookies);

  console.log('loading i-ready...')
  await page.goto('https://login.i-ready.com/student/dashboard/home', { waitUntil: 'networkidle0' });
  console.log('I-Ready loaded, now going to Math subject...');

  let math = await page.$x("/html/body/div[1]/div[1]/section/div/div[2]/main/div/div/div/div/div/div[2]/span/div/button")
  await math[0].click({ waitUntil: 'domcontentloaded'})

  await page.waitForTimeout(4000)

  console.log('taking screenshot...');
  await page.screenshot({
    path: 'screenshot.jpg'
  });
  await browser.close();
};


//get args
let subject = process.argv[2];

//check if reading or math
if (subject == 'm' || subject == 'math') {
  math()
  return;
} else {
  reading()
  return;
}

//TODO: minute farm and lesson skip