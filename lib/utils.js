var defaults = require('./defaults');

module.exports = {

    /**
     * Check if a given type is valid
     * @param type
     * @returns {boolean}
     */
    isValidType: function(type) {

        var types = defaults.types;

        for (var t in types) {
            if (types[t] === type) {
                return true;
            }
        }

        return false;
    },

    /**
     * Check if a given definition is valid
     * @param def
     * @returns {boolean}
     */
    isValidDefinition: function(def) {

        var definitions = defaults.definitions;

        for (var key in def) {
            if (def.hasOwnProperty(key)) {
                var ise = false;

                for (var k in definitions) {
                    if (key == k) {
                        ise = true;
                    }
                }

                if (!ise) return false;
            }
        }

        return true;
    }
};