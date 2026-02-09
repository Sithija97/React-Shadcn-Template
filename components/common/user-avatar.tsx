import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type IProps = {
  src?: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
};

const UserAvatar = ({ src, firstName, lastName }: IProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>
        {firstName?.charAt(0)}
        {lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
