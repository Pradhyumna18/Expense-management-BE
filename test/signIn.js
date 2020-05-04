const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("POST /signin",function () {
    it("it should login a user", async () => {
        const response = await chai.request(app).post("/signin").send({
            "userName": "prad@gmail.com",
            "password": "b2@b.b"
        })

        expect(response.body).to.have.property('token')
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('success').to.equal(true)

    });
    it("it should throw an error if username or password incorrect", async () => {
        const response = await chai.request(app).post("/signin").send({
            "userName": "b2@b.b",
            "password": "b2@b."
        })
        expect(response).to.have.status(401);
        expect(response.body).to.have.property('success').to.equal(false)

    });
    it("it shouls return an error if username or password invalid", async () => {
        const response = await chai.request(app).post("/signin").send({
            "userName": undefined,
            "password": "b2@b.b"
        })
        expect(response).to.have.status(500);
        expect(response.body).to.have.property('success').to.equal(false)

    });
});

