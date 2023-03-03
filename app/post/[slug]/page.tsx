"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Posts";
import { PostType } from "@/app/types/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType[]>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  // if (isLoading) return <div>Loading...</div>;
  console.log(data);

  return (
    <div>
      {data?.map((post) => (
        <>
          <Post
            key={post.id}
            id={post.id}
            postTitle={post.title}
            image={post.user.image}
            name={post.user.name}
            comments={post.comments}
          />
          <AddComment id={post.id} />
        </>
      ))}
    </div>
  );
}
