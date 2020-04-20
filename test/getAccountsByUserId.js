const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("GET /getAccountsByUserId", () => {
    it("get accounts by userid", async () => {
        const response = await chai.request(app).get('/getAccountsByUserId/' + 21)
        if (response.error == false) {
            expect(response).to.have.status(200)
            expect(response.body).be.a('object')
            expect(response.body).to.have.property('success').to.equal(true)
            expect(response.body).to.have.property('accounts')
        }
        else {
            expect(response).to.have.status(500);
            expect(response.body).to.have.property('success').to.equal(false)
        }
    });
});



