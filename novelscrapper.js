const puppeteer = require('puppeteer');

const MAIN_URL = (url) => `https://boxnovel.com/novel/${url}`;
const self = {
    browser: null,
    pages: null,

    initalize: async (url) => {
        // let url = 'https://boxnovel.com/novel/reincarnation-of-the-strongest-sword-god-boxnovel/chapter-2749/';

        self.browser = await puppeteer.launch();
        self.page = await self.browser.newPage();

        await self.page.goto(MAIN_URL(url), { waitUntil: 'networkidle2' });

    },

    getResults: async (num) => {
        let results = [];
        do{
            let new_results = await self.novelSummaryResults();
            results = {...results, ...new_results}
        } while(results.length <=num)

    },
    novelSummaryResults: async () => {
        // theres no limit for how many there are need to find a way to grab the 1st and the last 10
        let data = await self.page.$$('li[class*=wp-manga-chapter]');
        let results = [];
        for(let d of data){
            let title = await d.$eval(('a'),node =>node.innerText.trim());
            //let bodyText = await d.$eval(('p'),node =>node.innerText.trim());
            results.push({
                title
            });
            console.log(results);
        }
        //let title = document.querySelector('div[class="text-left"] > h3').innerText;
        //let ogtext = document.querySelector('.text-left');
        //let text = Array.from(ogtext.querySelectorAll('p'), ({ innerText }) => innerText);

    }

}

module.exports = self;