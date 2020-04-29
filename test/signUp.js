const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("POST /signup", () => {
  it("signup", async () => {
    const response = await chai.request(app).post("/signup").send({
      "userName": "pradhyumna",
      "password": "pradhyumna"
    })

    if (response.error == false) {
      expect(response.body).be.a('object')
      expect(response.body).to.have.property('success')
      expect(response).to.have.status(201);
      expect(response.body).to.have.property('success').to.equal(true)
    }
    else {
      expect(response.body).be.a('object')
      console.log(response.body.error)
      if (response.body.error == undefined) {
        expect(response).to.have.status(400);
        expect(response.body).to.have.property('success').to.equal(false)
      }
      else {
        expect(response).to.have.status(500);
        expect(response.body).to.have.property('success').to.equal(false)
      }
    }
  });
});

