import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Briefcase,
  HomeIcon,
  MessagesSquare,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex flex-col gap-2 p-2 max-w-6xl mx-auto sm:flex-row sm:items-center">
      <Image
        className="rounded-lg"
        src="https://links.papareact.com/b3z"
        width={40}
        height={40}
        alt="logo"
      />

      <div className="w-full sm:flex-1">
        <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md w-full sm:mx-2 sm:max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none"
          />
        </form>
      </div>

      <div className="flex items-center justify-between gap-3 px-2 sm:px-6">
        <Link href="/" className="icon">
          <HomeIcon className="h-5" />
          <p className="hidden sm:block">Home</p>
        </Link>

        <Link href="" className="icon hidden md:flex">
          <UsersIcon className="h-5" />
          <p className="hidden sm:block">Network</p>
        </Link>

        <Link href="" className="icon hidden md:flex">
          <Briefcase className="h-5" />
          <p className="hidden sm:block">Jobs</p>
        </Link>

        <Link href="" className="icon">
          <MessagesSquare className="h-5" />
          <p className="hidden sm:block">Messaging</p>
        </Link>

        {/* user button */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* sign in button */}
        <SignedOut>
          <Button asChild variant="secondary">
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
