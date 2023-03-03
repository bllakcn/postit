"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPost");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });
  if (isLoading) return <h2>Posts are loading...</h2>;
  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          key={post.id}
          id={post.id}
          title={post.title}
          avatar={data.image}
          name={data.name}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
