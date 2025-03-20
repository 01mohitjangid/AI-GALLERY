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
export default async function Main() {
  return (
    <>
    
      {/* <DashboardPage /> */}
      {/* <Home />  */}
      <MainHome />
      {/* <Footer /> */}
    </>
  );
}
