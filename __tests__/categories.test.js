const supertest = require("supertest");

const app = require("../src/app");

describe("GET /api/categories", () => {
  it("should return 200 with an array of categories", async () => {
    const res = await supertest(app).get("/api/categories");

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[1]).toHaveProperty("id");
    expect(res.body[1]).toHaveProperty("name");
  });
});
