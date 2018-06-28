const express = require("express");
const router = express.Router();
const scraper = require("./scraper");

router.get("/", (req, res) => {
  res.render("index", {ebayData: [], neweggData: []});
});
router.post("/", async (req, res) => {
  const searchItem = req.body.search.split(", ");
  const result = await scraper(searchItem);
  const ebayData = result.filter(data => data.target_site === 'Ebay')
  const neweggData = result.filter(data => data.target_site === 'Newegg')
  res.render("index", { ebayData, neweggData });
});

module.exports = router;
