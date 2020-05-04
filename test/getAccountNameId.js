const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("GET /getAccountNameId", function () {
    it("it returns account name", async () => {
        const response = await chai.request(app).get('/getAccountNameById/' + 1 + '/' + 1)
        expect(response).to.have.status(200)
        expect(response.body).to.have.property('success').to.equal(true)
        expect(response.body).to.have.property('accountName')
    });
    it("it should throw an error if accountid is invalid", async () => {
        const response = await chai.request(app).get('/getAccountNameById/' + 1 + '/' + undefined)
        expect(response).to.have.status(500);
        expect(response.body).to.have.property('success').to.equal(false)

    });
});


