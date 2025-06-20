import ContentContainer from "@/components/category/ContentContainer";

type CategoryPageProps = {
    params: Promise<{ category_name: string }>
}

export const metadata = {
    title: 'Category - Generic eCommerce',
}

export default async function page({ params }: CategoryPageProps) {
    const { category_name } = await params

    return (
        <div>
            <ContentContainer category_name={category_name} />
        </div>
    )
}
