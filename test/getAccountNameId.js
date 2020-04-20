const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("GET /getAccountNameId", () => {
    it("get account name", async () => {
        const response = await chai.request(app).get('/getAccountNameById/' + 21 + '/' + 48)
        if (response.error == false) {
            expect(response).to.have.status(200)
            expect(response.body).be.a('object')
            expect(response.body).to.have.property('success').to.equal(true)
            expect(response.body).to.have.property('accountName')
        }
        else {
            expect(response).to.have.status(500);
            expect(response.body).to.have.property('success').to.equal(false)
        }
    });
});


