import { IComment } from "@/types/comment";
import { IUser } from "@/types/user";
import mongoose, { models, Schema } from "mongoose";

export interface ICommentBase {
  user: IUser;
  text: string;
}

const CommentSchema = new Schema<IComment>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Comment =
  models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
