import { z } from "zod";

// Validation schema for creating a new author
export const createAuthorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

// Validation schema for updating an existing author
export const updateAuthorSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
});

// Validation schema for creating a new post
export const createPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  body: z.string().min(10, "Body must be at least 10 characters"),
  authorId: z.string().min(1, "Author ID is required"),
});

// Validation schema for updating an existing post
export const updatePostSchema = z.object({
  title: z.string().min(5).optional(),
  body: z.string().min(10).optional(),
});