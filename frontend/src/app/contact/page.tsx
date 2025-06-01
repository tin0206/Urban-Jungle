import FollowUs from "@/components/contact/FollowUs";
import Intro from "@/components/contact/Intro";
import SendMessage from "@/components/contact/SendMessage";

export default function page() {
  return (
    <div>
      <Intro />
      <SendMessage />
      <FollowUs />
    </div>
  )
}
