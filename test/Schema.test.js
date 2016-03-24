var Schema = require("../lib/Schema");
var expect = require("chai").expect;

describe.only("Schema", function () {

    describe("constructor", function () {

        it("should create an instance", function (done) {
            var s = new Schema({});
            expect(s).to.be.instanceOf(Schema);
            done();
        });
    });
});