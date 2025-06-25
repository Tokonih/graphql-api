export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export const authors: Author[] = [];
export const posts: Post[] = [];