'use strict';
process.env.NODE_ENV = 'test';
const expect = require('expect.js');
const rewire = require('rewire');
const plugin = rewire('../src/plugin.js');

const request = {
  info: {
    received: new Date()
  },
  method: 'get',
  response: {
    statusCode: 200
  },
  query: {
    firstName: 'Doron',
    last_Name: 'Doron',
    DateTime: '2012-04-05'
  },
  url: { pathname: '/test/endpoint' },
  route: {
    settings: {
      plugins: {
        'hapi-queryparams': {
          endpoint: 'test/endpoint',
          version: 'test-version'
        }
      }
    }
  }
};

describe('Plugin Query Params', function() {
  describe('options: lower_case:true', function(){
    const pluginOptions = { lower_case: true };

    before(function(done){
      plugin.register({
          ext(_, handler) {
            handler(request, { continue() { done(); }});
          }
        },
        pluginOptions,
        function() {}
      );
    });

    it('should have lower case query params', function(){
      expect(request.query.firstname).to.be.eql(request.query.firstName);
      expect(request.query.last_name).to.be.eql(request.query.last_Name);
      expect(request.query.datetime).to.be.eql(request.query.DateTime);
    });
  });

  describe('options: camel_case:true', function(){
    const pluginOptions = { camel_case: true };

    before(function(done){
      plugin.register({
          ext(_, handler) {
            handler(request, { continue() { done(); }});
          }
        },
        pluginOptions,
        function() {}
      );
    });

    it('should have lower case query params', function(){
      expect(request.query.firstName).to.be.eql(request.query.firstName);
      expect(request.query.last_Name).to.be.eql(request.query.lastName);
      expect(request.query.DateTime).to.be.eql(request.query.dateTime);
    });
  });

  describe('options: all_caps:true', function(){
    const pluginOptions = { all_caps: true };

    before(function(done){
      plugin.register({
          ext(_, handler) {
            handler(request, { continue() { done(); }});
          }
        },
        pluginOptions,
        function() {}
      );
    });

    it('should return ALL CAPITAL LETTERS', function(){
      expect(request.query.firstName).to.eql(request.query.FIRSTNAME);
      expect(request.query.last_Name).to.eql(request.query.LAST_NAME);
      expect(request.query.DateTime).to.eql(request.query.DATETIME);
    });
  });

  describe('options: first_cap:true', function(){
    const pluginOptions = { first_cap: true };

    before(function(done){
      plugin.register({
          ext(_, handler) {
            handler(request, { continue() { done(); }});
          }
        },
        pluginOptions,
        function() {}
      );
    });

    it('should return first letter CAPITAL LETTER', function(){
      expect(request.query.firstName).to.be.eql(request.query.FirstName);
      expect(request.query.last_Name).to.be.eql(request.query.Last_Name);
      expect(request.query.DateTime).to.be.eql(request.query.DateTime);
    });
  });

  describe('options: lower_case:true, delete_original:true', function(){
    const pluginOptions = { lower_case: true, delete_original: true };

    before(function(done){
      plugin.register({
          ext(_, handler) {
            handler(request, { continue() { done(); }});
          }
        },
        pluginOptions,
        function() {}
      );
    });

    it('should have lower case query params', function(){
      expect(request.query.firstname).to.eql('Doron');
      expect(request.query.last_name).to.eql('Doron');
      expect(request.query.datetime).to.eql('2012-04-05');
    });

    it('Should remove the original query params', function(){
      expect(request.query.firstName).to.be.undefined;
      expect(request.query.last_Name).to.be.undefined;
      expect(request.query.DateTime).to.be.undefined;
    });
  });
});

