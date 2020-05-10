const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("GET /getAccountBalance", function () {
    it("it should return account balance", async () => {
        const response = await chai.request(app).get('/getAccountBalance/'+ 'SBI').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InByYUBnbWFpbC5jb20iLCJ1c2VySWQiOjM2LCJpYXQiOjE1ODg3NzE1NjZ9.ypHApBSOyao2fvTJ2p7bDMcWtXH6HAZ3DYyefGB1aAI')
        expect(response).to.have.status(200)
        expect(response.body).to.have.property('success').to.equal(true)
        expect(response.body).to.have.property('balance')
    });
    it("it should thrown an error if account name is invalid or userId is invalid", async () => {
        const response = await chai.request(app).get('/getAccountBalance/' + undefined)
        expect(response).to.have.status(500)
        expect(response.body).to.have.property('success').to.equal(false)
    });
});
