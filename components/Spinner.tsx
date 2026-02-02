import React from "react"

interface SpinnerProps {
  size?: number
  color?: string
}

export default function Spinner({ size = 24, color = "#555" }: SpinnerProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    border: `${Math.round(size / 12)}px solid ${color}`,
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  }

  return (
    <div style={style} role="status" aria-label="Loading"></div>
  )
}
