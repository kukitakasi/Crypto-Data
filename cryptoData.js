// Function to fetch live cryptocurrency prices from CoinMarketCap API and update Google Sheet
function cryptoData() {
  // API Endpoint
  var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  
  // API Key
  var apiKey = "xxxxxx-xxx-xxx-xxx-xxxxxxxxxxxx";
  
  // Sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Live");
  
  // Coins to fetch (from Column A)
  var coins = sheet.getRange("A1:A50").getValues();
  
  // Constructing parameters
  var parameters = {
    "start": "1",
    "limit": "50",
    "convert": "USD"
  };

  // Setting headers
  var headers = {
    "X-CMC_PRO_API_KEY": apiKey
  };
  
  // Fetching data
  var response = UrlFetchApp.fetch(url + "?start=" + parameters.start + "&limit=" + parameters.limit + "&convert=" + parameters.convert, {
    method: "GET",
    headers: headers
  });
  
  var data = JSON.parse(response.getContentText());
  
  // Parsing and writing data to sheet
  var prices = data.data;
  for (var i = 0; i < prices.length; i++) {
    var coin = prices[i];
    var coinName = coin.name;
    var coinSymbol = coin.symbol;
    var coinPrice = coin.quote.USD.price;
    
    // Find the coin in the list
    for (var j = 0; j < coins.length; j++) {
      if (coins[j][0] == coinName || coins[j][0] == coinSymbol) {
        // Write the price to the corresponding cell in column B
        sheet.getRange(j + 1, 2).setValue(coinPrice);
        break;
      }
    }
  }
}
