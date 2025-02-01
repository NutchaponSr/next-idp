import Link from "next/link";

import { auth } from "@/auth";

import { Button } from "@/components/ui/button";

import { Logo } from "@/components/logo";

import { UserButton } from "@/modules/auth/components/user-button";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="fixed left-0 top-0 z-50 w-full backdrop-blur-md">
      <nav className="flex items-center justify-between h-[3.5rem] p-4">
        <Logo showText />
        <div className="flex items-center space-x-4">
          {session && (
            <UserButton side="right" />
          )}
          {!session && (
            <>
              <Button size="sm" variant="ghost" className="text-primary hover:text-primary" asChild>
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/request">
                  Get Jotion Free
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}