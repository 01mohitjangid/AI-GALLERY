"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, Zap, Activity, Cpu, Code, Server, Network } from "lucide-react"

interface AIPreloaderProps {
  onLoadComplete?: () => void
  loadingText?: string
  duration?: number
}

export default function AIPreloader({
  onLoadComplete,
  loadingText = "AI Gallery Loading",
  duration = 3000,
}: AIPreloaderProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [progress, setProgress] = useState(0)
  const brainControls = useAnimation()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number; opacity: number; color: string }>
  >([])
  const [isHovering, setIsHovering] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const loadingPhrases = [
    "Initializing neural networks",
    "Calibrating AI models",
    "Syncing quantum processors",
    "Optimizing algorithms",
    "Loading intelligence matrix",
    "Connecting neural pathways",
    "Activating deep learning modules",
    "Processing cognitive functions",
  ]

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })

      // Create a ripple effect when mouse moves
      const newParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        opacity: 0.7,
        color: getRandomColor(0.6),
      }

      // Only add mouse-following particles occasionally to avoid overwhelming
      if (Math.random() > 0.92) {
        setParticles((prev) => [...prev.slice(-40), newParticle])
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      const newParticles = []
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 5 + 1,
          speed: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          color: getRandomColor(0.5),
        })
      }
      setParticles(newParticles)
    }

    createParticles()

    const moveParticles = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Calculate distance from mouse to create attraction effect
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Particles are attracted to mouse when close
          let newX = particle.x
          let newY = particle.y - particle.speed

          if (distance < 200) {
            const attraction = (1 - distance / 200) * 0.5
            newX += dx * attraction * 0.05
            newY += dy * attraction * 0.05
          }

          // Reset particles when they go off screen
          if (newY < 0 || newY > window.innerHeight || newX < 0 || newX > window.innerWidth) {
            return {
              ...particle,
              y: window.innerHeight,
              x: Math.random() * window.innerWidth,
              opacity: Math.random() * 0.6 + 0.2,
              size: Math.random() * 5 + 1,
              color: getRandomColor(0.5),
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )
    }, 30)

    return () => {
      clearInterval(moveParticles)
    }
  }, [mousePosition])

  // Helper function to generate random colors
  const getRandomColor = (opacity = 1) => {
    const colors = [
      `rgba(168, 85, 247, ${opacity})`, // Purple
      `rgba(139, 92, 246, ${opacity})`, // Violet
      `rgba(79, 70, 229, ${opacity})`, // Indigo
      `rgba(59, 130, 246, ${opacity})`, // Blue
      `rgba(236, 72, 153, ${opacity})`, // Pink
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Progress animation
  useEffect(() => {
    const startTime = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(100, (elapsed / duration) * 100)
      setProgress(newProgress)

      if (newProgress >= 100 && intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }, 16)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [duration])

  // Brain pulse animation
  useEffect(() => {
    const sequence = async () => {
      await brainControls.start({
        scale: isHovering ? [1, 1.15, 1] : [1, 1.05, 1],
        rotate: isHovering ? [0, 5, -5, 0] : [0, 0, 0, 0],
        transition: {
          duration: isHovering ? 1.5 : 2,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        },
      })
    }

    sequence()
  }, [brainControls, isHovering])

  // Cycle through loading phrases
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingPhrases.length)
    }, 2000)

    return () => clearInterval(textInterval)
  }, [])

  // Handle completion
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoadComplete) onLoadComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onLoadComplete])

  // Calculate interactive glow position
  const calculateGlowPosition = () => {
    if (typeof window === "undefined") {
      return "50% 50%" // Default position if window is not available
    }
    const x = (mousePosition.x / window.innerWidth) * 100
    const y = (mousePosition.y / window.innerHeight) * 100
    return `${x}% ${y}%`
  }

  // Neural network connection lines
  const generateConnections = () => {
    const connections = []
    const numConnections = 12 // Increased from 8 to 12 for more connections

    for (let i = 0; i < numConnections; i++) {
      const angle = (i / numConnections) * Math.PI * 2
      const length = 140 + Math.random() * 40 // Increased length for larger brain
      const x = Math.cos(angle) * length
      const y = Math.sin(angle) * length

      connections.push(
        <motion.div
          key={`connection-${i}`}
          className="absolute h-px bg-gradient-to-r from-purple-500/80 to-transparent"
          style={{
            width: length,
            left: "50%",
            top: "50%",
            transformOrigin: "0 0",
            transform: `rotate(${angle}rad) translateY(-0.5px)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            width: [length * 0.8, length, length * 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />,
      )
    }

    return connections
  }

  // Generate orbiting elements
  const generateOrbitingElements = () => {
    const elements = []
    const numElements = 4
    const icons = [Code, Server, Network, Activity]

    for (let i = 0; i < numElements; i++) {
      const Icon = icons[i]
      const angle = (i / numElements) * Math.PI * 2
      const delay = i * 0.5

      elements.push(
        <motion.div
          key={`orbit-${i}`}
          className="absolute"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "rgba(168, 85, 247, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 10px rgba(168, 85, 247, 0.3)",
          }}
          animate={{
            x: [Math.cos(angle) * 120, Math.cos(angle + Math.PI * 2) * 120],
            y: [Math.sin(angle) * 120, Math.sin(angle + Math.PI * 2) * 120],
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay,
          }}
        >
          <Icon className="w-5 h-5 text-purple-300" />
        </motion.div>,
      )
    }

    return elements
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 overflow-hidden perspective-1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: particle.opacity,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            animate={{
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Interactive background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent"
          style={{
            backgroundPosition: calculateGlowPosition(),
            backgroundSize: "100% 100%",
          }}
          animate={{
            backgroundSize: ["120% 120%", "150% 150%", "120% 120%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Animated grid background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Neural network connections */}
        <div className="absolute inset-0 flex items-center justify-center">{generateConnections()}</div>

        {/* Orbiting elements */}
        <div className="absolute inset-0 flex items-center justify-center">{generateOrbitingElements()}</div>

        {/* Main brain animation */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotateX: [0, 5, -5, 0],
            rotateY: [0, -5, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute -inset-24 rounded-full bg-purple-500/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative bg-slate-800/80 backdrop-blur-sm p-16 rounded-full border border-purple-500/30 shadow-lg"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0) 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Animated brain icon with pulse effect - INCREASED SIZE */}
            <motion.div animate={brainControls} className="relative">
              <motion.div
                className="absolute inset-0 text-purple-400 opacity-70"
                animate={{
                  scale: [1.05, 1.15, 1.05],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <Brain className="w-40 h-40" /> {/* Increased from 24 to 32 */}
              </motion.div>
              <Brain className="w-40 h-40 text-purple-400 relative z-10" /> {/* Increased from 24 to 32 */}
              {/* CPU icon in the center of the brain */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-300"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Cpu className="w-12 h-12" /> {/* Increased from 8 to 10 */}
              </motion.div>
            </motion.div>

            {/* Rotating rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{ borderRightColor: "#a855f7", borderTopColor: "#a855f7" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-2 rounded-full border border-transparent"
              style={{ borderLeftColor: "#a855f7", borderBottomColor: "#a855f7" }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-4 rounded-full border border-dashed border-transparent"
              style={{ borderRightColor: "#d8b4fe", borderBottomColor: "#d8b4fe" }}
              animate={{ rotate: 180 }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Decorative icons around the brain */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Sparkles className="w-12 h-12 text-purple-300" /> {/* Increased from 8 to 10 */}
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -15, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Zap className="w-12 h-12 text-purple-300" /> {/* Increased from 8 to 10 */}
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -right-2"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <Activity className="w-12 h-12 text-purple-300" /> {/* Increased from 8 to 10 */}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading text and dots */}
        <motion.div
          className="mt-16 text-center z-10" /* Increased margin-top from 12 to 16 */
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-2xl font-medium text-white mb-1 mt-14"
            animate={{
              color: ["#f3e8ff", "#d8b4fe", "#f3e8ff"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {loadingText}
          </motion.h2>

          {/* Animated typing text effect */}
          <motion.div
            className="h-6 text-sm text-purple-300/90 mb-3"
            key={textIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {loadingPhrases[textIndex]}...
          </motion.div>

          <div className="flex justify-center space-x-3 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-purple-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  y: [0, -10, 0],
                  boxShadow: [
                    "0 0 0px rgba(168, 85, 247, 0.5)",
                    "0 0 10px rgba(168, 85, 247, 0.8)",
                    "0 0 0px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Progress percentage */}
          <motion.p
            className="text-purple-200/80 mt-4 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>

        {/* Progress bar container with glow effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-3 bg-slate-800/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-3 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />

          {/* Progress bar inner glow */}
          <motion.div
            className="absolute bottom-0 left-0 h-3 bg-gradient-to-r from-purple-500/0 via-purple-300/50 to-purple-500/0"
            style={{ width: `${progress}%` }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Pulsing circle at progress bar end */}
        <motion.div
          className="absolute bottom-1.5 h-6 w-6 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"
          style={{
            left: `${progress}%`,
            translateX: "-50%",
            translateY: "-50%",
            filter: "blur(1px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              "0 0 0 0 rgba(168, 85, 247, 0.7)",
              "0 0 15px 5px rgba(168, 85, 247, 0.9)",
              "0 0 0 0 rgba(168, 85, 247, 0.7)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Sharper circle on top of the blurred one */}
        <motion.div
          className="absolute bottom-1.5 h-4 w-4 rounded-full bg-purple-300"
          style={{
            left: `${progress}%`,
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 1,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

