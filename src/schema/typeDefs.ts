import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar DateTime

  type Author {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    author: Author!
  }

  type Query {
    getAllPosts: [Post!]!
    getPost(id: ID!): Post
    getAuthors: [Author!]!
    getAuthor(id: ID!): Author
  }

  type Mutation {
    createAuthor(name: String!, email: String!): Author!
    updateAuthor(id: ID!, name: String, email: String): Author!
    deleteAuthor(id: ID!): Boolean!

    createPost(title: String!, body: String!, authorId: ID!): Post!
    updatePost(id: ID!, title: String, body: String): Post!
    deletePost(id: ID!): Boolean!
  }
`;
