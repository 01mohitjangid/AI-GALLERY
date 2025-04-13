"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, Download, Share2, ArrowRight, Sparkles } from "lucide-react"
import cosmic from '../../../asset/gallery-section/cosmic.jpg'
import Futuristic from '../../../asset/gallery-section/Futuristic City.jpg'
import Patterns from '../../../asset/gallery-section/Abstract Patterns.jpg'
import Portrait from '../../../asset/gallery-section/Digital Portrait.jpg'
import Generator from '../../../asset/gallery-section/Story Generator.jpg'
import Particle from '../../../asset/gallery-section/Particle Flow.jpg'
import Link from 'next/link'

const categories = ["All", "Images", "Art", "3D", "Animation", "Text"]

const galleryItems = [
  {
    id: 1,
    title: "Cosmic Dreamscape",
    category: "Art",
    image: cosmic.src,
    likes: 245,
  },
  {
    id: 2,
    title: "Futuristic City",
    category: "3D",
    image: Futuristic.src,
    likes: 189,
  },
  {
    id: 3,
    title: "Abstract Patterns",
    category: "Art",
    image: Patterns.src,
    likes: 312,
  },
  {
    id: 4,
    title: "Digital Portrait",
    category: "Images",
    image: Portrait.src,
    likes: 276,
  },
  {
    id: 5,
    title: "Particle Flow",
    category: "Animation",
    image: Particle.src,
    likes: 198,
  },
  {
    id: 6,
    title: "Story Generator",
    category: "Text",
    image: Generator.src,
    likes: 154,
  },
]

export default function MainSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleItems, setVisibleItems] = useState(galleryItems)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeCategory === "All") {
      setVisibleItems(galleryItems)
    } else {
      setVisibleItems(galleryItems.filter((item) => item.category === activeCategory))
    }
    setCurrentPage(0)
  }, [activeCategory])

  useEffect(() => {
    if (!particlesRef.current) return

    const particles = Array.from({ length: 50 }).map(() => {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full bg-purple-500/30"

      // Random size between 4px and 20px
      const size = Math.random() * 16 + 4
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random animation duration between 10s and 30s
      const duration = Math.random() * 20 + 10
      particle.style.animation = `float ${duration}s infinite ease-in-out`

      return particle
    })

    particles.forEach((particle) => particlesRef.current?.appendChild(particle))

    return () => {
      particles.forEach((particle) => particle.remove())
    }
  }, [])

  const paginatedItems = visibleItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const totalPages = Math.ceil(visibleItems.length / itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
        <div ref={particlesRef} className="absolute inset-0 z-0" />

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm font-medium mb-6">
                <Sparkles size={16} className="mr-2" />
                The Future of AI Prompting
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400"
            >
              Unleash Your Creative AI Potential
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Discover, create, and share amazing AI-generated content with our cutting-edge prompt gallery. Join the
              future of creative expression.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/gallery">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8">
                  Explore Gallery
                </Button>
              </Link>
              <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-purple-500 text-purple-300 hover:bg-purple-950/30"
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20 z-10" />
              {/* <img src="/placeholder.svg?height=600&width=1200" alt="AI Gallery Preview" className="w-full h-auto" /> */}
            </div>

            <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full blur-3xl opacity-30" />
            <div className="absolute -top-5 -left-5 w-32 h-32 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur-3xl opacity-30" />
          </motion.div>
        </div>

        <style jsx global>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-30px) translateX(15px);
            }
            50% {
              transform: translateY(-15px) translateX(-15px);
            }
            75% {
              transform: translateY(30px) translateX(15px);
            }
          }
        `}</style>
      </section>

      <section className="py-20 relative" id="gallery">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore the <span className="text-purple-500">Gallery</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse through our curated collection of AI-generated content from creators around the world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 ${
                  activeCategory === category
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-500/50 text-purple-300 hover:bg-purple-950/30"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/10 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="w-full">
                        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-purple-300">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-white hover:text-purple-300 hover:bg-purple-950/50"
                            >
                              <Heart size={16} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-white hover:text-purple-300 hover:bg-purple-950/50"
                            >
                              <Download size={16} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-white hover:text-purple-300 hover:bg-purple-950/50"
                            >
                              <Share2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-purple-500" />
                      <span className="text-gray-400">{item.likes}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-950/30"
                    >
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="border-purple-500/50 text-purple-300 hover:bg-purple-950/30 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </Button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  className={`w-10 h-10 ${
                    currentPage === index
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-500/50 text-purple-300 hover:bg-purple-950/30"
                  }`}
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="border-purple-500/50 text-purple-300 hover:bg-purple-950/30 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
