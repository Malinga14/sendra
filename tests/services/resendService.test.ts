// We'll mock `resend` per-test using `jest.doMock` so we can provide a test-specific implementation

describe("sendContactEmail", () => {
  it("should call Resend.emails.send with correct data", async () => {
    // Set required env vars before importing the service so it can validate at runtime
    process.env.RESEND_API_KEY = process.env.RESEND_API_KEY ?? "test_resend_key";
    process.env.SENDER_EMAIL = process.env.SENDER_EMAIL ?? "from@test.local";
    process.env.RECEIVER_EMAIL = process.env.RECEIVER_EMAIL ?? "to@test.local";

    // Re-require the module after setting env so it uses the test env values
    jest.resetModules();

    const sendMock = jest.fn().mockResolvedValue({ id: "email_123", status: "queued" });

    // Configure the mocked Resend implementation before importing the service
    jest.doMock("resend", () => ({
      Resend: jest.fn(() => ({ emails: { send: sendMock } }))
    }));

    const { sendContactEmail } = require("../../src/services/resendService");

    const result = await sendContactEmail({
      name: "Malinga",
      email: "test@example.com",
      message: "Hello"
    });

    expect(sendMock).toHaveBeenCalledWith({
      from: process.env.SENDER_EMAIL,
      to: process.env.RECEIVER_EMAIL,
      subject: "New message from Malinga",
      html: expect.any(String),
    });

    expect(result).toEqual({ id: "email_123", status: "queued" });
  });
});
