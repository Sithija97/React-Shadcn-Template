import { IPostDocument } from "@/mongodb/models/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactTimeago from "react-timeago";
import { Badge } from "../ui/badge";
import UserAvatar from "../common/user-avatar";

const CommentFeed = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const isAuthor = user?.id === post.user.userId;

  return (
    <div className="mt-3 space-y-2">
      {post.comments?.map((comment) => (
        <div key={comment._id.toString()} className="flex space-x-1">
          <UserAvatar
            src={
              user?.id
                ? comment.user.userImage
                : "https://github.com/shadcn.png"
            }
            firstName={comment.user.firstName}
            lastName={comment.user.lastName}
          />

          <div className="bg-gray-100 px-4 py-2 rounded-md w-full sm:w-auto md:min-w-75">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {comment.user.firstName} {comment.user.lastName}
                  {isAuthor && <Badge variant="secondary">Author</Badge>}
                </p>
                <p className="text-xs text-gray-400">
                  @{comment.user.firstName}
                  {comment.user.firstName}-
                  {comment.user.userId.toString().slice(-4)}
                </p>
              </div>

              <p className="text-xs text-gray-400">
                <ReactTimeago date={new Date(comment.createdAt)} />
              </p>
            </div>

            <p className="mt-3 text-sm">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;
