var model = require('../lib/model');
var expect = require('chai').expect;

// Sample schema and test object
var TestSchema = require('./fixture/TestSchema');
var TestObject = require('./fixture/TestObject');

describe.only('model', function () {

    describe('creation', function () {

        it('should throw an error if no schema was provided', function (done) {
            expect(model.bind(null)).to.throw(Error);
            done();
        });

        it('should throw an error if the first parameter is not a Schema', function (done) {
            expect(model.bind(null, String)).to.throw(Error);
            expect(model.bind(null, '1')).to.throw(Error);
            expect(model.bind(null, 6)).to.throw(Error);
            expect(model.bind(null, {})).to.throw(Error);
            expect(model.bind(null, new Date())).to.throw(Error);
            done();
        });

        it('should not throw an error if the first parameter is a Schema', function (done) {
            expect(model.bind(null, TestSchema)).to.not.throw(Error);
            done();
        });
    });
});