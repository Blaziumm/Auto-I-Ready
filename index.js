//I Tested out of I-ready so I could not get the thing I needed to leave the lesson, basically read the comments, the minute farmer besides that should be done
const puppeteer = require('puppeteer');
const { executablePath } =  require('puppeteer');
const path = require('path');
//remove this line later when testing is done
const cookies = require('./cookies.json');
const fs = require('fs');

async function reading(minutes, lessons) {
  //const Nullify = path.join(process.cwd(), 'Nullify');
  const browser = await puppeteer.launch({
    headless: false,
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
  //How tf do you put code into dev console (I think it works)
  await page.evaluate(() => {
    var csid = html5Iframe.src.split("?csid=")[1].split("&type")[0];
    document.cookie = `csid=${csid}; expires=Thu, 18 Dec 2999 12:00:00 UTC"`;
    document.cookie = `minutes=${minutes}; expires=Thu, 18 Dec 2999 12:00:00 UTC"`;
  });
  

  //leave the lesson
  // starts timer
  await page.evaluate(() => {
    fetch(`https://login.i-ready.com/student/v1/web/lesson_component/${csid}?action=resume`, {
	"headers": {
		"accept": "application/json, text/plain, */*",
		"accept-language": "en-US,en;q=0.9",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin"
	},
	"referrer": "https://login.i-ready.com/student/dashboard/home",
	"referrerPolicy": "strict-origin-when-cross-origin",
	"body": null,
	"method": "GET",
	"mode": "cors",
	"credentials": "include"
  });

// checks if service workers are supported
  if (typeof(Worker) == "undefined") {
	// workers are not supported
	 console.log('This hack will not work on this browser. Use something more modern like Google Chrome.');
  } else {
	// creates worker that counts for the number of minutes
	 w = new Worker("data:text/js;charset=utf-8," + encodeURI(`setTimeout("postMessage('timeComplete')", ${minutes * 60000});`));
}

// detects when service worker is finished
  w.onmessage = function(event) {
	 if (event.data == "timeComplete") {

		// sends fetch request to stop timer
		  fetch(`https://login.i-ready.com/student/v1/web/lesson_component/${csid}?action=pause`, {
			 "headers": {
				  "accept": "application/json, text/plain, */*",
				  "accept-language": "en-US,en;q=0.9",
				  "sec-fetch-dest": "empty",
				  "sec-fetch-mode": "cors",
				  "sec-fetch-site": "same-origin"
			 },
			 "referrer": "https://login.i-ready.com/student/dashboard/home",
			 "referrerPolicy": "strict-origin-when-cross-origin",
			 "body": null,
			 "method": "GET",
			 "mode": "cors",
			 "credentials": "include"
		  });

		console.log(`${minutes} minutes have been added to the account. Refresh and they should be there.`);
	}
};
  });
  
  
  await browser.close();
};

async function math(minutes, lessons) {
  //const Nullify = path.join(process.cwd(), 'Nullify');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      //`--disable-extensions-except=${Nullify}`,
      //`--load-extension=${Nullify}`
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
  //How tf do you put code into dev console (I think it works)
  await page.evaluate(() => {
    var csid = html5Iframe.src.split("?csid=")[1].split("&type")[0];
    document.cookie = `csid=${csid}; expires=Thu, 18 Dec 2999 12:00:00 UTC"`;
    document.cookie = `minutes=${minutes}; expires=Thu, 18 Dec 2999 12:00:00 UTC"`;
  });
  

  //leave the lesson
  // starts timer
  await page.evaluate(() => {
    fetch(`https://login.i-ready.com/student/v1/web/lesson_component/${csid}?action=resume`, {
	"headers": {
		"accept": "application/json, text/plain, */*",
		"accept-language": "en-US,en;q=0.9",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin"
	},
	"referrer": "https://login.i-ready.com/student/dashboard/home",
	"referrerPolicy": "strict-origin-when-cross-origin",
	"body": null,
	"method": "GET",
	"mode": "cors",
	"credentials": "include"
  });

// checks if service workers are supported
  if (typeof(Worker) == "undefined") {
	// workers are not supported
	 console.log('This hack will not work on this browser. Use something more modern like Google Chrome.');
  } else {
	// creates worker that counts for the number of minutes
	 w = new Worker("data:text/js;charset=utf-8," + encodeURI(`setTimeout("postMessage('timeComplete')", ${minutes * 60000});`));
}

// detects when service worker is finished
  w.onmessage = function(event) {
	 if (event.data == "timeComplete") {

		// sends fetch request to stop timer
		  fetch(`https://login.i-ready.com/student/v1/web/lesson_component/${csid}?action=pause`, {
			 "headers": {
				  "accept": "application/json, text/plain, */*",
				  "accept-language": "en-US,en;q=0.9",
				  "sec-fetch-dest": "empty",
				  "sec-fetch-mode": "cors",
				  "sec-fetch-site": "same-origin"
			 },
			 "referrer": "https://login.i-ready.com/student/dashboard/home",
			 "referrerPolicy": "strict-origin-when-cross-origin",
			 "body": null,
			 "method": "GET",
			 "mode": "cors",
			 "credentials": "include"
		  });

		console.log(`${minutes} minutes have been added to the account. Refresh and they should be there.`);
	}
};
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
//TODO: lesson skip