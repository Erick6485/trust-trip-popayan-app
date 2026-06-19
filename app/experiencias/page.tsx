"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { TrustIndex } from "@/components/trust-index"
import {
  CheckCircle2,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Award,
  Globe,
  Users,
  Backpack,
  Church,
  UtensilsCrossed,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const filters = [
  { id: "all", label: "Todos", icon: Globe },
  { id: "familia", label: "Familias", icon: Users },
  { id: "mochilero", label: "Mochileros", icon: Backpack },
  { id: "internacional", label: "Internacionales", icon: Globe },
  { id: "religioso", label: "Turismo Religioso", icon: Church },
  { id: "gastronomia", label: "Gastronomía", icon: UtensilsCrossed },
]

const ambassadors = [
  {
    name: "Miguel Rodríguez",
    flag: "🇲🇽",
    origin: "Guadalajara, México",
    type: "internacional",
    avatar: "MR",
    badge: "Embajador Verificado",
    trips: 3,
    verified: true,
    trust: 98,
    trip: "Semana Santa 2024",
    category: "Turismo Religioso",
    title: "Semana Santa en Popayán: una experiencia que cambia la vida",
    content:
      "Llevar tres años visitando Popayán durante Semana Santa me ha dado una perspectiva única. Los nazarenos en procesión, la música sacra que llena las calles coloniales, el aroma del incienso mezclado con el aire fresco andino... es algo que no se puede describir con palabras. Este año, con Travesía Blanca, pude planear cada detalle: los mejores miradores para ver las procesiones, los restaurantes que sirven la merienda tradicional y hasta los hoteles más cercanos al recorrido.",
    highlights: ["Procesión del Lunes Santo", "Catedral Iluminada", "Gastronomía de Semana Santa"],
    images: ["/images/semana-santa.png", "/images/catedral-popayan.png"],
    likes: 234,
    comments: 47,
  },
  {
    name: "Andrea Köhler",
    flag: "🇩🇪",
    origin: "Berlín, Alemania",
    type: "internacional",
    avatar: "AK",
    badge: "Embajadora Verificada",
    trips: 1,
    verified: true,
    trust: 95,
    trip: "Enero 2024 — 2 semanas",
    category: "Gastronomía",
    title: "Dos semanas descubriendo la gastronomía caucana más auténtica",
    content:
      "Como food blogger, visitar Popayán fue una revelación. La ciudad no solo es Patrimonio Arquitectónico sino también un paraíso gastronómico inexplorado. El pipián rojo, las empanadas de pipián, el champús, el sancocho de gallina criolla... cada plato tiene una historia y una técnica que los chefs locales guardan celosamente.",
    highlights: ["Pipián Rojo de la Abuela", "Mercado de Galería", "Festival Gastronómico"],
    images: ["/images/rest-tradicional.png", "/images/artesanias.png"],
    likes: 189,
    comments: 31,
  },
  {
    name: "Carlos Mendoza",
    flag: "🇨🇴",
    origin: "Medellín, Colombia",
    type: "mochilero",
    avatar: "CM",
    badge: "Viajero Verificado",
    trips: 5,
    verified: true,
    trust: 92,
    trip: "Febrero 2024 — 10 días",
    category: "Naturaleza & Aventura",
    title: "10 días de mochilero por Popayán y el Cauca profundo",
    content:
      "Con $500K pesos colombianos logré una experiencia increíble. Popayán es el punto de partida perfecto para explorar el Cauca: el Parque Natural Puracé, las comunidades indígenas Nasa, las selvas del Pacífico y las termales de San Juan. Travesía Blanca me ayudó a encontrar los hospedajes más seguros y económicos.",
    highlights: ["Volcán Puracé", "Termas de Coconuco", "Comunidades Indígenas Nasa"],
    images: ["/images/naturaleza.png", "/images/popayan-hero.png"],
    likes: 156,
    comments: 28,
  },
  {
    name: "Laura & Pedro Vargas",
    flag: "🇨🇴",
    origin: "Cali, Colombia",
    type: "familia",
    avatar: "LP",
    badge: "Familia Verificada",
    trips: 2,
    verified: true,
    trust: 94,
    trip: "Vacaciones diciembre 2023",
    category: "Familia",
    title: "Popayán con niños: la ciudad más segura y educativa de Colombia",
    content:
      "Viajamos con nuestros hijos de 8 y 12 años. El índice de confianza nos ayudó enormemente a elegir actividades apropiadas para toda la familia. Los museos, las iglesias con sus historias y los talleres de artesanía fueron perfectos para los niños.",
    highlights: ["Museo de Historia Natural", "Talleres Artesanales para Niños", "Parque Caldas"],
    images: ["/images/hotel-colonial.png", "/images/catedral-popayan.png"],
    likes: 203,
    comments: 42,
  },
]

const recentExperiences = [
  { id: 5, name: "Sofía R.", flag: "🇦🇷", category: "Historia", title: "El barrio colonial de noche, una magia diferente", image: "/images/popayan-hero.png", trust: 91, date: "Mar 2024", likes: 87 },
  { id: 6, name: "James K.", flag: "🇺🇸", category: "Naturaleza", title: "Sunrise hike to Cerro de las Tres Cruces", image: "/images/naturaleza.png", trust: 89, date: "Feb 2024", likes: 65 },
  { id: 7, name: "Isabella M.", flag: "🇧🇷", category: "Artesanías", title: "Aprendí a tejer con las artesanas del Cauca", image: "/images/artesanias.png", trust: 93, date: "Ene 2024", likes: 112 },
]

export default function ExperienciasPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<number | null>(0)

  const filtered = activeFilter === "all"
    ? ambassadors
    : ambassadors.filter((a) => a.type === activeFilter || a.category.toLowerCase().includes(activeFilter))

  return (
    <div className="relative min-h-dvh bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 pb-28 pt-16 md:pb-12 md:pt-24 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold uppercase tracking-wide mb-3 animate-float-slow">
            <CheckCircle2 className="size-3" />
            Experiencias Verificadas por IA
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
            Experiencias reales de viajeros
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl text-pretty">
            Todas las experiencias son revisadas y verificadas por nuestra IA. Sin reviews
            falsos, sin contenido patrocinado no declarado.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
          {filters.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 border",
                activeFilter === id
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground hover:bg-secondary/70"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main feed */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2 mb-2">
              <Award className="size-5 text-gold" />
              Embajadores Verificados
            </h2>

            {filtered.map((exp, index) => (
              <Card key={exp.name} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                {/* Author */}
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {exp.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">
                          {exp.name} {exp.flag}
                        </span>
                        {exp.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.2 text-[9px] font-bold text-gold uppercase tracking-wide">
                            <CheckCircle2 className="size-2.5" />
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{exp.origin}</p>
                    </div>
                    <TrustIndex score={exp.trust} size="sm" showLabel={false} />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {exp.trip}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border/20 bg-secondary/80 px-2 py-0.5 text-[9px] font-medium text-foreground">
                      {exp.category}
                    </span>
                  </div>

                  {/* Images */}
                  <div className="grid grid-cols-2 gap-2.5 mb-4 rounded-xl overflow-hidden">
                    {exp.images.map((img, i) => (
                      <div key={i} className="relative aspect-video overflow-hidden rounded-lg group">
                        <Image src={img} alt="" fill className="object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-base text-foreground mb-2">
                    {exp.title}
                  </h3>

                  {/* Content */}
                  <p
                    className={cn(
                      "text-sm text-muted-foreground leading-relaxed text-pretty",
                      expandedId !== index && "line-clamp-3"
                    )}
                  >
                    {exp.content}
                  </p>
                  <button
                    onClick={() => setExpandedId(expandedId === index ? null : index)}
                    className="text-xs text-primary font-bold mt-2 hover:underline flex items-center gap-1"
                  >
                    {expandedId === index ? "Ver menos" : "Leer más"}
                    <ChevronDown
                      className={cn(
                        "size-3 transition-transform",
                        expandedId === index && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[9px] font-medium text-gold"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <Separator className="my-4 border-border/10" />

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-semibold">
                      <ThumbsUp className="size-3.5 text-primary/70" />
                      {exp.likes} útil
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-semibold">
                      <MessageCircle className="size-3.5 text-primary/70" />
                      {exp.comments} respuestas
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Stats */}
            <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
              <CardContent className="p-5">
                <h3 className="font-semibold text-sm text-foreground mb-4">
                  Comunidad Travesía Blanca
                </h3>
                {[
                  { value: "2,418", label: "Experiencias verificadas" },
                  { value: "847", label: "Embajadores activos" },
                  { value: "38", label: "Países representados" },
                  { value: "94/100", label: "Índice promedio de confianza" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-2.5 border-b border-border/10 last:border-0">
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                    <span className="text-sm font-bold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent experiences */}
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-3 px-1">
                Experiencias recientes
              </h3>
              <div className="flex flex-col gap-3">
                {recentExperiences.map((exp) => (
                  <Card key={exp.id} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40 cursor-pointer group">
                    <CardContent className="p-3 flex gap-3">
                      <div className="relative size-16 rounded-xl overflow-hidden shrink-0 border border-border/10">
                        <Image src={exp.image} alt={exp.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                          {exp.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-muted-foreground font-semibold">
                            {exp.name} {exp.flag}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-border/20 bg-secondary/80 px-1.5 py-0.2 text-[9px] font-medium text-foreground">
                            {exp.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <TrustIndex score={exp.trust} size="sm" showLabel={false} />
                          <span className="text-[10px] text-muted-foreground font-medium">{exp.likes} útil</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
