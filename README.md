# vson
> JavaScript object validator, using schemas

**Vson** is an object validator for nodejs. It uses
a similar technique to Mongoose, which uses defined schemas for validation.

## Install

```bash
$ npm install vson
```

## Usage
Create a schema:
```javascript
var vson = require('vson');
var Schema = vson.Schema;

var FooSchema = new Schema({
    bar: Number
});
```

Create a model:
```javascript
var fooModel = vson.model(FooSchema);
```

Validate a model:
```javascript
// Validation
fooModel.validate({ bar: 5 }, function(err) {
    //=> error = null
});
```

### Schema's Rules
A schema's child called a `property`. A property value can be one of the following:

#### Only a Type
You can see all the types [here](http://github.com/yardnsm/vson/blob/master/lib/defaults.js).
If the property value is only a type, it gains the default
values for a definition. For example:
```javascript
{
    prop: Date
}
```

#### Definition
You can see all the appropriate definitions [here](http://github.com/yardnsm/vson/blob/master/lib/defaults.js).
A definition is the property's settings. For example:
```javascript
{
    prop: { type: String, default: 'wat' } // This is called a definition
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

#### Embedded Schema
An embedded schema is accepted as the following:
```javascript
{
    prop: [{
        prop: String,
        wow: { type: Number }
    }]
}
```

#### wat
If there is a property of `type`, the property value is considered
as a *definition*. If you need to include a `type` property
inside a virtual, make the value of `type` as a definition:
```javascript
{
    wrong: {
        type: Boolean // so sad.
    },
    right: {
        type: { type: Boolean } // Works!
    }
}
```

## API

### vson.Schema(schema);

#### Schema
Type: `object`

### vson.Schema().validate([schema]);

#### schema
Type: `object`<br>
Default: `this.schema`

### vson.model(Schema, [options]);

#### Schema
Type: `vson.Schema`

#### [options]

##### allowNulls
Type: `boolean`<br>
Default: `false`

##### requireAll
Type: `boolean`<br>
Default: `false`

##### allowExtras
Type: `boolean`<br>
Default: `false`

Requires all the given properties (include childs), unless the property's definition says differently.

## License
MIT © [Yarden Sod-Moriah](http://yardnsm.net/)
