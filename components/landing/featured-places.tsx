"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrustIndex } from "@/components/trust-index"
import { MapPin, Clock, ChevronRight } from "lucide-react"

const places = [
  {
    id: 1,
    name: "Catedral de Popayán",
    category: "Cultura & Historia",
    image: "/images/catedral-popayan.png",
    trust: 97,
    visits: "12.4K",
    hours: "7am – 6pm",
    location: "Centro Histórico",
    tags: ["Patrimonio", "Colonial"],
  },
  {
    id: 2,
    name: "Restaurante El Serrano",
    category: "Gastronomía",
    image: "/images/rest-tradicional.png",
    trust: 93,
    visits: "8.2K",
    hours: "12pm – 10pm",
    location: "Barrio Bolívar",
    tags: ["Pipián", "Típico"],
  },
  {
    id: 3,
    name: "Artesanías del Cauca",
    category: "Artesanías",
    image: "/images/artesanias.png",
    trust: 91,
    visits: "5.8K",
    hours: "9am – 5pm",
    location: "Mercado Central",
    tags: ["Tejidos", "Cerámica"],
  },
  {
    id: 4,
    name: "Hotel Casa Colonial",
    category: "Alojamiento",
    image: "/images/hotel-colonial.png",
    trust: 96,
    visits: "3.1K",
    hours: "Check-in 3pm",
    location: "Sector El Empedrado",
    tags: ["Boutique", "4 estrellas"],
  },
]

export function FeaturedPlaces() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Índice de confianza</p>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Lugares más confiables
            </h2>
            <p className="text-muted-foreground mt-2 text-pretty">
              Verificados con inteligencia artificial y opiniones reales
            </p>
          </div>
          <Link
            href="/mapa"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 hover:scale-[1.02] transition-transform hidden sm:flex"
          >
            Ver todos
            <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {places.map((place) => (
            <Link key={place.id} href={`/lugar/${place.id}`} className="group">
              <Card className="rounded-2xl glass p-2 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 cursor-pointer overflow-hidden h-full">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-card/80 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                      {place.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-2 flex flex-col justify-between h-[calc(100%-150px)]">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                        {place.name}
                      </h3>
                      <TrustIndex score={place.trust} size="sm" showLabel={false} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3 shrink-0" />
                        {place.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3 shrink-0" />
                        {place.hours}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {place.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-medium text-gold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
