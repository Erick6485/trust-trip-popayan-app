"use client"

import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, Number(value) || 0))

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-valuetext={`${Math.round(clamped)}%`}
      className={cn("relative h-1 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

export { Progress }
