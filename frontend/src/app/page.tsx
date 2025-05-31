import BrandHighlight from "@/components/home/BrandHighlight";
import Categories from "@/components/home/Categories";
import CustomerComments from "@/components/home/CustomerComments";
import FlashSale from "@/components/home/FlashSale";
import HeroSection from "@/components/home/HeroSection";
import NewProducts from "@/components/home/NewProducts";
import PopularProducts from "@/components/home/PopularProducts";
import ValueSection from "@/components/home/ValueSection";

export const metadata = {
  title: "Home - Generic eCommerce",
}

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
