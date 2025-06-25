import { createAuthorSchema } from "../src/utils/validation";

describe("Author Schema Validation", () => {
  it("should pass for valid input", () => {
    const result = createAuthorSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("should fail for invalid email", () => {
    const result = createAuthorSchema.safeParse({
      name: "John",
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });
});
