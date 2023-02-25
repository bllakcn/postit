"use client";
import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

type LoggedProps = {
  image: string;
};

export default function Logged({ image }: LoggedProps) {
  return (
    <li className="list-none flex items-center gap-6">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          src={image}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </Link>
    </li>
  );
}
