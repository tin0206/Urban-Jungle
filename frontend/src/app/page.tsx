import BrandHighlight from "@/components/BrandHighlight";
import Categories from "@/components/Categories";
import FlashSale from "@/components/FlashSale";
import HeroSection from "@/components/HeroSection";
import TrendingProducts from "@/components/TrendingProducts";
import ValueSection from "@/components/ValueSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ValueSection />
      <TrendingProducts />
      <FlashSale />
      <Categories />
      <BrandHighlight />
    </div>
  );
}
