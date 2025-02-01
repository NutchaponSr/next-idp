import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image 
        src="/not-found.png"
        alt="NotFound"
        height={240}
        width={240}                        
      />
      <div className="w-full h-[30px]" />
      <h1 className="text-[#1a1a19] font-bold text-4xl">
        Sorry, that page cannot be found.
      </h1>
      <div className="w-full h-[10px]" />
      <p className="text-[#f64831] text-lg underline">
        Learn about Notion
      </p>
    </div>
  );
}

export default NotFoundPage;