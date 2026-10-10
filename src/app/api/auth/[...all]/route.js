import { getCatalog } from "@/lib/catalog";

export const runtime = "nodejs";

export const GET = async () => {
  try {
    const catalog = await getCatalog();

    return Response.json(catalog);
  } catch {
    return Response.json(
      { message: "পণ্যের তথ্য লোড করা যাচ্ছে না।" },
      { status: 502 }
    );
  }
};