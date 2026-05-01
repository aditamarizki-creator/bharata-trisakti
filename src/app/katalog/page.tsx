import { getProducts } from "@/lib/storage";
import { KatalogClient } from "./KatalogClient";

export const revalidate = 60;

export default async function KatalogPage() {
  const products = await getProducts();
  return <KatalogClient products={products} />;
}
