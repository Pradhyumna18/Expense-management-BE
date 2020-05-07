const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("POST /addTransaction", () => {
  it("it should add a transaction", async () => {
   const response = await  chai.request(app)
      .post("/addTransaction")
      .send({
        "transactionType":"expense",
        "description" : "groceries",
        "amount" : 250,
        "accountName":"SBI",
        "date" : "4-16-2020",
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI"
      })
    expect(response).to.have.status(201)
    expect(response.body).to.have.property('success').to.equal(true)
  });
  it("it should throw an error if any field is undefined in addTransaction", async () => {
    const response = await  chai.request(app)
       .post("/addTransaction")
       .send({
        "transactionType":"expense",
        "description" : "groceries",
        "amount" : 250,
        "accountName":"sb",
        "date" : "4-16-2020",
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI"
      })
        expect(response).to.have.status(500);
        expect(response.body).to.have.property('success').to.equal(false)
  });
});