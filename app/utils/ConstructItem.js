import uuid from "react-native-uuid";

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
    date: getUKDateTime(),
  };

  return JSON.stringify(item);
};

/**
 * Constructs an empty food item, which is used when a user enters their own item
 * @param {*} imageUri the uri to the "no-image.png" icon
 * @returns item as a JSON string
 */
export function ConstructEmptyItem(imageUri) {
  const item = {
    productId: uuid.v4(),
    name: "EMPTY_ITEM",
    quantity: "",
    size: "",
    ingredients: "",
    allergens: "",
    traces: "",
    image: imageUri, //default image for when a specific product image isn't found
    keywords: "",
    date: getUKDateTime(),
  };

  return JSON.stringify(item);
}

//returns the current UK date and time
function getUKDateTime() {
  const date = new Date();
  return date
    .toLocaleString("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hourCycle: "h23",
    })
    .replace(", ", " at ");
}
