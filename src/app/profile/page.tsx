import { requireSession } from "@/lib/session";
import SignOutButton from "@/components/SignOutButton";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";
import UserAvatar from "@/components/UserAvatar";

const page = async () => {
  const session = await requireSession();

  return (
    <div className="wrap py-10">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-[#202a22]">আমার প্রোফাইল</h1>
        <p className="mt-1 text-xs text-[#6b756c]">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <div className="panel mt-5 flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <UserAvatar
              name={session.user.name}
              image={session.user.image}
              size={56}
              rounded="lg"
            />

            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-[#202a22]">
                {session.user.name}
              </h2>
              <p className="break-all text-xs text-[#6b756c]">
                {session.user.email}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <SignOutButton variant="outline" />
          </div>
        </div>

        <div className="panel mt-4 p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-[#202a22]">তথ্য</h2>

          <ProfileUpdateForm initialName={session.user.name} />
        </div>
      </section>
    </div>
  );
};

export default page;
