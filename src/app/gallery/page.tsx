"use client"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronDown, Download, ExternalLink } from "lucide-react"
import { useRouter } from 'next/navigation';

const Gallery = () => {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [menuVisible, setMenuVisible] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const textControls = useAnimation()
  const router = useRouter();

  // Animation for the title text
  useEffect(() => {
    const animateText = async () => {
      while (true) {
        await textControls.start({
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          transition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        })
      }
    }
    animateText()
  }, [textControls])

  const getAllImages = async () => {
    const { data } = await axios.get("/api/getImages")
    console.log("imagedata", data)

    const imagesUrl = []
    const sortedImagesData = []

    if (data) {
      const files = data.files
      for (let i = 0; i < files.length; i++) {
        let url = "https://utfs.io/f/"
        url += files[i]["key"]
        imagesUrl.push(url)

        sortedImagesData.push({
          imageUrl: url,
          percentageOfRelevance: files[i]["relevance"] || 0,
          description: files[i]["description"] || "",
        })
      }
    }
    setImages(imagesUrl)
    setSortedImages(sortedImagesData)
    setLoading(false)
  }

  useEffect(() => {
    console.log("Fetching images...")
    setLoading(true)
    getAllImages()
  }, [])
  const [sortedImages, setSortedImages] = useState<SortedImage[]>([])
  interface SortedImage {
    imageUrl: string
    percentageOfRelevance: number
    description: string
  }

  const toggleMenu = (index: number) => {
    setMenuVisible(menuVisible === index ? null : index)
  }

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading the image:", error)
    }
  }

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Separator className="w-1/2 mx-auto mb-6" />

          {/* Animated title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-center"
            style={{
              backgroundImage: "linear-gradient(90deg, #ff0080, #7928ca, #0070f3, #ff0080)",
              backgroundSize: "300% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            animate={textControls}
          >
            Your Masterpiece Gallery
          </motion.h1>

          <motion.p
            className="mt-4 text-muted-foreground text-1xl"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Explore your curated collection of stunning images
          </motion.p>
          <Separator className="w-1/2 mx-auto mt-6" />

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="default"
              size="lg"
              onClick={() => router.push('/gallery')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black relative overflow-hidden group"
            >
              <span className="relative z-10">Your Gallery</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100"
                animate={{
                  x: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/gallery-section')}
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
            >
              Explore Gallery <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <div ref={galleryRef} id="gallery-section" className="scroll-mt-16">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="w-full aspect-[3/2] rounded-lg" />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden rounded-lg shadow-lg group bg-white dark:bg-gray-800"
                >
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Colored overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{
                        opacity: 1,
                      }}
                    />
                  </div>
                  <button
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all z-20"
                    onClick={() => toggleMenu(index)}
                  >
                    &#x22EE; {/* Vertical ellipsis (three dots) */}
                  </button>
                  {menuVisible === index && (
                    <div className="absolute top-12 right-2 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 z-30 min-w-[120px]">
                      {sortedImages
                        .filter((sortedImage) => sortedImage.imageUrl === image)
                        .map((sortedImage, sortedIndex) => (
                          <div key={sortedIndex} className="space-y-2">
                            <a
                              href={sortedImage.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>View image</span>
                            </a>
                            <button
                              onClick={() => downloadImage(sortedImage.imageUrl, `image-${index + 1}.jpg`)}
                              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors w-full text-left"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Gallery
