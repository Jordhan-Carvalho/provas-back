const supertest = require("supertest");

const app = require("../app");
const db = require("../database/index");

async function cleanDB() {
  try {
    await db.query("DELETE FROM tests");
  } catch (error) {
    console.log(error);
  }
}

beforeAll(async () => await cleanDB());
afterAll(async () => {
  // await cleanDB();
  db.end();
});

let id;

describe("POST /tests", () => {
  it("should return status 200 and the test object", async () => {
    const body = {
      semester: "2020.1",
      category_id: 2,
      test_url: "https://dont.com",
      class_id: 7,
      professor_id: 5,
    };

    const res = await supertest(app).post("/api/tests").send(body);

    id = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("semester");
    expect(res.body).toHaveProperty("category_id");
    expect(res.body).toHaveProperty("test_url");
    expect(res.body).toHaveProperty("class_id");
    expect(res.body).toHaveProperty("professor_id");
  });

  it("should return status 422 with invalid parameters", async () => {
    const body = {
      semester: "2020.3",
      category_id: 2,
      test_url: "https://dont.com",
      class_id: 7,
      professor_id: 5,
    };

    const res = await supertest(app).post("/api/tests").send(body);

    expect(res.status).toBe(422);
    expect(res.body).toMatchObject({ error: "Formato inválido" });
  });
});

describe("GET /tests/:id", () => {
  it("should return status 200 and all the test info", async () => {
    const res = await supertest(app).get(`/api/tests/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("semester");
    expect(res.body).toHaveProperty("categoryName");
    expect(res.body).toHaveProperty("test_url");
    expect(res.body).toHaveProperty("className");
    expect(res.body).toHaveProperty("profName");
    expect(res.body).toHaveProperty("termName");
  });
});
