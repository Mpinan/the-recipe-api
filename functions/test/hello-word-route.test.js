const request = require("supertest");
const app = require("../index");

describe("Hello World", () => {
  it("should return hello world", async () => {
    const res = await request(app).get("/hello-world");
    console.log(res.text);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("hello world");
  });
});
