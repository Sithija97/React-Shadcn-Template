import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { post_id: string } },
) => {
  await connectDB();

  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const likes = post.likes;
    return NextResponse.json({ likes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching likes" },
      { status: 500 },
    );
  }
};

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

    await post.likePost(user.id);
    return NextResponse.json(
      { message: "Post liked successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error liking post" }, { status: 500 });
  }
};
