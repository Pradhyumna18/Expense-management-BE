const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
describe("DELETE /deleteTransaction", () => {
    it("it should delete a transaction", async () => {
      const response = await chai
        .request(app)
        .delete("/deleteTransaction/"+2)
      expect(response.body).to.have.property('success').to.equal(true)
      expect(response).to.have.status(200)
    });
    it("it should throw an error if id is undefined in delete transaction", async () => {
      const response = await chai
        .request(app)
        .delete("/deleteTransaction/"+undefined)
      expect(response).to.have.status(500);
      expect(response.body).to.have.property('success').to.equal(false)
  });
  })