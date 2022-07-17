const request = require("supertest");
const app = require("../../src/server");
const { HttpStatus } = require("../../src/const");
const client = require("../../src/config/redis");

describe("Test Users routes", () => {
  describe("POST /user", () => {
    test("Should successfully create user", async () => {
      client.SET = jest.fn().mockResolvedValue(1);
      const res = await request(app).post("/user").send({
        username: "newUser",
      });

      expect(res.statusCode).toBe(HttpStatus.OK);
      expect(res.body.message).toBe("Create user newUser success.");
      expect(typeof res.body.message).toBe("string");
    });
  });

  describe("GET /user", () => {
    test("Should successfully get user", async () => {
      client.EXISTS = jest.fn().mockResolvedValue(1);
      client.GET = jest.fn().mockResolvedValue(
        JSON.stringify({
          userName: "newUser",
          status: "success",
        })
      );
      const res = await request(app).get("/user/newUser").send();

      expect(res.statusCode).toBe(HttpStatus.OK);
      expect(typeof res.body.userName).toBe("string");
    });

    test("Should unsuccessfully get non existing user", async () => {
      client.EXISTS = jest.fn().mockResolvedValue(0);
      const res = await request(app).get("/user/newUser").send();

      expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.message).toBe("User not found.");
      expect(typeof res.body.message).toBe("string");
    });
  });

  describe("DELETE /user", () => {
    test("Should successfully delete user", async () => {
      client.EXISTS = jest.fn().mockResolvedValue(1);
      const res = await request(app).delete("/user").send({
        username: "newUser",
      });

      expect(res.statusCode).toBe(HttpStatus.OK);
      expect(res.body.message).toBe("Delete user newUser success.");
      expect(typeof res.body.message).toBe("string");
    });

    test("Should unsuccessfully delete non existing user", async () => {
      client.EXISTS = jest.fn().mockImplementation(() => 0);
      const res = await request(app).delete("/user").send({
        username: "newUser",
      });

      expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.message).toBe("User not found.");
      expect(typeof res.body.message).toBe("string");
    });
  });
});
