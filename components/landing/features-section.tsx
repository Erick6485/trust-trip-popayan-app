import { Card, CardContent } from "@/components/ui/card"
import { Map, Route, Shield, Handshake } from "lucide-react"

const pillars = [
  {
    icon: Map,
    title: "Mapa Inteligente",
    description:
      "Explora Popayán en un mapa interactivo con más de 400 puntos de interés categorizados y verificados.",
  },
  {
    icon: Route,
    title: "Rutas con IA",
    description:
      "Nuestra IA diseña rutas personalizadas según tus días, presupuesto e intereses. Itinerarios únicos en segundos.",
  },
  {
    icon: Shield,
    title: "Índice de Confianza",
    description:
      "Cada lugar recibe una puntuación de confianza 0-100 basada en experiencias reales, no en estrellas genéricas.",
  },
  {
    icon: Handshake,
    title: "Alianzas Turísticas",
    description:
      "Conectamos hoteles, restaurantes, artesanos y operadores mediante inteligencia de alianzas para crear experiencias completas.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Cuatro pilares</p>
          <h2 className="font-heading text-3xl font-bold text-foreground text-balance">
            La plataforma de turismo inteligente
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-pretty">
            TrustTrip no es un directorio turístico. Es una plataforma de inteligencia turística
            que conecta visitantes y proveedores de Popayán mediante IA.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <Card key={p.title} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 group">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-transform group-hover:scale-105">
                  <p.icon className="size-5" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-base text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                    {p.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
