// require axios and cheerio
const axios = require('axios');
const cheerio = require('cheerio');


const fetchGames= async ()=>{
    try{
      const response= await axios.get('https://www.amazon.in/s?k=games&crid=3DY6C4JZW92RW&sprefix=games%2Caps%2C291&ref=nb_sb_noss_1');
      const html = response.data;
      console.log(html);
      const $ = cheerio.load(html);
      const prices = []
      $('div.sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin sg-col-4-of-16.sg-col s-widget-spacing-small.sg-col-4-of-20').each((index, el)=>{
        const game = $(el);
        const price= game.find('span.a-size-base-plus.a-color-base.a-text-normal').text();
        prices.push(price);
      })
      return prices;
    }catch (err){
      console.error(err);
    }
}

fetchGames().then(prices=>console.log(prices));