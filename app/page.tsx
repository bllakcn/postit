"use client";
import { PostType } from "./types/Posts";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import AddPost from "./components/AddPost";
import Posts from "./components/Posts";

const allPosts = async () => {
  const res = await axios.get("/api/posts/getPosts");
  return res.data;
};

export default function Home() {
  const { data, isLoading, error } = useQuery<PostType[]>({
    queryKey: ["allPosts"],
    queryFn: allPosts,
  });
  if (error) return error;
  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <AddPost />
      {data?.map((post) => (
        <Posts
          key={post.id}
          postTitle={post.title}
          name={post.user.name}
          avatar={post.user.image}
          id={post.id}
        />
      ))}
    </main>
  );
}
