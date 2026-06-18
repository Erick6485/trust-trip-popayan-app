"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TrustIndex } from "@/components/trust-index"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MessageCircle,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  BarChart3,
  Shield,
  Sparkles,
  ChevronRight,
  Plus,
  Bell,
  Settings,
  ArrowUpRight,
  Camera,
  FileText,
  Link2,
  Star,
  Zap,
  HandshakeIcon,
  MapPinned,
} from "lucide-react"
import { cn } from "@/lib/utils"

const kpis = [
  {
    label: "Índice de Confianza",
    value: "93",
    unit: "/100",
    delta: "+2",
    trend: "up",
    icon: Shield,
    color: "text-gold",
    bg: "bg-gold/10 ring-1 ring-gold/30",
  },
  {
    label: "Visitas este mes",
    value: "1,247",
    unit: "",
    delta: "+18%",
    trend: "up",
    icon: Eye,
    color: "text-primary",
    bg: "bg-primary/15 ring-1 ring-primary/30",
  },
  {
    label: "Experiencias verificadas",
    value: "218",
    unit: "",
    delta: "+12",
    trend: "up",
    icon: CheckCircle2,
    color: "text-primary",
    bg: "bg-primary/15 ring-1 ring-primary/30",
  },
  {
    label: "Respuesta promedio",
    value: "2.4h",
    unit: "",
    delta: "-0.8h",
    trend: "up",
    icon: Clock,
    color: "text-gold",
    bg: "bg-gold/10 ring-1 ring-gold/30",
  },
]

const trustFactors = [
  { label: "Calidad del servicio", score: 96, prev: 94 },
  { label: "Autenticidad cultural", score: 98, prev: 97 },
  { label: "Relación precio-valor", score: 91, prev: 91 },
  { label: "Limpieza & presentación", score: 94, prev: 92 },
  { label: "Atención al turista", score: 95, prev: 93 },
]

const recentReviews = [
  {
    name: "Miguel R.",
    flag: "🇲🇽",
    date: "Hace 2 días",
    rating: 98,
    text: "El mejor pipián rojo de Popayán. Completamente auténtico.",
    replied: false,
    verified: true,
  },
  {
    name: "Andrea K.",
    flag: "🇩🇪",
    date: "Hace 5 días",
    rating: 95,
    text: "Incredible local food, very authentic. Highly recommended.",
    replied: true,
    verified: true,
  },
  {
    name: "Carlos M.",
    flag: "🇨🇴",
    date: "Hace 1 semana",
    rating: 92,
    text: "Un clásico de Popayán. El sancocho de gallina es espectacular.",
    replied: true,
    verified: true,
  },
]

const alerts = [
  {
    type: "success",
    icon: TrendingUp,
    text: "Tu Índice de Confianza subió 2 puntos este mes",
    time: "Hoy",
  },
  {
    type: "warning",
    icon: AlertCircle,
    text: "3 reseñas pendientes de respuesta",
    time: "Hace 1 día",
  },
  {
    type: "info",
    icon: Award,
    text: 'Nominado a "Mejor Restaurante Típico 2024" por la comunidad',
    time: "Hace 3 días",
  },
  {
    type: "info",
    icon: Camera,
    text: "Agrega más fotos para mejorar tu perfil turístico",
    time: "Recomendación IA",
  },
]

const aiRecommendations = [
  {
    title: "Responde reseñas pendientes",
    description: "Responder reseñas aumenta tu índice de confianza hasta +3 puntos. Tienes 3 sin responder.",
    impact: "+3 puntos",
    icon: MessageCircle,
  },
  {
    title: "Actualiza tu horario navideño",
    description: "Los viajeros consultan horarios festivos con anticipación. Actualiza para diciembre.",
    impact: "+1.5 puntos",
    icon: Calendar,
  },
  {
    title: "Añade tu certificación sanitaria",
    description: "Los establecimientos con certificación visible tienen 34% más visitas.",
    impact: "+2 puntos",
    icon: FileText,
  },
]

