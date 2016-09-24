const Schema = require('../lib/Schema');
const { expect } = require('chai');

describe.only('Schema', () => {
    describe('constructor', () => {
        it('should create an instance', () => {
            var s = new Schema({});
            expect(s).to.be.instanceOf(Schema);
        });
    });

    describe('validator', () => {
        it('should return true if Schema is fine', () => {
            var s = new Schema({
                prop1: Buffer,                                     // Only a type
                prop3: { type: { type: Boolean }, foo: String },   // Type is actually an inner-child (virtual)
                prop4: { foo: { bar: { baz: Date} } },             // Inner child (virtual)
                prop2: { type: Buffer, required: false },          // With a 'definition'
                prop5: [String, Number],                           // Multiple types
                prop6: [{                                          // Embedded schema
                    prop1: String,
                    prop2: { type: Number, required: false },
                    prop3: { type: { type: Boolean }, foo: String },
                    prop4: { foo: { bar: { baz: Date} } }
                }]
            });

            expect(s.validate()).to.be.true;
        });

        it('should throw an error if a property is null', () => {
            var s = new Schema({
                prop1: null
            });

            expect(s.validate.bind(null, s.getSchema())).to.throw(Error);
        });

        it('should throw an error if there is a wrong type', () => {
            var s = new Schema({
                prop1: 'not-a-type',
                prop2: ['nope.', String]
            });

            expect(s.validate.bind(null, s.getSchema())).to.throw(Error);
        });

        it('should throw an error if there is a wrong definition', () => {
            var s = new Schema({
                prop1: { type: String, shouldNoBeHere: 'wat' }
            });

            expect(s.validate.bind(null, s.getSchema())).to.throw(Error);
        });
    });
});
