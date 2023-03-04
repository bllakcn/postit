export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    id: string;
    message: string;
    createdAt: string;
    postId: string;
    userId: string;
    user?: {
      name: string;
      image: string;
      id: string;
    };
  }[];
};
