const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("GET /getAccountBalance", () => {
    it("gets account balance", async () => {
        const response = await chai.request(app).get('/getTransactionsByAccountName/' + 21 + '/' + 'SBI')
        if (response.error == false) {
            expect(response).be.a('object')
            expect(response.body).to.have.property('success').to.equal(true)
            expect(response).to.have.status(200)
            expect(response.body).to.have.property('transactions')
        }
        else {
            expect(response).to.have.status(500);
            expect(response.body).to.have.property('success').to.equal(false)
        }
    });
});

describe("GET /transactionByAccountName", () => {
    it("it should return transactions by accountName", async () => {
      const response = await chai
        .request(app)
        .get('/getTransactionsByAccountName/' + 1 + '/' + 'SBI')
      expect(response.body).to.have.property('success').to.equal(true)
      expect(response).to.have.status(200)
    });
    it("it should throw an error if user id is invalid", async () => {
      const response = await chai
        .request(app)
        .get('/getTransactionsByAccountName/' + 1 + '/'+ undefined)
      expect(response.body).to.have.property('success').to.equal(false)
      expect(response).to.have.status(500);
    });
    it("it should throw an error if accountName is invalid", async () => {
      const response = await chai
        .request(app)
        .get('/getTransactionsByAccountName/' + undefined + '/' + 'SBI')
      expect(response.body).to.have.property('success').to.equal(false)
      expect(response).to.have.status(500);
    });
  });