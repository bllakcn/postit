"use client";

import Image from "next/image";
import Link from "next/link";
import { Posts } from "../types/Models";

export default function Post({ image, name, postTitle, id, comments }: Posts) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={image}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div>
        <p className="break-all p-5">{postTitle}</p>
      </div>
      <div className="flex gap-4 items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700 hover:text-gray-600">
            {comments?.length} Comments
          </p>
        </Link>
      </div>
    </div>
  );
}
