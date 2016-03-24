var Schema = require('../../lib/Schema');

var TestSchema = new Schema({
    prop1: String,
    prop2: { type: Number, required: false },
    prop3: { type: { type: Boolean }, foo: String },
    prop4: { foo: { bar: { baz: Date} } },
    prop5: [{
        prop1: String
    }]
});

module.exports = TestSchema;