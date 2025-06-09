import CartDisplay from "@/components/cart/CartDisplay"

export const metadata = {
  title: 'Cart - Generic eCommerce',
}

export default function page() {
  return (
    <div className="w-full h-full flex justify-center border-t">
      <div className="px-5 max-w-[1240px] md:w-11/12 xl:my-[60px]">
        <CartDisplay />
      </div>
    </div>
  )
}
