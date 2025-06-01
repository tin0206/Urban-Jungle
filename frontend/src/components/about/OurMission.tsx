import { TiTick } from "react-icons/ti"

export default function OurMission() {
  return (
    <div className="flex justify-center w-full px-6 md:px-8 lg:px-10">
      <div className="max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-y-[45px] md:gap-x-0 md:gap-y-[40px] lg:gap-y-[114px] w-full py-[64px] md:py-[80px] lg:py-[100px]">
        <div className="w-full h-full flex items-center">
          <div className="flex flex-col gap-y-[20px]">
            <h2 className="text-[32.832px] md:text-[42px] leading-[39.3984px] md:leading-[50.4px] font-medium text-[rgb(34,34,34)]">
              Our Mission
            </h2>
            <p className="font-navbar text-[rgb(69,69,69)] text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px]">
              Our mission is to make the world a greener place, one plant at a time. We strive to provide our customers with the highest quality plants and plant care products, along with the knowledge and support to help them thrive.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 mt-[10px] md:mt-[20px] gap-x-[10px] gap-y-3 md:gap-y-5">
              <li className="flex items-center">
                <div className="w-[33px] h-[20px] pr-[8px]">
                  <div className="w-[20px] h-full flex items-center justify-center border-foreground bg-[rgb(136,173,53)] rounded-full">
                    <TiTick className="size-[20px] text-white" />
                  </div>
                </div>
                <div className="pl-[5px] font-navbar text-[14.592px] md:text-[15px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)]">
                  Quality and Variety
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-[33px] h-[20px] pr-[8px]">
                  <div className="w-[20px] h-full flex items-center justify-center border-foreground bg-[rgb(136,173,53)] rounded-full">
                    <TiTick className="size-[20px] text-white" />
                  </div>
                </div>
                <div className="pl-[5px] font-navbar text-[14.592px] md:text-[15px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)]">
                  Expert Guidance
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-[33px] h-[20px] pr-[8px]">
                  <div className="w-[20px] h-full flex items-center justify-center border-foreground bg-[rgb(136,173,53)] rounded-full">
                    <TiTick className="size-[20px] text-white" />
                  </div>
                </div>
                <div className="pl-[5px] font-navbar text-[14.592px] md:text-[15px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)]">
                  Sustainable Practices
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-[33px] h-[20px] pr-[8px]">
                  <div className="w-[20px] h-full flex items-center justify-center border-foreground bg-[rgb(136,173,53)] rounded-full">
                    <TiTick className="size-[20px] text-white" />
                  </div>
                </div>
                <div className="pl-[5px] font-navbar text-[14.592px] md:text-[15px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)]">
                  Experienced Team
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center md:justify-baseline">
          <img
            src="/our_mission.jpg"
            className="max-w-[543px] max-h-[561.406px] w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  )
}
