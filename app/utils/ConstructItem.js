/**
 * Constructs a JSON object representing a food item and its properties
 */
export default ConstructItem = (
  id,
  productName,
  quantity,
  itemSize,
  ingredients,
  allergens,
  traces,
  image,
  keywords
) => {
  //using shorthand notation for if keyname = varname
  const item = {
    productId: id,
    name: productName,
    quantity,
    size: itemSize, //'quantity' from OpenFoodFacts e.g. 500g, 75cl changed to 'size' as misleading
    ingredients,
    allergens,
    traces,
    image,
    keywords,
  };

  return JSON.stringify(item);
};
