"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TrustIndex } from "@/components/trust-index"
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  CheckCircle2,
  Route,
  Sun,
  Camera,
  Moon,
  Download,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const interests = [
  { id: "historia", label: "Historia & Patrimonio", icon: "🏛️" },
  { id: "gastronomia", label: "Gastronomía", icon: "🍽️" },
  { id: "naturaleza", label: "Naturaleza", icon: "🌿" },
  { id: "religioso", label: "Turismo Religioso", icon: "⛪" },
  { id: "artesanias", label: "Artesanías", icon: "🎨" },
  { id: "cultura", label: "Cultura & Arte", icon: "🎭" },
  { id: "aventura", label: "Aventura", icon: "🏔️" },
  { id: "fotografia", label: "Fotografía", icon: "📷" },
]

const travelTypes = [
  { id: "pareja", label: "En pareja", icon: Users },
  { id: "familia", label: "Familia", icon: Users },
  { id: "amigos", label: "Con amigos", icon: Users },
  { id: "solo", label: "Solo/a", icon: Users },
]

const budgets = [
  { id: "economico", label: "Económico", sub: "< $200K/día" },
  { id: "moderado", label: "Moderado", sub: "$200K–$500K/día" },
  { id: "premium", label: "Premium", sub: "> $500K/día" },
]

const generatedItinerary = [
  {
    day: 1,
    title: "Centro Histórico & Gastronomía",
    dayPart: "Mañana",
    icon: Sun,
    activities: [
      { time: "8:00", name: "Parque Caldas", type: "Cultura", cost: "Gratis", trust: 90, duration: "45 min" },
      { time: "9:00", name: "Catedral de Popayán", type: "Religioso", cost: "Donación", trust: 97, duration: "1h" },
      { time: "10:30", name: "Puente del Humilladero", type: "Historia", cost: "Gratis", trust: 88, duration: "30 min" },
      { time: "12:00", name: "Restaurante El Serrano", type: "Gastronomía", cost: "$25K", trust: 93, duration: "1.5h" },
    ],
    afternoon: [
      { time: "14:30", name: "Mercado de Artesanías", type: "Artesanías", cost: "Variable", trust: 91, duration: "1.5h" },
      { time: "16:30", name: "Teatro Guillermo Valencia", type: "Cultura", cost: "$15K", trust: 92, duration: "1h" },
      { time: "20:00", name: "Cena Típica Caucana", type: "Gastronomía", cost: "$30K", trust: 94, duration: "1.5h" },
    ],
  },
  {
    day: 2,
    title: "Naturaleza & Miradores",
    dayPart: "Mañana",
    icon: Sun,
    activities: [
      { time: "7:00", name: "Cerro de las Tres Cruces", type: "Naturaleza", cost: "Gratis", trust: 89, duration: "2h" },
      { time: "10:00", name: "Ermita de Belén", type: "Religioso", cost: "Gratis", trust: 86, duration: "45 min" },
      { time: "12:30", name: "Café Balcón del Cauca", type: "Gastronomía", cost: "$18K", trust: 91, duration: "1h" },
    ],
    afternoon: [
      { time: "14:00", name: "Museo de Historia Natural", type: "Cultura", cost: "$8K", trust: 88, duration: "2h" },
      { time: "17:00", name: "Tour Fotográfico Colonial", type: "Fotografía", cost: "$25K", trust: 95, duration: "2h" },
      { time: "20:30", name: "Noche en Hotel Casa Colonial", type: "Alojamiento", cost: "$180K", trust: 96, duration: "Noche" },
    ],
  },
  {
    day: 3,
    title: "Excursión al Volcán Puracé",
    dayPart: "Día completo",
    icon: Camera,
    activities: [
      { time: "6:00", name: "Salida a Puracé", type: "Aventura", cost: "$45K", trust: 92, duration: "1h viaje" },
      { time: "7:30", name: "Parque Nacional Puracé", type: "Naturaleza", cost: "$25K", trust: 94, duration: "4h" },
      { time: "13:00", name: "Almuerzo en Refugio", type: "Gastronomía", cost: "$20K", trust: 87, duration: "1h" },
      { time: "15:00", name: "Cascada El Bedón", type: "Naturaleza", cost: "Gratis", trust: 91, duration: "2h" },
      { time: "18:00", name: "Regreso a Popayán", type: "Transporte", cost: "$45K", trust: 92, duration: "1h" },
    ],
    afternoon: [],
  },
]

