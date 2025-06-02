import CartItemList from "./CartItemList";
import TopBarShoppingCart from "./TopBarShoppingCart";

export default function ShoppingCartSidebar() {
  return (
    <div className="h-full">
      <TopBarShoppingCart />
      <CartItemList />
    </div>
  )
}
