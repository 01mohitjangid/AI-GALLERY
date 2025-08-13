"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  Download,
  ImageIcon,
  Loader2,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, useAnimation, useInView } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import ImageGenerator from "@/components/image-generator"

const Home = () => {
  const [userQuery, setUserQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState("table");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const heroControls = useAnimation();

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start("visible");
    }
  }, [isHeroInView, heroControls]);

  const suggestions = [
    "Find stunning car images",
    "Explore captivating movie posters",
    "Discover breathtaking nature photography",
    "Browse adorable animal pictures",
    "View mesmerizing landscape shots",
    "Search for cutting-edge technology visuals",
    "Check out exciting sports moments",
    "Uncover beautiful works of art",
    "Look at delicious food photography",
    "Admire iconic architectural designs",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setUserQuery(query);

    if (query.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserQuery(suggestion);
    setShowSuggestions(false);
  };

  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [imageDescription, setImageDescription] = useState("");
  const [imagePercentage, setImagePercentage] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);

  interface SortedImage {
    imageUrl: string;
    percentageOfRelevance: number;
    description: string;
  }

  const [sortedImages, setSortedImages] = useState<SortedImage[]>([]);
  const [creativeTextIndex, setCreativeTextIndex] = useState(0);

  const creativeTexts = [
    "Looking for your perfect image...",
    "Discovering visual treasures...",
    "Fetching that perfect picture...",
    "Just a moment, magic in progress...",
    "Your image is worth the wait...",
    "Hang tight, we're searching...",
    "Almost there, finding your image...",
    "Patience, your visual treat is coming...",
    "Working our magic on your image...",
    "Stay tuned, your image is on its way...",
  ];

  const parseString = (content: string) => {
    const match = content.match(/(\d+)%/);
    setImagePercentage(match ? Number.parseInt(match[1], 10) : 0);
    return match ? Number.parseInt(match[1], 10) : 0;
  };

  const getAllImages = async () => {
    const { data } = await axios.get("/api/getImages");
    console.log(data);

    const imagesUrl = [];

    if (data) {
      const files = data.files;
      for (let i = 0; i < files.length; i++) {
        let url = "https://utfs.io/f/";
        url += files[i]["key"];
        imagesUrl.push(url);
      }
    }

    setImages(imagesUrl);
    return imagesUrl;
  };

  const handleSubmit = async () => {
    if (!userQuery.trim()) return;

    setLoading(true);
    setSearchPerformed(true);
    setLoadingProgress(0);
    console.log("submitting");
    setSortedImages([]);
    const images = await getAllImages();

    // Simulate progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 5;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 300);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      console.log(`Processing image: ${image}`);
      const payLoad = {
        image_url: image,
        user_query: userQuery,
      };
      console.log("payLoad", payLoad);

      try {
        const { data } = await axios.post(
          "/api/generatePercentage",
          JSON.stringify(payLoad)
        );

        console.log("data", data);
        const response = data.response.choices[0].message.content;
        const percentageOfRelevance = parseString(response);
        setImageDescription(response);
        const imageResult: SortedImage = {
          imageUrl: image,
          percentageOfRelevance: percentageOfRelevance,
          description: response,
        };
        setSortedImages((prevImages) => [...prevImages, imageResult]);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }

    clearInterval(progressInterval);
    setLoadingProgress(100);
    setTimeout(() => setLoading(false), 500); // Small delay to show 100% progress
  };

  const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (loading) {
      interval = setInterval(() => {
        setCreativeTextIndex(
          (prevIndex) => (prevIndex + 1) % creativeTexts.length
        );
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading, creativeTexts.length]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-300/20 dark:bg-purple-700/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[10%] w-72 h-72 bg-pink-300/20 dark:bg-pink-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[20%] w-80 h-80 bg-blue-300/20 dark:bg-blue-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroControls}
          // variants={heroVariants}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600/20 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-full shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          </motion.div>
          <motion.h1
            // variants={textVariants}
            className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-9"
          >
            AI IMAGE GALLERY
          </motion.h1>
          {/* <ImageGenerator /> */}

          <motion.p
            // variants={textVariants}
            className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto mb-8"
          >
            Discover the perfect images with our AI-powered search. Simply describe what you&apos;re looking for and let our magic find it.
          </motion.p>

          <motion.div
            // variants={textVariants}
            className="flex justify-center space-x-4 mb-8"
          >
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm"
            >
              <ImageIcon className="w-4 h-4 mr-2" /> Smart Image Search
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" /> AI-Powered
            </Badge>
            <Link
              href="/upload-image"
              className={cn(
                "transition-colors hover:text-foreground/80"
                // pathname?.startsWith("/upload-image")
                //   ? "text-foreground"
                //   : "text-foreground/60"
              )}
            >
              Upload image
            </Link>
          </motion.div>
        </motion.div>

        <Card className="mb-12 shadow-xl border-0 overflow-visible bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <motion.div
              className="relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all duration-300">
                <Search className="ml-3 h-5 w-5 text-gray-400" />
                <Input
                  value={userQuery}
                  type="text"
                  onChange={handleInputChange}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (userQuery.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  placeholder="What kind of images are you looking for?"
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-6 text-lg"
                />
                {userQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setUserQuery("");
                      setShowSuggestions(false);
                    }}
                    className="mr-1"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </Button>
                )}
              </div>

              <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <ul className="py-2 max-h-60 overflow-auto">
                      {filteredSuggestions.map((suggestion, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSuggestionClick(suggestion);
                          }}
                          className="px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer flex items-center gap-2 transition-all duration-300"
                          whileHover={{
                            backgroundColor: "rgba(168, 85, 247, 0.1)",
                            x: 5,
                            transition: { duration: 0.2 },
                          }}
                        >
                          <Search className="h-4 w-4 text-purple-500" />
                          <span>{suggestion}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="mt-6 flex justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={loading || !userQuery.trim()}
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                  initial={false}
                  animate={{ x: loading ? "100%" : "-100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: loading ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "loop",
                  }}
                />

                {loading ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{creativeTexts[creativeTextIndex]}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 relative z-10">
                    <Sparkles className="h-5 w-5" />
                    <span>Search Images</span>
                  </div>
                )}
              </Button>
            </motion.div>

            {loading && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center text-gray-600 dark:text-gray-300 mb-3">
                  {creativeTexts[creativeTextIndex]}
                </p>
                <Progress value={loadingProgress} className="h-2" />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Analyzing images</span>
                  <span>{Math.round(loadingProgress)}%</span>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {!loading && sortedImages.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Search Results
              </h2>
              <Badge variant="outline" className="px-3 py-1">
                {sortedImages.length} images found
              </Badge>
            </motion.div>

            <motion.div >
              <Tabs
                defaultValue="table"
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-6"
              >
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                  <TabsTrigger
                    value="table"
                    className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30"
                  >
                    Table View
                  </TabsTrigger>
                  <TabsTrigger
                    value="grid"
                    className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30"
                  >
                    Grid View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === "table" ? (
                <motion.div
                  key="table"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <Table>
                      <TableCaption>
                        Results for &ldquo;{userQuery}&rdquo; sorted by relevance
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Image</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right w-[180px]">
                            Relevance
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedImages
                          .sort(
                            (a, b) =>
                              b.percentageOfRelevance - a.percentageOfRelevance
                          )
                          .map((image, index) => (
                            <motion.tr
                              key={image.imageUrl}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.4 }}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <TableCell className="font-medium p-4">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <motion.div
                                        className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() =>
                                          setSelectedImage(image.imageUrl)
                                        }
                                      >
                                        <Image
                                          height={150}
                                          width={200}
                                          src={
                                            image.imageUrl || "/placeholder.svg"
                                          }
                                          alt={`Image result ${index + 1}`}
                                          className="object-cover w-full h-[120px] group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                          <Button
                                            size="icon"
                                            variant="ghost"
                                            className="bg-white/80 hover:bg-white"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              downloadImage(image.imageUrl);
                                            }}
                                          >
                                            <Download className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="right"
                                      className="max-w-md p-0 overflow-hidden rounded-lg"
                                    >
                                      <div className="p-2">
                                        <p className="text-sm">
                                          {image.description}
                                        </p>
                                      </div>
                                      <div className="p-2 bg-gray-100 dark:bg-gray-800">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                          Click to view full image
                                        </p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                              <TableCell className="align-top">
                                <div className="space-y-2">
                                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                                    {image.description}
                                  </p>
                                  <div className="flex gap-2">
                                    <motion.a
                                      href={image.imageUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      View full image
                                    </motion.a>
                                    <Separator
                                      orientation="vertical"
                                      className="h-5"
                                    />
                                    {/* <motion.button
                                      onClick={() =>
                                        downloadImage(image.imageUrl)
                                      }
                                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium transition-colors flex items-center gap-1"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <Download className="h-3 w-3" />
                                      Download
                                    </motion.button> */}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-end gap-2">
                                    <span className="font-medium text-lg">
                                      {image.percentageOfRelevance}%
                                    </span>
                                  </div>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                      duration: 0.8,
                                      delay: index * 0.1,
                                    }}
                                  >
                                    <Progress
                                      value={image.percentageOfRelevance}
                                      className="h-2"
                                      indicatorClassName={`${
                                        image.percentageOfRelevance > 80
                                          ? "bg-green-500"
                                          : image.percentageOfRelevance > 50
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                      }`}
                                    />
                                  </motion.div>
                                  <Badge
                                    variant={
                                      image.percentageOfRelevance > 80
                                        ? "default"
                                        : image.percentageOfRelevance > 50
                                        ? "secondary"
                                        : "destructive"
                                    }
                                    className="ml-auto"
                                  >
                                    {image.percentageOfRelevance > 80
                                      ? "High match"
                                      : image.percentageOfRelevance > 50
                                      ? "Moderate match"
                                      : "Low match"}
                                  </Badge>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                      </TableBody>
                    </Table>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {sortedImages
                    .sort(
                      (a, b) =>
                        b.percentageOfRelevance - a.percentageOfRelevance
                    )
                    .map((image, index) => (
                      <motion.div
                        key={image.imageUrl}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="group"
                        onMouseEnter={() => setHoveredImage(image.imageUrl)}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <Card className="overflow-hidden h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
                          <div className="relative aspect-video">
                            <Image
                              src={image.imageUrl || "/placeholder.svg"}
                              alt={`Image result ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-3 right-3 flex gap-2">
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                                  onClick={() =>
                                    setSelectedImage(image.imageUrl)
                                  }
                                >
                                  <Search className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                                  onClick={() => downloadImage(image.imageUrl)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="absolute bottom-3 left-3">
                                <Badge
                                  variant={
                                    image.percentageOfRelevance > 80
                                      ? "default"
                                      : image.percentageOfRelevance > 50
                                      ? "secondary"
                                      : "destructive"
                                  }
                                  className="ml-auto"
                                >
                                  {image.percentageOfRelevance > 80
                                    ? "High match"
                                    : image.percentageOfRelevance > 50
                                    ? "Moderate match"
                                    : "Low match"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium">
                                  Image Result {index + 1}
                                </h3>
                                <Badge variant="outline">
                                  {image.percentageOfRelevance}%
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {image.description}
                              </p>
                              <Progress
                                value={image.percentageOfRelevance}
                                className="h-1.5"
                                indicatorClassName={`${
                                  image.percentageOfRelevance > 80
                                    ? "bg-green-500"
                                    : image.percentageOfRelevance > 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && searchPerformed && sortedImages.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No images found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try a different search query or check back later.
            </p>
          </motion.div>
        )}

        {/* Image Preview Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-4xl max-h-[80vh] overflow-hidden rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Preview"
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh]"
                />
                <Button
                  className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  size="icon"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button
                  className="absolute bottom-4 right-4 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => downloadImage(selectedImage)}
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Home;
