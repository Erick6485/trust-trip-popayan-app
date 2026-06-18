"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Map,
  Route,
  Star,
  BarChart3,
  Shield,
  Sparkles,
} from "lucide-react"

const navItems = [
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/rutas", label: "Rutas IA", icon: Route, badge: "IA" },
  { href: "/experiencias", label: "Experiencias", icon: Star },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl glass-strong rounded-2xl border border-border shadow-xl shadow-primary/10">
        <div className="flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-8 rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30 flex items-center justify-center transition-transform group-hover:scale-105">
              <Shield className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm leading-none text-foreground tracking-tight">
                TrustTrip
              </span>
              <span className="text-[10px] text-gold font-medium mt-0.5 tracking-wider uppercase">
                Popayán
              </span>
            </div>
          </Link>

          {/* Nav items */}
          <nav className="flex items-center gap-1.5">
            {navItems.map(({ href, label, icon: Icon, badge }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200",
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                  {badge && (
                    <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-1.5 py-0.5 text-[9px] font-bold text-gold uppercase tracking-wide">
                      {badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/actor"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full"
            >
              Soy proveedor
            </Link>
            <Link
              href="/rutas"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="size-3.5" />
              Planificar viaje
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Header (compact) */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b border-border glass-strong flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30 flex items-center justify-center">
            <Shield className="size-3.5" />
          </div>
          <span className="font-heading font-bold text-sm text-foreground tracking-tight">
            TrustTrip Popayán
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/actor"
            className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Proveedores
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 glass-strong border-t border-border flex items-center justify-around px-2 pb-safe">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-colors relative",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("size-5", active && "text-primary")} />
              <span className="text-[10px] font-medium mt-1">{label}</span>
              {badge && (
                <span className="absolute top-1 right-2 inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-1 py-0.2 text-[8px] font-bold text-gold uppercase tracking-wide">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
