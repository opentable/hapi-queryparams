'use strict';

var expect = require('expect.js');
var plugin = require('../index.js');

describe('Plugin option validation', function() {
    describe('given no options', function() {
        it('should return error', function() {
            plugin.register(null, {}, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "lower_case" fails because ["lower_case" is required]. child "camel_case" fails because ["camel_case" is required]. child "all_caps" fails because ["all_caps" is required]. child "first_cap" fails because ["first_cap" is required]');
            });
        });
    });
    describe('Given two options', function(){
       it('Should return an error', function(){
           plugin.register(null, {lower_case: true, camel_case: true}, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "camel_case" fails because ["camel_case" contains an invalid value]. child "lower_case" fails because ["lower_case" contains an invalid value]. child "all_caps" fails because ["all_caps" is required]. child "first_cap" fails because ["first_cap" is required]');
            });
       });
    });
    describe('Given all options', function(){
       it('Should return an error', function(){
           plugin.register(null, {lower_case: true, camel_case: true, all_caps: true, first_cap: true }, function(err) {
               expect(err.toString()).to.equal('ValidationError: child "camel_case" fails because ["camel_case" contains an invalid value]. child "lower_case" fails because ["lower_case" contains an invalid value]. child "lower_case" fails because ["lower_case" contains an invalid value]. child "lower_case" fails because ["lower_case" contains an invalid value]');
            });
       });
    });
});