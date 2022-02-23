var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const nock = require('nock');


describe('Mock Planet API test', () =>{
  it('Should return \'Earth Prime\' as name of planet', (done) => {
    const mockPlanetsApi = nock('https://swapi.dev', { allowUnmocked: true })
    .get('/mock/api/planets/3/')
    .reply(200, {
      "name": "Earth Prime",
      "rotation_period": "24",
      "orbital_period": "4818",
      "diameter": "12742",
      "climate": "temperate, tropical",
      "gravity": "1 standard",
      "terrain": "jungle, rainforests, others",
      "surface_water": "8",
      "population": "8000000000",
      "residents": [],
      "films": [
          "https://swapi.dev/api/films/1/"
      ],
      "created": "2022-02-23T11:37:19.144000Z",
      "edited": "2022-02-23T20:58:18.421000Z",
      "url": "https://swapi.dev/api/planets/3/"
    });
    chai.request('https://swapi.dev')
    .get('/mock/api/planets/3/')
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200);
      expect(response).to.be.json;

      let responseBody = response.body;
      expect(responseBody.name).to.be.equal('Earth Prime');
      expect(responseBody.diameter).to.be.equal('12742');
      expect(responseBody.population).to.be.equal('8000000000');
      expect(responseBody.terrain).to.include('others');
      expect(responseBody.terrain).to.include('rainforests');
      done();
    });
  });
});
