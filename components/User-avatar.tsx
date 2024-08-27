import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
  const {  user}  = useUser();






  const profileImageUrl = user?.imageUrl || "/default/avatar.png";

  const firstNameInitial = user?.firstName?.charAt(0) || "";
  const lastNameInitial = user?.lastName?.charAt(0) || "";
  const initials = `${firstNameInitial}${lastNameInitial}`;

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={profileImageUrl}
        alt={`${user?.firstName || ""} ${user?.lastName || ""}`}
        crossOrigin="anonymous"
      />
      <AvatarFallback>{initials || "?"}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
