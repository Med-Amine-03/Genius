import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { Ghost, Menu } from "lucide-react"
import MobileSidebar from "./Mobile-Sidebar"


const  Navbar=() => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar/>
      <div className=" flex w-full justify-end  ">
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  )
}

export default Navbar
