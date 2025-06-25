import { authors, posts } from "../data/data";
import { v4 as uuidv4 } from "uuid";
import {
  createAuthorSchema,
  updateAuthorSchema,
  createPostSchema,
  updatePostSchema,
} from "../utils/validation";

// Type guard to help with better type safety when checking error shape
function isErrorResponse(input: any): input is { error: string } {
  return input && typeof input.error === 'string';
}

export const resolvers = {
  Query: {
    getAllPosts: () => posts,
    getPost: (_: any, { id }: { id: string }) => posts.find((p) => p.id === id),
    getAuthors: () => authors,
    getAuthor: (_: any, { id }: { id: string }) => authors.find((a) => a.id === id),
  },

  Mutation: {
    createAuthor: (_: any, args: { name: string; email: string }) => {
      // Validate input and show all error messages if validation fails
      const parsed = createAuthorSchema.safeParse(args);
      if (!parsed.success) {
        const messages = parsed.error.errors.map(e => e.message).join("; ");
        throw new Error(messages);
      }
      const author = { id: uuidv4(), ...args };
      authors.push(author);
      return author;
    },

    updateAuthor: (_: any, { id, ...rest }: { id: string; name?: string; email?: string }) => {
      const author = authors.find((a) => a.id === id);
      if (!author) throw new Error("Author not found");

      // Validate partial update input
      const parsed = updateAuthorSchema.safeParse(rest);
      if (!parsed.success) {
        const messages = parsed.error.errors.map(e => e.message).join("; ");
        throw new Error(messages);
      }

      Object.assign(author, rest);
      return author;
    },

    deleteAuthor: (_: any, { id }: { id: string }) => {
      const index = authors.findIndex((a) => a.id === id);
      if (index === -1) throw new Error("Author not found");
      authors.splice(index, 1);
      return true;
    },

    createPost: (_: any, args: { title: string; body: string; authorId: string }) => {
      // Validate post input
      const parsed = createPostSchema.safeParse(args);
      if (!parsed.success) {
        const messages = parsed.error.errors.map(e => e.message).join("; ");
        throw new Error(messages);
      }

      const author = authors.find((a) => a.id === args.authorId);
      if (!author) throw new Error("Author not found");

      const now = new Date().toISOString();
      const post = { id: uuidv4(), ...args, createdAt: now, updatedAt: now };
      posts.push(post);
      return post;
    },

    updatePost: (_: any, { id, ...rest }: { id: string; title?: string; body?: string }) => {
      const post = posts.find((p) => p.id === id);
      if (!post) throw new Error("Post not found");

      // Validate post update input
      const parsed = updatePostSchema.safeParse(rest);
      if (!parsed.success) {
        const messages = parsed.error.errors.map(e => e.message).join("; ");
        throw new Error(messages);
      }

      Object.assign(post, rest, { updatedAt: new Date().toISOString() });
      return post;
    },

    deletePost: (_: any, { id }: { id: string }) => {
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Post not found");
      posts.splice(index, 1);
      return true;
    },
  },

  // Resolver to populate author inside Post
  Post: {
    author: (parent: any) => authors.find((a) => a.id === parent.authorId),
  },

  // Resolver to populate posts inside Author
  Author: {
    posts: (parent: any) => posts.filter((p) => p.authorId === parent.id),
  },
};
