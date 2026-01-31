import { IPostBase } from "@/mongodb/models/post";
import { Document } from "mongoose";

export interface IPost extends IPostBase, Document {
  createdAt: Date;
  updatedAt: Date;
}
