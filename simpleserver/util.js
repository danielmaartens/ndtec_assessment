exports.getPropertyValuesList = (referenceKeys, allProperties) => {
    const referenceValues = {};

    for (const key of referenceKeys) {
        referenceValues[key] = allProperties[key].values;
    }

    return referenceValues;
};


exports.fetchPrice = (priceList, code) => {
    return priceList.find(p => p.code === code).price;
};