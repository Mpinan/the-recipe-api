const request = require("supertest");
const app = require("../routes/hello-world");

describe("Hello World", () => {
  it("should return hello world", async () => {
    console.log(app);
    const res = await request(app).get("/hello-world");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("hello world");
  });
});
