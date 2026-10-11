import { requireSession } from "@/lib/session";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";

const page = async () => {
  const session = await requireSession();

  return (
    <div className="wrap py-12">
      <section className="mx-auto max-w-lg">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>

        <p className="mt-2 text-sm text-gray-500">
          নিচের ফর্ম থেকে আপনার নাম পরিবর্তন করুন।
        </p>

        <ProfileUpdateForm initialName={session.user.name} />
      </section>
    </div>
  );
};

export default page;