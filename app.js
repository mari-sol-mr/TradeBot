const express = require('express');
const request = require('request');
const Wrapper_NewsFilterIO = require('./Wrapper_NewsFilterIO.js');
const HTMLGenerator = require('./HTMLGenerator.js');
const path = require('path');
const app = express();
const fs = require('fs'); // file system module
const http = require('http'); // must be const so that you don't accidentally change the value of the variable
const port = 3000; // port number for the server to listen on


// Running a server that responds with an HTML file
// that includes a script tag linking to a JavaScript file


// OPTION 1: Using express to serve static files
// Express is a web framework for Node.js that simplifies the process of building web applications.
app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



// OPTION 2: Using http module to create a server manually
// const server = http.createServer((req, res) => {
//   console.log('Request:', req.url);

//   if (req.url === '/' || req.url === '/index.html') {
//     const filePath = path.join(__dirname, 'index.html');
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         res.writeHead(500);
//         res.end('Error loading index.html');
//         return;
//       }
//       console.log('Serving index.html');
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     });

//   } else if (req.url === '/script.js') {
//     const filePath = path.join(__dirname, 'script.js');
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         res.writeHead(500);
//         res.end('Error loading script.js');
//         return;
//       }
//       console.log('Serving script.js');
//       res.writeHead(200, { 'Content-Type': 'application/javascript' });
//       res.end(data);
//     });

//   } else {
//     res.writeHead(404);
//     res.end('404 Not Found');
//   }
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


///////////////////////////////////
/////////////////////////////////////
// Handling input from the user

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', async (req, res) => {
  const selectedFruits = req.body.fruits;

  // Normalize to array
  const fruitList = Array.isArray(selectedFruits)
    ? selectedFruits
    : selectedFruits ? [selectedFruits] : [];
  const selectedDate = req.body.selectedDate || 'Not provided';
  const quantity = req.body.quantity || 'Not provided';

  console.log('Selected fruits:', fruitList);
  console.log('Selected date:', selectedDate);
  console.log('Quantity:', quantity);


  stocksWithNews = ['MSFT', 'GOOG', 'MSFT', 'AMZN']; // Array to hold stocks with news
  // fetchStocksWithNews(quantity, selectedDate)
  //   .then(stocksWithNews => {
  //     // Do something with the stocks that had news
  //     console.log('Stocks with news:', stocksWithNews);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching stocks with news:', error);
  //   });

  // stockLogos = []; // Array to hold stock logos
  // for (const stock of stocksWithNews) {
  //   // logo = await getStockLogo(stock);
  //   // console.log(`Logo for ${stock}:`, logo);

  //   body = await getStockLogo(stock);
  //   stockLogos.push(body);
  //   console.log(`Logo for ${stock}:`, body);
  // }

  stockLogos = ['https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l11f3242118ff2add5d117cbf216f29ac578f6ba6.png', 'https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/lfc4548375734de4aa0151bef377e72b1708b5072.png', 'https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l74c0fda1054b04bf3e2365d467e32a47e3feba7b.png']
  news = ['Microsoft announces new AI features for Office 365', 'Google Cloud expands AI capabilities', 'Amazon faces antitrust scrutiny in Europe'];
  // stockLogos = ['https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l11f3242118ff2add5d117cbf216f29ac578f6ba6.png','https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l11f3242118ff2add5d117cbf216f29ac578f6ba6.png']
  // news = ['Microsoft announces new AI features for Office 365', 'Microsoft announces new AI features for Office 365'];
  HTMLGenerator.generateLogoGalleryHTML(stockLogos, news);
  res.sendFile(path.join(__dirname, 'stockLogosGallery.html'));

});


async function fetchStocksWithNews(quantity, selectedDate)
{
  stocksWithNews = []; // Array to hold stocks with news
  pennyStocks = ['NFLX']//, 'AAPL', 'GOOGL', 'MSFT', 'AMZN']; // Example stock symbols

  for (const stock of pennyStocks) {
    // wait half second
   // await new Promise(resolve => setTimeout(resolve, 500));
    const articles = await Wrapper_NewsFilterIO.getStockDayNews(stock, selectedDate)['articles'];
    if (articles) {
      console.log(articles)
      stocksWithNews.push(stock);
    }
  }

  return stocksWithNews;
}

async function getStockLogo(stockSymbol) {
  return new Promise((resolve, reject) => {
    request.get({
      url: 'https://api.api-ninjas.com/v1/logo?ticker=' + stockSymbol,
      headers: {
        'X-Api-Key': 'SUfI+ulB6AJ8c8x7Ga5EPw==5N89qQHJlnBUtpwK'
      },
    }, function(error, response, body) {
      if (error) {
        console.error('Request failed:', error);
        reject(error);
      } else if (response.statusCode != 200) {
        console.error('Error:', response.statusCode, body.toString('utf8'));
        reject(new Error('Status code: ' + response.statusCode));
      } else {
        body = JSON.parse(body);
        const logoURL = body[0]?.image;
        console.log('received Logo for ' + stockSymbol + ':', logoURL);
        resolve(logoURL);
      }
    });
  });
}



// NEXT:
// Live penny tracker and historical penny tracker
// Select date, display stock logos that had news on that date.