const allianceMatches = [
  {
    name: "Hotel Casa Colonial",
    category: "Alojamiento",
    trust: 96,
    synergy: 94,
    distance: "320 m",
    description: "Ofrecen paquetes 'noche + gastronomía'. Alta demanda de sus huéspedes por cocina típica local.",
    matchReason: "Complementariedad gastronómica",
    commonVisitors: 38,
    status: "nuevo",
  },
  {
    name: "Artesanías del Cauca",
    category: "Artesanías",
    trust: 91,
    synergy: 88,
    distance: "1.2 km",
    description: "Sus clientes buscan experiencias culturales completas. Propuesta de ruta cultural conjunta.",
    matchReason: "Ruta cultural compartida",
    commonVisitors: 24,
    status: "nuevo",
  },
  {
    name: "Tour Popayán Colonial",
    category: "Operador Turístico",
    trust: 89,
    synergy: 85,
    distance: "800 m",
    description: "Operador con tours por el Centro Histórico que incluyen paradas gastronómicas. Potencial de inclusión en ruta.",
    matchReason: "Parada gastronómica en tour",
    commonVisitors: 61,
    status: "contactado",
  },
  {
    name: "Cerro de las Tres Cruces",
    category: "Naturaleza",
    trust: 89,
    synergy: 78,
    distance: "3.4 km",
    description: "Visitantes de naturaleza buscan almorzar típico después del sendero. Alta demanda no cubierta.",
    matchReason: "Post-aventura gastronómica",
    commonVisitors: 17,
    status: "nuevo",
  },
]

const synergyOpportunities = [
  {
    title: "Paquete 'Noche Payanesa'",
    partners: ["Hotel Casa Colonial", "Artesanías del Cauca"],
    impact: "Alta",
    revenue: "+$2.4M COP/mes",
    icon: Star,
    description: "Crear un paquete combinado: hospedaje colonial + cena típica + artesanía. El modelo predice una conversión del 34%.",
  },
  {
    title: "Ruta del Sabor Colonial",
    partners: ["Tour Popayán Colonial", "Hotel Casa Colonial"],
    impact: "Media",
    revenue: "+$1.1M COP/mes",
    icon: MapPinned,
    description: "Inclusión como parada gastronómica obligatoria en el tour colonial más popular de la ciudad.",
  },
  {
    title: "Festival Gastronómico Digital",
    partners: ["Artesanías del Cauca", "Tour Popayán Colonial"],
    impact: "Alta",
    revenue: "+$3.8M COP/evento",
    icon: Zap,
    description: "Co-organizar un festival mensual que combine gastronomía típica, artesanías y recorridos. Alta viralidad en redes.",
  },
]

const monthlyVisits = [
  { month: "Ago", visits: 820, experiences: 68 },
  { month: "Sep", visits: 940, experiences: 82 },
  { month: "Oct", visits: 1050, experiences: 91 },
  { month: "Nov", visits: 1120, experiences: 103 },
  { month: "Dic", visits: 1380, experiences: 124 },
  { month: "Ene", visits: 1050, experiences: 87 },
  { month: "Feb", visits: 1180, experiences: 108 },
  { month: "Mar", visits: 1247, experiences: 115 },
]

const maxVisits = Math.max(...monthlyVisits.map((m) => m.visits))

