import BrandHighlight from "@/components/BrandHighlight";
import Categories from "@/components/Categories";
import CustomerComments from "@/components/CustomerComments";
import FlashSale from "@/components/FlashSale";
import HeroSection from "@/components/HeroSection";
import NewProducts from "@/components/NewProducts";
import PopularProducts from "@/components/PopularProducts";
import ValueSection from "@/components/ValueSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ValueSection />
      <NewProducts />
      <FlashSale />
      <Categories />
      <BrandHighlight />
      <PopularProducts />
      <CustomerComments />
    </div>
  );
}
