Hapi.js Query Params (Plugin)
=============================

[![Build Status](https://travis-ci.org/opentable/ot-hapi-queryparams.svg)](https://travis-ci.org/opentable/ot-hapi-queryparams)

Hapi.js Plugin for convert query params to
  - camel cases
  - lower case
  - all caps
  - first charecter CAP

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
  delete_original: true/false // remove the origin query param attribute
  //ONLY ONE OPTION SHOULD BE SET TO TRUE
    camel_case: true, // user_name => userName , UserName => userName
    all_caps: true,   // username => USERNAME
    lower_case: true, // UserName => username
    first_cap: true, // userName => UserName
  }
])

```
```javascript
// correct way to pass options
server.register([
  register: require('ot-hapi-queryparams'),
  options: {
  delete_original: true,
  camel_case: true
  }
])

// from user_name=opentable => userName=opentable // user_name will be deleted
```


** IMPORTANT: options must have only ONE param you can camel case and all caps,


Github
-------------

Check the [GitHub issues](https://github.com/opentable/ot-hapi-queryparams/issues).


LICENSE
-------

[LICENSE](https://github.com/opentable/ot-hapi-queryparams/blob/master/LICENSE).

