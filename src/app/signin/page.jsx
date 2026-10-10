import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/session";

const page = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="container-shell auth-page">
      <AuthForm mode="signin" />
    </div>
  );
};

export default page;