"use server";

import { Post } from "@/mongodb/models/post";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const deletePostAction = async (postId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user.userId !== user.id) {
    throw new Error("Post does not belong to the user");
  }

  try {
    await post.removePost();
    revalidatePath("/");
  } catch (error) {
    throw new Error("Error deleting post");
  }
};

export default deletePostAction;
