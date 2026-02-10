import PostFeed from "@/components/posts/post-feed";
import PostForm from "@/components/posts/post-form";
import UserInformation from "@/components/common/user-infomation";
import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { SignedIn } from "@clerk/nextjs";
import Widget from "@/components/common/widget";

export default async function Home() {
  await connectDB();
  const posts = await Post.getAllPosts();
  return (
    <div className="grid grid-cols-8 gap-4 mt-4 px-3 sm:px-5">
      <section className="hidden md:inline md:col-span-2 md:sticky md:top-4 self-start h-fit">
        {/* user information */}
        <UserInformation posts={posts} />
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        {/* post form */}
        <SignedIn>
          <PostForm />
        </SignedIn>
        {/* post feed */}
        <PostFeed posts={posts} />
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        {/* widgets */}
        <Widget />
      </section>
    </div>
  );
}
