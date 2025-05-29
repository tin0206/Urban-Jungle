export default function BrandHighlight() {
  return (
    <div className="w-full px-6 md:px-8 lg:px-10 bg-[rgb(236,244,211)] h-[1069px] md:h-[580px] lg:h-[735px]">
      <div className="w-full py-16 md:py-20 md:gap-x-10 grid grid-cols-1 md:grid-cols-2 gap-y-[45px] md:gap-y-0">
        <div className="bg-[url(/stats_count.jpg)] bg-cover w-full h-[451.812px] sm:h-[596.547px] md:h-[400px] lg:h-[563.469px]"></div>
        <div>
            <h2 className="text-[32px] text-[rgb(34,34,34)] leading-[40px] font-medium">Your Premier Destination for All Green.</h2>
            <p className="mt-4 font-navbar text-[14.5px] text-[rgb(69,69,69)] leading-[21.888px]">
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
