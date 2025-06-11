import CheckoutDisplay from "@/components/checkout/CheckoutDisplay"

export const metadata = {
    title: 'Checkout - Generic eCommerce',
}

export default function page() {

  return (
    <div className="w-full h-full flex justify-center border-t">
        <div className="px-5 max-w-[1240px] md:w-11/12 xl:my-[60px]">
            <CheckoutDisplay />
        </div>
    </div>
  )
}
