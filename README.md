# vson
> JavaScript object validator, using schemas

**Vson** is an object validator for nodejs. It uses
a similar technique to Mongoose, which uses defined schemas for validation. However,
there are no models here. The validation is being done by passing the schema
and the object to validate.

## Install

```bash
$ npm install vson
```

## Usage
Create a schema:
```javascript
var vson = require('vson');
var FooSchema = new vson.Schema({
    bar: Number
});
```

Validate an object:
```javascript
var vson = require('vson');
var FooValidator = new vson.Validator(FooSchema, { allowNulls: true });

FooValidator.validate({ bar: 5 }, function(err) {
    //=> error = null
});
```

### Schema's Rules
A schema's child called a `property`. A property value can be one of the following:

#### Definition
You can see all the appropriate definitions [here](http://github.com/yardnsm/vson/blob/master/lib/defaults.js).
A definition is the property's settings. For example:
```javascript
{
    prop: { type: String, default: 'wat' } // This is called a definition
}
```

#### Only a Type
You can see all the types [here](http://github.com/yardnsm/vson/blob/master/lib/defaults.js).
For example:
```javascript
{
    prop: Date
}
```

If the property value is only a type, it gains the default values for
its definition. The default definition value:
```javascript
{ type: String } // Could be any specified type
```

#### Virtual
A virtual is just a child object. For example:
```javascript
{
    prop: { // This is a virtual
        inside: String,
        yay: { type: String, required: true }
    }
}
```

#### Embedded Schema
An embedded schema is basically just an array of virtuals. For example:
```javascript
{
    prop: [{
        prop: String,
        wow: { type: Number }
    }]
}
```

#### wat
If there is a property called `type`, the property value is considered
as a *definition*. If you need to include a `type` property
inside a virtual, make the value of `type` as a definition. In other words, if there
is a `type` property inside, so the value considered as a definition.
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

### vson.Schema(schema); `[instance]`
Creates a new vson schema instance.

#### Schema
Type: `object`


### vson.Schema().validate([schema]);
Validate a schema's structure.

#### schema
Type: `object`<br>
Default: `this.schema`


### vson.Validator(Schema, [options]); `[instance]`
Creates a new vson validator instance.

#### Schema
Type: `vson.Schema`

#### [options]
Type: `object`<br>
Default: `{}`

##### allowNulls
Type: `boolean`<br>
Default: `false`

##### requireAll
Type: `boolean`<br>
Default: `false`

##### allowExtras
Type: `boolean`<br>
Default: `false`

### vson.Validator().validate(obj, callback);
Validate an object accroding to a schema.

#### obj
Type: `object`

#### callback
Type: `function`

## License
MIT © [Yarden Sod-Moriah](http://yardnsm.net/)
