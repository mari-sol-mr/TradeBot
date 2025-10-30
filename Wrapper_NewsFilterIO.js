



const news_key = NEWS_API_KEY
const news_endpoint = NEWS_API_BASE_URL+ news_key


const { SearchApi } = require('financial-news-api');
// import { SearchApi } from 'financial-news-api';
console.log("creating searchApi with key: " + news_key);
const searchApi = SearchApi(news_key);

function expectString(value) {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected a string, but got ${typeof value}`);
  }
}
 function getStockDayNews(stockSymbol, date) {
    expectString(stockSymbol);

    const query = {
    queryString: 'symbols:' + stockSymbol + " AND publishedAt:" + date,
    from: 0,
    size: 10,
    };

    return searchApi.getNews(query);
}

// example of how to use the getStockDayNews function
// getStockDayNews('NFLX', '2020-02-02').then((articles) => {
//     //must wait before accessing 'art' because getStockDayNews is async
//     console.log("Received articles for NFLX on 2020-02-02:");
//     console.log(articles);
//     art = articles;
//     processed = true;
// });

module.exports.getStockDayNews = getStockDayNews;