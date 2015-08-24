'use strict';
process.env.NODE_ENV = 'test';
var expect = require('expect.js');
var rewire = require('rewire');
var plugin = rewire('../src/plugin.js');


describe('Plugin Query Params', function() {

  /*
   *
   * lower_case: true
   *
   */
  describe('When only lower_case:true', function(){
    var pluginOptions = { lower_case: true };
    var req;
    var query = {
      firstName: 'Doron',
      Covers: 2,
      DateTime: new Date()
    };
    before(function(done){
      plugin.register({
        ext: function(_, handler) {
          handler({
            info: {
              received: new Date()
            },
            method: 'get',
            response: {
              statusCode: 200
            },
            query: query,
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
          }, {
            continue: function(res) {
              req = res;
              done();
            }
          });
        }
      }, pluginOptions, function() {});
    });

    it('should have lower case query params', function(){
      expect(req.firstname).to.be.eql(req.firstName);
      expect(req.covers).to.be.eql(req.Covers);
      expect(req.datetime).to.be.eql(req.DateTime);
    });
  });


  /*
   *
   * camel_case: true
   */
  describe('When only camel_case:true', function(){
    var pluginOptions = { camel_case: true };
    var req;
    var query = {
      FirstName: 'Doron',
      Last_Name: 'Doron',
      user_name: 'doron2402'
    };
    before(function(done){
      plugin.register({
        ext: function(_, handler) {
          handler({
            info: {
              received: new Date()
            },
            method: 'get',
            response: {
              statusCode: 200
            },
            query: query,
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
          }, {
            continue: function(res) {
              req = res;
              done();
            }
          });
        }
      }, pluginOptions, function() {});
    });

    it('should have lower case query params', function(){
      expect(req.FirstName).to.be.eql(req.firstName);
      expect(req.Last_Name).to.be.eql(req.lastName);
      expect(req.user_name).to.be.eql(req.userName);
    });
  });

  /*
   *
   * all_caps: true
   */
  describe('When only all_caps:true', function(){
    var pluginOptions = { all_caps: true };
    var req;
    var query = {
      FirstName: 'Doron',
      Last_Name: 'Doron',
      user_name: 'doron2402'
    };
    before(function(done){
      plugin.register({
        ext: function(_, handler) {
          handler({
            info: {
              received: new Date()
            },
            method: 'get',
            response: {
              statusCode: 200
            },
            query: query,
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
          }, {
            continue: function(res) {
              req = res;
              done();
            }
          });
        }
      }, pluginOptions, function() {});
    });

    it('should return ALL CAPITAL LETTERS', function(){
      expect(req.FirstName).to.be.eql(req.FIRSTNAME);
      expect(req.Last_Name).to.be.eql(req.LAST_NAME);
      expect(req.user_name).to.be.eql(req.USER_NAME);
    });
  });

  /*
   *
   * first_cap: true
   */
  describe('When only first_cap:true', function(){
    var pluginOptions = { first_cap: true };
    var req;
    var query = {
      firstName: 'Doron',
      last_Name: 'Doron',
      user_name: 'doron2402'
    };
    before(function(done){
      plugin.register({
        ext: function(_, handler) {
          handler({
            info: {
              received: new Date()
            },
            method: 'get',
            response: {
              statusCode: 200
            },
            query: query,
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
          }, {
            continue: function(res) {
              req = res;
              done();
            }
          });
        }
      }, pluginOptions, function() {});
    });

    it('should return first letter CAPITAL LETTER', function(){
      expect(req.firstName).to.be.eql(req.FirstName);
      expect(req.last_Name).to.be.eql(req.Last_Name);
      expect(req.user_name).to.be.eql(req.User_name);
    });
  });
  
  
  /*
   *
   * lower_case: true
   * delete_original: true
   */
  describe('When only lower_case:true AND delete_original: true ', function(){
    var pluginOptions = { lower_case: true, delete_original: true };
    var req;
    var date = new Date();
    var query = {
      firstName: 'Doron',
      Covers: 2,
      DateTime: date
    };
    before(function(done){
      plugin.register({
        ext: function(_, handler) {
          handler({
            info: {
              received: date
            },
            method: 'get',
            response: {
              statusCode: 200
            },
            query: query,
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
          }, {
            continue: function(res) {
              req = res;
              done();
            }
          });
        }
      }, pluginOptions, function() {});
    });

    it('should have lower case query params', function(){
      expect(req.firstname).to.be.eql('Doron');
      expect(req.covers).to.be.eql(2);
      expect(req.datetime).to.be.eql(date);
    });
    
    it('Should remove the original query params', function(){
      expect(req.firstName).to.be.undefined;
      expect(req.Covers).to.be.undefined;
      expect(req.DateTime).to.be.undefined;
    });
  });
});