export default function RutasPage() {
  const [step, setStep] = useState(1)
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState("moderado")
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["historia", "gastronomia"])
  const [travelType, setTravelType] = useState("pareja")
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [activeDay, setActiveDay] = useState(0)

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
      setStep(3)
    }, 2200)
  }

  const totalCost = "COP $376K"
  const currentItinerary = generatedItinerary[activeDay]

  return (
    <div className="relative min-h-dvh bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 pb-28 pt-16 md:pb-12 md:pt-24 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold uppercase tracking-wide mb-4 animate-float-slow">
            <Sparkles className="size-3" />
            IA de Rutas Personalizadas
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Diseña tu viaje perfecto en Popayán
          </h1>
          <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto text-pretty">
            Nuestra IA crea un itinerario único basado en tus preferencias, presupuesto e intereses.
          </p>
        </div>

        {/* Step indicator */}
        {!generated && (
          <div className="flex items-center gap-3 mb-8">
            {[
              { n: 1, label: "Preferencias" },
              { n: 2, label: "Intereses" },
              { n: 3, label: "Tu ruta" },
            ].map(({ n, label }, i) => (
              <div key={n} className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                      step > n
                        ? "bg-primary text-primary-foreground"
                        : step === n
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-secondary text-muted-foreground border border-border"
                    )}
                  >
                    {step > n ? <CheckCircle2 className="size-3.5" /> : n}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold hidden sm:block",
                      step >= n ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={cn("flex-1 h-[2px]", step > n ? "bg-primary" : "bg-border/20")} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step 1 — Preferences */}
        {step === 1 && (
          <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="font-heading text-lg font-bold text-foreground">
                Cuéntanos sobre tu viaje
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex flex-col gap-6">
              {/* Days */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  ¿Cuántos días tienes disponibles?
                </label>
                <div className="flex items-center gap-4 py-2">
                  <button
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="size-9 rounded-full border border-border bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors text-foreground font-bold"
                  >
                    –
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-foreground">{days}</span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      {days === 1 ? "día" : "días"}
                    </span>
                  </div>
                  <button
                    onClick={() => setDays(Math.min(7, days + 1))}
                    className="size-9 rounded-full border border-border bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors text-foreground font-bold"
                  >
                    +
                  </button>
                </div>
                <Progress value={(days / 7) * 100} className="h-1.5 bg-secondary" />
              </div>

              <Separator className="border-border/10" />

              {/* Budget */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="size-4 text-primary" />
                  Presupuesto por día
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {budgets.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBudget(b.id)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all",
                        budget === b.id
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/10 hover:border-primary/40 bg-secondary/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="font-semibold text-xs text-foreground uppercase tracking-wider">{b.label}</span>
                      <span className="text-[10px] text-muted-foreground font-semibold">{b.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="border-border/10" />

              {/* Travel type */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Users className="size-4 text-primary" />
                  Tipo de viaje
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {travelTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTravelType(t.id)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-sm transition-all",
                        travelType === t.id
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/10 hover:border-primary/40 text-muted-foreground hover:text-foreground bg-secondary/50"
                      )}
                    >
                      <t.icon className="size-4.5 text-primary" />
                      <span className="text-xs font-semibold">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] w-full sm:w-auto self-end mt-4"
              >
                Siguiente
                <ChevronRight className="size-4" />
              </button>
            </CardContent>
          </Card>
        )}

        {/* Step 2 — Interests */}
        {step === 2 && (
          <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="font-heading text-lg font-bold text-foreground">
                ¿Qué te interesa explorar?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex flex-col gap-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Selecciona uno o más intereses para personalizar tu ruta
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      "flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all",
                      selectedInterests.includes(interest.id)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border/10 hover:border-primary/40 bg-secondary/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="text-2xl">{interest.icon}</span>
                    <span
                      className={cn(
                        "text-xs font-semibold text-center leading-tight",
                        selectedInterests.includes(interest.id)
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {interest.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/10 mt-2">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70"
                >
                  <ChevronLeft className="size-4" />
                  Atrás
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={selectedInterests.length === 0 || generating}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]"
                >
                  {generating ? (
                    <>
                      <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Generando ruta...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Generar mi ruta con IA
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 — Generated itinerary */}
        {step === 3 && generated && (
          <div className="flex flex-col gap-6">
            {/* Summary card */}
            <Card className="rounded-3xl bg-primary/15 border border-primary/25 shadow-xl shadow-primary/5 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="size-4 text-gold" />
                      <span className="text-xs font-bold text-gold uppercase tracking-wider">Ruta generada por IA</span>
                    </div>
                    <h2 className="font-heading text-2xl font-bold mb-1 tracking-tight text-foreground">
                      Tu Popayán en {days} días
                    </h2>
                    <p className="text-xs text-muted-foreground font-semibold capitalize mt-1">
                      {travelType} · {budgets.find((b) => b.id === budget)?.label} ·{" "}
                      {selectedInterests.length} intereses
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-2xl font-bold text-foreground tracking-tight">{totalCost}</span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase">costo estimado</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70">
                    <Download className="size-3.5 text-primary" />
                    Descargar PDF
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70">
                    <Share2 className="size-3.5 text-primary" />
                    Compartir
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Day selector */}
            <div className="flex gap-2 overflow-x-auto pb-1.5">
              {generatedItinerary.slice(0, days).map((day, i) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(i)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border-2 transition-all min-w-[90px] shrink-0",
                    activeDay === i
                      ? "border-primary bg-primary/10 text-foreground shadow-lg shadow-primary/5"
                      : "border-border/10 bg-secondary/40 hover:border-primary/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-bold",
                      activeDay === i ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Día {day.day}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold text-center leading-tight",
                      activeDay === i ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {day.title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Day detail & Route map grid */}
            {currentItinerary && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Left — Day Detail */}
                <div className="md:col-span-2">
                  <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40 h-full">
                    <CardHeader className="p-5 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                            Día {currentItinerary.day}
                          </p>
                          <CardTitle className="font-heading text-lg font-bold text-foreground tracking-tight">
                            {currentItinerary.title}
                          </CardTitle>
                        </div>
                        <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                          <currentItinerary.icon className="size-5" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 flex flex-col gap-4">
                      {[
                        { label: "Mañana & Tarde", items: currentItinerary.activities, icon: Sun },
                        ...(currentItinerary.afternoon.length > 0
                          ? [{ label: "Tarde & Noche", items: currentItinerary.afternoon, icon: Moon }]
                          : []),
                      ].map((section, sIdx) => (
                        <div key={section.label} className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 py-1.5">
                            <section.icon className="size-4 text-muted-foreground" />
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                              {section.label}
                            </span>
                          </div>
                          {section.items.map((activity, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/10 hover:border-primary/20 hover:bg-secondary/60 transition-all duration-300"
                            >
                              <div className="text-xs font-mono text-muted-foreground w-12 shrink-0 pt-0.5 font-semibold">
                                {activity.time}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <p className="font-semibold text-sm text-foreground">
                                    {activity.name}
                                  </p>
                                  <span className="inline-flex items-center rounded-full border border-border/20 bg-secondary/80 px-2 py-0.2 text-[9px] font-medium text-foreground">
                                    {activity.type}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1 font-semibold">
                                    <Clock className="size-3 text-primary" />
                                    {activity.duration}
                                  </span>
                                  <span className="flex items-center gap-1 font-semibold">
                                    <DollarSign className="size-3 text-primary" />
                                    {activity.cost}
                                  </span>
                                </div>
                              </div>
                              <TrustIndex score={activity.trust} size="sm" showLabel={false} />
                            </div>
                          ))}
                          {sIdx === 0 && currentItinerary.afternoon.length > 0 && <Separator className="my-2 border-border/10" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Right — Route Mini-map */}
                <div className="md:col-span-1">
                  <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40 h-full flex flex-col">
                    <CardHeader className="p-5 pb-3">
                      <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Route className="size-4 text-primary" />
                        Recorrido sugerido
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between gap-4">
                      {/* Interactive map container */}
                      <div className="relative w-full h-[260px] rounded-xl overflow-hidden border border-border/10 bg-secondary/20 shrink-0">
                        {/* Map Image Background */}
                        <div className="absolute inset-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/mapa-popayan.png"
                            alt="Mapa de Popayán"
                            className="w-full h-full object-cover opacity-30"
                          />
                        </div>
                        {/* Aurora overlay */}
                        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />

                        {/* SVG Itinerary Route Path */}
                        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full z-10 pointer-events-none" preserveAspectRatio="none">
                          {activeDay === 0 && (
                            <path
                              d="M 48 44 L 50 38 L 40 43 L 44 52"
                              fill="none"
                              stroke="var(--primary)"
                              strokeWidth="2.5"
                              strokeDasharray="5 3"
                              className="animate-dash-flow text-primary"
                            />
                          )}
                          {activeDay === 1 && (
                            <path
                              d="M 35 28 L 65 40 L 55 48"
                              fill="none"
                              stroke="var(--primary)"
                              strokeWidth="2.5"
                              strokeDasharray="5 3"
                              className="animate-dash-flow text-primary"
                            />
                          )}
                          {activeDay === 2 && (
                            <path
                              d="M 48 44 L 80 70 L 70 80"
                              fill="none"
                              stroke="var(--primary)"
                              strokeWidth="2.5"
                              strokeDasharray="5 3"
                              className="animate-dash-flow text-primary"
                            />
                          )}
                        </svg>

                        {/* Itinerary pin markers */}
                        {activeDay === 0 && (
                          <>
                            {/* Pin 1: Parque Caldas */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "48%", top: "44%", transform: "translate(-50%, -50%)" }}>1</div>
                            {/* Pin 2: Catedral */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "50%", top: "38%", transform: "translate(-50%, -50%)" }}>2</div>
                            {/* Pin 3: Puente Humilladero */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "40%", top: "43%", transform: "translate(-50%, -50%)" }}>3</div>
                            {/* Pin 4: Serrano */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "44%", top: "52%", transform: "translate(-50%, -50%)" }}>4</div>
                          </>
                        )}
                        {activeDay === 1 && (
                          <>
                            {/* Pin 1: Cerro Tres Cruces */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "35%", top: "28%", transform: "translate(-50%, -50%)" }}>1</div>
                            {/* Pin 2: Ermita de Belen */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "65%", top: "40%", transform: "translate(-50%, -50%)" }}>2</div>
                            {/* Pin 3: Café Balcon del Cauca */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "55%", top: "48%", transform: "translate(-50%, -50%)" }}>3</div>
                          </>
                        )}
                        {activeDay === 2 && (
                          <>
                            {/* Pin 1: Salida Popayán */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "48%", top: "44%", transform: "translate(-50%, -50%)" }}>1</div>
                            {/* Pin 2: Volcan Purace */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "80%", top: "70%", transform: "translate(-50%, -50%)" }}>2</div>
                            {/* Pin 3: Cascada Bedon */}
                            <div className="absolute size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg border border-border" style={{ left: "70%", top: "80%", transform: "translate(-50%, -50%)" }}>3</div>
                          </>
                        )}
                      </div>

                      <div className="text-[11px] text-muted-foreground leading-relaxed text-pretty mt-2">
                        Esta ruta conecta secuencialmente las actividades recomendadas para el **Día {currentItinerary.day}**. Haz clic abajo para explorar el mapa interactivo.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setGenerated(false); setStep(2) }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70"
              >
                <ChevronLeft className="size-4" />
                Ajustar preferencias
              </button>
              <Link
                href="/mapa"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] flex-1 sm:flex-none"
              >
                <MapPin className="size-4" />
                Ver en el mapa
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
