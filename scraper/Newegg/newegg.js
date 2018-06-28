const Scraper = require("scraper-class");

class neweggScraper extends Scraper {
  constructor(props) {
    super(props);
  }
  async getData(selectors, limit) {
    let data = await this.page.evaluate(
      (selectors, limit) => {
        const extractedElements = Array.from(
          document.querySelectorAll(selectors.container)
        );
        extractedElements.length = limit;
        const extractedData = extractedElements.map(result => {
          const name = result.querySelector(selectors.name).textContent;
          const url = result.querySelector(selectors.name).getAttribute("href");
          const price = result
            .querySelector(selectors.price).innerText.split(" ").join("");
            const photo_url = result.querySelector(selectors.photo_url).getAttribute('src')
          const target_site = "Newegg";
          return {
            name,
            price,
            photo_url,
            target_site,
            url
          };
        });
        return extractedData;
      },
      selectors,
      limit
    );
    // set the reviews to equal of minimum limit
    return data;
  }
}

module.exports = neweggScraper;
