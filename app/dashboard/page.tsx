"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TrustIndex } from "@/components/trust-index"
import {
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Award,
  Shield,
  Globe,
  Sparkles,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Layers,
  Landmark,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ── data ───────────────────────────────────────────────── */

const cityKpis = [
  {
    label: "Índice de Confianza Ciudad",
    value: "94",
    unit: "/100",
    delta: "+3",
    trend: "up",
    icon: Shield,
    color: "text-gold",
    bg: "bg-gold/10 ring-1 ring-gold/30",
    desc: "Promedio ponderado de todos los sectores",
  },
  {
    label: "Visitantes este mes",
    value: "48,320",
    unit: "",
    delta: "+22%",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/15 ring-1 ring-primary/30",
    desc: "Nacionales e internacionales",
  },
  {
    label: "Actores turísticos",
    value: "312",
    unit: "",
    delta: "+18",
    trend: "up",
    icon: Landmark,
    color: "text-primary",
    bg: "bg-primary/15 ring-1 ring-primary/30",
    desc: "Verificados en la plataforma",
  },
  {
    label: "Experiencias publicadas",
    value: "2,418",
    unit: "",
    delta: "+156",
    trend: "up",
    icon: CheckCircle2,
    color: "text-gold",
    bg: "bg-gold/10 ring-1 ring-gold/30",
    desc: "Total verificadas por IA",
  },
]

const sectorTrust = [
  { name: "Patrimonio & Historia", score: 97, experiences: 842, trend: "up", delta: "+1" },
  { name: "Gastronomía", score: 94, experiences: 634, trend: "up", delta: "+3" },
  { name: "Alojamiento", score: 91, experiences: 389, trend: "up", delta: "+2" },
  { name: "Artesanías", score: 89, experiences: 218, trend: "stable", delta: "0" },
  { name: "Turismo Religioso", score: 96, experiences: 521, trend: "up", delta: "+4" },
  { name: "Naturaleza & Aventura", score: 88, experiences: 312, trend: "down", delta: "-1" },
  { name: "Transporte turístico", score: 82, experiences: 145, trend: "up", delta: "+5" },
  { name: "Entretenimiento & Cultura", score: 90, experiences: 267, trend: "up", delta: "+2" },
]

const monthlyTrend = [
  { month: "May", visitors: 31200, intl: 4200, trust: 89 },
  { month: "Jun", visitors: 33500, intl: 4900, trust: 90 },
  { month: "Jul", visitors: 36800, intl: 5600, trust: 91 },
  { month: "Ago", visitors: 34100, intl: 5100, trust: 90 },
  { month: "Sep", visitors: 38200, intl: 6200, trust: 92 },
  { month: "Oct", visitors: 41500, intl: 6800, trust: 92 },
  { month: "Nov", visitors: 43200, intl: 7100, trust: 93 },
  { month: "Dic", visitors: 52100, intl: 9200, trust: 93 },
  { month: "Ene", visitors: 38400, intl: 6500, trust: 93 },
  { month: "Feb", visitors: 42100, intl: 7300, trust: 94 },
  { month: "Mar", visitors: 48320, intl: 8400, trust: 94 },
]

const originMap = [
  { country: "Colombia", pct: 67, flag: "🇨🇴", visitors: 32374 },
  { country: "Ecuador", pct: 8, flag: "🇪🇨", visitors: 3866 },
  { country: "USA", pct: 6, flag: "🇺🇸", visitors: 2899 },
  { country: "México", pct: 5, flag: "🇲🇽", visitors: 2416 },
  { country: "España", pct: 4, flag: "🇪🇸", visitors: 1933 },
  { country: "Alemania", pct: 3, flag: "🇩🇪", visitors: 1450 },
  { country: "Otros", pct: 7, flag: "🌍", visitors: 3382 },
]

const alerts = [
  {
    type: "warning",
    sector: "Transporte turístico",
    message: "Índice de confianza bajo en 12 agencias de transporte. Se requiere intervención.",
    severity: "Alta",
  },
  {
    type: "info",
    sector: "Semana Santa 2025",
    message: "Proyección de 65,000 visitantes. Capacidad hotelera al 94%. Coordinación necesaria.",
    severity: "Media",
  },
  {
    type: "success",
    sector: "Gastronomía",
    message:
      "El sector gastronómico subió 3 puntos en confianza. 18 nuevos restaurantes verificados.",
    severity: "Positiva",
  },
  {
    type: "warning",
    sector: "Naturaleza & Aventura",
    message: "Descenso de 1 punto en naturaleza. Posibles problemas con guías no certificados.",
    severity: "Media",
  },
]

const topActors = [
  { name: "Catedral de Popayán", sector: "Patrimonio", trust: 97, visits: "12.4K", rank: 1 },
  { name: "Hotel Casa Colonial", sector: "Alojamiento", trust: 96, visits: "3.1K", rank: 2 },
  { name: "Restaurante El Serrano", sector: "Gastronomía", trust: 93, visits: "8.2K", rank: 3 },
  { name: "Artesanías del Cauca", sector: "Artesanías", trust: 91, visits: "5.8K", rank: 4 },
  { name: "Cerro de las Tres Cruces", sector: "Naturaleza", trust: 89, visits: "6.7K", rank: 5 },
]

const aiInsights = [
  {
    title: "Alta demanda proyectada — Semana Santa",
    detail:
      "El modelo predice 65K visitantes en Semana Santa 2025, un 8% más que 2024. Hay riesgo de saturación hotelera en el Centro Histórico.",
    action: "Planificar distribución zonal",
    icon: Calendar,
  },
  {
    title: "Brecha de confianza en transporte",
    detail:
      "El sector transporte tiene el índice más bajo (82/100). Las quejas principales son: puntualidad y precio. 12 actores necesitan capacitación.",
    action: "Ver actores afectados",
    icon: AlertCircle,
  },
  {
    title: "Oportunidad en turismo de naturaleza",
    detail:
      "El interés en turismo de naturaleza creció 34% pero la oferta verificada es limitada. Se recomienda ampliar la certificación de guías.",
    action: "Ver informe completo",
    icon: Activity,
  },
]

const maxVisitors = Math.max(...monthlyTrend.map((m) => m.visitors))

/* ── heatmap zones ──────────────────────────────────────── */
const heatmapZones = [
  { id: "z1", name: "Centro Histórico", cx: 195, cy: 148, r: 38, intensity: 97, visitors: "12.4K", color: "oklch(0.78 0.18 55)" },
  { id: "z2", name: "Barrio Bolívar", cx: 148, cy: 178, r: 26, intensity: 82, visitors: "8.2K", color: "oklch(0.65 0.2 265)" },
  { id: "z3", name: "El Empedrado", cx: 248, cy: 165, r: 20, intensity: 68, visitors: "5.8K", color: "oklch(0.65 0.2 265)" },
  { id: "z4", name: "Cerro Las Cruces", cx: 295, cy: 110, r: 22, intensity: 74, visitors: "6.7K", color: "oklch(0.65 0.2 265)" },
  { id: "z5", name: "Villa del Norte", cx: 120, cy: 115, r: 16, intensity: 45, visitors: "3.1K", color: "oklch(0.6 0.15 265)" },
  { id: "z6", name: "Las Palmas", cx: 260, cy: 220, r: 14, intensity: 38, visitors: "2.4K", color: "oklch(0.6 0.15 265)" },
  { id: "z7", name: "La Pamba", cx: 158, cy: 230, r: 18, intensity: 54, visitors: "4.1K", color: "oklch(0.6 0.15 265)" },
  { id: "z8", name: "San José", cx: 312, cy: 185, r: 12, intensity: 29, visitors: "1.8K", color: "oklch(0.55 0.12 265)" },
]

/* ── component ──────────────────────────────────────────── */

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState<"3m" | "6m" | "12m">("12m")
  const [activeView, setActiveView] = useState<"overview" | "sectors" | "intelligence">(
    "overview"
  )

  const displayedMonths =
    activePeriod === "3m"
      ? monthlyTrend.slice(-3)
      : activePeriod === "6m"
        ? monthlyTrend.slice(-6)
        : monthlyTrend

  const maxDisplay = Math.max(...displayedMonths.map((m) => m.visitors))

  return (
    <div className="relative min-h-dvh bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 pb-28 pt-16 md:pb-12 md:pt-24 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
                <Sparkles className="size-3" />
                Inteligencia Turística IA
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Dashboard de Gobernanza Turística
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Municipio de Popayán, Cauca · Actualizado en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70">
              <Download className="size-4" />
              Exportar informe
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]">
              <Sparkles className="size-4" />
              Análisis IA
            </button>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cityKpis.map((kpi) => (
            <Card key={kpi.label} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{kpi.label}</p>
                  <div className={cn("grid size-10 place-items-center rounded-xl", kpi.bg)}>
                    <kpi.icon className={cn("size-5", kpi.color)} />
                  </div>
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</span>
                  <span className="text-sm text-muted-foreground mb-0.5">{kpi.unit}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="size-3.5 text-gold" />
                  ) : (
                    <ArrowDownRight className="size-3.5 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "text-xs font-bold",
                      kpi.trend === "up"
                        ? "text-gold"
                        : "text-destructive"
                    )}
                  >
                    {kpi.delta}
                  </span>
                  <span className="text-xs text-muted-foreground">{kpi.desc}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sub-nav */}
        <div className="flex gap-1.5 mb-6 glass p-1.5 rounded-full w-fit">
          {(["overview", "sectors", "intelligence"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200",
                activeView === v
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {v === "overview" ? "Resumen" : v === "sectors" ? "Sectores" : "Inteligencia IA"}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeView === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Visitor trend chart */}
              <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base text-foreground font-semibold">
                        Flujo de visitantes
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-xs">Visitantes nacionales e internacionales</CardDescription>
                    </div>
                    <div className="flex gap-1 bg-secondary/80 p-0.5 rounded-lg border border-border/10">
                      {(["3m", "6m", "12m"] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setActivePeriod(p)}
                          className={cn(
                            "px-2.5 py-1 rounded-md text-[11px] font-bold transition-all",
                            activePeriod === p
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="flex items-end gap-1.5 h-40 pt-4 border-b border-border/10">
                    {displayedMonths.map((m) => (
                      <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-full flex flex-col gap-0.5 items-center justify-end h-32">
                          {/* International portion */}
                          <div
                            className="w-full bg-primary/25 hover:bg-primary/40 transition-colors rounded-t-sm"
                            style={{ height: `${(m.intl / maxDisplay) * 100}%` }}
                            title={`Internacional: ${m.intl.toLocaleString()}`}
                          />
                          {/* National portion */}
                          <div
                            className="w-full bg-primary hover:bg-primary/95 transition-colors rounded-t-sm"
                            style={{
                              height: `${((m.visitors - m.intl) / maxDisplay) * 100}%`,
                            }}
                            title={`Nacional: ${(m.visitors - m.intl).toLocaleString()}`}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground font-semibold mb-1">{m.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="size-2.5 rounded-sm bg-primary" />
                      Nacionales
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="size-2.5 rounded-sm bg-primary/25" />
                      Internacionales
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Heatmap */}
              <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base text-foreground font-semibold flex items-center gap-2">
                        <MapPin className="size-4 text-primary" />
                        Mapa de actividad turística
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-xs mt-0.5">Intensidad de visitas por zona — Popayán</CardDescription>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wide">
                      En vivo
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="relative w-full rounded-xl overflow-hidden bg-secondary/30 border border-border/15" style={{ paddingBottom: "56%" }}>
                    <svg
                      viewBox="0 0 420 280"
                      className="absolute inset-0 w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* City grid background */}
                      <defs>
                        <pattern id="city-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border/30" />
                        </pattern>
                        <radialGradient id="glow-gold" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="oklch(0.78 0.18 55)" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="oklch(0.78 0.18 55)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="glow-primary" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="oklch(0.65 0.2 265)" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="oklch(0.65 0.2 265)" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      <rect width="420" height="280" fill="url(#city-grid)" />

                      {/* Road network sketch */}
                      <path d="M 0 148 Q 100 140 195 148 Q 280 155 420 145" stroke="currentColor" strokeWidth="2" fill="none" className="text-border/20" />
                      <path d="M 195 0 Q 190 80 195 148 Q 198 210 200 280" stroke="currentColor" strokeWidth="2" fill="none" className="text-border/20" />
                      <path d="M 0 210 Q 120 205 260 220 Q 350 230 420 215" stroke="currentColor" strokeWidth="1" fill="none" className="text-border/15" />
                      <path d="M 90 0 Q 95 80 120 115 Q 145 150 148 178" stroke="currentColor" strokeWidth="1" fill="none" className="text-border/15" />
                      <path d="M 310 0 Q 305 60 295 110 Q 285 160 312 185" stroke="currentColor" strokeWidth="1" fill="none" className="text-border/15" />

                      {/* Heatmap glow layers */}
                      {heatmapZones.map((zone) => (
                        <ellipse
                          key={`glow-${zone.id}`}
                          cx={zone.cx}
                          cy={zone.cy}
                          rx={zone.r * 2.2}
                          ry={zone.r * 1.8}
                          fill={zone.intensity >= 90 ? "url(#glow-gold)" : "url(#glow-primary)"}
                          opacity={zone.intensity / 120}
                        />
                      ))}

                      {/* Zone circles */}
                      {heatmapZones.map((zone) => (
                        <g key={zone.id} className="group cursor-pointer">
                          <circle
                            cx={zone.cx}
                            cy={zone.cy}
                            r={zone.r + 6}
                            fill={zone.color}
                            opacity={0.12}
                          />
                          <circle
                            cx={zone.cx}
                            cy={zone.cy}
                            r={zone.r}
                            fill={zone.color}
                            opacity={0.75}
                          >
                            <animate attributeName="r" values={`${zone.r};${zone.r + 2};${zone.r}`} dur="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.75;0.9;0.75" dur="3s" repeatCount="indefinite" />
                          </circle>
                          {/* Label */}
                          <text
                            x={zone.cx}
                            y={zone.cy + 1}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={zone.r > 25 ? "9" : "7.5"}
                            fontWeight="700"
                            fill="white"
                            opacity="0.95"
                          >
                            {zone.visitors}
                          </text>
                        </g>
                      ))}

                      {/* Legend label */}
                      <text x="8" y="270" fontSize="8" fill="currentColor" opacity="0.4" className="text-muted-foreground">Popayán, Cauca · Colombia</text>
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2.5 rounded-full bg-gold" />
                      <span className="text-[10px] text-muted-foreground font-medium">Alta intensidad (&gt;90)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-2.5 rounded-full bg-primary" />
                      <span className="text-[10px] text-muted-foreground font-medium">Media intensidad (50–89)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-2.5 rounded-full bg-primary/40" />
                      <span className="text-[10px] text-muted-foreground font-medium">Baja intensidad (&lt;50)</span>
                    </div>
                  </div>

                  {/* Zone breakdown */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {heatmapZones.slice(0, 4).map((zone) => (
                      <div key={zone.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 border border-border/10">
                        <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: zone.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-foreground truncate">{zone.name}</p>
                          <p className="text-[9px] text-muted-foreground">{zone.visitors} visitas</p>
                        </div>
                        <span className="text-[10px] font-bold text-foreground shrink-0">{zone.intensity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-base text-foreground flex items-center gap-2 font-semibold">
                    <AlertCircle className="size-4 text-gold" />
                    Alertas de gestión
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex flex-col gap-3">
                  {alerts.map((alert, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-xl border border-border/10",
                        alert.type === "success"
                          ? "bg-gold/5 border-gold/25"
                          : alert.type === "warning"
                            ? "bg-destructive/5 border-destructive/25"
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
                        {alert.type === "success" ? (
                          <CheckCircle2 className="size-4" />
                        ) : alert.type === "warning" ? (
                          <AlertCircle className="size-4" />
                        ) : (
                          <Activity className="size-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-foreground">
                            {alert.sector}
                          </span>
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                              alert.severity === "Alta"
                                ? "bg-destructive/10 text-destructive border border-destructive/20"
                                : alert.severity === "Positiva"
                                  ? "bg-gold/10 text-gold border border-gold/20"
                                  : "bg-primary/10 text-primary border border-primary/20"
                            )}
                          >
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* City Trust Index */}
              <Card className="rounded-2xl glass overflow-hidden border border-border/20">
                <div className="bg-primary/15 border-b border-border/20 px-5 py-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Índice Ciudad
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-bold text-foreground tracking-tight">94</span>
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold uppercase tracking-wide">
                        Excelente
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="size-3 text-gold" />
                        Top 5 Colombia
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Índice de confianza mensual
                  </p>
                  <div className="flex items-end gap-1.5 h-12 pt-2">
                    {monthlyTrend.slice(-8).map((m) => (
                      <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                        <div
                          className="w-full rounded bg-primary/20 hover:bg-primary/40 transition-colors relative h-8"
                          style={{ height: `${((m.trust - 80) / 20) * 100}%` }}
                        >
                          <div
                            className="absolute bottom-0 w-full bg-primary rounded"
                            style={{ height: "60%" }}
                          />
                        </div>
                        <span className="text-[9px] text-muted-foreground font-semibold">{m.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top actors */}
              <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2 font-semibold">
                    <Award className="size-4 text-gold" />
                    Top actores turísticos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex flex-col divide-y divide-border/10">
                  {topActors.map((actor) => (
                    <div key={actor.name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <span
                        className={cn(
                          "text-sm font-bold shrink-0 w-5 text-center",
                          actor.rank === 1
                            ? "text-gold"
                            : actor.rank === 2
                              ? "text-muted-foreground"
                              : actor.rank === 3
                                ? "text-primary"
                                : "text-muted-foreground"
                        )}
                      >
                        {actor.rank}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {actor.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{actor.sector}</p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5 shrink-0">
                        <TrustIndex score={actor.trust} size="sm" showLabel={false} />
                        <span className="text-[10px] text-muted-foreground font-semibold">{actor.visits}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Origin */}
              <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm text-foreground flex items-center gap-2 font-semibold">
                    <Globe className="size-4 text-primary" />
                    Origen de visitantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex flex-col gap-3">
                  {originMap.map((o) => (
                    <div key={o.country} className="flex items-center gap-2">
                      <span className="text-sm shrink-0">{o.flag}</span>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground font-medium">{o.country}</span>
                          <span className="text-xs font-bold text-foreground">
                            {o.pct}%
                          </span>
                        </div>
                        <Progress value={o.pct} className="h-1 bg-secondary" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Sectors tab */}
        {activeView === "sectors" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-foreground">
                Índice de confianza por sector
              </h2>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-secondary/80 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                {sectorTrust.length} sectores
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {sectorTrust.map((sector) => (
                <Card key={sector.name} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">
                          {sector.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {sector.experiences.toLocaleString()} experiencias
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <TrustIndex score={sector.score} size="md" showLabel={false} />
                        <div
                          className={cn(
                            "flex items-center gap-0.5 text-xs font-semibold",
                            sector.trend === "up"
                              ? "text-gold"
                              : sector.trend === "down"
                                ? "text-destructive"
                                : "text-muted-foreground"
                          )}
                        >
                          {sector.trend === "up" ? (
                            <TrendingUp className="size-3 text-gold" />
                          ) : sector.trend === "down" ? (
                            <TrendingDown className="size-3 text-destructive" />
                          ) : null}
                          {sector.delta !== "0" ? sector.delta : "Estable"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Índice de confianza</span>
                        <span className="text-xs font-bold text-foreground">
                          {sector.score}/100
                        </span>
                      </div>
                      <Progress
                        value={sector.score}
                        className={cn(
                          "h-2 bg-secondary",
                          sector.score >= 90
                            ? "[&>div]:bg-gold"
                            : sector.score >= 80
                              ? "[&>div]:bg-primary"
                              : "[&>div]:bg-destructive"
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparative bars */}
            <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-base text-foreground flex items-center gap-2 font-semibold">
                  <BarChart3 className="size-4 text-primary" />
                  Comparativa de confianza por sector
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="flex flex-col gap-4">
                  {[...sectorTrust]
                    .sort((a, b) => b.score - a.score)
                    .map((sector) => (
                      <div key={sector.name} className="flex items-center gap-4">
                        <span className="text-xs text-foreground font-medium w-44 shrink-0 text-right truncate">
                          {sector.name}
                        </span>
                        <div className="flex-1 flex items-center gap-3">
                          <div className="flex-1 bg-secondary rounded-full h-2.5 overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all",
                                sector.score >= 90
                                  ? "bg-gold"
                                  : sector.score >= 80
                                    ? "bg-primary"
                                    : "bg-destructive"
                              )}
                              style={{ width: `${sector.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-foreground w-8 text-right">
                            {sector.score}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Intelligence tab */}
        {activeView === "intelligence" && (
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold uppercase tracking-wide">
                  <Sparkles className="size-3" />
                  Motor de Inteligencia IA
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Análisis predictivo y recomendaciones de política pública
              </h2>
              <p className="text-muted-foreground text-sm mt-1 max-w-2xl text-pretty">
                Generado automáticamente por el modelo de IA de Travesía Blanca a partir del análisis de
                48,320 visitas, 2,418 experiencias y datos históricos del sector.
              </p>
            </div>

            {aiInsights.map((insight, i) => (
              <Card key={insight.title} className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 shrink-0">
                      <insight.icon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-heading font-bold text-lg text-foreground leading-tight">
                          {insight.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.2 text-[10px] font-bold text-gold uppercase tracking-wide shrink-0">
                          IA
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed text-pretty">
                        {insight.detail}
                      </p>
                      <div className="flex items-center gap-3 mt-4">
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70">
                          {insight.action}
                          <ArrowUpRight className="size-3.5" />
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70">
                          <Download className="size-3.5 text-primary" />
                          Exportar
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Projections */}
            <Card className="border-primary/20 bg-primary/5 rounded-2xl p-1 border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 shrink-0">
                    <Layers className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      Proyección 2025
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed text-pretty">
                      Con base en las tendencias actuales y las políticas de mejora propuestas, el
                      modelo proyecta alcanzar un Índice de Confianza de{" "}
                      <strong className="text-primary">97/100</strong> para finales de 2025,
                      posicionando a Popayán como el destino turístico más confiable de Colombia.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4 mt-4">
                      {[
                        { label: "Visitantes proyectados", value: "620K", delta: "+28%" },
                        { label: "Índice de confianza", value: "97/100", delta: "+3 pts" },
                        {
                          label: "Actores certificados",
                          value: "450+",
                          delta: "+138",
                        },
                      ].map((proj) => (
                        <div
                          key={proj.label}
                          className="glass rounded-xl p-4 border border-border/10"
                        >
                          <p className="text-xs text-muted-foreground font-medium">{proj.label}</p>
                          <p className="text-xl font-bold text-foreground mt-1">{proj.value}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp className="size-3 text-gold" />
                            <span className="text-xs text-gold font-bold">
                              {proj.delta}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
