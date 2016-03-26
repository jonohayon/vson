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

    describe('validation', function () {

        var testModel = model(TestSchema);

        it('should fire up a callback once the validation is done', function (done) {
            testModel.validate(TestObject, function(err) {
                done();
            });
        });

        describe('error', function () {

            it('should have a value of null if test is fine', function (done) {
                testModel.validate(TestObject, function(err) {
                    expect(err).to.be.null;
                    done();
                });
            });

            it('should not be null if test went wrong', function (done) {

                var tmp = TestObject;
                tmp.prop = 5;

                testModel.validate(tmp, function(err) {
                    expect(err).to.not.be.null;
                    done();
                });
            });
        });
    });
});