// tests/edge-cases.test.ts
import { ApolloServer } from "apollo-server";
import { typeDefs } from "../src/schema/typeDefs";
import { resolvers } from "../src/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ user: { id: "test-user" } }),
});

describe("GraphQL Edge Cases", () => {
  it("rejects invalid email on createAuthor", async () => {
    const res = await server.executeOperation({
      query: `
        mutation {
          createAuthor(name: "Invalid Email", email: "bad-email") {
            id
          }
        }
      `,
    });
    expect(res.errors).toBeDefined();
    expect(res.errors?.[0].message).toMatch(/Invalid email/);
  });

  it("throws error when creating post with nonexistent authorId", async () => {
    const res = await server.executeOperation({
      query: `
        mutation {
          createPost(title: "Edge Case", body: "Invalid author", authorId: "non-existent-id") {
            id
          }
        }
      `,
    });
    expect(res.errors).toBeDefined();
    expect(res.errors?.[0].message).toMatch(/Author not found/);
  });

  it("returns error when getting a post with invalid ID", async () => {
    const res = await server.executeOperation({
      query: `
        query {
          getPost(id: "bad-id") {
            id
            title
          }
        }
      `,
    });
    expect(res.data?.getPost).toBeNull();
  });

  it("prevents creating post with short title", async () => {
    const authorRes = await server.executeOperation({
      query: `
        mutation {
          createAuthor(name: "Edge", email: "edge@example.com") {
            id
          }
        }
      `,
    });

    const authorId = authorRes.data?.createAuthor.id;

    const res = await server.executeOperation({
      query: `
        mutation {
          createPost(title: "Shrt", body: "Valid body content", authorId: "${authorId}") {
            id
          }
        }
      `,
    });

    expect(res.errors).toBeDefined();
    expect(res.errors?.[0].message).toMatch(/Title must be at least 5 characters/);
  });

  it("returns error when deleting non-existent author", async () => {
    const res = await server.executeOperation({
      query: `
        mutation {
          deleteAuthor(id: "invalid-id")
        }
      `,
    });
    expect(res.errors).toBeDefined();
    expect(res.errors?.[0].message).toMatch(/Author not found/);
  });

  it("returns error when updating non-existent post", async () => {
    const res = await server.executeOperation({
      query: `
        mutation {
          updatePost(id: "fake-id", title: "Oops") {
            id
          }
        }
      `,
    });
    expect(res.errors).toBeDefined();
    expect(res.errors?.[0].message).toMatch(/Post not found/);
  });
});
