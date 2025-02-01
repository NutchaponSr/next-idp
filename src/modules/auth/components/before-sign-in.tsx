import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";

import { IntroduceButton } from "@/components/introduce-button";

export const BeforeSignIn = () => {
  return (
    <section className="md:px-8 px-6 mt-32 max-w-[80rem] relative mx-auto h-full text-center">
      <div className="absolute inset-0 pointer-events-none">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
      <div className="relative z-10 flex flex-col space-y-5">
        <IntroduceButton />
        <h1 className="bg-gradient-to-t from-primary to-[#787774] bg-clip-text text-transparent text-8xl tracking-tighter font-bold text-balance">
          Drive Success with Precision.
        </h1>
        <p className="tracking-tight text-lg text-primary text-balance mx-auto font-semibold">
          Empower your organization with tailored strategies and actionable insights.
        </p>
        <div className="flex flex-row items-center mx-auto space-x-4">
          <Button variant="primary" className="w-fit mx-auto">
            Get started for free
          </Button>
          <Button variant="primaryOutline" className="w-fit mx-auto">
            Contact Admin
          </Button>
        </div>
      </div>
      <div className="mt-8 relative flex items-center justify-center">
        <Image src="/hero.png" alt="Hero" width={560} height={300} />
      </div>
    </section>
  );
}