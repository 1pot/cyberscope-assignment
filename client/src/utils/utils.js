/**
 * Checks if an object is empty (has no own enumerable properties).
 * @param {object} obj - The object to be checked.
 * @returns {boolean} - True if the object is empty, otherwise false.
 */
export const isEmptyObject = (obj) => {
    // Check if the object has no own enumerable properties and its constructor is Object
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const sanitizedCoin = (obj) => {
    console.log(obj)
    if (
        obj?.name === undefined ||
        obj?.description === undefined ||
        obj?.currentPrice === undefined ||
        obj?.lowestPrice24 === undefined ||
        obj?.highestPrice24 === undefined ||
        Object.values(obj?.priceChanges).some((value) => value === undefined)
    ) {
        console.error('One or more required properties missing from coin data')
    }
    return {
        name: obj?.name || 'Pending...',
        description: obj?.description || 'Pending...',
        currentPrice: obj?.currentPrice || 'Pending...',
        lowestPrice24: obj?.lowestPrice24 || 'Pending...',
        highestPrice24: obj?.highestPrice24 || 'Pending...',
        day: obj?.priceChanges?.day || 'Pending...',
        week: obj?.priceChanges?.week || 'Pending...',
        twoWeeks: obj?.priceChanges?.twoWeeks || 'Pending...',
        month: obj?.priceChanges?.month || 'Pending...',
        twoMonths: obj?.priceChanges?.twoMonths || 'Pending...',
        twoHundredDays: obj?.priceChanges?.twoHundredDays || 'Pending...',
        year: obj?.priceChanges?.year || 'Pending...'
    }
}
