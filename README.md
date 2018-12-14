Hapi.js Query Params (Plugin)
=============================

[![Build Status](https://travis-ci.org/opentable/ot-hapi-queryparams.svg)](https://travis-ci.org/opentable/ot-hapi-queryparams)

Hapi.js Plugin for convert query params to
  - schema cases (given a Schema, match casing for given params)
  - lower case

WHY?
===
  - we had to support different query params from old clients so we want to convert all of them to lower case


How?
====
```javascript

// server
server.register([
  register: require('ot-hapi-queryparams'),
  options: {
  deleteOriginal: true/false // remove the origin query param attribute
  //only one of these should be set at a time.
    schemaCased: { userName: Joi.string().required() }, // username => userName (given a schema with userName as a key)
    lowerCase: true/false // UserName => username
  }
])

```
```javascript
// correct way to pass options
server.register([
  register: require('ot-hapi-queryparams'),
  options: {
  deleteOriginal: true,
  schemaCased: {firstName: null}
  }
])

// from user_name=opentable => userName=opentable // user_name will be deleted
```


** IMPORTANT: options must have only ONE param you can schema case or lower case,


Github
-------------

Check the [GitHub issues](https://github.com/opentable/ot-hapi-queryparams/issues).


LICENSE
-------

[LICENSE](https://github.com/opentable/ot-hapi-queryparams/blob/master/LICENSE).

