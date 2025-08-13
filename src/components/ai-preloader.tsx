
"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import {
  Brain,
  Sparkles,
  Zap,
  Activity,
  Cpu,
  Code,
  Server,
  Network,
  Database,
  Cloud,
  Wifi,
  Globe,
  Layers,
} from "lucide-react"

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
  const [pulseRings, setPulseRings] = useState<Array<{ id: number; scale: number; opacity: number }>>([])
  const [energyBeams, setEnergyBeams] = useState<Array<{ id: number; angle: number; length: number; opacity: number }>>(
    [],
  )
  const [dataNodes, setDataNodes] = useState<Array<{ id: number; x: number; y: number; size: number; icon: number }>>(
    [],
  )
  const [showSparkEffect, setShowSparkEffect] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)

  const loadingPhrases = [
    "Initializing neural networks",
    "Calibrating AI models",
    "Syncing quantum processors",
    "Optimizing algorithms",
    "Loading intelligence matrix",
    "Connecting neural pathways",
    "Activating deep learning modules",
    "Processing cognitive functions",
    "Enhancing pattern recognition",
    "Bootstrapping machine learning",
    "Analyzing data structures",
    "Integrating AI frameworks",
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
      for (let i = 0; i < 50; i++) {
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

  // Pulse rings effect
  useEffect(() => {
    const createPulseRing = () => {
      const newRing = {
        id: Date.now(),
        scale: 1,
        opacity: 0.8,
      }
      setPulseRings((prev) => [...prev, newRing])
    }

    const pulseInterval = setInterval(() => {
      createPulseRing()
    }, 2000)

    const updateRings = setInterval(() => {
      setPulseRings((prevRings) =>
        prevRings
          .map((ring) => ({
            ...ring,
            scale: ring.scale + 0.2,
            opacity: ring.opacity - 0.05,
          }))
          .filter((ring) => ring.opacity > 0),
      )
    }, 100)

    return () => {
      clearInterval(pulseInterval)
      clearInterval(updateRings)
    }
  }, [])

  // Energy beams
  useEffect(() => {
    const createEnergyBeam = () => {
      const newBeam = {
        id: Date.now(),
        angle: Math.random() * Math.PI * 2,
        length: 100 + Math.random() * 150,
        opacity: 0.7,
      }
      setEnergyBeams((prev) => [...prev.slice(-8), newBeam])
    }

    const beamInterval = setInterval(() => {
      createEnergyBeam()
    }, 800)

    const updateBeams = setInterval(() => {
      setEnergyBeams((prevBeams) =>
        prevBeams
          .map((beam) => ({
            ...beam,
            length: beam.length + 5,
            opacity: beam.opacity - 0.02,
          }))
          .filter((beam) => beam.opacity > 0),
      )
    }, 100)

    return () => {
      clearInterval(beamInterval)
      clearInterval(updateBeams)
    }
  }, [])

  // Data nodes
  useEffect(() => {
    const createDataNode = () => {
      const newNode = {
        id: Date.now(),
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        size: 20 + Math.random() * 20,
        icon: Math.floor(Math.random() * 5),
      }
      setDataNodes((prev) => [...prev.slice(-12), newNode])
    }

    const nodeInterval = setInterval(() => {
      createDataNode()
    }, 1500)

    return () => {
      clearInterval(nodeInterval)
    }
  }, [])

  // Spark effect
  useEffect(() => {
    const sparkInterval = setInterval(() => {
      setShowSparkEffect(true)
      setTimeout(() => setShowSparkEffect(false), 300)
    }, 3000)

    return () => {
      clearInterval(sparkInterval)
    }
  }, [])

  // Rotation effect
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotationAngle((prev) => prev + 1)
    }, 50)

    return () => {
      clearInterval(rotateInterval)
    }
  }, [])

  // Helper function to generate random colors (black and white theme)
  const getRandomColor = (opacity = 1) => {
    const colors = [
      `rgba(255, 255, 255, ${opacity})`,
      `rgba(220, 220, 220, ${opacity})`,
      `rgba(200, 200, 200, ${opacity})`,
      `rgba(180, 180, 180, ${opacity})`,
      `rgba(160, 160, 160, ${opacity})`,
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
        if (onLoadComplete) onLoadComplete()
      }
    }, 16)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [duration, onLoadComplete])

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
  }, [loadingPhrases.length])

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
    const numConnections = 16

    for (let i = 0; i < numConnections; i++) {
      const angle = (i / numConnections) * Math.PI * 2
      const length = 160 + Math.random() * 60

      connections.push(
        <motion.div
          key={`connection-${i}`}
          className="absolute h-px bg-gradient-to-r from-white/80 to-transparent"
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
    const numElements = 8
    const icons = [Code, Server, Network, Activity, Database, Cloud, Wifi, Globe]

    for (let i = 0; i < numElements; i++) {
      const Icon = icons[i]
      const angle = (i / numElements) * Math.PI * 2
      const delay = i * 0.5
      const orbitRadius = 150 + (i % 2) * 40

      elements.push(
        <motion.div
          key={`orbit-${i}`}
          className="absolute"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
          }}
          animate={{
            x: [
              Math.cos(angle) * orbitRadius,
              Math.cos(angle + Math.PI) * orbitRadius,
              Math.cos(angle + Math.PI * 2) * orbitRadius,
            ],
            y: [
              Math.sin(angle) * orbitRadius,
              Math.sin(angle + Math.PI) * orbitRadius,
              Math.sin(angle + Math.PI * 2) * orbitRadius,
            ],
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
          <Icon className="w-5 h-5 text-white" />
        </motion.div>,
      )
    }

    return elements
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black z-50 overflow-hidden perspective-1000"
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

        {/* Pulse rings */}
        {pulseRings.map((ring) => (
          <motion.div
            key={`ring-${ring.id}`}
            className="absolute rounded-full border-2 border-white/30"
            style={{
              width: `${ring.scale * 300}px`,
              height: `${ring.scale * 300}px`,
              opacity: ring.opacity,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Energy beams */}
        {energyBeams.map((beam) => (
          <motion.div
            key={`beam-${beam.id}`}
            className="absolute h-1 bg-gradient-to-r from-white via-gray-300 to-transparent"
            style={{
              width: beam.length,
              left: "50%",
              top: "50%",
              opacity: beam.opacity,
              transformOrigin: "0 0",
              transform: `rotate(${beam.angle}rad) translateY(-0.5px)`,
            }}
          />
        ))}

        {/* Data nodes */}
        {dataNodes.map((node) => {
          const icons = [Database, Cloud, Layers, Cpu, Globe]
          const Icon = icons[node.icon]
          return (
            <motion.div
              key={`node-${node.id}`}
              className="absolute rounded-full bg-white/10 flex items-center justify-center"
              style={{
                width: node.size,
                height: node.size,
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          )
        })}

        {/* Interactive background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent"
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
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
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

        {/* Main brain animation - CENTERED */}
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
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            className="absolute -inset-32 rounded-full bg-white/10 blur-xl"
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

          {/* Spark effect */}
          {showSparkEffect && (
            <motion.div
              className="absolute -inset-16 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 0.3 }}
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
              }}
            />
          )}

          <motion.div
            className="relative bg-zinc-900/80 backdrop-blur-sm p-20 rounded-full border border-white/20 shadow-lg"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              transform: `rotate(${rotationAngle * 0.05}deg)`,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
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

            {/* Animated brain icon with pulse effect */}
            <motion.div animate={brainControls} className="relative">
              <motion.div
                className="absolute inset-0 text-white opacity-70"
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
                <Brain className="w-48 h-48" />
              </motion.div>
              <Brain className="w-48 h-48 text-white relative z-10" />
              {/* CPU icon in the center of the brain */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
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
                <Cpu className="w-16 h-16" />
              </motion.div>
            </motion.div>

            {/* Rotating rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{ borderRightColor: "#ffffff", borderTopColor: "#ffffff" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-2 rounded-full border border-transparent"
              style={{ borderLeftColor: "#ffffff", borderBottomColor: "#ffffff" }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-4 rounded-full border border-dashed border-transparent"
              style={{ borderRightColor: "#e5e5e5", borderBottomColor: "#e5e5e5" }}
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
              <Sparkles className="w-16 h-16 text-white" />
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
              <Zap className="w-16 h-16 text-white" />
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
              <Activity className="w-16 h-16 text-white" />
            </motion.div>

            {/* Additional decorative icons */}
            <motion.div
              className="absolute -top-2 -left-2"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -15, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.7,
              }}
            >
              <Database className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading text and dots */}
        <motion.div
          className="mt-16 text-center z-10 absolute bottom-32"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-2xl font-medium text-white mb-1"
            animate={{
              color: ["#ffffff", "#e5e5e5", "#ffffff"],
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
            className="h-6 text-sm text-gray-300/90 mb-3"
            key={textIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {loadingPhrases[textIndex]}...
          </motion.div>

          <div className="flex justify-center space-x-3 mt-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-white"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  y: [0, -10, 0],
                  boxShadow: [
                    "0 0 0px rgba(255, 255, 255, 0.5)",
                    "0 0 10px rgba(255, 255, 255, 0.8)",
                    "0 0 0px rgba(255, 255, 255, 0.5)",
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
            className="text-gray-200/80 mt-4 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>

        {/* Progress bar container with glow effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-900/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-4 bg-gradient-to-r from-white via-gray-300 to-white"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />

          {/* Progress bar inner glow */}
          <motion.div
            className="absolute bottom-0 left-0 h-4 bg-gradient-to-r from-white/0 via-white/50 to-white/0"
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
          className="absolute bottom-2 h-8 w-8 rounded-full bg-white shadow-lg shadow-white/50"
          style={{
            left: `${progress}%`,
            translateX: "-50%",
            translateY: "-50%",
            filter: "blur(1px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              "0 0 0 0 rgba(255, 255, 255, 0.7)",
              "0 0 15px 5px rgba(255, 255, 255, 0.9)",
              "0 0 0 0 rgba(255, 255, 255, 0.7)",
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
          className="absolute bottom-2 h-6 w-6 rounded-full bg-gray-100"
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

