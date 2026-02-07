import { connectDB } from "@/mongodb/db";
import { ICommentBase } from "@/mongodb/models/comment";
import { Post } from "@/mongodb/models/post";
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

    const comments = await post.getAllComments();
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching comments" },
      { status: 500 },
    );
  }
};

export const POST = async (
  request: Request,
  { params }: { params: { post_id: string } },
) => {
  await connectDB();

  const { user, text }: ICommentBase = await request.json();

  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comment: ICommentBase = { user, text };

    await post.commentOnPost(comment);

    return NextResponse.json(
      { message: "Comment added successfully", comment },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding comment" },
      { status: 500 },
    );
  }
};
