export default function BrandHighlight() {
  return (
    <div className="w-full flex justify-center px-6 md:px-8 lg:px-10 bg-[rgb(236,244,211)]">
      <div className="max-w-[1200px] py-16 md:py-20 md:gap-x-[40px] lg:gap-x-[110px] grid grid-cols-1 md:grid-cols-2 gap-y-[45px] md:gap-y-0">
        <div className="w-full aspect-[4/3] md:aspect-[1]">
          <div className="bg-[url('/stats_count.jpg')] bg-cover bg-center w-full h-full" />
        </div>
        <div className="flex flex-col justify-center">
            <h2 className="text-[33px] md:text-[42px] text-[rgb(34,34,34)] leading-[40px] font-medium md:pr-[80px]">Your Premier Destination for All Green.</h2>
            <p className="mt-4 font-navbar text-[14.5px] md:text-[16px] text-[rgb(69,69,69)] leading-[21.888px]">
               At Urban Jungle Co., we believe in the transformative power of plants. Whether you're a seasoned gardener or just starting your green journey, our curated selection of plants will inspire and enrich your living space. 
            </p>
            <hr className="my-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] md:gap-y-0">
                <div>
                    <h3 className="mb-1 text-[25.536px] text-[rgb(34,34,34)] font-medium">98%</h3>
                    <p className="font-navbar text-[14.592px] text-[rgb(69,69,69)]">Customer Satisfaction</p>
                </div>
                <div>
                    <h3 className="mb-1 text-[25.536px] text-[rgb(34,34,34)] font-medium">103K</h3>
                    <p className="font-navbar text-[14.592px] text-[rgb(69,69,69)]">Plants Sold</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
