import { IPostBase } from "@/mongodb/models/post";
import { Document } from "mongoose";
import { IUser } from "./user";

export interface IPost extends IPostBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface AddPostRequestBody {
  user: IUser;
  text: string;
  imageUrl?: string;
}
