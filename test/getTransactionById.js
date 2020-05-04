const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("GET /getTransactionById", function() {
    it("it should return transactions by transaction id", async () => {
        const response = await chai.request(app).get('/getTransactionById/' + 2)
        expect(response.body).to.have.property('success').to.equal(true)
        expect(response).to.have.status(200);      
    });
    it("it should throw an error if transaction id is invalid", async () => {
        const response = await chai.request(app).get('/getTransactionById/' + undefined)
        expect(response.body).to.have.property('success').to.equal(false)
        expect(response).to.have.status(500);
           
    });

});


