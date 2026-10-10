import AuthForm from "@/components/AuthForm";

const page = () => {
  return (
    <div className="wrap py-12 sm:py-16">
      <AuthForm mode="signin" />
    </div>
  );
};

export default page;