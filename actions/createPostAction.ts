"use server";

import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { AddPostRequestBody } from "@/types/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";

const createPostAction = async (formData: FormData) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File | null;
  let image_url = undefined;

  if (!postInput) {
    throw new Error("Post content is required");
  }

  /* define user */
  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  await connectDB();

  try {
    /* upload image if there is one */
    if (image && image.size > 0) {
      image_url = await uploadImageToCloudinary(image);

      /* 2. create post in database with image */
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl: image_url,
      };

      await Post.create(body);
    } else {
      /* 1. create {post in database without image */
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
      };

      await Post.create(body);
    }
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`);
  }

  /* create post in db */
  /* revalidate path '/' - home page */
};
export default createPostAction;
