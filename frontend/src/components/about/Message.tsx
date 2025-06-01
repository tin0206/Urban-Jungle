import React from 'react'

export default function Message() {
  return (
    <div className="w-full flex justify-center px-6 md:px-8 lg:px-10">
      <div className="max-w-[1200px] py-16 md:py-20 lg:py-[100px] md:gap-x-[40px] lg:gap-x-[110px] grid grid-cols-1 md:grid-cols-2 gap-y-[40px] md:gap-y-0">
        <div className="w-full aspect-[4/3] md:aspect-[1] flex items-center">
          <div className="bg-[url('/stats_count.jpg')] bg-cover bg-center w-full h-full" />
        </div>
        <div className="flex flex-col justify-center">
            <h2 className="text-[33px] lg:text-[42px] text-[rgb(34,34,34)] leading-[40px] md:leading-[50px] font-medium mb-5">We strive to provide our customers with the highest quality</h2>
            <p className="font-navbar text-[14.5px] md:text-[16px] text-[rgb(69,69,69)] leading-[21.888px]">
               At Urban Jungle Co., we believe in the transformative power of plants. Whether you're a seasoned gardener or just starting your green journey, our curated selection of plants will inspire and enrich your living space. 
            </p>
            <hr className="my-10" />
            <p className='italic font-navbar text-[rgb(34,34,34)] text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px]'>
              “We love what we do & create partnerships with our clients to ensure their digital transformation is positioned for long-term success.”
            </p>
            <div className='flex flex-col md:flex-row mt-[15px] md:mt-6 md:gap-x-2.5'>
              <img src="./default_avatar.png" alt="" className='size-[80px] md:size-[62px] mb-[15px] md:mb-0' />
              <div>
                <h6 className='mb-[6px] text-[16.416px] md:text-[18px] font-medium text-[rgb(34,34,34)]'>
                  Karen Lynn
                </h6>
                <p className='font-navbar text-[rgb(69,69,69)] text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px]'>
                  CEO & Co-founder @ Company
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
