const supertest = require("supertest");

const app = require("../src/app");

describe("GET /api/professors", () => {
  it("should return 200 with an array of professors", async () => {
    const res = await supertest(app).get("/api/professors");

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[1]).toHaveProperty("id");
    expect(res.body[1]).toHaveProperty("name");
  });
});
