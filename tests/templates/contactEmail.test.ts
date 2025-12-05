import { emailTemplate } from "../../src/templates/contactEmail";

describe("emailTemplate", () => {
  it("should return HTML string containing name, email and message", () => {
    const html = emailTemplate({ name: "Malinga", email: "test@example.com", message: "Hello!" });

    expect(html).toContain("Malinga");
    expect(html).toContain("test@example.com");
    expect(html).toContain("Hello!");
  });
});
