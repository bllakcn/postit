"use client";

type ToggleProps = {
  functions: {
    deletePost: () => void;
    setToggle: (value: boolean) => void;
  };
};

export default function Toggle({ functions }: ToggleProps) {
  return (
    <div
      onClick={(e) => functions.setToggle(false)}
      className="fixed bg-black/50 w-full h-full z-20 top-0 left-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl font-bold">
          Are you sure you want to delete this post?
        </h2>
        <h3 className="text-red-600 text-sm font-semibold">
          Pressing the delete button will permanently delete your post
        </h3>
        <button
          onClick={functions.deletePost}
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-lg"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}
