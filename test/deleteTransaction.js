const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("DELETE /deleteTransaction", () => {
    it("deleteTransaction", async()=> {
        const response = await chai.request(app).delete("/deleteTransaction/" + 96)
        if (response.error == false) {
            expect(response).be.a('object')
            expect(response.body).to.have.property('success').to.equal(true)
            expect(response).to.have.status(200)
        }
        else {
            expect(response).to.have.status(500);
            expect(response.body).to.have.property('success').to.equal(false)
        }
    });
})
