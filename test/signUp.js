const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("POST /signup",function() {
  it("signup", async () => {
    const response = await chai.request(app).post("/signup").send({
      "userName": "pra@gmail.com",
      "password": "b2@b.b"
    })
      expect(response).to.have.status(201);
      expect(response.body).to.have.property('success').to.equal(true)
  });
  it("it should throw an error if User already exist", async () => {
    const response = await chai.request(app).post("/signup").send({
      "userName": "prad@gmail.com",
      "password": "b2@b.b"
    })
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('success').to.equal(false)
  });
  it("it should throw an error if username is invalid", async () => {
    const response = await chai.request(app).post("/signup").send({
      "userName": undefined,
      "password": "b2@b.b"
    })
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('success').to.equal(false)
  });
});

