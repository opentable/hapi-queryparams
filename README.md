Hapi.js Query Params (Plugin)
=============================

[![Build Status](https://travis-ci.org/doron2402/hapi-queryparams.svg)](https://travis-ci.org/doron2402/hapi-queryparams)

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
  register: require('hapi-queryparams'),
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
  register: require('hapi-queryparams'),
  options: {
  delete_original: true,
  camel_case: true
  }
])

// from user_name=doron2402 => userName=doron2402 // user_name will be deleted
```


** IMPORTANT: options must have only ONE param you can camel case and all caps,


Github
-------------

Check the [GitHub issues](https://github.com/doron2402/hai-queryparams/issues).


LICENSE
-------

[LICENSE](https://github.com/doron2402/hapi-queryparams/blob/master/LICENSE).

