# vson
> An object validator, using schemas

**Vson** is an object validator for nodejs. It uses
a similar technique to Mongoose, which uses defined schemas for validation.

## Install

```bash
$ npm install vson
```


## Usage
It is the same as mongoose: just declare a new schema as the following:
```javascript
var vson = require('vson');
var Schema = vson.Schema;

var FooSchema = new Schema({
    prop: Number,
    anotherProp: { type: String, default: 'wat' },
    wow: [{
        much: String,
        so: { type: Date, required: false }
    }]
});

var FooModel = vson.model('FooModel', FooSchema);
```

The validation is even simpler:
```javascript
var foo = new FooModel({
    prop: 5,
    anotherProp: 'ha',
    wow: { much: 'much' }
});

// You can also change the properties after setting the schema
foo.prop = 7;

// Validation (sync)
var result = foo.validateSync();

// Validation (async)
foo.validate(function(err) {
    // nah
});
```

Or just do it like this:
```javascript
FooModel.validate({ prop: "not a number. ha." }, function(err) {
    // nah
});
```

## Supported features
The whole concept is the same as mongoose, and the schema structure is the same. However,
this not MongoDB we talking about, so there are a few differences between mongoose and vson:
- No plugins at this moment
- No setters / getters
- No indexes
- No middlewares

## License
MIT © [Yarden Sod-Moriah](https://yardnsm.net/)