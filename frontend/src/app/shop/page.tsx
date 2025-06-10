import Header from '@/components/shop/Header'
import ProductList from '@/components/shop/ProductList'

export const metadata = {
  title: 'Shop - Generic eCommerce',
}

export default function page() {
  return (
    <div className='w-full'>
      <Header />
      <ProductList />
    </div>
  )
}
