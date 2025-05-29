import { Button } from './ui/button'

export default function HeroSection() {
  return (
    <div className="h-[530px] lg:h-[700px] 2xl:mx-[300px]">
      <div className="flex flex-col items-center lg:mt-[130px] py-[100px] text-white gap-2.5">
        <div>
          <h1 className="font-navbar text-[16px] tracking-[2px]">WELCOME TO URBAN JUNGLE CO.</h1>
        </div>
        <div className="mt-2.5">
          <p className="text-[50px] md:text-[58px] lg:text-[64px] text-center mt-1 px-[20px] md:px-[100px] lg:px-[210px] leading-[76.8px]">Discover the Beauty of Nature at Your Fingertips</p>
        </div>
        <div className="h-[66px] flex items-end">
          <Button className="font-navbar rounded-3xl w-[135px] h-[46px] text-[16px] cursor-pointer bg-[rgb(136,173,53)] hover:bg-[#698927] transition duration-300">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  )
}
