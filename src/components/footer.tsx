import { Button } from "@/components/ui/button";

import { Logo } from "@/components/logo";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full shadow-[0_-1px_0_rgba(55,53,47,0.09)] bg-[#fffefc] z-20">
      <div className="flex items-center justify-between h-[3.5rem] p-4">
        <Logo showText />
        <div className="flex items-center gap-x-3">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            Terms & Conditions
          </Button>
        </div>
      </div>
    </footer>
  );
}