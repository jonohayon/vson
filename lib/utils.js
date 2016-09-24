const { types, definitions, options } = require('./defaults');

/**
 * Check if a given definition is valid
 * @param def
 * @returns {boolean}
 */
const isValidDefinition = def => {
    for (let key in def) {
        if (def.hasOwnProperty(key)) {
            let ise = false;

            for (var k in definitions) {
                if (key === k) ise = true;
            }

            if (!ise) return false;
        }
    }

    return true;
}

/**
 * Parse the model options
 * @param options
 * @returns {object}
 */
const parseOptions = opts => {
    const res = {};
    for (let key in options) {
        res[key] = opts[key] || options[key];
    }

    return res;
}

/**
 * Check if a given type is valid
 * @param type
 * @returns {boolean}
 */
const isValidType = type => {
    for (let t in types) {
        if (types[t] === type) return true;
    }

    return false;
};

/**
 * Check if a given variable is an object
 * @param obj
 * @returns {boolean}
 */
const isObject = obj => obj === Object(obj) && !isValidType(obj);

module.exports = {
    isValidType,
    isValidDefinition,
    parseOptions,
    isObject
};
