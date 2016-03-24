module.exports = {

    /**
     * Check if a given type is valid
     * @param type
     * @returns {boolean}
     */
    isValidType: function(type) {

        var types = [String, Number, Date, Boolean, Array];

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

        var props = ['type', 'default', 'required', 'min', 'max', 'lowercase', 'uppercase'];

        for (var key in def) {
            if (def.hasOwnProperty(key)) {
                var ise = false;

                for (var i = 0; i < props.length; i++) {
                    if (key == props[i]) {
                        ise = true;
                    }
                }

                if (!ise) return false;
            }
        }

        return true;
    }
};