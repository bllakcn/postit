"use client";
import { EditPostProps } from "../types/Models";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Toggle from "./Toggle";

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditPostProps) {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastId: string;

  //Delete post
  const { mutate } = useMutation({
    mutationFn: async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    onError: (error) => {
      toast.error("Error deleting that post.", { id: deleteToastId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["auth-posts"]);
      toast.success("Post deleted successfully!", { id: deleteToastId });
    },
  });

  const deletePost = () => {
    deleteToastId = toast.loading("Deleting post...", { id: deleteToastId });
    mutate(id);
  };

  const toggleProps = {
    deletePost,
    setToggle,
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
            className="rounded-full"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            onClick={(e) => setToggle(true)}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle functions={toggleProps} />}
    </>
  );
}
