import AdminDisplay from "@/components/admin/AdminDisplay"

export const metadata = {
  title: 'Admin - Generic eCommerce',
}

export default function page() {
  return (
    <div className="w-full h-full flex md:justify-center border-t">
      <div className="px-5 max-w-[1240px] md:w-11/12 xl:my-[60px]">
        <AdminDisplay />
      </div>
    </div>
  )
}
