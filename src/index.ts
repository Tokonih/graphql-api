import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    // Basic auth check for demonstration purposes
    if (!token || token !== "Bearer mysecrettoken") {
      throw new Error("Unauthorized");
    }
    return { user: { id: "demo-user" } };
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
