interface AuthWrapperProps {
  children: React.ReactNode;
  description: string;
  title: string;
}

export const AuthWrapper = ({
  children,
  description,
  title
}: AuthWrapperProps) => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="mt-[10vh] mb-6 max-w-[320px]">
        <div className="flex flex-col font-bold text-[22px] text-left w-[320px]">
          <h1 className="text-primary">{title}</h1>
          <h3 className="text-[#acaba9]">{description}</h3>
        </div>
      </div>
      <div className="flex flex-col items-center w-full max-w-[320px] mb-[16vh] space-y-4">
        <div className="flex flex-col w-full">
          {children}
        </div>
        <div className="w-full mt-16 mb-0 text-xs text-[#787774] text-center text-balance">
          <p className="mb-0">
            Your name and photo are displayed to users who invite you to a workspace using your email. By continuing, you acknowledge that you understand and agree to the 
            <span className="text-[#acaba9] hover:text-[#2383e2] cursor-pointer"> Terms & Conditions</span> and <span className="text-[#acaba9] hover:text-[#2383e2] cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}