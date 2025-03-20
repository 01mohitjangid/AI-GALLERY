"use client";
import { MainNav } from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState<number | null>(null);

  const getAllImages = async () => {
    const { data } = await axios.get("/api/getImages");
    console.log("imagedata", data);

    let imagesUrl = [];
    let sortedImagesData = [];

    if (data) {
      let files = data.files;
      for (let i = 0; i < files.length; i++) {
        let url = "https://utfs.io/f/";
        url += files[i]["key"];
        imagesUrl.push(url);

        sortedImagesData.push({
          imageUrl: url,
          percentageOfRelevance: files[i]["relevance"] || 0,
          description: files[i]["description"] || "",
        });
      }
    }
    setImages(imagesUrl);
    setSortedImages(sortedImagesData);
    setLoading(false);
  };

  useEffect(() => {
    console.log("Fetching images...");
    setLoading(true);
    getAllImages();
  }, []);
  const [sortedImages, setSortedImages] = useState<SortedImage[]>([]);
  interface SortedImage {
    imageUrl: string;
    percentageOfRelevance: number;
    description: string;
  }

  const toggleMenu = (index: number) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Separator className="w-1/2 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Masterpiece Gallery
          </h1>
          <p className="mt-4 text-muted-foreground text-1xl">
            Explore your curated collection of stunning images
          </p>
          <Separator className="w-1/2 mx-auto mt-6" />
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-full aspect-[3/2] rounded-lg"
              />
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
                className="relative overflow-hidden rounded-lg shadow-lg group"
              >
                <div className="aspect-[3/2]">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <button
                  className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
                  onClick={() => toggleMenu(index)}
                >
                  &#x22EE; {/* Vertical ellipsis (three dots) */}
                </button>
                {menuVisible === index && (
                  <div className="absolute top-8 right-2 bg-white shadow-lg rounded-md p-2">
                    {sortedImages
                      .filter((sortedImage) => sortedImage.imageUrl === image)
                      .map((sortedImage, sortedIndex) => (
                        <div key={sortedIndex}>
                          <a
                            href={sortedImage.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-black hover:text-primary"
                          >
                            View image
                          </a>
                          <button
                            onClick={() => downloadImage(sortedImage.imageUrl, `image-${index + 1}.jpg`)}
                            className="block text-black hover:text-primary mt-2"
                          >
                            Download 
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
    </>
  );
};

export default Gallery;
