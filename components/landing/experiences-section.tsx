"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronRight, CheckCircle2, Calendar } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Procesión de Semana Santa — una experiencia única en el mundo",
    author: { name: "Miguel R.", country: "MX", flag: "🇲🇽" },
    category: "Turismo Religioso",
    image: "/images/semana-santa.png",
    date: "Marzo 2024",
    verified: true,
    excerpt:
      "Ver las procesiones en Popayán fue algo que cambió mi perspectiva. Las figuras de nazarenos, la música sacra y la arquitectura colonial se combinan en algo verdaderamente mágico.",
  },
  {
    id: 2,
    title: "Congreso Gastronómico de Popayán — gastronomía auténtica",
    author: { name: "Andrea K.", country: "DE", flag: "🇩🇪" },
    category: "Gastronomía",
    image: "/images/rest-tradicional.png",
    date: "Enero 2024",
    verified: true,
    excerpt:
      "El pipián rojo y las empanadas de pipián son absolutamente increíbles. Cada restaurante tiene su propia receta heredada por generaciones.",
  },
  {
    id: 3,
    title: "Senderismo en el cerro de las tres cruces — naturaleza sin igual",
    author: { name: "Carlos M.", country: "CO", flag: "🇨🇴" },
    category: "Naturaleza",
    image: "/images/naturaleza.png",
    date: "Febrero 2024",
    verified: true,
    excerpt:
      "Las rutas por el páramo de Puracé son espectaculares. El volcán activo, las lagunas y la biodiversidad son de otro nivel.",
  },
]

const events = [
  {
    title: "Festival de Música Religiosa",
    date: "Mar 28 – Abr 2",
    category: "Cultural",
    attendees: "15K esperados",
  },
  {
    title: "Festival Gastronómico del Cauca",
    date: "May 10 – 14",
    category: "Gastronomía",
    attendees: "8K esperados",
  },
  {
    title: "Feria de Artesanías Caucanas",
    date: "Jun 15 – 20",
    category: "Artesanías",
    attendees: "5K esperados",
  },
]

export function ExperiencesSection() {
  return (
    <>
      {/* Experiences */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Comunidad verificada</p>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Experiencias recientes
              </h2>
              <p className="text-muted-foreground mt-2 text-pretty">
                Relatos reales de visitantes verificados por nuestra IA
              </p>
            </div>
            <Link
              href="/experiencias"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 hover:scale-[1.02] transition-transform hidden sm:flex"
            >
              Ver todas
              <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <Link key={exp.id} href={`/experiencias#${exp.id}`} className="group">
                <Card className="rounded-2xl glass p-2 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 cursor-pointer h-full">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 right-3">
                      {exp.verified && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold text-gold uppercase tracking-wide">
                          <CheckCircle2 className="size-3" />
                          Verificada
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-card/85 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                        {exp.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-2 flex flex-col justify-between h-[calc(100%-140px)]">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 text-pretty">
                        {exp.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/20">
                      <Avatar className="size-6">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                          {exp.author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-foreground flex-1">
                        {exp.author.name} {exp.author.flag}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        {exp.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-12 border-t border-b border-border/10 city-aurora">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Agenda cultural</p>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Eventos destacados
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {events.map((ev) => (
              <Card key={ev.title} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-transform group-hover:scale-105">
                    <Calendar className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{ev.date}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-secondary/80 px-2 py-0.5 text-[9px] font-medium text-foreground">
                        {ev.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{ev.attendees}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
