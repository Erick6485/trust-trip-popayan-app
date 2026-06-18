"use client"

import { cn } from "@/lib/utils"

interface TrustIndexProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function TrustIndex({ score, size = "md", showLabel = true, className }: TrustIndexProps) {
  const radius = size === "sm" ? 20 : size === "lg" ? 40 : 28
  const stroke = size === "sm" ? 3 : size === "lg" ? 5 : 4
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  // Adapt colors to Popayán Conecta theme hierarchy
  const color =
    score >= 90
      ? "oklch(0.82 0.14 85)" // Gold (Premium)
      : score >= 75
        ? "oklch(0.62 0.22 295)" // Primary Purple
        : score >= 60
          ? "oklch(0.5 0.2 290)" // Accent Purple (Secondary)
          : "oklch(0.62 0.22 18)" // Destructive Red

  const svgSize = (radius + stroke + 2) * 2

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-border/40"
          />
          {/* Score ring */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <span
          className={cn(
            "absolute font-bold tabular-nums tracking-tight",
            size === "sm" ? "text-xs" : size === "lg" ? "text-xl" : "text-sm"
          )}
          style={{ color }}
        >
          {score}
        </span>
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold leading-none tracking-tight",
              size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
            )}
            style={{ color }}
          >
            {score >= 90
              ? "Excelente"
              : score >= 75
                ? "Muy Bueno"
                : score >= 60
                  ? "Bueno"
                  : "Regular"}
          </span>
          <span className="text-[10px] uppercase font-bold text-muted-foreground mt-0.5 tracking-wider">Confianza</span>
        </div>
      )}
    </div>
  )
}
