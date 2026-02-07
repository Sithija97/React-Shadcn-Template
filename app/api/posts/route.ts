import { connectDB } from "@/mongodb/db";
import { IPostBase, Post } from "@/mongodb/models/post";
import { AddPostRequestBody } from "@/types/post";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  auth.protect(); // protected route with clerlk
  await connectDB();

  try {
    const { user, text, imageUrl }: AddPostRequestBody = await request.json();

    const postData: IPostBase = {
      user,
      text,
      ...(imageUrl && { imageUrl }),
    };

    const post = await Post.create(postData);
    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 201 },
    );
  } catch (error) {}
};

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const posts = await Post.getAllPosts();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 },
    );
  }
};
