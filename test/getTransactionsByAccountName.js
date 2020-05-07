const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe("GET /transactionByAccountName", () => {
    it("it should return transactions by accountName", async () => {
      const response = await chai
        .request(app)
        .get('/getTransactionsByAccountName/' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI" + '/' + 'SBI')
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
        .get('/getTransactionsByAccountName/' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI" + '/' + 'BI')
      expect(response.body).to.have.property('success').to.equal(false)
      expect(response).to.have.status(500);
    });
  });