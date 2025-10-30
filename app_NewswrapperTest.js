const Wrapper_NewsFilterIO = require('./Wrapper_NewsFilterIO.js');


// old way of dealing with async code
// Wrapper_NewsFilterIO.getStockDayNews('NFLX', '2020-02-02').then((articles) => {
//     // must wait before accessing 'art' because getStockDayNews is async
//     console.log(articles);
//     // processed = true;
// }).catch((error) => {
//     console.error('Error fetching news:', error);
// });

async function fetchNews() {
    try {
        const articles = await Wrapper_NewsFilterIO.getStockDayNews('NFLX', '2020-02-02');
        console.log(articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}
