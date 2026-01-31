import { ICommentBase } from "@/mongodb/models/comment";
import { Document } from "mongoose";

export interface IComment extends Document, ICommentBase {
  createdAt: Date;
  updatedAt: Date;
}
