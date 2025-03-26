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
        // Increased from 30 to 50
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

  // NEW ANIMATION 1: Pulse rings effect
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

  // NEW ANIMATION 2: Energy beams
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

  // NEW ANIMATION 3: Data nodes
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

  // NEW ANIMATION 4: Spark effect
  useEffect(() => {
    const sparkInterval = setInterval(() => {
      setShowSparkEffect(true)
      setTimeout(() => setShowSparkEffect(false), 300)
    }, 3000)

    return () => {
      clearInterval(sparkInterval)
    }
  }, [])

  // NEW ANIMATION 5: Rotation effect
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotationAngle((prev) => prev + 1)
    }, 50)

    return () => {
      clearInterval(rotateInterval)
    }
  }, [])

  // Helper function to generate random colors
  const getRandomColor = (opacity = 1) => {
    const colors = [
      `rgba(168, 85, 247, ${opacity})`, // Purple
      `rgba(139, 92, 246, ${opacity})`, // Violet
      `rgba(79, 70, 229, ${opacity})`, // Indigo
      `rgba(59, 130, 246, ${opacity})`, // Blue
      `rgba(236, 72, 153, ${opacity})`, // Pink
      `rgba(14, 165, 233, ${opacity})`, // Sky blue (new)
      `rgba(20, 184, 166, ${opacity})`, // Teal (new)
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
    const numConnections = 16 // Increased from 12 to 16

    for (let i = 0; i < numConnections; i++) {
      const angle = (i / numConnections) * Math.PI * 2
      const length = 160 + Math.random() * 60 // Increased length for larger brain

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
    const numElements = 8 // Increased from 4 to 8
    const icons = [Code, Server, Network, Activity, Database, Cloud, Wifi, Globe]

    for (let i = 0; i < numElements; i++) {
      const Icon = icons[i]
      const angle = (i / numElements) * Math.PI * 2
      const delay = i * 0.5
      const orbitRadius = 150 + (i % 2) * 40 // Varied orbit radius

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

        {/* NEW ANIMATION 1: Pulse rings */}
        {pulseRings.map((ring) => (
          <motion.div
            key={`ring-${ring.id}`}
            className="absolute rounded-full border-2 border-purple-500/50"
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

        {/* NEW ANIMATION 2: Energy beams */}
        {energyBeams.map((beam) => (
          <motion.div
            key={`beam-${beam.id}`}
            className="absolute h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-transparent"
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

        {/* NEW ANIMATION 3: Data nodes */}
        {dataNodes.map((node) => {
          const icons = [Database, Cloud, Layers, Cpu, Globe]
          const Icon = icons[node.icon]
          return (
            <motion.div
              key={`node-${node.id}`}
              className="absolute rounded-full bg-purple-900/30 flex items-center justify-center"
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
              <Icon className="w-6 h-6 text-purple-300" />
            </motion.div>
          )
        })}

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
            className="absolute -inset-32 rounded-full bg-purple-500/20 blur-xl"
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

          {/* NEW ANIMATION 4: Spark effect */}
          {showSparkEffect && (
            <motion.div
              className="absolute -inset-16 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 0.3 }}
              style={{
                background: "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(168,85,247,0) 70%)",
              }}
            />
          )}

          <motion.div
            className="relative bg-slate-800/80 backdrop-blur-sm p-20 rounded-full border border-purple-500/30 shadow-lg"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              transform: `rotate(${rotationAngle * 0.05}deg)`, // NEW ANIMATION 5: Subtle rotation
            }}
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
                <Brain className="w-48 h-48" /> {/* Increased from 40 to 48 */}
              </motion.div>
              <Brain className="w-48 h-48 text-purple-400 relative z-10" /> {/* Increased from 40 to 48 */}
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
                <Cpu className="w-16 h-16" /> {/* Increased from 12 to 16 */}
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
              <Sparkles className="w-16 h-16 text-purple-300" /> {/* Increased from 12 to 16 */}
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
              <Zap className="w-16 h-16 text-purple-300" /> {/* Increased from 12 to 16 */}
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
              <Activity className="w-16 h-16 text-purple-300" /> {/* Increased from 12 to 16 */}
            </motion.div>

            {/* NEW: Additional decorative icons */}
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
              <Database className="w-16 h-16 text-purple-300" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading text and dots */}
        <motion.div
          className="mt-16 text-center z-10 absolute bottom-32" /* Positioned at bottom for better layout */
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-2xl font-medium text-white mb-1"
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
            {[0, 1, 2, 3, 4].map(
              (
                i, // Added 2 more dots
              ) => (
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
                      "0 0 0px rgba(168, 85, 247, 0.85,247,0.5)",
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
              ),
            )}
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
          className="absolute bottom-0 left-0 right-0 h-4 bg-slate-800/50 backdrop-blur-sm" /* Increased height from 3 to 4 */
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-4 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" /* Increased height from 3 to 4 */
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />

          {/* Progress bar inner glow */}
          <motion.div
            className="absolute bottom-0 left-0 h-4 bg-gradient-to-r from-purple-500/0 via-purple-300/50 to-purple-500/0" /* Increased height from 3 to 4 */
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
          className="absolute bottom-2 h-8 w-8 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50" /* Increased size from 6x6 to 8x8 */
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
          className="absolute bottom-2 h-6 w-6 rounded-full bg-purple-300" /* Increased size from 4x4 to 6x6 */
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

