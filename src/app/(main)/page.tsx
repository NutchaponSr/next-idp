import { auth } from "@/auth";

import { BeforeSignIn } from "@/modules/auth/components/before-sign-in";

const HomePage = async () => {
  const session = await auth();

  if (session) {
    return (
      <pre className="mt-16">
        {JSON.stringify(session, null, 2)}
      </pre>
    );
  }

  return (
    <BeforeSignIn />
  );
}

export default HomePage;