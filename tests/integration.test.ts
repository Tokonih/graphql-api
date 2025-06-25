import { ApolloServer } from "apollo-server";
import { typeDefs } from "../src/schema/typeDefs";
import { resolvers } from "../src/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ user: { id: "test-user" } }),
});

describe("GraphQL Integration", () => {
  it("creates and fetches a post", async () => {
    const createAuthorRes = await server.executeOperation({
      query: `
        mutation {
          createAuthor(name: "Tester", email: "test@example.com") {
            id
            name
          }
        }
      `,
    });

    const authorId = createAuthorRes.data?.createAuthor.id;

    const createPostRes = await server.executeOperation({
      query: `
        mutation {
          createPost(title: "Hello World", body: "Post body content", authorId: "${authorId}") {
            id
            title
            author {
              name
            }
          }
        }
      `,
    });

    expect(createPostRes.data?.createPost.title).toBe("Hello World");

    const getPostRes = await server.executeOperation({
      query: `
        query {
          getPost(id: "${createPostRes.data?.createPost.id}") {
            title
            body
            author {
              email
            }
          }
        }
      `,
    });

    expect(getPostRes.data?.getPost.title).toBe("Hello World");
  });
});