export default function ActorPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "suggestions" | "alianzas">("overview")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  return (
    <div className="relative min-h-dvh bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 pb-28 pt-16 md:pb-12 md:pt-24 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative size-16 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                <Image
                  src="/images/rest-tradicional.png"
                  alt="Restaurante El Serrano"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-gold flex items-center justify-center">
                <CheckCircle2 className="size-3 text-gold-foreground" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl font-bold text-foreground tracking-tight">
                  Restaurante El Serrano
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold">
                  <Shield className="size-3" />
                  Verificado
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Barrio Bolívar, Popayán · Gastronomía típica
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70">
              <Bell className="size-3.5" />
              Alertas
              <span className="inline-flex items-center justify-center bg-primary text-primary-foreground size-4 rounded-full text-[9px] font-bold">
                3
              </span>
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70">
              <Settings className="size-3.5" />
              Perfil
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]">
              <Plus className="size-3.5" />
              Nueva publicación
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{kpi.label}</p>
                  <div className={cn("grid size-10 place-items-center rounded-xl", kpi.bg)}>
                    <kpi.icon className={cn("size-5", kpi.color)} />
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</span>
                  <span className="text-sm text-muted-foreground mb-0.5">{kpi.unit}</span>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="size-3 text-gold" />
                  ) : (
                    <TrendingDown className="size-3 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      kpi.trend === "up"
                        ? "text-gold"
                        : "text-destructive"
                    )}
                  >
                    {kpi.delta}
                  </span>
                  <span className="text-xs text-muted-foreground">este mes</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1.5 mb-6 glass p-1.5 rounded-full w-fit flex-wrap">
          {(["overview", "reviews", "suggestions", "alianzas"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200",
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {tab === "overview"
                ? "Resumen"
                : tab === "reviews"
                ? "Reseñas"
                : tab === "suggestions"
                ? "Sugerencias IA"
                : "Alianzas IA"}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Visits chart */}
              <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base text-foreground font-semibold">
                        Visitas y experiencias
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-xs">Últimos 8 meses</CardDescription>
                    </div>
                    <BarChart3 className="size-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="flex items-end gap-2 h-36 pt-4 border-b border-border/10">
                    {monthlyVisits.map((m) => (
                      <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-full flex flex-col gap-0.5 items-center justify-end h-28">
                          <div
                            className="w-full rounded-t bg-primary/20 hover:bg-primary/30 transition-colors"
                            style={{ height: `${(m.experiences / maxVisits) * 100}%` }}
                            title={`${m.experiences} experiencias`}
                          />
                          <div
                            className="w-full rounded-t bg-primary hover:bg-primary/95 transition-colors"
                            style={{ height: `${((m.visits - m.experiences) / maxVisits) * 100}%` }}
                            title={`${m.visits} visitas`}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground font-semibold mb-1">{m.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="size-2.5 rounded-sm bg-primary" />
                      Visitas al perfil
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="size-2.5 rounded-sm bg-primary/20" />
                      Experiencias escritas
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-base text-foreground flex items-center gap-2 font-semibold">
                    <Bell className="size-4 text-primary" />
                    Notificaciones recientes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex flex-col gap-3">
                  {alerts.map((alert, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-xl border border-border/10",
                        alert.type === "success"
                          ? "bg-gold/5 border-gold/20"
                          : alert.type === "warning"
                            ? "bg-destructive/5 border-destructive/20"
                            : "bg-secondary/40"
                      )}
                    >
                      <div
                        className={cn(
                          "grid size-8 place-items-center rounded-lg shrink-0",
                          alert.type === "success"
                            ? "bg-gold/15 text-gold"
                            : alert.type === "warning"
                              ? "bg-destructive/15 text-destructive"
                              : "bg-primary/15 text-primary"
                        )}
                      >
                        <alert.icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{alert.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* Trust Index */}
              <Card className="rounded-2xl glass overflow-hidden border border-border/20">
                <div className="bg-primary/10 border-b border-border/25 px-5 py-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Tu Índice de Confianza
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-bold text-foreground tracking-tight">93</span>
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold uppercase tracking-wide">
                        Excelente
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="size-3 text-gold" />
                        +2 pts este mes
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 flex flex-col gap-3">
                  {trustFactors.map((f) => (
                    <div key={f.label} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{f.label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-foreground">{f.score}</span>
                          {f.score > f.prev ? (
                            <ArrowUpRight className="size-3 text-gold" />
                          ) : null}
                        </div>
                      </div>
                      <Progress value={f.score} className="h-1.5" />
                    </div>
                  ))}
                  <button
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 mt-2"
                    onClick={() => setActiveTab("suggestions")}
                  >
                    <Sparkles className="size-3.5 text-primary" />
                    Ver cómo mejorar
                    <ChevronRight className="size-3.5" />
                  </button>
                </CardContent>
              </Card>

              {/* Top reviews quick view */}
              <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm text-foreground flex items-center justify-between font-semibold">
                    Últimas reseñas
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Ver todas
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex flex-col gap-4">
                  {recentReviews.slice(0, 2).map((r) => (
                    <div key={r.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                            {r.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold text-foreground flex-1">
                          {r.name} {r.flag}
                        </span>
                        <TrustIndex score={r.rating} size="sm" showLabel={false} />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 pl-8 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === "reviews" && (
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-foreground">
                Reseñas verificadas
              </h2>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-secondary/80 px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                {recentReviews.length} este mes
              </span>
            </div>
            {recentReviews.map((r, i) => (
              <Card key={r.name} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                          {r.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {r.name} {r.flag}
                          </span>
                          {r.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.2 text-[9px] font-bold text-gold uppercase tracking-wide">
                              <CheckCircle2 className="size-3" />
                              Verificado
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                    </div>
                    <TrustIndex score={r.rating} size="sm" />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.text}</p>

                  {r.replied ? (
                    <div className="bg-secondary/40 border border-border/10 rounded-xl p-3 text-xs text-muted-foreground border-l-2 border-primary">
                      <span className="font-semibold text-foreground">Tu respuesta:</span>{" "}
                      Muchas gracias por tu visita y por tomarte el tiempo de escribir esta reseña.
                      ¡Te esperamos pronto!
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {replyingTo === i ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            className="w-full text-sm border border-border/20 rounded-xl p-3 bg-card text-foreground placeholder:text-muted-foreground resize-none outline-none focus:border-primary transition-colors"
                            placeholder="Escribe tu respuesta..."
                            rows={3}
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyingTo(null)}
                            >
                              Cancelar
                            </Button>
                            <Button size="sm" className="gap-1.5">
                              <MessageCircle className="size-3.5" />
                              Responder
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReplyingTo(i)}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 w-fit"
                        >
                          <MessageCircle className="size-3.5 text-primary" />
                          Responder reseña
                          <span className="inline-flex items-center rounded-full bg-gold/10 border border-gold/30 px-1.5 py-0.2 text-[9px] font-medium text-gold uppercase tracking-wide">
                            Pendiente
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* AI Suggestions tab */}
        {activeTab === "suggestions" && (
          <div className="flex flex-col gap-6 max-w-3xl">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold uppercase tracking-wide">
                  <Sparkles className="size-3" />
                  Análisis de IA
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Recomendaciones personalizadas
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Basadas en el análisis de tu perfil, reseñas y datos de la plataforma.
              </p>
            </div>

            {aiRecommendations.map((rec, i) => (
              <Card key={rec.title} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 shrink-0">
                      <rec.icon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-base text-foreground leading-tight">
                          {rec.title}
                        </h3>
                        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold uppercase tracking-wide shrink-0">
                          {rec.impact}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed text-pretty">
                        {rec.description}
                      </p>
                      <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 mt-3">
                        Aplicar ahora
                        <ChevronRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-primary/20 bg-primary/5 rounded-2xl p-1">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 shrink-0">
                  <Award className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    Potencial máximo de confianza
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 text-pretty">
                    Siguiendo estas 3 recomendaciones podrías alcanzar un índice de{" "}
                    <strong className="text-primary">99/100</strong>
                  </p>
                </div>
                <TrustIndex score={99} size="md" showLabel={false} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Alianzas IA tab */}
        {activeTab === "alianzas" && (
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold uppercase tracking-wide">
                  <Sparkles className="size-3" />
                  IA de Alianzas Turísticas
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Oportunidades de Alianza Detectadas
              </h2>
              <p className="text-muted-foreground text-sm mt-1 text-pretty max-w-2xl">
                El motor de IA identificó {allianceMatches.length} actores turísticos con alta compatibilidad de sinergias basada en proximidad, perfil de visitantes compartidos e índice de confianza.
              </p>
            </div>

            {/* Match cards */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Link2 className="size-3.5 text-primary" />
                Matches de alta compatibilidad
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {allianceMatches.map((match) => (
                  <Card key={match.name} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40 group">
                    <CardContent className="p-5">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20 shrink-0">
                            <Users className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground leading-tight">{match.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{match.category} · {match.distance}</p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0",
                            match.status === "contactado"
                              ? "bg-gold/10 text-gold border border-gold/30"
                              : "bg-primary/10 text-primary border border-primary/30"
                          )}
                        >
                          {match.status === "contactado" ? "Contactado" : "Nuevo match"}
                        </span>
                      </div>

                      {/* Synergy score */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Sinergia</span>
                            <span className="text-xs font-bold text-foreground">{match.synergy}/100</span>
                          </div>
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all",
                                match.synergy >= 90 ? "bg-gold" : "bg-primary"
                              )}
                              style={{ width: `${match.synergy}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Eye className="size-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground font-medium">{match.commonVisitors}% visitantes comunes</span>
                        </div>
                      </div>

                      {/* Reason badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/60 border border-border/20 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          <Zap className="size-3 text-gold" />
                          {match.matchReason}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 text-pretty">
                        {match.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow shadow-primary/30 transition-transform hover:scale-[1.02]">
                          <HandshakeIcon className="size-3" />
                          Conectar
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70">
                          Ver perfil
                          <ChevronRight className="size-3" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Synergy Opportunities */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="size-3.5 text-gold" />
                Oportunidades de negocio generadas
              </h3>
              <div className="flex flex-col gap-4">
                {synergyOpportunities.map((opp) => (
                  <Card key={opp.title} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-gold/40">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="grid size-10 place-items-center rounded-xl bg-gold/10 ring-1 ring-gold/30 shrink-0">
                          <opp.icon className="size-5 text-gold" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-semibold text-base text-foreground leading-tight">{opp.title}</h4>
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={cn(
                                  "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                                  opp.impact === "Alta"
                                    ? "bg-gold/10 text-gold border border-gold/30"
                                    : "bg-primary/10 text-primary border border-primary/30"
                                )}
                              >
                                Impacto {opp.impact}
                              </span>
                              <span className="text-xs font-bold text-gold">{opp.revenue}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed text-pretty">{opp.description}</p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-3">
                            <span className="text-[10px] text-muted-foreground font-medium">Con:</span>
                            {opp.partners.map((partner) => (
                              <span
                                key={partner}
                                className="inline-flex items-center gap-1 rounded-full bg-secondary border border-border/20 px-2 py-0.5 text-[10px] font-medium text-foreground"
                              >
                                {partner}
                              </span>
                            ))}
                          </div>
                          <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70 mt-3">
                            Explorar oportunidad
                            <ArrowUpRight className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
