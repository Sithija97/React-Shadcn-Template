"use client";

import { useUser } from "@clerk/nextjs";
import { useRef } from "react";
import UserAvatar from "../common/user-avatar";
import createCommentAction from "@/actions/creaateCommentAction";
import { toast } from "sonner";

const CommentForm = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const ref = useRef<HTMLFormElement>(null);

  const createCommentActionWithPostId = createCommentAction.bind(null, postId);

  const handleCommentAction = async (formData: FormData): Promise<void> => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const formDataCopy = formData;
    ref.current?.reset();

    try {
      // server action
      await createCommentActionWithPostId(formDataCopy);
    } catch (error) {
      console.log(`Error creating comment: ${error}`);
    }
  };

  return (
    <form
      ref={ref}
      action={(formData) => {
        const promise = handleCommentAction(formData);
        toast.promise(promise, {
          loading: "Creating comment...",
          success: "Comment created successfully!",
          error: "Failed to create comment",
        });
      }}
      className="flex items-center space-x-1"
    >
      <UserAvatar
        src={user?.id ? user.imageUrl : "https://github.com/shadcn.png"}
        firstName={user?.firstName}
        lastName={user?.lastName}
      />

      <div className="flex flex-1 bg-white border rounded-full px-3 py-2">
        <input
          type="text"
          name="commentInput"
          placeholder="Add a comment..."
          className="outline-none flex-1 text-sm bg-transparent"
        />
        <button type="submit" hidden>
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
