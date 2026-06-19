"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María Fernanda L.",
    origin: "Bogotá, Colombia",
    flag: "🇨🇴",
    type: "Familia",
    quote:
      "Travesía Blanca nos ayudó a planificar el viaje perfecto en familia. El índice de confianza nos dio seguridad para elegir los mejores lugares.",
    score: 98,
    trip: "4 días en Popayán",
    verified: true,
  },
  {
    name: "Thomas B.",
    origin: "París, Francia",
    flag: "🇫🇷",
    type: "Mochilero",
    quote:
      "Como turista internacional, la IA de rutas fue invaluable. Me generó un itinerario perfecto considerando mi presupuesto y mis intereses culturales.",
    score: 95,
    trip: "7 días explorando el Cauca",
    verified: true,
  },
  {
    name: "Sofía R.",
    origin: "Buenos Aires, Argentina",
    flag: "🇦🇷",
    type: "Internacional",
    quote:
      "Las experiencias verificadas me dieron confianza total. Cada lugar que visité tenía exactamente lo que la plataforma describía.",
    score: 93,
    trip: "Semana Santa 2024",
    verified: true,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Embajadores verificados</p>
          <h2 className="font-heading text-3xl font-bold text-foreground text-balance">
            Lo que dicen nuestros viajeros
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-pretty">
            Opiniones reales verificadas con inteligencia artificial. Sin reviews falsos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 relative overflow-hidden"
            >
              <CardContent className="p-6 flex flex-col justify-between h-full min-h-[260px] gap-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <Quote className="size-8 text-primary/25" />
                    {t.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-bold text-gold uppercase tracking-wide">
                        <CheckCircle2 className="size-3" />
                        Verificado
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed italic text-pretty">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-border/20">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {t.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {t.name} {t.flag}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.origin}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-border/20 bg-secondary/80 px-2 py-0.5 text-[9px] font-medium text-foreground">
                      {t.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">{t.trip}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
