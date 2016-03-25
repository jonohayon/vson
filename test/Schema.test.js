var Schema = require('../lib/Schema');
var expect = require('chai').expect;

describe.only('Schema', function () {

    describe('constructor', function () {

        it('should create an instance', function (done) {
            var s = new Schema({});
            expect(s).to.be.instanceOf(Schema);
            done();
        });
    });

    describe('validator', function () {

        it('should return true if Schema is fine', function (done) {
            var s = new Schema({
                prop1: Buffer,                                     // Only a type
                prop2: { type: Buffer, required: false },          // With a 'definition'
                prop3: { type: { type: Boolean }, foo: String },   // Type is actually an inner-child (virtual)
                prop4: { foo: { bar: { baz: Date} } },             // Inner child (virtual)
                prop5: [{                                          // Embedded schema
                    prop1: String,
                    prop2: { type: Number, required: false },
                    prop3: { type: { type: Boolean }, foo: String },
                    prop4: { foo: { bar: { baz: Date} } }
                }]
            });

            expect(s.validate()).to.be.true;
            done();
        });

        it('should throw a property is null', function (done) {
            var s = new Schema({
                prop1: null
            });

            expect(s.validate.bind(null, s)).to.throw(Error);
            done();
        });

        it('should throw an error if there is a wrong type', function (done) {
            var s = new Schema({
                prop1: 'not-a-type'
            });

            expect(s.validate.bind(null, s)).to.throw(Error);
            done();
        });

        it('should throw an error if there is a wrong definition', function (done) {
            var s = new Schema({
                prop1: { type: String, shouldNoBeHere: 'wat' }
            });

            expect(s.validate.bind(null, s)).to.throw(Error);
            done();
        });

    });
});