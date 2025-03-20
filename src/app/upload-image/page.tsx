import AddImage from "@/components/AddImage";
import { MainNav } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import { Upload, Zap, Shield, Maximize } from "lucide-react"

const UploadImage = () => {
  return (
    // <div className="flex flex-col">
    <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center p-4">
    <div className="w-full max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Upload Your Images</h1>
      <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="border-2 border-dashed border-gray-300 dark:border-white rounded-lg p-8 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-400 dark:hover:bg-gray-800">
            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-white" />
            <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-white">Select Your Images</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">or click to browse</p>
            <p className="mt-1 mb-4 text-xs text-gray-400 dark:text-gray-300">Supports: JPG, PNG, GIF (Max 5MB)</p>
            <AddImage />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 px-8 py-6">
          <h3 className="text-lg font-semibold text-center text-gray-700 dark:text-white mb-4">Why Choose Our Service?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center">
              <Zap className="h-8 w-8 text-blue-500 dark:text-white mb-2" />
              <h4 className="font-medium text-gray-700 dark:text-white">Lightning Fast</h4>
              <p className="text-sm text-gray-500 dark:text-gray-200">Upload and process images in seconds</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-8 w-8 text-green-500 dark:text-white mb-2" />
              <h4 className="font-medium text-gray-700 dark:text-white">Secure Storage</h4>
              <p className="text-sm text-gray-500 dark:text-gray-200">Your images are safe with us</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Maximize className="h-8 w-8 text-purple-500 dark:text-white mb-2" />
              <h4 className="font-medium text-gray-700 dark:text-white">Easy Integration</h4>
              <p className="text-sm text-gray-500 dark:text-gray-200">Use our API to integrate anywhere</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
        By uploading, you agree to our{" "}
        <a href="#" className="text-blue-500 hover:underline dark:text-blue-400">
          Terms of Service
        </a>
      </p>
    </div>
  </div>

      // {/* <main className="flex min-h-screen flex-col items-center justify-between p-24">
      //   <div className="w-full max-w-md pt-11 pb-9 bg-white rounded-lg shadow-md">
        
      //   </div>
      //   </main> */}
      //   {/* </div> */}
  );
};

export default UploadImage;
