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
    camel_case: true, // user_name => userName , UserName => userName
    all_caps: true,   // username => USERNAME
    lower_case: true, // UserName => username
    first_cap: true, // userName => UserName
  }
])

```

** IMPORTANT: options must have only ONE param you can camel case and all caps,


Github
-------------

Check the [GitHub issues](https://github.com/doron2402/hai-queryparams/issues).


LICENSE
-------

[LICENSE](https://github.com/doron2402/hapi-queryparams/blob/master/LICENSE).

