import { Button } from "@/components/ui/button"
import Link from "next/link"
import {LandingNavbar} from "@/components/Landing-Navbar"
import {LandingHero} from "@/components/Landing-Hero"


const  LandingPage = () =>{
  return (
    <div className=" h-full">
      <LandingNavbar/>
      <LandingHero/>
    </div>
  )
}

export default LandingPage