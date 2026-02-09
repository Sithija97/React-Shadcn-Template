import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ post_id: string }> },
) => {
  await connectDB();

  try {
    const { post_id } = await params;
    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ post_id: string }> },
) => {
  auth.protect(); // protected route with clerlk

  await connectDB();

  const user = await currentUser();

  try {
    const { post_id } = await params;
    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.user.userId !== user?.id) {
      return NextResponse.json(
        { error: "Post does not belong to the user" },
        { status: 403 },
      );
    }

    await post.removePost();
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
};
