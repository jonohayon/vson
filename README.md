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

## Dictionary
A schema's child called `property`. A `property` value can be one of the following:

#### Only a Type
If the property value is only a type (types can be found below), so
    it gains the default values for a definition. For example:
```javascript
{
    prop: Date
}
```

#### Definition
A definition is the property's settings. For example:
```javascript
{
    prop: { type: String, default: 'wat' } // This is a definition
}
```

#### Virtual
A virtual is just a child object. For example:
```javascript
{
    prop: { // This is a virtual
        inside: String,
        yay: { type: String }
    }
}
```
If there is a child property of `type`, the property value is considered
as a *definition*. If you need to include a `type` property
inside a virtual, make the value of `type` as a definition:
```javascript
{
    prop: {
        type: { type: Boolean }
    }
}
```

#### Child-Schema
A child schema is accepted as array of one schema. For example:
```javascript
{
    prop: [{
        prop: String,
        wow: { type: Number }
    }]
}
```

## Supported features
The whole concept is the same as mongoose, and the schema structure is the same. However,
this not MongoDB we talking about, so there are a few differences between mongoose and vson:
- No plugins at this moment
- No setters / getters
- No indexes
- No middlewares

Currently, there is a limited support for types and properties definitions.
The available types are:
- String
- Number
- Date
- Boolean
- Array

The available definition types are (+ their default values):
- type (required for each definition)
- default
- required (default: false)
- min
- max
- lowercase
- uppercase

## Dogfooding
Yep. There is a dogfooding scenario here. <br>
The definition validation - it basically uses a model validation.

## License
MIT © [Yarden Sod-Moriah](http://yardnsm.net/)
