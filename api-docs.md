# GraphQL API Documentation

## Introduction
This API provides a GraphQL interface for managing authors and posts. It includes CRUD operations for both entities with proper validation and relationship handling.

## Getting Started
1. Start the server: `npm run dev`
2. Access the GraphQL Playground at: `http://localhost:4000`

## Authentication
Basic token authentication is implemented. Use the following header for authorized requests:
```
Authorization: Bearer mysecrettoken
```

## Queries
### Get All Posts
```graphql
query {
  getAllPosts {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      name
      email
    }
  }
}
```

### Get Single Post
```graphql
query {
  getPost(id: "POST_ID") {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      name
      email
    }
  }
}
```

### Get All Authors
```graphql
query {
  getAuthors {
    id
    name
    email
    posts {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
}
```

### Get Single Author
```graphql
query {
  getAuthor(id: "AUTHOR_ID") {
    id
    name
    email
    posts {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
}
```

## Mutations
### Create Author
```graphql
mutation {
  createAuthor(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
```

### Update Author
```graphql
mutation {
  updateAuthor(id: "AUTHOR_ID", name: "Jane Doe", email: "jane@example.com") {
    id
    name
    email
  }
}
```

### Delete Author
```graphql
mutation {
  deleteAuthor(id: "AUTHOR_ID")
}
```

### Create Post
```graphql
mutation {
  createPost(
    title: "Sample Post"
    body: "This is a sample post content"
    authorId: "AUTHOR_ID"
  ) {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      name
      email
    }
  }
}
```

### Update Post
```graphql
mutation {
  updatePost(
    id: "POST_ID"
    title: "Updated Title"
    body: "Updated content"
  ) {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      name
      email
    }
  }
}
```

### Delete Post
```graphql
mutation {
  deletePost(id: "POST_ID")
}
```

## Types
### Author
```graphql
type Author {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]
}
```

### Post
```graphql
type Post {
  id: ID!
  title: String!
  body: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  author: Author!
}
```

## Notes
- All mutations include input validation
- Relationships are automatically resolved
- Error handling returns descriptive messages