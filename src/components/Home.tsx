"use client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import DwnButton from "../components/ui/downloadbutton";
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
// import { useDownloader } from "use-downloader";

const Home = () => {
  const [userQuery, setUserQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [imageDescription, setImageDescription] = useState("");
  const [imagePercentage, setImagePercentage] = useState(0);

  interface SortedImage {
    imageUrl: string;
    percentageOfRelevance: number;
    description: string;
  }

  const dummyImage = {
    imageUrl:
      "https://i.pinimg.com/originals/2c/16/fb/2c16fbb469fd0b5822cf7ca2577cc1c6.png",
    percentageOfRelevance: 100,
    description:
      "tesing Looking for your nice image, tesing Looking for your nice image, tesing Looking for your nice image",
  };
  const [sortedImages, setSortedImages] = useState<SortedImage[]>([]);

  const [creativeTextIndex, setCreativeTextIndex] = useState(0);
  const creativeTexts = [
    "Looking for your nice image...",
    "You are having some cool image...",
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
    setImagePercentage(match ? parseInt(match[1], 10) : 0);
    return match ? parseInt(match[1], 10) : 0;
  };

  const getAllImages = async () => {
    const { data } = await axios.get("/api/getImages");
    console.log(data);

    let imagesUrl = [];

    if (data) {
      let files = data.files;
      for (let i = 0; i < files.length; i++) {
        let url = "https://utfs.io/f/";
        url += files[i]["key"];
        imagesUrl.push(url);
      }
    }

    setImages(imagesUrl);
    return imagesUrl;
  };
  // const photoUrl = "/path_to_your_photo.jpg";
  // const photoFilename = "downloaded_photo.jpg";
  // const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();

  const handleSubmit = async () => {
    setLoading(true);
    console.log("submitting");
    setSortedImages([]);
    const images = await getAllImages();

    for (const image of images) {
      console.log(`Processing image: ${image}`);
      // You can add more logic here if needed
      const payLoad = {
        image_url: image,
        user_query: userQuery,
      };
      console.log("payLoad", payLoad);

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
    }

    setLoading(false);
  };
  const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg"; // You can customize the filename
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
      <div className="flex flex-col gap-8 w-3/4">
        <h1 className="text-4xl font-bold text-center">
          Prompt Based AI Image Gallery
        </h1>
        <Separator className="w-full" />
        <div className="container">
          <div className="flex gap-[1em]" style={{ flexDirection: "column" }}>
            <Input
              value={userQuery}
              type="text"
              onChange={(e: any) => setUserQuery(e.target.value)}
              placeholder="Which picture you want to search.... "
            />
            <Button
              type="submit"
              className="w-fit-content m-auto"
              onClick={() => handleSubmit()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {creativeTexts[creativeTextIndex]}
                </>
              ) : (
                "Start magic"
              )}
            </Button>
          </div>
        </div>
        <div className="container">
          {!loading && sortedImages.length > 0 && (
            <div className="container">
              <Table>
                <TableCaption>Your curated image search results.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">
                      Percentage of relevance
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedImages
                    .sort(
                      (a, b) =>
                        b.percentageOfRelevance - a.percentageOfRelevance
                    )
                    .map((image) => (
                      <TableRow key={image.imageUrl}>
                        <TableCell className="font-medium">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Image
                                  height={100}
                                  width={200}
                                  src={image.imageUrl}
                                  alt=""
                                  className="object-cover"
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p style={{ width: "200px" }}>
                                  {image.description}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{image.description}</p>
                            <a
                              href={image.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 visited:text-blue-600"
                            >
                              View image
                            </a>
                            <button
                              onClick={() => downloadImage(image.imageUrl)}
                            >
                              Download
                            </button>
                          </div>
                          <DwnButton />
                        </TableCell>
                        <TableCell className="text-right">
                          {image.percentageOfRelevance}%
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default Home;
