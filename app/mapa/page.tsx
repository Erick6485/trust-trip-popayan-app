"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { TrustIndex } from "@/components/trust-index"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MapPin,
  X,
  Clock,
  Users,
  Plus,
  UtensilsCrossed,
  Landmark,
  Church,
  Palette,
  TreePine,
  Calendar,
  CheckCircle2,
  Route,
  Star,
  TrendingUp,
  Shield,
  ChevronRight,
  Compass,
  Heart,
  Camera,
  Bed,
  Mountain,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ── Data ─────────────────────────────────────────────────── */

const categories = [
  { id: "all",       label: "Todos",      icon: Compass,        color: "oklch(0.65 0.2 265)"  },
  { id: "gastronomy",label: "Gastronomía",icon: UtensilsCrossed, color: "oklch(0.72 0.18 55)"  },
  { id: "religious", label: "Religioso",  icon: Church,          color: "oklch(0.75 0.14 310)" },
  { id: "nature",    label: "Naturaleza", icon: TreePine,        color: "oklch(0.65 0.17 150)" },
  { id: "crafts",    label: "Artesanías", icon: Palette,         color: "oklch(0.65 0.22 295)" },
  { id: "culture",   label: "Cultura",    icon: Landmark,        color: "oklch(0.65 0.2 265)"  },
  { id: "lodging",   label: "Hospedaje",  icon: Bed,             color: "oklch(0.68 0.16 230)" },
  { id: "events",    label: "Eventos",    icon: Calendar,        color: "oklch(0.65 0.22 18)"  },
]

const mapPoints = [
  {
    id: 1, name: "Catedral de Popayán", category: "religious", trust: 97,
    x: 50, y: 22, visits: "12.4K", hours: "7am–6pm",
    description: "La imponente catedral neoclásica, símbolo de la Ciudad Blanca. Reconstruida tras el terremoto de 1983.",
    image: "/images/catedral-popayan.png",
    tags: ["Patrimonio", "Colonial", "UNESCO"],
    experiences: 342,
    distance: "Centro",
    rating: 4.9,
  },
  {
    id: 2, name: "Restaurante El Serrano", category: "gastronomy", trust: 93,
    x: 36, y: 48, visits: "8.2K", hours: "12pm–10pm",
    description: "El mejor pipián rojo de Popayán. Receta tradicional caucana de 3 generaciones.",
    image: "/images/rest-tradicional.png",
    tags: ["Pipián", "Típico", "Familiar"],
    experiences: 218,
    distance: "0.4 km",
    rating: 4.8,
  },
  {
    id: 3, name: "Mercado de Artesanías", category: "crafts", trust: 91,
    x: 64, y: 44, visits: "5.8K", hours: "9am–5pm",
    description: "El mejor lugar para encontrar artesanías auténticas del Cauca: tejidos, cerámica y orfebrería.",
    image: "/images/artesanias.png",
    tags: ["Tejidos", "Cerámica", "Auténtico"],
    experiences: 156,
    distance: "0.6 km",
    rating: 4.7,
  },
  {
    id: 4, name: "Hotel Casa Colonial", category: "lodging", trust: 96,
    x: 66, y: 30, visits: "3.1K", hours: "24h",
    description: "Boutique hotel en una casona colonial restaurada del siglo XVIII. Jardines internos y spa.",
    image: "/images/hotel-colonial.png",
    tags: ["Boutique", "Colonial", "Spa"],
    experiences: 89,
    distance: "0.3 km",
    rating: 4.9,
  },
  {
    id: 5, name: "Puente del Humilladero", category: "culture", trust: 88,
    x: 40, y: 38, visits: "9.1K", hours: "Siempre abierto",
    description: "Puente colonial de arcos de mampostería. Uno de los íconos arquitectónicos de Popayán.",
    image: "/images/catedral-popayan.png",
    tags: ["Colonial", "Histórico"],
    experiences: 201,
    distance: "0.2 km",
    rating: 4.7,
  },
  {
    id: 6, name: "Cerro de las Tres Cruces", category: "nature", trust: 89,
    x: 26, y: 22, visits: "6.7K", hours: "6am–6pm",
    description: "Mirador natural con vista panorámica de toda la ciudad. Ideal para senderismo y fotografía.",
    image: "/images/naturaleza.png",
    tags: ["Mirador", "Senderismo", "Vistas"],
    experiences: 178,
    distance: "3.4 km",
    rating: 4.9,
  },
  {
    id: 7, name: "Teatro Guillermo Valencia", category: "culture", trust: 92,
    x: 58, y: 56, visits: "4.2K", hours: "Según función",
    description: "El teatro principal de Popayán, sede del Festival Internacional de Teatro.",
    image: "/images/catedral-popayan.png",
    tags: ["Teatro", "Cultural"],
    experiences: 92,
    distance: "1.2 km",
    rating: 4.6,
  },
  {
    id: 8, name: "Parque Caldas", category: "culture", trust: 90,
    x: 50, y: 38, visits: "15K", hours: "6am–10pm",
    description: "El parque principal de Popayán. Rodeado de edificios coloniales y la Catedral. Corazón de la ciudad.",
    image: "/images/popayan-hero.png",
    tags: ["Plaza", "Histórico", "Social"],
    experiences: 421,
    distance: "Centro",
    rating: 4.8,
  },
  {
    id: 9, name: "Festival Gastronómico", category: "events", trust: 95,
    x: 44, y: 62, visits: "8.2K", hours: "10am–11pm",
    description: "El evento culinario más importante de Popayán. Expositores tradicionales y cocina en vivo.",
    image: "/images/rest-tradicional.png",
    tags: ["Festival", "Gastronomía", "Tradición"],
    experiences: 189,
    distance: "1.5 km",
    rating: 4.9,
  },
  {
    id: 10, name: "Semana Santa Popayán", category: "religious", trust: 96,
    x: 52, y: 52, visits: "15K", hours: "Semana Santa",
    description: "Procesiones declaradas Patrimonio de la Humanidad por la UNESCO. Una de las más antiguas de América.",
    image: "/images/semana-santa.png",
    tags: ["UNESCO", "Procesiones", "Patrimonio"],
    experiences: 234,
    distance: "Centro",
    rating: 5.0,
  },
]

