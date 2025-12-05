import request from "supertest";
import app from "../../src/index";

// Ensure tests always provide a string API key (avoid `undefined` type)
const API_KEY: string = process.env.API_KEY ?? "test_api_key";

jest.mock("../../src/services/resendService", () => ({
  sendContactEmail: jest.fn().mockResolvedValue({ id: "mock_email_id", status: "queued" })
}));

describe("POST /api/email", () => {
  it("returns 200 for valid request", async () => {
    const res = await request(app)
      .post("/api/email")
      .set("x-api-key", API_KEY)
      .send({ name: "Malinga", email: "test@example.com", message: "Hello" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("returns 400 for missing fields", async () => {
    const res = await request(app)
      .post("/api/email")
      .set("x-api-key", API_KEY)
      .send({ name: "Malinga" });

    expect(res.status).toBe(400);
  });

  it("returns 401 for missing API key", async () => {
    const res = await request(app)
      .post("/api/email")
      .send({ name: "Malinga", email: "test@example.com", message: "Hello" });

    expect(res.status).toBe(401);
  });
});
