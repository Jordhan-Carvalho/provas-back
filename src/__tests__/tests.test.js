const supertest = require("supertest");

const app = require("../app");
const db = require("../database/index");

let id, profId, catId, classId;

afterAll(async () => {
  await db.query("DELETE FROM tests WHERE id = $1", [id]);
  db.end();
});

describe("POST api/tests", () => {
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

describe("GET api/tests/:id", () => {
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

describe("GET /api/tests/professors", () => {
  it("should return 200 with an array of professors and the number of tests", async () => {
    const res = await supertest(app).get("/api/tests/professors");

    profId = res.body[0].id;

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("count");
  });
});

describe("GET /api/tests/professors/:id/categories", () => {
  it("should return 200 with an array of categories and the number of tests", async () => {
    const res = await supertest(app).get(
      `/api/tests/professors/${profId}/categories`
    );

    catId = res.body[0].id;
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("count");
  });
});

describe("GET /api/tests/professors/:id/categories/:id", () => {
  it("should return 200 with an array of tests and the classes name", async () => {
    const res = await supertest(app).get(
      `/api/tests/professors/${profId}/categories/${catId}`
    );

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("semester");
    expect(res.body[0]).toHaveProperty("test_url");
  });
});

describe("GET /api/tests/classes", () => {
  it("should return 200 with an array of classes and the number of tests", async () => {
    const res = await supertest(app).get(`/api/tests/classes`);

    classId = res.body[0].id;

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("count");
  });
});

describe("GET /api/tests/classes/:id/categories", () => {
  it("should return 200 with an array of categories and the number of tests", async () => {
    const res = await supertest(app).get(
      `/api/tests/classes/${classId}/categories`
    );

    catId = res.body[0].id;
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("count");
  });
});

describe("GET /api/tests/classes/:id/categories/:id", () => {
  it("should return 200 with an array of tests and the prof name", async () => {
    const res = await supertest(app).get(
      `/api/tests/classes/${classId}/categories/${catId}`
    );

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("semester");
    expect(res.body[0]).toHaveProperty("test_url");
    expect(res.body[0]).toHaveProperty("name");
  });
});

describe("GET /api/terms", () => {
  it("should return 200 with an array of terms and the number of classes", async () => {
    const res = await supertest(app).get("/api/terms");

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("count");
  });
});
