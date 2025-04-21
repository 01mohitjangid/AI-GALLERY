"use client"

import AddImage from "@/components/AddImage"
import { useEffect } from "react"
import { Upload, Zap, Shield, Maximize } from "lucide-react"

const UploadImage = () => {
  // Animation for the title when component mounts
  useEffect(() => {
    // Animate feature cards sequentially
    const cards = document.querySelectorAll(".feature-card")
    cards.forEach((card, index) => {
      setTimeout(
        () => {
          card.classList.add("animate-in")
        },
        1500 + index * 150,
      )
    })
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center p-4">
      {/* Background pattern with lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-12 gap-2 transform -skew-y-12">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="col-span-1 h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent opacity-10"
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12 gap-2 transform skew-x-12">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="row-span-1 w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-10"
            ></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Animated title with letter-by-letter reveal */}
        <div className="relative mb-12 overflow-hidden">
          <h1
            id="animated-title"
            className="text-6xl font-extrabold text-center bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600"
          >
            {Array.from("UPLOAD THE IMAGE").map((letter, index) => (
              <span
                key={index}
                className="inline-block transform translate-y-8 letter-animation mb-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "0.8s",
                  animationFillMode: "forwards",
                  animationTimingFunction: "cubic-bezier(0.11, 0, 0.5, 0)",
                  animationName: "revealLetter",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 transform scale-x-0 origin-left animate-line-reveal"></div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700 transform transition-all duration-500 hover:scale-[1.01]">
          <div className="p-8">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-400 dark:hover:bg-gray-700 group">
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-300 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Select Your Images
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">or click to browse</p>
              <p className="mt-1 mb-4 text-xs text-gray-400 dark:text-gray-400">Supports: JPG, PNG, GIF (Max 5MB)</p>
              <div className="transition-all duration-300 transform group-hover:scale-105">
                <AddImage />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 px-8 py-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-center text-gray-700 dark:text-white mb-6 relative">
              Why Choose Our Service?
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2"></span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="feature-card flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md opacity-0 transform translate-y-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-3">
                  <Zap className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                </div>
                <h4 className="font-medium text-gray-700 dark:text-white">Lightning Fast</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Upload and process images in seconds</p>
              </div>

              <div className="feature-card flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md opacity-0 transform translate-y-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mb-3">
                  <Shield className="h-8 w-8 text-green-500 dark:text-green-400" />
                </div>
                <h4 className="font-medium text-gray-700 dark:text-white">Secure Storage</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Your images are safe with us</p>
              </div>

              <div className="feature-card flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md opacity-0 transform translate-y-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mb-3">
                  <Maximize className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                </div>
                <h4 className="font-medium text-gray-700 dark:text-white">Easy Integration</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Use our API to integrate anywhere</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          By uploading, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-300">
            Terms of Service
          </a>
        </p>
      </div>

      {/* Add global styles */}
      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }

        .letter-animation {
          opacity: 0;
          transform: translateY(8px);
          animation-name: revealLetter;
        }

        @keyframes revealLetter {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineReveal {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .animate-line-reveal {
          animation: lineReveal 1.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
          animation-delay: 1s;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(138, 43, 226, 0.5), 0 0 20px rgba(138, 43, 226, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(138, 43, 226, 0.8), 0 0 30px rgba(138, 43, 226, 0.5), 0 0 40px rgba(138, 43, 226, 0.3);
          }
        }

        #animated-title {
          animation: glow 3s ease-in-out infinite;
          animation-delay: 2.5s;
        }
      `}</style>
    </div>
  )
}

export default UploadImage
