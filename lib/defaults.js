module.exports = {

    /**
     * Valid Types
     */
    types: {
        String: String,
        Number: Number,
        Date: Date,
        Boolean: Boolean,
        Array: Boolean,
        Buffer: Buffer || null // Thinking about the browser
    },

    /**
     * Valid definitions
     */
    definitions: {
        type: { required: true, default: null },
        default: {},
        required: { default: false }
    },

    /**
     * Model options
     */
    options: {
        allowNulls: false,
        requireAll: false,
        allowExtras: false
    }
};