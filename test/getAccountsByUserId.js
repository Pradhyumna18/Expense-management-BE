const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("GET /getAccountsByUserId", function () {
    it("it returns accounts by userid", async () => {
        const response = await chai.request(app).get('/getAccountsByUserId/' + 2)

        expect(response).to.have.status(200)
        expect(response.body).be.a('object')
        expect(response.body).to.have.property('success').to.equal(true)
        expect(response.body).to.have.property('accounts')

    });
    it("it should return an error if userId is invalid", async () => {
        const response = await chai.request(app).get('/getAccountsByUserId/' + undefined)

        expect(response).to.have.status(500);
        expect(response.body).to.have.property('success').to.equal(false)

    });
});



