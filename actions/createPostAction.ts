"use server";

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
  const image = formData.get("image") as File;
  let imageUrl: string | undefined;

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

  try {
    /* upload image if there is one */
    if (image.size > 0) {
      /* 1. upload image if there's one */
      /* 2. create post in database with image */
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
