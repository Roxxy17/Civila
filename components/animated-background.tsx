"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([])

  useEffect(() => {
    const particleArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      size: Math.random() * 3 + 1, // Random size between 1-4px
    }))
    setParticles(particleArray)
  }, [])

  return (
    <div className="fixed inset-0 animated-bg">
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
