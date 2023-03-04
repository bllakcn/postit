export type User = {
  id: string;
  name: string;
  image: string;
  email: string;
};
export type Comment = {
  id: string;
  message: string;
  createdAt: string;
  postId: string;
  userId: string;
  user?: User;
};
export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: User;
  comments: Comment[];
};

export type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  posts: PostType[];
};

export type EditPost = {
  avatar: string;
  name: string;
  title: string;
  comments: Comment[];
  id: string;
};

export type Posts = {
  image: string;
  name: string;
  postTitle: string;
  id: string;
  comments: Comment[];
};
