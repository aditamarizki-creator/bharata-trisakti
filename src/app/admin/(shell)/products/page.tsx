import { getProducts } from "@/lib/storage";
import { ProductsTable } from "./ProductsTable";

export const dynamic = "force-dynamic";

export default async function ProductsListPage() {
  const products = await getProducts();
  return <ProductsTable initial={products} />;
}
