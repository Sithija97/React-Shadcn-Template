"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import deletePostAction from "@/actions/deletePostAction";
import Image from "next/image";
import PostOptions from "./post-options";
import UserAvatar from "../common/user-avatar";
import { toast } from "sonner";

const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();

  const isAuthor = user?.id === post.user.userId;

  return (
    <div className="bg-white rounded-md border">
      {/* header */}
      <div className="p-4 flex space-x-2">
        <div>
          <UserAvatar
            src={post.user.userImage}
            firstName={post.user.firstName}
            lastName={post.user.lastName}
          />
        </div>
        <div className="flex justify-between flex-1">
          <div>
            <p className="font-semibold">
              {post.user.firstName} {post.user.lastName}{" "}
              {isAuthor && (
                <Badge className="ml-2" variant="secondary">
                  Author
                </Badge>
              )}
            </p>
            <p className="text-xs text-gray-400">
              @{post.user.firstName}
              {post.user.firstName}-{post.user.userId.toString().slice(-4)}
            </p>

            <p className="text-xs text-gray-400">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>

          {isAuthor && (
            <form
              action={() => {
                const promise = deletePostAction(post._id.toString());
                toast.promise(promise, {
                  loading: "Deleting post...",
                  success: "Post deleted!",
                  error: "Error deleting post",
                });
              }}
            >
              <Button variant="outline" type="submit">
                <Trash2 />
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* post body */}
      <div>
        <p className="px-4 pb-2 mt-2">{post.text}</p>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post image"
            width={500}
            height={500}
            className="w-full mx-auto object-cover"
          />
        )}
      </div>

      {/* post options */}
      <PostOptions post={post} />
    </div>
  );
};

export default Post;
