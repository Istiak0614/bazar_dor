import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/schemas";

const Header = async () => {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch {
    
  }

  return (
    <>
      <Navbar />
      <Ticker products={products} />
    </>
  );
};

export default Header;