// Map category zone bubbles (positions for the visual bubbles on the map)
const categoryBubbles = [
  { id: "religious",  label: "Ruta Religiosa",    trust: 98, x: "50%",  y: "10%",  icon: Church,          color: "oklch(0.75 0.14 310)" },
  { id: "gastronomy", label: "Gastronomía",        trust: 95, x: "20%",  y: "38%",  icon: UtensilsCrossed, color: "oklch(0.72 0.18 55)"  },
  { id: "nature",     label: "Naturaleza",          trust: 92, x: "74%",  y: "28%",  icon: Mountain,        color: "oklch(0.65 0.17 150)" },
  { id: "crafts",     label: "Artesanías",          trust: 89, x: "18%",  y: "60%",  icon: Palette,         color: "oklch(0.65 0.22 295)" },
  { id: "lodging",    label: "Hospedaje",           trust: 93, x: "76%",  y: "56%",  icon: Bed,             color: "oklch(0.68 0.16 230)" },
  { id: "culture",    label: "Cultura y Tradición", trust: 94, x: "52%",  y: "72%",  icon: Landmark,        color: "oklch(0.65 0.2 265)"  },
]

const nearbyExperiences = [
  { id: 1, name: "Taller de Cerámica Prehispánica",  category: "Artesanías",  rating: 4.9, reviews: 128, distance: "0.3 km", image: "/images/artesanias.png"       },
  { id: 2, name: "Restaurante La Terraza Colonial",  category: "Gastronomía", rating: 4.8, reviews: 96,  distance: "0.4 km", image: "/images/rest-tradicional.png" },
  { id: 3, name: "Museo de Historia del Cauca",      category: "Cultura",     rating: 4.7, reviews: 78,  distance: "0.6 km", image: "/images/catedral-popayan.png" },
  { id: 4, name: "Mirador Cerro Tulcán",             category: "Naturaleza",  rating: 4.9, reviews: 156, distance: "1.2 km", image: "/images/naturaleza.png"       },
]

