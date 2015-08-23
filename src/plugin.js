'use strict';
var Joi = require('joi');

exports.register = function(plugin, options, next){
  var schemaOptions =  Joi.alternatives().try(
    Joi.object().keys({
      lower_case: Joi.boolean().required(),
      camel_case: Joi.boolean().when('lower_case', { is: true, then: Joi.invalid(true) }),
      all_caps: Joi.boolean().when('lower_case', { is: true, then: Joi.invalid(true) }),
      first_cap: Joi.boolean().when('lower_case', { is: true, then: Joi.invalid(true) })
    }),
    Joi.object().keys({
      lower_case: Joi.boolean().when('camel_case', { is: true, then: Joi.invalid(true) }),
      camel_case: Joi.boolean().required(),
      all_caps: Joi.boolean().when('camel_case', { is: true, then: Joi.invalid(true) }),
      first_cap: Joi.boolean().when('camel_case', { is: true, then: Joi.invalid(true) })
    }),
    Joi.object().keys({
      lower_case: Joi.boolean().when('all_caps', { is: true, then: Joi.invalid(true) }),
      camel_case: Joi.boolean().when('all_caps', { is: true, then: Joi.invalid(true) }),
      all_caps: Joi.boolean().required(),
      first_cap: Joi.boolean().when('all_caps', { is: true, then: Joi.invalid(true) }),
    }),
    Joi.object().keys({
      lower_case: Joi.boolean().when('first_cap', { is: true, then: Joi.invalid(true) }),
      camel_case: Joi.boolean().when('first_cap', { is: true, then: Joi.invalid(true) }),
      all_caps: Joi.boolean().when('first_cap', { is: true, then: Joi.invalid(true) }),
      first_cap: Joi.boolean().required()
    })
  );

  var validate = Joi.validate(options, schemaOptions);
  if (validate.error) {
    return next(validate.error);
  }


  plugin.ext('onRequest', function(request, reply) {
    if (!request.query || Object.keys(request.query).length === 0) {
      return reply.continue();
    }
    Object.keys(request.query).forEach(function(attr){
      var tmpAttr;
      var str;
      if (options.lower_case) {
        //convert FirstName => firstname
        tmpAttr = attr;
        str = attr.toString().toLowerCase();
      }
      else if (options.camel_case) {
        // convert FirstName => firstName
        // convert First_Name => firstName
        // convert first_name => firstName
        tmpAttr = attr;
        str = attr.toString().replace(/(\_[a-z])/gi, function($1){return $1.toUpperCase().replace('_','');});
        str = str.substr(0,1).toLowerCase() + str.slice(1,str.length);
      }
      else if (options.all_caps) {
        // continue firstName => FIRSTNAME
        tmpAttr = attr;
        str = attr.toString().toUpperCase();
      }
      else if (options.first_cap) {
        // convert firstName => FirstName
        tmpAttr = attr;
        str = attr.toString();
        str = str.substr(0,1).toUpperCase() + str.slice(1, str.length);
      }

      request.query[str] = request.query[tmpAttr];
    });

    if (process.env && process.env.NODE_ENV === 'test') {
      return reply.continue(request.query);
    }
    reply.continue();

  });

  next();
};

