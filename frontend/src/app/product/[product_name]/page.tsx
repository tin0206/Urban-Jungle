import ContentContainer from "@/components/product/ContentContainer"

type ProductPageProps = {
    params: Promise<{ product_name: string }>;
}

export const metadata = {
    title: 'Product - Generic eCommerce',
}

export default async function page({ params }: ProductPageProps) {
    const { product_name } = await params

    return (
        <div>
            <ContentContainer product_name={product_name} />
        </div>
    )
}
