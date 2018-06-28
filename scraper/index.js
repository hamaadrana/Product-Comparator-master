const newegg = require("./Newegg");
const ebay = require("./Ebay");

const runner = async productArr => {
  let result = [];
  for (let product of productArr) {
    const ebayRunner = await ebay(product);
    const neweggRunner = await newegg(product);
    result.push(ebayRunner, neweggRunner);
  }
  let flattenedResult = [].concat.apply([], result);
  console.log(flattenedResult);
  return flattenedResult;
};

module.exports = runner
