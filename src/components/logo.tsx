import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  showText?: boolean;
}

export const Logo = ({ showText }: LogoProps) => {
  return (
    <Link href="/">
      <div className="flex items-center space-x-1">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} />
        {!!showText && (
          <div className="text-lg font-bold text-[#37352f]">
            Jotion
          </div>
        )}
      </div>
    </Link>
  );
}