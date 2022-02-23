var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(require('chai-json-schema-ajv'));

const expect = chai.expect;

const planetSchema = {
  title: 'Planets Schema',
  type: 'object',
  required: ['name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'residents',
    'films',
    'created',
    'edited',
    'url'],
  properties: {
    'name': {
      type: 'string',
      minLength: 2
    },
    'rotation_period': {
      type: 'string',
      minLength: 1
    },
    'orbital_period': {
      type: 'string',
      minLength: 2
    },
    'diameter': {
      type: 'string',
      minLength: 1
    },
    'climate': {
      type: 'string',
      minLength: 3
    },
    'gravity': {
      type: 'string',
      minLength: 1
    },
    'terrain': {
      type: 'string',
      minLength: 3
    },
    'surface_water': {
      type: 'string',
      minLength: 1
    },
    'population':{
      type: 'string',
      minLength: 1
    },
    'residents':{
      type: 'array',
      uniqueItems: true,
      minItems: 0,
      items: {
        type: 'string'
      }
    },
    'films':{
      type: 'array',
      uniqueItems: true,
      minItems: 0,
      items: {
        type: 'string'
      }
    },
    'created':{
      type: 'string',
      minLength: 25
    },
    'edited':{
      type: 'string',
      minLength: 25
    },
    'url': {
      type: 'string',
      minLength: 20
    }
  }
}

describe('Planets endpoint tests', () => {
  describe('Perform regular tests', () => {
    it('Verify response details', (done) => {
      chai.request('https://swapi.dev')
      .get('/api/planets/3/')
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response).to.have.header('content-type', 'application/json');

        let responseBody = response.body;
        expect(responseBody).to.be.jsonSchema(planetSchema);
        expect(responseBody.name).to.be.equal('Yavin IV');
        expect(responseBody.diameter).to.be.equal('10200');
        expect(responseBody.population).to.be.equal('1000');
        expect(responseBody.terrain).to.include('jungle');
        expect(responseBody.terrain).to.include('rainforests');
        done();
      });
    });

    it('Response time should be less than 3ms', (done) => {
      let startTime = Date.now();
      chai.request('https://swapi.dev')
      .get('/api/planets/3/')
      .end((error, response) => {
        let endTime = Date.now();
        timeElapsed = endTime - startTime;

        expect(error).to.be.null;
        expect(timeElapsed).to.be.at.most(3);
        done();
      });
    });
  });

  describe('Perform negative test', () => {
    it('Post should return a 405 error', (done) =>  {
      chai.request('https://swapi.dev')
      .post('/api/planets/3/')
      .send({'name': 'Automated testing', 'Completed': true})
      .end((error, response) => {
        let expectedResponse = 'Method \'POST\' not allowed.';

        expect(error).to.be.null;
        expect(response).to.have.status(405);
        expect(response.body.detail).to.equal(expectedResponse);
        done();
      });
    });
  });
});
