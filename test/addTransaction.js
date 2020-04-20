const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("POST /addTransaction", () => {
  it("add transaction", async () => {
    const response = await chai.request(app).post("/addTransaction").send({
      "transactionType": "income",
      "description": "groceries",
      "amount": 250,
      "accountName": "SBI",
      "date": "4-16-2020",
      "userId": 21
    })

    if (response.error == false) {
      expect(response).to.have.status(201)
      expect(response.body).be.a('object')
      expect(response.body).to.have.property('success').to.equal(true)
    }
    else {
      expect(response).to.have.status(500);
      expect(response.body).to.have.property('success').to.equal(false)
    }
  });
});

