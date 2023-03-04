"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Posts";
import { PostType } from "@/app/types/Models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

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
  return (
    <>
      {data?.map((post) => (
        <div key={post.id}>
          <Post
            id={post.id}
            postTitle={post.title}
            image={post.user.image}
            name={post.user.name}
            comments={post.comments}
          />
          <AddComment id={post.id} />
          {post?.comments?.map((comment) => (
            <div key={comment.id} className="my-6 bg-white p-8 rounded-lg">
              <div className="flex items-center gap-2">
                <Image
                  width={24}
                  height={24}
                  src={comment.user?.image}
                  alt="avatar"
                  className="rounded-full"
                />
                <h3 className="font-bold">{comment?.user?.name}</h3>
                <h4 className="text-sm">{comment?.createdAt}</h4>
              </div>
              <p>{comment.message}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
