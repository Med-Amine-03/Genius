"use client"

import { cn } from "@/lib/utils"
import { link } from "fs"
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const monserat = Montserrat({weight:"600" ,subsets:["latin"]})

const routes =[
    {
        lable:"Dashboard",
        icon:LayoutDashboard,
        href:"/dashboard",
        color:"text-sky-500"
    },
    {
        lable:"Conversation",
        icon:MessageSquare,
        href:"/conversation",
        color:"text-violet-500"
    },
    {
        lable:"Code Generation",
        icon:Code,
        href:"/code",
        color:"text-green-700"
    },
    {
        lable:"Image Generation",
        icon:ImageIcon,
        href:"/image",
        color:"text-pink-700"
    },
    
  
]


const  SideBar=()=> {
    const pathName= usePathname()
  return (
    <div className=" space-y-4 py-4 flex flex-col h-full bg-[#111827]
    text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
        <div className=" relative w-8 h-8 mr-4">
            <Image
            fill
            alt="logo"
            src="/logo.png"
            />
        </div>
        <h1 className={cn ("text-2xl font-bold", monserat.className)}>
            Genius
        </h1>
        </Link>
        <div className=" space-y-1">
            {routes.map(item =>(
                <Link key={item.href}
                href={item.href}
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10rounded-lg transition" ,
                    pathName === item.href ? "text-white bg-white/10" :
                    " text-zinc-400"
                )}
                >
                    <div className=" flex items-center flex-1">
                        <item.icon className={cn("w-5 h-5 mr-3", item.color)}/>
                        {item.lable}
                    </div>
                
                </Link>
            ))}

        </div>
      </div>
    </div>
  )
}

export default SideBar
