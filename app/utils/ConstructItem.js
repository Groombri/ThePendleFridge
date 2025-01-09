/**
 * Constructs a JSON object representing a food item and its properties
 */
export default ConstructItem = (id, productName, itemSize, labels, ingredients, allergens, traces, image, keywords) => {
    
    //using shorthand notation for if keyname = varname
    const item = {
        productId: id,
        name: productName,
        quantity: 1,    //default quantity of 1, the user can modify this if not correct
        size: itemSize, //'quantity' from OpenFoodFacts e.g. 500g, 75cl changed to 'size' as misleading
        labels,
        ingredients,
        allergens,
        traces,
        image, 
        keywords
    };

    return JSON.stringify(item);
}