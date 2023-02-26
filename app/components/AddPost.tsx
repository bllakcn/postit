"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  let toastPostId: string;

  //create a post
  const { mutate } = useMutation({
    mutationFn: async (title: string) =>
      await axios.post("/api/posts/addPost", { title }),
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Something went wrong", {
          id: toastPostId,
        });
      }
    },
    onSuccess: (data) => {
      toast.success("Post has been made 🔥", { id: toastPostId });
      setTitle("");
      setDisabled(false);
    },
  });

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading("Creating your post...", { id: toastPostId });
    setDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder={"What's on your mind?"}
          className="p-4 text-lg rounded-md my-2 bg-gray-200 "
        ></textarea>
      </div>
      <div className={`flex items-center justify-between gap-2`}>
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
          Create a post
        </button>
      </div>
    </form>
  );
}
