'use strict';
const Joi = require('joi');
const _ = require('lodash');

const schemaOptions = 
  Joi.object().keys({
    lowerCase: Joi.boolean(),
    schemaCase: Joi.object(),
    deleteOriginal: Joi.boolean().optional()
  }).xor('lowerCase', 'schemaCase');

function generateKeyMapping(schema) {
  const schemaKeysMap = _.mapValues(schema, function(value, key) { return key; });
  const keyMapping = _.mapKeys(schemaKeysMap, function(value) { return _.toLower(value);});
  return keyMapping;
}

function endPreHandler(reply) {
  if (_.isFunction(reply.continue)) {
    return reply.continue();
  }
  return reply.continue;
}

module.exports = function(server, options) {

  const validate = Joi.validate(options, schemaOptions);
  if (validate.error) {
    return Promise.reject(validate.error);
  }

  server.ext('onRequest', function(request, reply) {
    if (!request.query || Object.keys(request.query).length === 0) {
      return endPreHandler(reply);
    }
    Object.keys(request.query).forEach(function(attr) {
      let tmpAttr;
      let str;
      if (options.lowerCase) {
        //convert FirstName => firstname
        tmpAttr = attr;
        str = attr.toString().toLowerCase();
      }
      else if (options.schemaCase) {
        // convert to schema schemaCase equivelant or retain original casing.
        const keyMapping = generateKeyMapping(options.schemaCase);
        tmpAttr = attr;
        str = attr.toString().toLowerCase();
        str = _.get(keyMapping, str, attr);
      }

      request.query[str] = request.query[tmpAttr];

      if (options.deleteOriginal && tmpAttr.toString() !== str) {
        delete request.query[tmpAttr];
      }
    });

    return endPreHandler(reply);
  });

  return Promise.resolve();
};

