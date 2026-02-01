import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { AddPostRequestBody } from "@/types/post";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  auth.protect(); // protected route with clerlk

  try {
    const {}: AddPostRequestBody = await request.json();
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
