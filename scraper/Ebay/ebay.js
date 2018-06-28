const Scraper = require("scraper-class");

class ebayScraper extends Scraper {
  constructor(props) {
    super(props);
  }
  async getData(selectors, limit) {
      let data = await this.page.evaluate(selectors => {
        const extractedElements = Array.from(
          document.querySelectorAll(selectors.container)
        );
        const extractedData = extractedElements.map(result => {
          const name = result.querySelector(selectors.name).textContent
          const price = result.querySelector(selectors.price).textContent.split(" to")[0];
          const photo_url = result.querySelector(selectors.photo_url).getAttribute('src')
          const target_site = 'Ebay';
          const url = result.querySelector(selectors.url).getAttribute('href')
          return {
            name,
            price,
            photo_url,
            target_site,
            url
          };
        });
        return extractedData;
      }, selectors);
    // set the reviews to equal of minimum limit
    data.length = limit;
    return data;
  }
}

module.exports = ebayScraper;