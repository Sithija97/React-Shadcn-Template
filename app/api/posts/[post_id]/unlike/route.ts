import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: { post_id: string } },
) => {
  auth.protect();

  await connectDB();

  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.unlikePost(user.id);
    return NextResponse.json(
      { message: "Post unliked successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error liking post" }, { status: 500 });
  }
};
