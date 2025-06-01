import CoreValues from "@/components/about/CoreValues";
import Intro from "@/components/about/Intro";
import Message from "@/components/about/Message";
import OurMission from "@/components/about/OurMission";

export default function page() {
  return (
    <div>
      <Intro />
      <Message />
      <CoreValues />
      <OurMission />
    </div>
  )
}
