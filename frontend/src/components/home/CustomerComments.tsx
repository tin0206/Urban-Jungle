import { FaQuoteLeft } from "react-icons/fa"

export default function CustomerComments() {
  return (
    <div className="w-full px-6 md:px-8 lg:px-10 bg-[rgb(236,244,211)]">
        <div className="w-full flex flex-col items-center justify-center py-16 md:py-20 lg:py-[100px]">
            <div className="grid max-w-[1200px] grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-10">
                <div className="flex flex-col gap-y-10 md:gap-y-[60px]">
                    <div>
                        <h2 className="mb-3 text-[32px] md:text-[42px] font-medium text-[rgb(34,34,34)]">
                            What Our Customers Say
                        </h2>
                        <p className="font-navbar text-[14.5px] md:text-[16px] leading-[22px] md:leading-[24px] text-[rgb(69,69,69)]">Discover the reasons why people loves us and become your go-to partner.</p>
                    </div>
                    <div className="p-6 md:py-10 md:px-12 bg-white flex flex-col gap-y-5 rounded-lg">
                        <div>
                            <FaQuoteLeft className="text-[rgb(136,173,53)] text-[18px] md:text-[20px]" />
                        </div>
                        <div>
                            <div className="mb-5 font-navbar text-[16px] md:text-[20px] text-[rgb(69,69,69)]">
                                <p>I am absolutely thrilled with the service I received from their company! They were attentive, responsive, and genuinely cared about meeting my needs. I highly recommend them.</p>
                            </div>
                            <div className="flex items-center">
                                <img src="./default_avatar.png" alt="" className="w-[63px] h-[48px] md:w-[75px] md:h-[60px] pr-[15px]" />
                                <p className="font-navbar text-[16px] text-[rgb(69,69,69)]">Your Client</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-10 md:gap-y-[60px]">
                    <div className="p-6 md:py-10 md:px-12 bg-white flex flex-col gap-y-5 rounded-lg">
                        <div>
                            <FaQuoteLeft className="text-[rgb(136,173,53)] text-[18px] md:text-[20px]" />
                        </div>
                        <div>
                            <div className="mb-5 font-navbar text-[16px] md:text-[20px] text-[rgb(69,69,69)]">
                                <p>I am absolutely thrilled with the service I received from their company! They were attentive, responsive, and genuinely cared about meeting my needs. I highly recommend them.</p>
                            </div>
                            <div className="flex items-center">
                                <img src="./default_avatar.png" alt="" className="w-[63px] h-[48px] md:w-[75px] md:h-[60px] pr-[15px]" />
                                <p className="font-navbar text-[16px] text-[rgb(69,69,69)]">Your Client</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 md:py-10 md:px-12 bg-white flex flex-col gap-y-5 rounded-lg">
                        <div>
                            <FaQuoteLeft className="text-[rgb(136,173,53)] text-[18px] md:text-[20px]" />
                        </div>
                        <div>
                            <div className="mb-5 font-navbar text-[16px] md:text-[20px] text-[rgb(69,69,69)]">
                                <p>Their team exceeded our expectations. Their creative approach and attention to detail brought our vision to life. Highly recommended!</p>
                            </div>
                            <div className="flex items-center">
                                <img src="./default_avatar.png" alt="" className="w-[63px] h-[48px] md:w-[75px] md:h-[60px] pr-[15px]" />
                                <p className="font-navbar text-[16px] text-[rgb(69,69,69)]">Your Client</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
