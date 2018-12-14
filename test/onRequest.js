process.env.NODE_ENV = 'test';
const expect = require('expect.js');
const rewire = require('rewire');
const plugin = rewire('../src/plugin.js');

const request = {
  info: { received: new Date() },
  method: 'get',
  response: { statusCode: 200 },
  query: {
    First_name: 'Doron',
    lastName: 'Doron',
    DateTime: '2012-04-05',
    whAtever: 'blah'
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
  describe('options: lowerCase:true', function() {
    const pluginOptions = { lowerCase: true };

    before(function(done){
      plugin({
          ext(_, handler) {
            handler(request, { continue() { done(); }});
          }
        },
        pluginOptions,
        function() {}
      );
    });

    it('should have lower case query params', function() {
      expect(request.query.first_name).to.be.eql(request.query.First_name);
      expect(request.query.lastname).to.be.eql(request.query.lastName);
      expect(request.query.datetime).to.be.eql(request.query.DateTime);
    });
  });

  describe('options: schemaCase: {schema}', function() {
    const pluginOptions = { schemaCase: {first_Name: null, LastName: null, dateTime: null} };

    before(function(done) {
      plugin({
          ext(_, handler) {
            handler(request, { continue() { done(); }});
          }
        },
        pluginOptions,
        function() {}
      );
    });

    it('should have camel case known query params', function() {
      expect(request.query.First_name).to.be.eql(request.query.first_Name);
      expect(request.query.lastName).to.be.eql(request.query.LastName);
      expect(request.query.DateTime).to.be.eql(request.query.dateTime);
      expect(request.query.whAtever).to.be.eql(request.query.whAtever);
    });
  });

  describe('options: lowerCase:true, deleteOriginal:true', function() {
    const pluginOptions = { lowerCase: true, deleteOriginal: true };

    before(function(done) {
      plugin({
          ext(_, handler) {
            handler(request, { continue() { done(); }});
          }
        },
        pluginOptions,
        function() {}
      );
    });

    it('should have lower case query params', function() {
      expect(request.query.first_name).to.eql('Doron');
      expect(request.query.lastname).to.eql('Doron');
      expect(request.query.datetime).to.eql('2012-04-05');
    });

    it('Should remove the original query params', function() {
      expect(request.query.First_name).to.be.undefined;
      expect(request.query.LastName).to.be.undefined;
      expect(request.query.DateTime).to.be.undefined;
    });
  });
});
