// "use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import { UserButton } from "@clerk/nextjs"
import { LogInIcon } from "lucide-react"
import { buttonVariants } from "./ui/button"
import { auth } from "@clerk/nextjs/server"

export async function MainNav() {
  // const pathname = usePathname()
  const { userId  } = await auth()

  const isAuth = !!userId


  return (
    <div className="mr-4 hidden md:flex p-[2em] justify-between">
      <nav className="flex items-center gap-6 text-sm">
        <Link 
        href="/"
        className={cn(
          "transition-colors hover:text-foreground/80 text-3xl font-bold",
          // pathname?.startsWith("/")
          //   ? "text-foreground"
          //   : "text-foreground/60"
        )}
        >
          NEURAGALLERY
        </Link>
        <Link
          href="/EnterDetails"
          className={cn(
            "transition-colors hover:text-foreground/80",
            // pathname?.startsWith("/")
            //   ? "text-foreground"
            //   : "text-foreground/60"
          )}
        >
          Enter Details
        </Link>
        <Link
          href="/upload-image"
          className={cn(
            "transition-colors hover:text-foreground/80",
            // pathname?.startsWith("/upload-image")
            //   ? "text-foreground"
            //   : "text-foreground/60"
          )}
        >
          Upload image
        </Link>
        <Link
          href="/gallery"
          className={cn(
            "transition-colors hover:text-foreground/80",
            // pathname?.startsWith("/gallery")
            //   ? "text-foreground"
            //   : "text-foreground/60"
          )}
        >
          Gallery
        </Link>
        
      </nav>
      <div className="flex gap-4 max-w-xl justify-end">
        <ThemeToggle />

        {/* {
          isAuth ? (
            <>
            <UserButton afterSignOutUrl='/' />
            </>
          ) : (
            <Link href={'/sign-in'} className={cn(buttonVariants({size:'sm'}), 'gap-2 items-center')}>
              Log in
              <LogInIcon className='w-4 h-4' />
            </Link>
          )
        } */}
         {
          isAuth ? (
            <>
            <UserButton afterSignOutUrl='/' />
            <Link
              href="/dashboard"
              className="bg-black text-white border rounded-full px-4 py-2 flex items-center gap-2"
            >
              Dashboard
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18m-6-6l6 6-6 6" />
              </svg>
            </Link>
            </>
          ) : (
            <Link href={'/sign-in'} className={cn(buttonVariants({size:'sm'}), 'gap-2 items-center')}>
              Log in
              <LogInIcon className='w-4 h-4' />
            </Link>
          )
        }
      </div>
    </div>
  )
}