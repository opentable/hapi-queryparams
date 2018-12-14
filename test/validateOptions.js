const expect = require('expect.js');
const plugin = require('../index.js');

describe('Plugin option validation', function() {
  describe('given no options', function() {
    it('should return error', function() {
      plugin.register(null, {})
        .catch(err => {
          expect(err.toString()).to.equal('ValidationError: "value" must contain at least one of [lowerCase, schemaCase]')
        });
    });
  });
  describe('given invalid joi schema', function() {
    it('should return error', function() {
      plugin.register(null, {lowerCase: false, schemaCase: null})
        .catch(err => {
          expect(err.toString()).to.equal('ValidationError: child "schemaCase" fails because ["schemaCase" must be an object]');
        });
    });
  });
  describe('Given two options', function() {
    it('Should return an error', function() {
      plugin.register(null, {lowerCase: true, schemaCase: {firstName: null}}
      )
        .catch(err => {
          expect(err.toString()).to.equal('ValidationError: "value" contains a conflict between exclusive peers [lowerCase, schemaCase]');
        });
    });
  });
});
