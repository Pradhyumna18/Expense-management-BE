const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("PUT /editTransaction", () => {
    it("it should edit a transaction", async () => {
      const response = await chai
        .request(app)
        .put("/editTransaction")
        .send({
          "transactionId":266,
          "transactionType":"expense",
          "description" : "groceries",
          "amount" : 350,
          "accountName":"SBI",
          "date" : "4-16-2020",
          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI"
        })
      expect(response).to.have.status(200)
      expect(response.body).to.have.property('success').to.equal(true)
    });
    it(" it should throw an error if any field is undefined in edit transaction", async () => {
      const response = await chai
        .request(app)
        .put("/editTransaction")
        .send({
          "transactionId":undefined,
          "transactionType":"expense",
          "description" : "groceries",
          "amount" : 350,
          "accountName":"SBI",
          "date" : "4-16-2020",
          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI"
        })
      expect(response).to.have.status(500);
      expect(response.body).to.have.property('success').to.equal(false)
    });
  });