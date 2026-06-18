"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MapPin, Sparkles, ChevronRight, Search } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-20 city-aurora">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold animate-float-slow">
                <Sparkles className="size-3" />
                Impulsado por Inteligencia Artificial
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance text-foreground">
                Descubre Popayán a través de{" "}
                <span className="text-primary drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">experiencias reales</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg text-pretty">
                Planifica tu viaje con inteligencia artificial, explora experiencias verificadas y
                encuentra los lugares con mayor índice de confianza turística.
              </p>
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-2 glass rounded-2xl p-2 shadow-lg shadow-primary/5 max-w-lg">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Busca experiencias, lugares, eventos..."
                  className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Link
                href="/mapa"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-transform hover:scale-[1.02]"
              >
                <MapPin className="size-3.5" />
                Explorar
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/rutas"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="size-4" />
                Planificar mi viaje
              </Link>
              <Link
                href="/experiencias"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/70 hover:scale-[1.02] transition-transform"
              >
                Explorar experiencias
                <ChevronRight className="size-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-2">
              {[
                { value: "2.4K+", label: "Experiencias" },
                { value: "94", label: "Confianza Ciudad" },
                { value: "180+", label: "Aliados turísticos" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground tracking-tight">{s.value}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 aspect-[4/3] group border border-border">
              <Image
                src="/images/popayan-hero.png"
                alt="Popayán, La Ciudad Blanca de Colombia"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70" />
              
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                <div className="glass rounded-2xl p-3 flex items-center gap-3 shadow-lg flex-1">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Popayán, Colombia</p>
                    <p className="text-xs text-muted-foreground">La Ciudad Blanca</p>
                  </div>
                </div>
                <div className="glass rounded-2xl p-3 flex items-center justify-center shadow-lg">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-gold">94</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Confianza</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 hidden lg:block animate-float-slow">
              <div className="glass rounded-2xl p-3.5 shadow-lg border border-border">
                <div className="flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Ruta IA generada</p>
                    <p className="text-[11px] text-muted-foreground">3 días perfectos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
