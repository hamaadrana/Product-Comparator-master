const neweggScraper = require("./newegg");
// Selectors for dom
const selectors = {
  container: ".item-container",
  name: ".item-title",
  price: ".price-current",
  photo_url: ".item-img img",
};
async function newegg(product, limit = 15) {
  const scraper = new neweggScraper({ headless: true });
  // looping thur urls and run separate functions
  console.log("running scrapper for ", product);
  // pass the url to runner functions
  console.log("Creating browser instance");
  let data;
  try {
    // Creating browser instance
    await scraper.init();
    // navigating to url
    await scraper.navigate(`https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=${product}`);
    console.log("Getting data");
    // Geting reviews
    data = await scraper.getData(selectors, limit);
    console.log("Done, browser closed");
  } catch (error) {
    // close the browser if error found
    await scraper.closeBrowser();
    throw error;
  }
  await scraper.closeBrowser();
  return data;
}
module.exports = newegg;