const ambassadors = [
  { name: "Miguel Ángel", country: "🇲🇽", rating: 5.0, visited: "Abril 2024" },
  { name: "Laura Rodríguez", country: "🇪🇸", rating: 4.9, visited: "Marzo 2024" },
  { name: "John Peterson",   country: "🇺🇸", rating: 4.8, visited: "Febrero 2024" },
]

const routes = [
  { name: "Ruta Colonial",     places: 4, hours: 3, image: "/images/catedral-popayan.png" },
  { name: "Ruta Gastronómica", places: 5, hours: 4, image: "/images/rest-tradicional.png" },
  { name: "Ruta Religiosa",    places: 6, hours: 5, image: "/images/semana-santa.png"     },
  { name: "Ruta Artesanal",    places: 4, hours: 3, image: "/images/artesanias.png"       },
]

/* ── Component ─────────────────────────────────────────────── */

export default function MapaPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedPoint, setSelectedPoint] = useState<(typeof mapPoints)[0] | null>(null)
  const [addedToRoute, setAddedToRoute] = useState<number[]>([])
  const [mapMode, setMapMode] = useState<"pins" | "heat">("pins")

  const filtered = activeCategory === "all"
    ? mapPoints
    : mapPoints.filter((p) => p.category === activeCategory)

  const handleAdd = (id: number) => {
    setAddedToRoute((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const getCategoryColor = (catId: string): string => {
    return categories.find((c) => c.id === catId)?.color ?? "oklch(0.65 0.2 265)"
  }

  const getCategoryIcon = (catId: string) => {
    return categories.find((c) => c.id === catId)?.icon ?? MapPin
  }

  return (
    <div className="relative h-dvh flex flex-col bg-background overflow-hidden">
      <Navigation />

      {/* ── 3-column layout ── */}
      <div className="flex flex-1 overflow-hidden pt-14 md:pt-16">

        {/* ═══════════════════════════════════════
            LEFT PANEL — stats, ambassadors
        ═══════════════════════════════════════ */}
        <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 flex-col border-r border-border/10 glass-strong overflow-y-auto z-20">
          {/* Title */}
          <div className="p-5 border-b border-border/10 shrink-0">
            <h1 className="font-heading text-lg font-bold text-foreground leading-tight">
              Mapa de Experiencias<br />
              <span className="text-primary">de Popayán</span>
              {" "}<span className="text-gold text-base">✦</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1.5 text-pretty">
              Descubre la ciudad a través de historias reales de viajeros como tú.
            </p>
            <Link
              href="/rutas"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary px-3 py-1.5 text-xs font-semibold mt-3 hover:bg-primary/25 transition-colors"
            >
              <Compass className="size-3.5" />
              ¿Cómo funciona?
            </Link>
          </div>

          {/* City Trust Index */}
          <div className="p-5 border-b border-border/10 shrink-0">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="size-3 text-gold" />
              Índice de Confianza Turística
              <Info className="size-3 text-muted-foreground/60 cursor-pointer" />
            </p>
            {/* Gauge */}
            <div className="relative flex items-center justify-center mb-4">
              <svg viewBox="0 0 120 70" className="w-36">
                <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="oklch(0.3 0.05 274)" strokeWidth="10" strokeLinecap="round"/>
                <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="oklch(0.78 0.18 55)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray="157" strokeDashoffset="16" className="transition-all duration-1000"/>
                <text x="60" y="62" textAnchor="middle" fontSize="22" fontWeight="800" fill="white">94</text>
                <text x="60" y="72" textAnchor="middle" fontSize="8" fill="oklch(0.7 0.05 274)">/100</text>
              </svg>
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold">
                <Star className="size-3" fill="currentColor"/>
                Excelente
              </span>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              {[
                { icon: TrendingUp, label: "92% Recomendaría Popayán",    color: "text-gold" },
                { icon: CheckCircle2,label: "2.843 Experiencias verificadas", color: "text-primary" },
                { icon: Users,       label: "327 Visitantes internacionales", color: "text-primary" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Icon className={cn("size-3.5 shrink-0", color)} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Ambassadors */}
          <div className="p-5 border-b border-border/10 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Embajadores destacados
              </p>
              <button className="text-[10px] text-primary font-semibold hover:underline">
                Ver todos
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {ambassadors.map((amb) => (
                <div key={amb.name} className="flex items-center gap-2.5">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {amb.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground flex items-center gap-1 truncate">
                      {amb.name} <span>{amb.country}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground">Visitó en {amb.visited}</p>
                  </div>
                  <div className="flex items-center gap-0.5 text-[10px] text-gold font-bold shrink-0">
                    <Star className="size-2.5" fill="currentColor" />
                    {amb.rating}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-full border border-primary/30 text-primary text-xs font-semibold py-2 hover:bg-primary/10 transition-colors">
              Conoce a más embajadores
            </button>
          </div>

          {/* Route count */}
          {addedToRoute.length > 0 && (
            <div className="p-5 shrink-0">
              <Link
                href="/rutas"
                className="flex items-center justify-between w-full rounded-2xl bg-primary px-4 py-3 text-primary-foreground"
              >
                <div className="flex items-center gap-2">
                  <Route className="size-4" />
                  <span className="text-sm font-bold">Mi ruta</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold">
                  {addedToRoute.length} lugares
                  <ChevronRight className="size-3.5" />
                </span>
              </Link>
            </div>
          )}
        </aside>

        {/* ═══════════════════════════════════════
            CENTER — MAP
        ═══════════════════════════════════════ */}
        <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">

          {/* Category filter bar — STATIC, no overflow */}
          <div className="shrink-0 border-b border-border/10 bg-background/80 backdrop-blur-md z-30">
            <div className="flex items-center gap-1.5 px-3 py-2.5 overflow-x-auto no-scrollbar">
              {categories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0",
                    activeCategory === id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/20"
                  )}
                >
                  <Icon className="size-3.5" />
                  {label}
                </button>
              ))}

              <div className="ml-auto pl-2 shrink-0 flex items-center gap-1.5">
                <button
                  onClick={() => setMapMode("pins")}
                  className={cn(
                    "px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all",
                    mapMode === "pins" ? "bg-primary text-primary-foreground" : "text-muted-foreground border border-border/20 hover:bg-secondary"
                  )}
                >
                  Puntos
                </button>
                <button
                  onClick={() => setMapMode("heat")}
                  className={cn(
                    "px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all",
                    mapMode === "heat" ? "bg-primary text-primary-foreground" : "text-muted-foreground border border-border/20 hover:bg-secondary"
                  )}
                >
                  Calor
                </button>
              </div>
            </div>
          </div>

          {/* Map container — fills remaining height */}
          <div className="flex-1 relative overflow-hidden">
            {/* Background image */}
            <Image
              src="/images/mapa-popayan.png"
              alt="Mapa ilustrado de Popayán"
              fill
              className="object-cover"
              priority
            />

            {/* Dark overlay with aurora */}
            <div className="absolute inset-0 bg-background/55 city-aurora pointer-events-none" />

            {/* ─── HEAT MAP MODE ─── */}
            {mapMode === "heat" && (
              <div className="absolute inset-0 z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <filter id="heat-blur">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                    </filter>
                    <radialGradient id="hg1" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="oklch(0.78 0.18 55)" stopOpacity="0.85"/>
                      <stop offset="100%" stopColor="oklch(0.78 0.18 55)" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="hg2" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="oklch(0.65 0.2 265)" stopOpacity="0.75"/>
                      <stop offset="100%" stopColor="oklch(0.65 0.2 265)" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <g filter="url(#heat-blur)">
                    {/* High intensity — Centro / Catedral */}
                    <ellipse cx="50" cy="35" rx="14" ry="12" fill="url(#hg1)" />
                    <ellipse cx="36" cy="50" rx="10" ry="9"  fill="url(#hg2)" />
                    <ellipse cx="64" cy="44" rx="9"  ry="8"  fill="url(#hg2)" />
                    <ellipse cx="66" cy="30" rx="8"  ry="7"  fill="url(#hg2)" />
                    <ellipse cx="26" cy="22" rx="8"  ry="7"  fill="url(#hg2)" />
                    <ellipse cx="52" cy="52" rx="10" ry="9"  fill="url(#hg2)" />
                    <ellipse cx="44" cy="62" rx="8"  ry="7"  fill="url(#hg2)" />
                    <ellipse cx="58" cy="56" rx="7"  ry="6"  fill="url(#hg2)" />
                  </g>
                  {/* Zone labels on heatmap */}
                  {[
                    { cx: 50, cy: 34, visitors: "12.4K", name: "Centro" },
                    { cx: 36, cy: 50, visitors: "8.2K",  name: "Bolívar" },
                    { cx: 64, cy: 44, visitors: "5.8K",  name: "El Emp." },
                    { cx: 66, cy: 30, visitors: "3.1K",  name: "N.Norte" },
                    { cx: 26, cy: 22, visitors: "6.7K",  name: "Tres Cruces" },
                  ].map((z) => (
                    <g key={z.name}>
                      <circle cx={z.cx} cy={z.cy} r="5" fill="oklch(0.65 0.2 265)" opacity="0.85">
                        <animate attributeName="r" values="5;6;5" dur="3s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite"/>
                      </circle>
                      <text x={z.cx} y={z.cy + 0.5} textAnchor="middle" dominantBaseline="middle" fontSize="2.5" fontWeight="700" fill="white">{z.visitors}</text>
                    </g>
                  ))}
                </svg>
                {/* Heatmap legend */}
                <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2 text-[10px] font-semibold text-muted-foreground border border-border/15 flex flex-col gap-1.5">
                  <p className="font-bold text-foreground uppercase tracking-wider text-[9px]">Intensidad de visitas</p>
                  <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-gold"/><span>Alta (&gt;10K)</span></div>
                  <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-primary"/><span>Media (3K–10K)</span></div>
                  <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-primary/40"/><span>Baja (&lt;3K)</span></div>
                </div>
              </div>
            )}

            {/* ─── CATEGORY ZONE BUBBLES ─── */}
            {mapMode === "pins" && (
              <>
                {categoryBubbles.map((bubble) => {
                  const Icon = bubble.icon
                  const isActive = activeCategory === "all" || activeCategory === bubble.id
                  return (
                    <button
                      key={bubble.id}
                      onClick={() => setActiveCategory(bubble.id === activeCategory ? "all" : bubble.id)}
                      style={{ left: bubble.x, top: bubble.y, transform: "translate(-50%, -50%)" }}
                      className={cn(
                        "absolute z-20 transition-all duration-300",
                        !isActive && "opacity-30 scale-90"
                      )}
                    >
                      <div
                        className="flex items-center gap-2 rounded-full px-3.5 py-2.5 shadow-xl border border-white/20 backdrop-blur-sm text-white font-bold text-xs hover:scale-105 transition-transform"
                        style={{ backgroundColor: bubble.color + "dd" }}
                      >
                        <Icon className="size-4" />
                        <div className="text-left">
                          <p className="leading-tight">{bubble.label}</p>
                          <p className="text-[10px] font-semibold opacity-90">Confianza {bubble.trust}%</p>
                        </div>
                      </div>
                    </button>
                  )
                })}

                {/* Individual pins */}
                {filtered.map((point) => {
                  const Icon = getCategoryIcon(point.category)
                  const color = getCategoryColor(point.category)
                  const isSelected = selectedPoint?.id === point.id
                  return (
                    <button
                      key={point.id}
                      onClick={() => setSelectedPoint(isSelected ? null : point)}
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
                      aria-label={`Ver ${point.name}`}
                    >
                      <div
                        className={cn(
                          "size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 transition-all duration-200 group-hover:scale-125",
                          isSelected && "scale-125 ring-4 ring-white/40"
                        )}
                        style={{ backgroundColor: color }}
                      >
                        <Icon className="size-3.5 text-white" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40">
                        <div className="glass rounded-xl px-3 py-1.5 shadow-xl border border-border/20 whitespace-nowrap">
                          <p className="text-xs font-bold text-foreground">{point.name}</p>
                          <p className="text-[10px] text-gold font-semibold">⭐ {point.rating} · Confianza {point.trust}/100</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </>
            )}

            {/* City center label */}
            <div
              className="absolute z-10 pointer-events-none text-white font-heading font-bold text-3xl opacity-40"
              style={{ left: "50%", top: "45%", transform: "translate(-50%,-50%)" }}
            >
              Popayán
            </div>

            {/* Map footer info */}
            <div className="absolute bottom-3 right-3 z-20 glass rounded-xl px-3 py-1.5 border border-border/15 text-[9px] text-muted-foreground font-medium">
              Popayán, Cauca · Colombia · {filtered.length} lugares
            </div>
          </div>

          {/* ─── Recommended routes — bottom strip ─── */}
          <div className="shrink-0 border-t border-border/10 bg-background/90 backdrop-blur-md z-20">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Route className="size-3.5 text-primary" />
                  Rutas recomendadas para ti
                  <Info className="size-3 text-muted-foreground/60" />
                </p>
                <Link href="/rutas" className="text-[10px] text-primary font-semibold hover:underline">
                  Ver todas
                </Link>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-0.5">
                {routes.map((route) => (
                  <Link
                    key={route.name}
                    href="/rutas"
                    className="flex items-center gap-2.5 glass rounded-xl px-3 py-2 border border-border/15 shrink-0 hover:border-primary/40 transition-all group"
                  >
                    <div className="relative size-10 rounded-lg overflow-hidden shrink-0">
                      <Image src={route.image} alt={route.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{route.name}</p>
                      <p className="text-[10px] text-muted-foreground">{route.places} lugares · {route.hours} horas</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            RIGHT PANEL — nearby experiences
        ═══════════════════════════════════════ */}
        {!selectedPoint && (
          <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 flex-col border-l border-border/10 glass-strong overflow-y-auto z-20">
            {/* Experience type filter */}
            <div className="p-4 border-b border-border/10 shrink-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Explora por tipo de experiencia
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: "all",       label: "Todos",    icon: Compass        },
                  { id: "nature",    label: "Aventura", icon: Mountain       },
                  { id: "culture",   label: "Familiar", icon: Users          },
                  { id: "religious", label: "Religioso",icon: Church         },
                  { id: "crafts",    label: "Cultural", icon: Palette        },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveCategory(id)}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                      activeCategory === id
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:bg-secondary/60"
                    )}
                  >
                    <Icon className="size-4" />
                    <span className="text-[9px] font-semibold leading-tight text-center">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby experiences list */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 pb-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Experiencias reales cerca de ti
                </p>
                <button className="text-[10px] text-primary font-semibold hover:underline float-right -mt-4">
                  Ver todas
                </button>
              </div>
              <div className="flex flex-col gap-1 px-2 pb-4">
                {nearbyExperiences.map((exp) => (
                  <Link
                    key={exp.id}
                    href={`/lugar/${exp.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="relative size-14 rounded-xl overflow-hidden shrink-0 border border-border/10">
                      <Image src={exp.image} alt={exp.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {exp.name}
                      </p>
                      <p className="text-[10px] text-primary/80 font-semibold mt-0.5">
                        ● {exp.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5 text-[10px] text-gold font-bold">
                          <Star className="size-2.5" fill="currentColor" />
                          {exp.rating}
                        </div>
                        <span className="text-[10px] text-muted-foreground">({exp.reviews})</span>
                        <span className="text-[10px] text-muted-foreground ml-auto">A {exp.distance}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* All map points list */}
              <div className="border-t border-border/10 px-2 pb-4 pt-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Todos los lugares ({filtered.length})
                </p>
                {filtered.map((point) => {
                  const Icon = getCategoryIcon(point.category)
                  const color = getCategoryColor(point.category)
                  return (
                    <button
                      key={point.id}
                      onClick={() => setSelectedPoint(point)}
                      className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-secondary/50 transition-colors text-left"
                    >
                      <div
                        className="size-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: color + "33", border: `1px solid ${color}66` }}
                      >
                        <Icon className="size-3.5" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{point.name}</p>
                        <p className="text-[10px] text-muted-foreground">{point.visits} visitas · {point.distance}</p>
                      </div>
                      <TrustIndex score={point.trust} size="sm" showLabel={false} />
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
        )}

        {/* ─── SELECTED POINT DETAIL PANEL ─── */}
        {selectedPoint && (
          <aside className="w-72 xl:w-80 shrink-0 border-l border-border/10 glass-strong overflow-y-auto flex flex-col z-30 shadow-2xl">
            {/* Image */}
            <div className="relative h-48 shrink-0">
              <Image
                src={selectedPoint.image}
                alt={selectedPoint.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedPoint(null)}
                className="absolute top-3 right-3 size-7 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors border border-border/10"
                aria-label="Cerrar"
              >
                <X className="size-4 text-foreground" />
              </button>
              <div className="absolute top-3 left-3">
                {(() => {
                  const Icon = getCategoryIcon(selectedPoint.category)
                  const color = getCategoryColor(selectedPoint.category)
                  return (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                      style={{ backgroundColor: color + "dd" }}
                    >
                      <Icon className="size-3" />
                      {categories.find((c) => c.id === selectedPoint.category)?.label}
                    </span>
                  )
                })()}
              </div>
              <div className="absolute bottom-3 left-4">
                <h2 className="font-heading font-bold text-base text-white leading-tight drop-shadow-lg">
                  {selectedPoint.name}
                </h2>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4 flex-1">
              {/* Trust + rating */}
              <div className="flex items-center gap-3">
                <TrustIndex score={selectedPoint.trust} size="md" />
                <div className="flex items-center gap-1 text-xs text-gold font-bold">
                  <Star className="size-3.5" fill="currentColor" />
                  {selectedPoint.rating}
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
                {selectedPoint.description}
              </p>

              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { icon: Clock,        text: selectedPoint.hours },
                  { icon: Users,        text: `${selectedPoint.visits} visitas verificadas` },
                  { icon: CheckCircle2, text: `${selectedPoint.experiences} experiencias`, color: "text-gold" },
                  { icon: MapPin,       text: selectedPoint.distance === "Centro" ? "Centro Histórico" : `A ${selectedPoint.distance}` },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-2 text-muted-foreground font-medium">
                    <Icon className={cn("size-3.5 shrink-0 text-primary", color)} />
                    {text}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1">
                {selectedPoint.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-bold text-gold uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-border/10">
                <button
                  onClick={() => handleAdd(selectedPoint.id)}
                  className={cn(
                    "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 w-full",
                    addedToRoute.includes(selectedPoint.id)
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "border border-border bg-secondary hover:bg-secondary/70 text-foreground"
                  )}
                >
                  {addedToRoute.includes(selectedPoint.id) ? (
                    <><CheckCircle2 className="size-3.5" /> En mi ruta</>
                  ) : (
                    <><Plus className="size-3.5" /> Agregar a mi ruta</>
                  )}
                </button>
                <Link
                  href={`/lugar/${selectedPoint.id}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all duration-200 w-full"
                >
                  <Camera className="size-3.5" />
                  Ver perfil completo
                  <ChevronRight className="size-3" />
                </Link>
                <button className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border/20 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border transition-all w-full">
                  <Heart className="size-3.5" />
                  Guardar en favoritos
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
