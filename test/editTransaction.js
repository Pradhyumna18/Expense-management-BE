const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("PUT /editTransaction", () => {
    it("editTransaction", async () => {
        const response = await chai.request(app).put("/editTransaction").send({
            "transactionType": "expense",
            "description": "groceries",
            "amount": 350,
            "accountName": "SBI",
            "date": "4-16-2020",
            "userId": 21,
            "transactionId": 96
        })

        if (response.error == false) {
            expect(response).to.have.status(200)
            expect(response.body).be.a('object')
            expect(response.body).to.have.property('success').to.equal(true)
        }
        else {
            expect(response).to.have.status(500);
            expect(response.body).to.have.property('success').to.equal(false)
        }
    });
});



