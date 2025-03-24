"use client"

import AddImage from "@/components/AddImage";
import Home from "@/components/Home";
import { MainNav } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import DashboardPage from "./dashboard/page";
import MainHome from "../components/ui/mainhome";
import Footer from "@/components/ui/Footer";
import { useState , useEffect } from "react"
import AIPreloader from "@/components/ai-preloader"
// import { usePreloader } from "@/hooks/use-preloader"

export default function Main() {
  const [loading, setLoading] = useState(true);
  // const { loading, handleLoadComplete } = usePreloader()

 // Simulate loading completion after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <main className="min-h-screen">
    {loading && (
    <AIPreloader
    onLoadComplete={() => setLoading(false)} // Wrap setLoading in a function
    duration={4000} // Increased duration to show off animations
  />
    )}

    {/* Your actual website content */}
    <div className="container mx-auto py-12 px-4">
      <MainHome />
    </div>
  </main>
    //  <MainHome />
  );
}
