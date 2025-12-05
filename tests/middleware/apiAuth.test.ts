import { verifyApiKey } from "../../src/middleware/apiAuth";
import { Request, Response } from "express";

// Ensure there's a definite API key for tests
const API_KEY: string = process.env.API_KEY ?? "test_api_key";
process.env.API_KEY = API_KEY;

describe("verifyApiKey middleware", () => {
  it("should call next if API key is valid", () => {
    const req = { headers: { "x-api-key": API_KEY } } as unknown as Request;
    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;
    const next = jest.fn();

    verifyApiKey(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if API key is invalid", () => {
    const req = { headers: { "x-api-key": "wrong_key" } } as unknown as Request;
    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));
    const res = { status: statusMock } as unknown as Response;
    const next = jest.fn();

    verifyApiKey(req, res, next);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Unauthorized: Invalid API Key" });
    expect(next).not.toHaveBeenCalled();
  });
});
