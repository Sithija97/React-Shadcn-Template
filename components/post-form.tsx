"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import createPostAction from "@/actions/createPostAction";

const PostForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const { firstName, lastName, imageUrl } = user || {};
  const [preview, setPreview] = useState<string | null>(null);

  const handlePostAction = async (formData: FormData) => {
    console.log(formData);
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;

    if (!text.trim()) {
      throw new Error("Post content cannot be empty");
    }

    setPreview(null);

    // perform server action to create post
    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.log(`Error creating post: ${error}`);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const openImageInput = () => fileInputRef.current?.click();
  const removeImageInput = () => setPreview(null);

  return (
    <div className="mb-2">
      <form
        ref={ref}
        action={(formData) => {
          // handle form submission with server action
          handlePostAction(formData);
          // toast notification
        }}
        className="p-3 bg-white rounded-lg border"
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={user?.id ? imageUrl : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <button type="submit">Post</button>
        </div>

        {/* preview conditional check */}
        {preview && (
          <div className="mt-3">
            <img src={preview} alt="preview" className="w-full object-cover" />
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-2">
          <Button type="button" onClick={openImageInput}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "Change" : "Add"} image
          </Button>

          {/* remove preview */}
          {preview && (
            <Button type="button" variant="outline" onClick={removeImageInput}>
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove image
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostForm;
