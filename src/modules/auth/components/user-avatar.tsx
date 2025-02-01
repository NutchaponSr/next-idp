import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

interface AvatarUserProps {
  name: string;
  imageUrl?: string;
  className?: string;
  fallbackClassName?: string;
}

export const UserAvatar = ({
  name,
  imageUrl,
  className,
  fallbackClassName
}: AvatarUserProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback className={fallbackClassName}>
        { name.charAt(0).toUpperCase() }
      </AvatarFallback>
    </Avatar>
  );
}