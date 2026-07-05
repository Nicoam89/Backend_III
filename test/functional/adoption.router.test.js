const request = require("supertest");
const { expect } = require("chai");
const sinon = require("sinon");

const createTestApp = require("../helpers/testApp.js");
const { createAdoptionRouter } = require("../../src/routes/adoption.router.js");

describe("Functional tests - adoption.router.js", () => {
  let fakeController;
  let app;

  beforeEach(() => {
    fakeController = {
      getAllAdoptions: sinon.stub(),
      getAdoption: sinon.stub(),
      createAdoption: sinon.stub()
    };

    const router = createAdoptionRouter(fakeController);
    app = createTestApp(router);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("GET /api/adoptions", () => {
    it("debería devolver todas las adopciones correctamente", async () => {
      const fakeAdoptions = [
        {
          _id: "64f123456789abcdef123456",
          owner: "64f123456789abcdef111111",
          pet: "64f123456789abcdef222222"
        },
        {
          _id: "64f123456789abcdef654321",
          owner: "64f123456789abcdef333333",
          pet: "64f123456789abcdef444444"
        }
      ];

      fakeController.getAllAdoptions.callsFake((req, res) => {
        res.status(200).json({
          status: "success",
          payload: fakeAdoptions
        });
      });

      const response = await request(app)
        .get("/api/adoptions")
        .expect(200);

      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("array");
      expect(response.body.payload).to.have.lengthOf(2);
      expect(fakeController.getAllAdoptions.calledOnce).to.equal(true);
    });

    it("debería devolver array vacío si no existen adopciones", async () => {
      fakeController.getAllAdoptions.callsFake((req, res) => {
        res.status(200).json({
          status: "success",
          payload: []
        });
      });

      const response = await request(app)
        .get("/api/adoptions")
        .expect(200);

      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("array");
      expect(response.body.payload).to.have.lengthOf(0);
      expect(fakeController.getAllAdoptions.calledOnce).to.equal(true);
    });

    it("debería manejar error interno del servidor", async () => {
      fakeController.getAllAdoptions.callsFake((req, res) => {
        res.status(500).json({
          status: "error",
          message: "Internal server error"
        });
      });

      const response = await request(app)
        .get("/api/adoptions")
        .expect(500);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("Internal server error");
      expect(fakeController.getAllAdoptions.calledOnce).to.equal(true);
    });
  });

  describe("GET /api/adoptions/:aid", () => {
    it("debería devolver una adopción por ID correctamente", async () => {
      const adoptionId = "64f123456789abcdef123456";

      const fakeAdoption = {
        _id: adoptionId,
        owner: "64f123456789abcdef111111",
        pet: "64f123456789abcdef222222"
      };

      fakeController.getAdoption.callsFake((req, res) => {
        expect(req.params.aid).to.equal(adoptionId);

        res.status(200).json({
          status: "success",
          payload: fakeAdoption
        });
      });

      const response = await request(app)
        .get(`/api/adoptions/${adoptionId}`)
        .expect(200);

      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("object");
      expect(response.body.payload._id).to.equal(adoptionId);
      expect(fakeController.getAdoption.calledOnce).to.equal(true);
    });

    it("debería devolver 404 si la adopción no existe", async () => {
      const adoptionId = "64f123456789abcdef999999";

      fakeController.getAdoption.callsFake((req, res) => {
        res.status(404).json({
          status: "error",
          message: "Adoption not found"
        });
      });

      const response = await request(app)
        .get(`/api/adoptions/${adoptionId}`)
        .expect(404);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("Adoption not found");
      expect(fakeController.getAdoption.calledOnce).to.equal(true);
    });

    it("debería devolver error de validación si el ID es inválido", async () => {
      const invalidId = "invalid-id";

      fakeController.getAdoption.callsFake((req, res) => {
        res.status(400).json({
          status: "error",
          message: "Invalid adoption id"
        });
      });

      const response = await request(app)
        .get(`/api/adoptions/${invalidId}`)
        .expect(400);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("Invalid adoption id");
      expect(fakeController.getAdoption.calledOnce).to.equal(true);
    });
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("debería crear una adopción correctamente", async () => {
      const userId = "64f123456789abcdef111111";
      const petId = "64f123456789abcdef222222";

      const fakeCreatedAdoption = {
        _id: "64f123456789abcdef333333",
        owner: userId,
        pet: petId
      };

      fakeController.createAdoption.callsFake((req, res) => {
        expect(req.params.uid).to.equal(userId);
        expect(req.params.pid).to.equal(petId);

        res.status(201).json({
          status: "success",
          payload: fakeCreatedAdoption
        });
      });

      const response = await request(app)
        .post(`/api/adoptions/${userId}/${petId}`)
        .expect(201);

      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("object");
      expect(response.body.payload.owner).to.equal(userId);
      expect(response.body.payload.pet).to.equal(petId);
      expect(fakeController.createAdoption.calledOnce).to.equal(true);
    });

    it("debería devolver 400 si el userId es inválido", async () => {
      const invalidUserId = "invalid-user-id";
      const petId = "64f123456789abcdef222222";

      fakeController.createAdoption.callsFake((req, res) => {
        res.status(400).json({
          status: "error",
          message: "Invalid user id"
        });
      });

      const response = await request(app)
        .post(`/api/adoptions/${invalidUserId}/${petId}`)
        .expect(400);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("Invalid user id");
      expect(fakeController.createAdoption.calledOnce).to.equal(true);
    });

    it("debería devolver 400 si el petId es inválido", async () => {
      const userId = "64f123456789abcdef111111";
      const invalidPetId = "invalid-pet-id";

      fakeController.createAdoption.callsFake((req, res) => {
        res.status(400).json({
          status: "error",
          message: "Invalid pet id"
        });
      });

      const response = await request(app)
        .post(`/api/adoptions/${userId}/${invalidPetId}`)
        .expect(400);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("Invalid pet id");
      expect(fakeController.createAdoption.calledOnce).to.equal(true);
    });

    it("debería devolver 404 si el usuario no existe", async () => {
      const userId = "64f123456789abcdef111111";
      const petId = "64f123456789abcdef222222";

      fakeController.createAdoption.callsFake((req, res) => {
        res.status(404).json({
          status: "error",
          message: "User not found"
        });
      });

      const response = await request(app)
        .post(`/api/adoptions/${userId}/${petId}`)
        .expect(404);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("User not found");
      expect(fakeController.createAdoption.calledOnce).to.equal(true);
    });

    it("debería devolver 404 si la mascota no existe", async () => {
      const userId = "64f123456789abcdef111111";
      const petId = "64f123456789abcdef222222";

      fakeController.createAdoption.callsFake((req, res) => {
        res.status(404).json({
          status: "error",
          message: "Pet not found"
        });
      });

      const response = await request(app)
        .post(`/api/adoptions/${userId}/${petId}`)
        .expect(404);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("Pet not found");
      expect(fakeController.createAdoption.calledOnce).to.equal(true);
    });

    it("debería devolver 409 si la mascota ya fue adoptada", async () => {
      const userId = "64f123456789abcdef111111";
      const petId = "64f123456789abcdef222222";

      fakeController.createAdoption.callsFake((req, res) => {
        res.status(409).json({
          status: "error",
          message: "Pet already adopted"
        });
      });

      const response = await request(app)
        .post(`/api/adoptions/${userId}/${petId}`)
        .expect(409);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("Pet already adopted");
      expect(fakeController.createAdoption.calledOnce).to.equal(true);
    });

    it("debería manejar error interno al crear una adopción", async () => {
      const userId = "64f123456789abcdef111111";
      const petId = "64f123456789abcdef222222";

      fakeController.createAdoption.callsFake((req, res) => {
        res.status(500).json({
          status: "error",
          message: "Internal server error"
        });
      });

      const response = await request(app)
        .post(`/api/adoptions/${userId}/${petId}`)
        .expect(500);

      expect(response.body.status).to.equal("error");
      expect(response.body.message).to.equal("Internal server error");
      expect(fakeController.createAdoption.calledOnce).to.equal(true);
    });
  });
});