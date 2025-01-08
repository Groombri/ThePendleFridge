/**
 * Gets product information from OpenFoodFacts API using scanned barcode. 
 * @return the relevant product data if it is found in database.
 * @return undefined if not found
 * @return "error" if there is an error fetching the data
 */

export default GetDataFromBarcode = async (barcode) => {
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
    
    /**
     * OpenFoodFacts state:
     * For "READ AND SEARCH operations no authentication is required."
     * However, you have to add a User-Agent HTTP Header with the name of your app, the version,
     * system and a url (if any), not to be blocked by mistake.
     * For example: User-Agent: NameOfYourApp - Android - Version 1.0 - www.yourappwebsite.com
     */
    const userAgent = 'The Pendle Fridge - Android/iOS - Version 1.0 - N/A';
    
    try {
        let response = await fetch(url, {headers:{'USER-AGENT': userAgent}});
        const data = await response.json();
    
        //if product is found in database, extract data
        if(data.product) {
            const productName = data.product.product_name;
            return productName;
        }
        //return undefined if product not in database
        else {
            console.log("Product not found!");
            return undefined;
        }
    } catch(error) {
        console.error("Error fetching data", error);
        return "error";
    }
}