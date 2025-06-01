import { FaFacebook, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function FollowUs() {
  return (
    <div className="flex justify-center w-full px-6 md:px-8 lg:px-10 bg-[rgb(236,244,211)]">
      <div className="max-w-[1200px] w-full py-[60px] lg:py-[80px] flex flex-col items-center gap-y-[25px] md:gap-y-[36px]">
        <h4 className="text-[rgb(34,34,34)] font-medium text-[23.712px] lg:text-[22px]">
          Follow us @Urban Jungle Co.
        </h4>
        <ul className="flex gap-x-8">
          <li className="cursor-pointer">
            <FaFacebook className="size-[30px]" />
          </li>
          <li className="cursor-pointer">
            <FaYoutube className="size-[30px]" />
          </li>
          <li className="cursor-pointer">
            <FaPinterest className="size-[30px]" />
          </li>
          <li className="cursor-pointer">
            <FaXTwitter className="size-[30px]" />
          </li>
          <li className="cursor-pointer">
            <FaInstagram className="size-[30px]" />
          </li>
        </ul>
      </div>
    </div>
  )
}
