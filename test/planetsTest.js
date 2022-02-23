var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp)

const expect = chai.expect;
//
assert = chai.assert;

describe('Planets endpoint tests', () => {
  describe('Perform regular tests', () => {
    it('Verify response details', (done) => {
      let startTime = Date.now();
      chai.request('https://swapi.dev')
      .get('/api/planets/3/')
      .end((error, response) => {
        let endTime = Date.now();
        timeElapsed = endTime - startTime;

        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response).to.have.header('content-type', 'application/json');

        let responseBody = response.body;
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
});
