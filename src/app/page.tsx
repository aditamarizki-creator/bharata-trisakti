import { Hero } from "@/components/home/Hero";
import { BrandStrip } from "@/components/home/BrandStrip";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HowToOrder } from "@/components/home/HowToOrder";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { getProducts } from "@/lib/storage";

export const revalidate = 60;

export default async function HomePage() {
  const all = await getProducts();
  const featured = all
    .filter((p) => p.featured && p.inStock !== false)
    .slice(0, 8);

  return (
    <>
      <Hero />
      <Reveal>
        <BrandStrip />
      </Reveal>
      <Reveal>
        <FeaturedProducts products={featured} />
      </Reveal>
      <Reveal>
        <HowToOrder />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <FinalCTA />
      </Reveal>
    </>
  );
}
