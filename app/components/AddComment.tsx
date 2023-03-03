"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type SubmitComment = {
  title: string;
  postId: string;
};

export default function AddComment({ id }: { id: string }) {
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  //comment on a post
  const { mutate } = useMutation({
    mutationFn: async (data: SubmitComment) =>
      axios.post("/api/posts/addComment", { data }),
    onError: (err) => {
      setDisabled(false);
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data.message || "Something went wrong", {
          id: commentToastId,
        });
      }
    },
    onSuccess: (data) => {
      setTitle("");
      setDisabled(false);
      toast.success("Comment added", { id: commentToastId });
    },
  });

  const SubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    commentToastId = toast.loading("Adding your comment...", {
      id: commentToastId,
    });
    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={SubmitComment}>
      <h3>Add a comment</h3>
      <div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          value={title}
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className={`flex items-center gap-2`}>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={disabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Comment
        </button>
      </div>
    </form>
  );
}
