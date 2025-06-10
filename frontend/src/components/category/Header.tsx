type HeaderProps = {
    category_name: string
}

export default function Header({ category_name }: HeaderProps) {
  return (
    <div className='bg-[url("/shop_background.jpg")] bg-cover bg-center w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center'>
        <h1 className="text-[45.6px] md:text-[72px] font-semibold leading-[45.9648px] sm:leading-[54.72px] md:leading-[86.4px] text-white">{category_name}</h1>
    </div>
  )
}
