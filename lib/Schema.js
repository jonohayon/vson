/**
 * vson Schema constructor
 * @param schema
 * @constructor
 */
function Schema(schema) {

    if (schema == null || typeof schema !== 'object') {
        throw Error("Schema should be an object");
    }

    this.schema = schema;
}

/**
 * Export it
 * @type {Schema}
 */
module.exports = Schema;