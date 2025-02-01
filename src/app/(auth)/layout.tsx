import { 
  ChevronDownIcon, 
  GlobeIcon 
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Logo } from "@/components/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen h-screen bg-[#fffefc]">
      <header className="fixed z-[99] w-full flex items-center justify-center">
        <nav className="flex items-center justify-start w-full px-5 h-20 relative overflow-hidden gap-x-2">
          <Logo />
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" className="text-[#91918e] hover:text-[#91918e] h-7 ml-2 px-2 text-sm font-normal dark:text-[#91918e] dark:hover:text-[#91918e] dark:hover:bg-[#37352f0f]">
            <GlobeIcon />
            English
            <ChevronDownIcon />
          </Button>
        </nav>
      </header>
      <main className="flex flex-row w-full h-screen pt-20">
        <div className="px-[60px] w-full h-full mx-auto overflow-visible">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;