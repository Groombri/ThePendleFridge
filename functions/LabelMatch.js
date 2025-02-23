/**
 * Gets relatedness (0 lowest and 1 highest) of 2 words
 * see: https://github.com/commonsense/conceptnet5/wiki/API
 */
async function getSimilarity(word1, word2) {
  //converts words to accepted format
  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();

  //ConceptNet API endpoint for relatedness of the words
  const url = `https://api.conceptnet.io/relatedness?node1=/c/en/${word1}&node2=/c/en/${word2}`;

  //return the relatedness value from the api
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.value;
  } catch (error) {
    return 0.0;
  }
}

async function LabelMatch(product, userLabel, threshold) {
  const promises = [];

  //first try with product name
  promises.push(getSimilarity(product.name, userLabel));

  //then try with individual words of product name
  const productName = product.name.split(" ");
  for (const word of productName) {
    promises.push(getSimilarity(word, userLabel));
  }

  //then try with product labels (only first 4 due to speed)
  for (const label of product.keywords.slice(0, 4)) {
    promises.push(getSimilarity(label, userLabel));
  }

  const results = await Promise.all(promises);
  const highestRelatedness = Math.max(...results);

  console.log(`Results: ${results}`);
  return highestRelatedness >= threshold;
}

module.exports = { LabelMatch };
