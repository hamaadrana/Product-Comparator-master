const ebayScraper = require("./ebay");
// Selectors for dom
const selectors = {
  container: ".s-item__wrapper",
  name: ".s-item__title",
  price: ".s-item__price",
  photo_url: ".s-item__image-img",
  url: ".s-item__link"
};
async function ebay(product, limit = 15) {
  const scraper = new ebayScraper({ headless: true });
  // looping thur urls and run separate functions
  console.log("running scrapper for ", product);
  // pass the url to runner functions
  console.log("Creating browser instance");
  let data;
  try {
    // Creating browser instance
    await scraper.init();
    // navigating to url
    await scraper.navigate(
      `https://www.ebay.com/sch/i.html?_from=R40&_nkw=${product}&_sacat=0`
    );
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
module.exports = ebay;
