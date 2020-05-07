const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("POST /addAccount", function () {
    it("addAccount", async () => {
        const response = await chai.request(app).post("/addAccount").send({
            "accountName": "SBI",
            "accountBalance": 100,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI"
        })
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('success').to.equal(true)
    });
    it("it should return an error if account already exist", async () => {
        const response = await chai.request(app).post("/addAccount").send({
            "accountName": "SBI",
            "accountBalance": 100,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI"
        })
        expect(response).to.have.status(400);
        expect(response.body).to.have.property('success').to.equal(false)
    });
    it("it should return an error if accountName or accountBalance or userId is invalid", async () => {
        const response = await chai.request(app).post("/addAccount").send({
            "accountName": "Sb",
            "accountBalance": 100,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI"
        })
        expect(response).to.have.status(400);
        expect(response.body).to.have.property('success').to.equal(false)
    });
});
