import { FaPhoneAlt } from "react-icons/fa"
import { MdEmail, MdLocationOn } from "react-icons/md"
import { Button } from "../ui/button"

export default function SendMessage() {
  return (
    <div className="w-full flex justify-center px-6 md:px-8 lg:px-10">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 pt-[64px] pb-[44px] md:py-[80px] lg:py-[100px] gap-y-[30px] md:gap-y-0 md:gap-x-[40px] lg:gap-x-[50px]">
        <div className="flex flex-col gap-y-[40px] md:gap-y-[60px]">
          <h2 className="text-[rgb(34,34,34)] text-[32.832px] lg:text-[42px] leading-[39.3984px] md:leading-[50.4px]">
            Send us Message
          </h2>
          <ul className="flex flex-col gap-y-[40px] md:gap-y-[60px]">
            <li className="flex flex-col md:flex-row md:items-center">
              <div className="size-[50px] mr-[18px] flex items-center justify-center border-[1px] border-transparent rounded-full bg-[rgb(236,244,211)] mb-[18px] md:mb-0">
                  <FaPhoneAlt />
              </div>
              <div>
                <div className="text-[23.712px] lg:text-[22px] font-medium text-[rgb(34,34,34)] mb-1">
                  Phone
                </div>
                <div className="font-navbar text-[rgb(69,69,69)] text-[14.59px] md:text-[16px] leading-[21.888px] md:leading-[24px]">
                  +84-868-744-986
                </div>
              </div>
            </li>
            <li className="flex flex-col md:flex-row md:items-center">
              <div className="size-[50px] mr-[18px] flex items-center justify-center border-[1px] border-transparent rounded-full bg-[rgb(236,244,211)] mb-[18px] md:mb-0">
                  <MdEmail />
              </div>
              <div>
                <div className="text-[23.712px] lg:text-[22px] font-medium text-[rgb(34,34,34)] mb-1">
                  Email
                </div>
                <div className="font-navbar text-[rgb(69,69,69)] text-[14.59px] md:text-[16px] leading-[21.888px] md:leading-[24px]">
                  ngtrungtin02062005@gmail.com
                </div>
              </div>
            </li>
            <li className="flex flex-col md:flex-row md:items-center">
              <div className="size-[50px] mr-[18px] flex items-center justify-center border-[1px] border-transparent rounded-full bg-[rgb(236,244,211)] mb-[18px] md:mb-0">
                  <MdLocationOn />
              </div>
              <div>
                <div className="text-[23.712px] lg:text-[22px] font-medium text-[rgb(34,34,34)] mb-1">
                  Address
                </div>
                <div className="font-navbar text-[rgb(69,69,69)] text-[14.59px] md:text-[16px] leading-[21.888px] md:leading-[24px]">
                  Ho Chi Minh City, Vietnam
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <form action="post" className="flex flex-col">
            <div className="py-[15px]">
              <div className="font-navbar text-[14px] leading-[20px] font-bold">
                Name *
              </div>
              <input type="text" className="border-1 h-[40px] px-4 py-3 w-11/12" />
            </div>
            <div className="py-[15px]">
              <div className="font-navbar text-[14px] leading-[20px] font-bold">
                Email *
              </div>
              <input type="email" className="border-1 h-[40px] px-4 py-3 w-11/12" />
            </div>
            <div className="py-[15px]">
              <div className="font-navbar text-[14px] leading-[20px] font-bold">
                Phone *
              </div>
              <input type="text" className="border-1 h-[40px] px-4 py-3 w-11/12" />
            </div>
            <div className="py-[15px]">
              <div className="font-navbar text-[14px] leading-[20px] font-bold">
                Message
              </div>
              <textarea className="border-1 h-[120px] px-4 py-3 w-11/12" />
            </div>
            <Button 
              className="font-navbar rounded-3xl py-[14px] px-[28px] w-[104.703px] h-[42.5938px] text-[16px] cursor-pointer bg-[rgb(136,173,53)] hover:bg-[#698927] transition duration-300"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
