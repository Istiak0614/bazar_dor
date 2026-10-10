import AuthForm from "@/components/AuthForm";

const page = () => {
  return (
    <div className="wrap py-12 sm:py-16">
      <AuthForm mode="signup" />
    </div>
  );
};

export default page;