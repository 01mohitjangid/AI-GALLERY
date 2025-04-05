"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/featureCard";
import Globe from "@/components/ui/glove";
import Avataar from "../../../asset/avatar1.jpeg";
import Avataar2 from "../../../asset/avatar2.jpeg";
import Avataar3 from "../../../asset/avatar3.jpeg";
import PricingSection from "@/app/payment/pricing-action";
import { PromptingIsAllYouNeed } from "@/components/prompting"

export default function Home() {
  const features = [
    {
      title: "AI-Powered Image Enhancement",
      description:
        "Our advanced AI algorithms can automatically enhance your images, adjusting lighting, color balance, and sharpness for stunning results.",
      icon: "✨",
    },
    {
      title: "Smart Object Removal",
      description:
        "Easily remove unwanted objects or people from your photos with our intelligent object removal tool, powered by state-of-the-art AI.",
      icon: "🔍",
    },
    {
      title: "Style Transfer",
      description:
        "Transform your photos into works of art by applying various artistic styles, all thanks to our AI-driven style transfer technology.",
      icon: "🖼️",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Photographer",
      content:
        "This AI-powered gallery has revolutionized my workflow. The image enhancement feature saves me hours of editing time!",
      avatar: Avataar,
    },
    {
      name: "Mike Chen",
      role: "Graphic Designer",
      content:
        "The style transfer tool is a game-changer. It allows me to experiment with different artistic styles effortlessly.",
      avatar: Avataar2,
    },
    {
      name: "Emily Rodriguez",
      role: "Social Media Influencer",
      content:
        "I love how easy it is to remove unwanted objects from my photos. This tool has become an essential part of my content creation process.",
      avatar: Avataar3,
    },
  ];

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-center p-4 mb-3">
      
      <h1 className="text-6xl font-bold mb-6 text-center">
        Welcome to AI-Powered Gallery
      </h1> 
      <PromptingIsAllYouNeed className="mb-10" />
      {/* <Globe /> */}
      <p className="text-lg text-center mb-8 max-w-1xl leading-relaxed text-gray-00 p-11">
        🌟 Discover the power of AI in image creation and manipulation. Upload your
        images and see the magic happen! 
        🎨 Our AI-Powered Gallery offers a seamless experience where cutting-edge technology meets creativity. 
        🖼️ Whether you're looking to enhance your photos, remove unwanted elements, or transform your images into stunning pieces of art, our advanced AI tools are designed to cater to all your needs. 
        🚀 With intuitive features and a user-friendly interface, you can effortlessly explore the endless possibilities of AI-driven image processing.
        🔓 Join us on this exciting journey and unlock the full potential of your visual content with our state-of-the-art AI solutions.
      </p>

      <Button asChild className="mb-10">
        <Link href="Image-enhancer">ENHANCE IMAGE </Link>
      </Button>

      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-5xl font-semibold mb-6 text-center">
          Our AI Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-5xl font-semibold mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            
            <div className="text-4xl mb-4">1. Upload</div>
            <p>Simply upload your image to our AI-powered gallery.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">2. Process</div>
            <p>Our AI algorithms analyze and process your image.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">3. Enhance</div>
            <p>Download your enhanced, transformed, or edited image.</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-5xl font-semibold mb-6 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-card-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingSection />

      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-5xl font-semibold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="bg-card p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer text-foreground">
              How does the AI image enhancement work?
            </summary>
            <p className="mt-2 text-card-foreground">
              Our AI algorithms analyze your image and automatically adjust
              various parameters such as lighting, color balance, and sharpness
              to enhance the overall quality of your photo.
            </p>
          </details>
          <details className="bg-card p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer text-foreground">
              Is my data safe and private?
            </summary>
            <p className="mt-2 text-card-foreground">
              Yes, we take data privacy very seriously. All uploaded images are
              processed securely and are not shared with any third parties. We
              also offer the option to delete your data upon request.
            </p>
          </details>
          <details className="bg-card p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer text-foreground">
              Can I use the enhanced images for commercial purposes?
            </summary>
            <p className="mt-2 text-card-foreground">
              Yes, you retain full rights to your enhanced images and can use
              them for both personal and commercial purposes.
            </p>
          </details>
        </div>
      </section>

      <section className="w-full max-w-4xl mb-16 text-center">
        <h2 className="text-5xl font-semibold mb-6">
          Ready to Transform Your Images?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of satisfied users and experience the power of AI in
          image processing.
        </p>
        <Button asChild size="lg">
          <Link href="sign-up">Get Started for Free</Link>
        </Button>
      </section>
        <Button asChild size="lg">
          <Link href="MemoryMatchGame">FREE GAME</Link>
        </Button>
      
    </main>
  );
}
