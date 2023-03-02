"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";

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
  console.log(data);
  return (
    <div>
      <h1></h1>
    </div>
  );
}
