/**
 * As we are not connecting to a database and we already have the data on disk, we can improve efficiency
 * by requiring the data file and parsing it when the server starts up
 * instead of every time a request is made.
 */
const data = require('./sample_data.json');
const {constants} = require('../config');
const {fetchPrice, getPropertyValuesList} = require('./util');

exports.fetchAndProcessProducts = (req, res) => {

    const products = [];

    // Break down data into easy to reference/use variables.
    const productsInfoReferenceList = data.permutations[0];
    const productsProperties = data.properties;
    const productsPriceList = data.pricing_tables.pricelist;
    const referenceKeysUsed = Object.keys(productsInfoReferenceList[0]);

    // Create a reference table of properties and their values for easy reference later.
    const propertyValuesList = getPropertyValuesList(referenceKeysUsed, productsProperties);

    // Go through the permutations to construct the front-end ready data
    for (const productReferences of productsInfoReferenceList) {

        const entries = Object.entries(productReferences);
        const product = {};

        for (const [property, valueKey] of entries) {

            const propName = productsProperties[property].property.name;
            let propValue = propertyValuesList[property].find(v => v.value_key === valueKey);

            // Keep the entire object for the Description for now
            // so that we can access the image path later.
            if (propValue && propName !== constants.PRODUCT_DESCRIPTION) {
                propValue = propValue.value;
            }

            product[propName] = propValue;
        }

        // now that we are out of the loop we are certain that we have the product code,
        // which we can plug in to the fetchPrice function.
        product[constants.PRODUCT_PRICE] = fetchPrice(productsPriceList, product.code);

        // retrieve image and replace with given url.
        const imagePath = product[constants.PRODUCT_DESCRIPTION].attachment.path;
        product.image = imagePath.replace(/\\/g, '').replace('qpl://', 'http://autospec.co.za/productmedia/');

        // now that we have used what we needed from the Description object
        // we can set its value to the description string.
        product[constants.PRODUCT_DESCRIPTION] = product[constants.PRODUCT_DESCRIPTION].value;
        products.push(product);
    }

    res.json(products);
};
