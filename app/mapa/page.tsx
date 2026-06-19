"use client"

import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
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

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

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
  {
    id: 11, name: "Museo Histórico Casa de Nariño", category: "culture", trust: 92,
    x: 46, y: 30, visits: "7.5K", hours: "9am–5pm",
    description: "Colecciones históricas que narran la formación de Popayán y su patrimonio colonial.",
    image: "/images/catedral-popayan.png",
    tags: ["Historia", "Museo", "Cultura"],
    experiences: 110,
    distance: "0.5 km",
    rating: 4.7,
  },
  {
    id: 12, name: "Iglesia de San Francisco", category: "religious", trust: 94,
    x: 54, y: 40, visits: "6.8K", hours: "6am–7pm",
    description: "Templo barroco del siglo XVII con obras de arte religiosas y un ambiente solemne.",
    image: "/images/semana-santa.png",
    tags: ["Iglesia", "Arte Religioso"],
    experiences: 100,
    distance: "0.6 km",
    rating: 4.8,
  },
  {
    id: 13, name: "Restaurante La Casona del Puente", category: "gastronomy", trust: 93,
    x: 38, y: 56, visits: "9.9K", hours: "12pm–11pm",
    description: "Cocina local con platos típicos y especialidades caucanas en ambiente colonial.",
    image: "/images/rest-tradicional.png",
    tags: ["Tradicional", "Sabor Local"],
    experiences: 215,
    distance: "0.8 km",
    rating: 4.8,
  },
  {
    id: 14, name: "Parque Natural Regional", category: "nature", trust: 90,
    x: 22, y: 20, visits: "4.3K", hours: "5am–6pm",
    description: "Senderos naturales, avistamiento de aves y jardines de especies nativas del Cauca.",
    image: "/images/naturaleza.png",
    tags: ["Aventura", "Ecoturismo"],
    experiences: 135,
    distance: "2.8 km",
    rating: 4.8,
  },
  {
    id: 15, name: "Posada San Agustín", category: "lodging", trust: 94,
    x: 74, y: 44, visits: "2.7K", hours: "24h",
    description: "Posada tradicional con habitaciones cómodas, patio central y desayuno regional.",
    image: "/images/hotel-colonial.png",
    tags: ["Acogedor", "Familiar"],
    experiences: 76,
    distance: "0.9 km",
    rating: 4.6,
  },
  {
    id: 16, name: "Festival de Teatro Popayán", category: "events", trust: 97,
    x: 58, y: 58, visits: "11K", hours: "Según cartelera",
    description: "Encuentro internacional de teatro con obras locales, danza y performance urbana.",
    image: "/images/semana-santa.png",
    tags: ["Arte", "Festival", "Cultura"],
    experiences: 248,
    distance: "1.0 km",
    rating: 4.9,
  },
  {
    id: 17, name: "Morro de Tulcán", category: "culture", trust: 96,
    x: 30, y: 18, visits: "14K", hours: "6am–8pm",
    description: "Pirámide prehispánica considerada una de las más importantes de Colombia. Ofrece una vista panorámica de Popayán y es uno de los símbolos históricos de la ciudad.",
    image: "/images/morro-tulcan.png",
    tags: ["Arqueología", "Mirador", "Patrimonio"],
    experiences: 320,
    distance: "1.3 km",
    rating: 4.8,
  },
  {
    id: 18, name: "Rincón Payanés", category: "culture", trust: 93,
    x: 34, y: 24, visits: "8.5K", hours: "Siempre abierto",
    description: "Espacio cultural con réplicas en miniatura de los monumentos más emblemáticos de Popayán y zonas para artesanías y gastronomía local.",
    image: "/images/rincon-payanes.png",
    tags: ["Cultural", "Miniaturas", "Tradición"],
    experiences: 190,
    distance: "1.1 km",
    rating: 4.6,
  },
  {
    id: 19, name: "Museo de Historia Natural", category: "culture", trust: 94,
    x: 32, y: 28, visits: "5.4K", hours: "9am–5pm",
    description: "Museo de la Universidad del Cauca con salas de arqueología, paleontología, zoología y biodiversidad del sur de Colombia.",
    image: "/images/museo-natural.png",
    tags: ["Museo", "Ciencia", "Educación"],
    experiences: 140,
    distance: "1.0 km",
    rating: 4.7,
  },
  {
    id: 20, name: "Museo Casa Mosquera", category: "culture", trust: 91,
    x: 48, y: 34, visits: "3.8K", hours: "9am–5pm",
    description: "Casa museo dedicada a Tomás Cipriano de Mosquera, con exposiciones históricas sobre la independencia y la vida republicana colombiana.",
    image: "/images/museo-mosquera.png",
    tags: ["Historia", "Museo", "Patrimonio"],
    experiences: 110,
    distance: "0.5 km",
    rating: 4.6,
  },
  {
    id: 21, name: "Torre del Reloj", category: "culture", trust: 92,
    x: 52, y: 36, visits: "6.7K", hours: "Siempre abierto",
    description: "Monumento emblemático del centro histórico de Popayán conocido como la nariz de la ciudad blanca.",
    image: "/images/torre-reloj.png",
    tags: ["Histórico", "Centro", "Fotografía"],
    experiences: 170,
    distance: "Centro",
    rating: 4.7,
  },
  {
    id: 22, name: "Iglesia de Belén", category: "religious", trust: 95,
    x: 28, y: 16, visits: "7.2K", hours: "6am–7pm",
    description: "Templo religioso ubicado en una colina que ofrece una de las mejores vistas panorámicas de Popayán.",
    image: "/images/iglesia-belen.png",
    tags: ["Mirador", "Religioso", "Colonial"],
    experiences: 210,
    distance: "1.8 km",
    rating: 4.8,
  },
  {
    id: 23, name: "Casa Museo Guillermo León Valencia", category: "culture", trust: 92,
    x: 56, y: 34, visits: "3.5K", hours: "8am–5pm",
    description: "Museo dedicado a la vida y obra del expresidente Guillermo León Valencia, con fotografías y objetos históricos.",
    image: "/images/museo-guillermo-valencia.png",
    tags: ["Historia", "Museo", "Presidencia"],
    experiences: 90,
    distance: "0.4 km",
    rating: 4.6,
  },
  {
    id: 24, name: "Parque El Quijote", category: "nature", trust: 87,
    x: 62, y: 60, visits: "4.9K", hours: "Siempre abierto",
    description: "Parque urbano ideal para caminatas, actividades familiares y descanso en zonas verdes.",
    image: "/images/parque-quijote.png",
    tags: ["Parque", "Familia", "Naturaleza"],
    experiences: 120,
    distance: "1.9 km",
    rating: 4.5,
  },
  {
    id: 25, name: "Cascada San Bernardino", category: "nature", trust: 89,
    x: 18, y: 10, visits: "2.8K", hours: "7am–5pm",
    description: "Atractivo natural cercano a Popayán con senderos ecológicos, piscinas naturales y espacios para fotografía.",
    image: "/images/cascada-san-bernardino.png",
    tags: ["Ecoturismo", "Cascada", "Senderismo"],
    experiences: 95,
    distance: "8.5 km",
    rating: 4.7,
  },
  {
    id: 26, name: "Café Tiuspa", category: "gastronomy", trust: 94,
    x: 42, y: 42, visits: "7.1K", hours: "7am–8pm",
    description: "Cafetería reconocida por ofrecer café especial cultivado en las montañas del Cauca y experiencias de catación para visitantes.",
    image: "/images/cafe-tiuspa.png",
    tags: ["Café Especial", "Cauca", "Tradicional"],
    experiences: 185,
    distance: "0.7 km",
    rating: 4.8,
  },
  {
    id: 27, name: "Carantanta Gourmet", category: "gastronomy", trust: 92,
    x: 34, y: 50, visits: "6.3K", hours: "11am–10pm",
    description: "Restaurante especializado en platos típicos caucanos con propuestas modernas basadas en la gastronomía tradicional de Popayán.",
    image: "/images/carantanta-gourmet.png",
    tags: ["Carantanta", "Pipián", "Tradicional"],
    experiences: 162,
    distance: "0.9 km",
    rating: 4.7,
  },
  {
    id: 28, name: "La Fonda Payanesa", category: "gastronomy", trust: 93,
    x: 46, y: 58, visits: "8.8K", hours: "12pm–11pm",
    description: "Espacio gastronómico donde los visitantes pueden degustar empanadas de pipián, tamales de pipián y bebidas tradicionales.",
    image: "/images/fonda-payanesa.png",
    tags: ["Típico", "Pipián", "Tradición"],
    experiences: 214,
    distance: "1.1 km",
    rating: 4.8,
  },
  {
    id: 29, name: "Casa Artesanal del Cauca", category: "crafts", trust: 95,
    x: 68, y: 48, visits: "4.6K", hours: "8am–6pm",
    description: "Centro de exposición y venta de productos elaborados por comunidades indígenas y artesanos del departamento del Cauca.",
    image: "/images/casa-artesanal-cauca.png",
    tags: ["Artesanía", "Indígena", "Cultura"],
    experiences: 118,
    distance: "0.8 km",
    rating: 4.8,
  },
  {
    id: 30, name: "Taller de Tejidos Misak", category: "crafts", trust: 96,
    x: 72, y: 42, visits: "3.9K", hours: "9am–5pm",
    description: "Espacio donde se elaboran tejidos tradicionales de la comunidad Misak utilizando técnicas ancestrales.",
    image: "/images/tejidos-misak.png",
    tags: ["Tejidos", "Misak", "Tradición"],
    experiences: 96,
    distance: "1.0 km",
    rating: 4.9,
  },
  {
    id: 31, name: "Galería Artesanal La Ermita", category: "crafts", trust: 91,
    x: 60, y: 50, visits: "3.4K", hours: "9am–6pm",
    description: "Galería dedicada a la comercialización de cerámica, talla en madera y joyería artesanal caucana.",
    image: "/images/galeria-artesanal.png",
    tags: ["Cerámica", "Madera", "Arte"],
    experiences: 82,
    distance: "0.7 km",
    rating: 4.6,
  },
  {
    id: 32, name: "Hotel Dann Monasterio", category: "lodging", trust: 98,
    x: 70, y: 32, visits: "12K", hours: "24h",
    description: "Hotel de lujo ubicado en un antiguo monasterio colonial restaurado. Uno de los hospedajes más emblemáticos de Popayán.",
    image: "/images/hotel-monasterio.png",
    tags: ["Lujo", "Colonial", "Histórico"],
    experiences: 352,
    distance: "Centro",
    rating: 4.9,
  },
  {
    id: 33, name: "Hotel La Plazuela", category: "lodging", trust: 95,
    x: 76, y: 38, visits: "6.8K", hours: "24h",
    description: "Hotel boutique ubicado en el centro histórico con arquitectura colonial y servicios orientados al turismo cultural.",
    image: "/images/hotel-plazuela.png",
    tags: ["Boutique", "Centro Histórico", "Colonial"],
    experiences: 175,
    distance: "0.4 km",
    rating: 4.8,
  },
  {
    id: 34, name: "Hostal Ciudad Blanca", category: "lodging", trust: 92,
    x: 72, y: 52, visits: "4.5K", hours: "24h",
    description: "Hospedaje económico para viajeros nacionales e internacionales con ambiente cultural y espacios compartidos.",
    image: "/images/hostal-ciudad-blanca.png",
    tags: ["Hostal", "Económico", "Turistas"],
    experiences: 121,
    distance: "1.0 km",
    rating: 4.7,
  },
]

const categoryZones = [
  { id: "religious", label: "Ruta Religiosa", x: "50%", y: "12%", color: "#c084fc" },
  { id: "gastronomy", label: "Gastronomía", x: "22%", y: "36%", color: "#f59e0b" },
  { id: "nature", label: "Naturaleza", x: "74%", y: "28%", color: "#22c55e" },
  { id: "crafts", label: "Artesanías", x: "18%", y: "58%", color: "#ec4899" },
  { id: "lodging", label: "Hospedaje", x: "76%", y: "56%", color: "#38bdf8" },
  { id: "culture", label: "Cultura", x: "52%", y: "72%", color: "#fb7185" },
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

  const filtered = useMemo(
    () => activeCategory === "all"
      ? mapPoints
      : mapPoints.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  const nearestSelection = useMemo((): { point: (typeof mapPoints)[0]; distanceKm: string } | null => {
    if (!selectedPoint) return null

    let nearest: (typeof mapPoints)[0] | null = null
    let minDistance = Infinity

    filtered.forEach((point) => {
      if (point.id === selectedPoint.id) return
      const dx = point.x - selectedPoint.x
      const dy = point.y - selectedPoint.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < minDistance) {
        minDistance = distance
        nearest = point
      }
    })

    return nearest
      ? {
          point: nearest,
          distanceKm: Math.max(0.1, minDistance * 0.08).toFixed(1),
        }
      : null
  }, [selectedPoint, filtered])

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

  const categoryTrustScores = useMemo(() => {
    const scores: Record<string, number> = {}
    categories.forEach((cat) => {
      const pointsInCategory = mapPoints.filter((p) => p.category === cat.id)
      if (pointsInCategory.length > 0) {
        const avgTrust = pointsInCategory.reduce((sum, p) => sum + p.trust, 0) / pointsInCategory.length
        scores[cat.id] = Math.round(avgTrust)
      }
    })
    return scores
  }, [])

  const displayedExperiences = useMemo(() => {
    let results = filtered
    
    // Smart recommendation: combine distance, trust, and popularity
    results = [...results].sort((a, b) => {
      const distA = parseInt(a.distance) || 999
      const distB = parseInt(b.distance) || 999
      const trustDiff = b.trust - a.trust // Higher trust first
      const visitsDiff = (parseInt(b.visits) || 0) - (parseInt(a.visits) || 0) // More visits first
      const distDiff = distA - distB // Closer first
      
      // Combined scoring: trust (40%) + visits (30%) + distance (30%)
      const scoreA = (a.trust / 100) * 0.4 + ((parseInt(a.visits) || 0) / 10000) * 0.3 - (distA / 100) * 0.3
      const scoreB = (b.trust / 100) * 0.4 + ((parseInt(b.visits) || 0) / 10000) * 0.3 - (distB / 100) * 0.3
      
      return scoreB - scoreA
    })
    
    return results.slice(0, 8) // Show max 8 experiences
  }, [filtered])

  const similarExperiences = useMemo(() => {
    if (!selectedPoint) return []
    
    // Find experiences in the same category, exclude current selection, sort by trust + distance
    return mapPoints
      .filter((p) => p.category === selectedPoint.category && p.id !== selectedPoint.id)
      .sort((a, b) => {
        const distA = parseInt(a.distance) || 999
        const distB = parseInt(b.distance) || 999
        const scoreA = (a.trust / 100) * 0.6 - (distA / 100) * 0.4
        const scoreB = (b.trust / 100) * 0.6 - (distB / 100) * 0.4
        return scoreB - scoreA
      })
      .slice(0, 3)
  }, [selectedPoint])

  const plotData = useMemo(() => {
    const colorMap = categories.reduce<Record<string, string>>((acc, category) => {
      acc[category.id] = category.color
      return acc
    }, {})

    return [
      {
        x: filtered.map((point) => point.x),
        y: filtered.map((point) => 100 - point.y),
        type: "scatter",
        mode: "markers",
        customdata: filtered.map((point) => point.id),
        text: filtered.map((point) => point.name),
        hovertemplate: "%{text}<br>%{customdata}<extra></extra>",
        marker: {
          size: filtered.map((point) =>
            selectedPoint?.id === point.id
              ? 26
              : nearestSelection?.point.id === point.id
              ? 20
              : 14
          ),
          color: filtered.map((point) =>
            selectedPoint?.id === point.id
              ? "#ffd166"
              : nearestSelection?.point.id === point.id
              ? "#38bdf8"
              : colorMap[point.category] ?? "#94a3b8"
          ),
          opacity: 0.85,
          line: {
            width: filtered.map((point) =>
              selectedPoint?.id === point.id || nearestSelection?.point.id === point.id ? 2 : 0
            ),
            color: "transparent",
          },
        },
      },
    ]
  }, [filtered, selectedPoint, nearestSelection])

  const plotLayout = useMemo(
    () => ({
      margin: { l: 0, r: 0, t: 0, b: 0 },
      hovermode: "closest",
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      xaxis: {
        visible: false,
        range: [0, 100],
        fixedrange: true,
      },
      yaxis: {
        visible: false,
        range: [0, 100],
        fixedrange: true,
        scaleanchor: "x",
      },
      annotations: [
        {
          text: "Mapa interactivo de experiencias en Popayán",
          xref: "paper",
          yref: "paper",
          x: 0.02,
          y: 1.05,
          showarrow: false,
          font: { size: 14, color: "#f8fafc" },
          align: "left",
        },
      ],
      showlegend: false,
    }),
    []
  )

  const plotConfig = useMemo(
    () => ({
      responsive: true,
      displayModeBar: false,
      scrollZoom: false,
    }),
    []
  )

  const handleMapClick = (event: any) => {
    const pointId = event?.points?.[0]?.customdata
    if (!pointId) return
    const point = mapPoints.find((item) => item.id === pointId)
    if (point) {
      setSelectedPoint(point)
    }
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
              {categories.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0",
                    activeCategory === id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/20"
                  )}
                >
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
            <div className="absolute inset-0">
              <Image
                src="/images/mapa-popayan.png"
                alt="Mapa ilustrado de Popayán"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
            </div>

            {/* Interactive Plotly map */}
            {/* <div className="absolute inset-0 z-10">
              <Plot
                data={plotData}
                layout={plotLayout}
                config={plotConfig}
                onClick={handleMapClick}
                useResizeHandler
                style={{ width: "100%", height: "100%" }}
              />
            </div> */}

            {mapMode === "pins" && categoryZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveCategory(zone.id)}
                className="absolute z-20 rounded-xl px-3 py-2 text-center text-white shadow-md shadow-black/10 transition-all hover:shadow-lg hover:shadow-black/20"
                style={{
                  left: zone.x,
                  top: zone.y,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: activeCategory === zone.id ? "rgba(15, 23, 42, 0.45)" : "rgba(15, 23, 42, 0.15)",
                  backdropFilter: "blur(12px)",
                  border: activeCategory === zone.id ? "1.5px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <p className="text-xs font-semibold leading-tight">{zone.label}</p>
                <p className="text-[10px] font-bold text-gold/90 mt-0.5">{categoryTrustScores[zone.id] ?? 90}% Confianza</p>
              </button>
            ))}

            {/* Mobile selected info overlay */}
            {selectedPoint && nearestSelection && (
              <div className="absolute bottom-4 left-4 right-4 z-20 lg:hidden glass rounded-2xl border border-white/10 p-4 text-sm text-foreground">
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Sitio seleccionado</p>
                    <p className="font-semibold">{selectedPoint.name}</p>
                    <p className="text-[11px] text-muted-foreground">{categories.find((c) => c.id === selectedPoint.category)?.label}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Más cercano</p>
                    <p className="font-semibold">{nearestSelection?.point.name}</p>
                    <p className="text-[11px] text-muted-foreground">Aproximadamente {nearestSelection?.distanceKm} km</p>
                  </div>
                </div>
              </div>
            )}

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
                  {activeCategory === "all" 
                    ? "Más cercanos y populares" 
                    : `${categories.find((c) => c.id === activeCategory)?.label}`}
                </p>
              </div>
              <div className="flex flex-col gap-1 px-2 pb-4">
                {displayedExperiences.map((exp) => {
                  const Icon = getCategoryIcon(exp.category)
                  const color = getCategoryColor(exp.category)
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setSelectedPoint(exp)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group text-left w-full"
                    >
                      <div className="relative size-12 rounded-lg overflow-hidden shrink-0 border border-border/10">
                        <Image src={exp.image} alt={exp.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                          {exp.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Icon className="size-3" style={{ color }} />
                          <p className="text-[10px] text-muted-foreground font-medium">
                            {categories.find((c) => c.id === exp.category)?.label}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-0.5 text-[10px] text-gold font-bold">
                            <Star className="size-2" fill="currentColor" />
                            {exp.rating}
                          </div>
                          <span className="text-[10px] text-muted-foreground ml-auto">{exp.distance}</span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* All map points list */}
              {activeCategory !== "all" && (
              <div className="border-t border-border/10 px-2 pb-4 pt-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Más lugares en esta categoría ({filtered.length})
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
              )}
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

              {/* Similar experiences in this category */}
              {similarExperiences.length > 0 && (
                <div className="rounded-2xl bg-slate-950/40 border border-primary/15 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-semibold">Experiencias similares en esta categoría</p>
                  <div className="flex flex-col gap-2">
                    {similarExperiences.map((exp) => {
                      const Icon = getCategoryIcon(exp.category)
                      const color = getCategoryColor(exp.category)
                      return (
                        <button
                          key={exp.id}
                          onClick={() => setSelectedPoint(exp)}
                          className="text-left p-2 rounded-lg hover:bg-slate-950/60 transition-colors group"
                        >
                          <div className="flex items-start gap-2">
                            <div className="size-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: color + "22" }}>
                              <Icon className="size-3" style={{ color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {exp.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] bg-slate-800 text-gold font-bold px-1.5 py-0.5 rounded">{exp.trust}% Confianza</span>
                                <span className="text-[9px] text-muted-foreground">{exp.distance}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {nearestSelection && (
                <div className="rounded-3xl bg-slate-950/80 border border-primary/20 p-4 text-sm text-foreground">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Punto más cercano</p>
                  <div className="space-y-2">
                    <p className="font-semibold">{nearestSelection?.point.name}</p>
                    <p className="text-[11px] text-muted-foreground">Categoría: {categories.find((c) => c.id === nearestSelection?.point.category)?.label}</p>
                    <p className="text-[11px] text-muted-foreground">Distancia aproximada: {nearestSelection?.distanceKm} km</p>
                    <p className="text-[11px] text-muted-foreground">Coordenadas: {nearestSelection?.point.x}%, {nearestSelection?.point.y}%</p>
                  </div>
                </div>
              )}

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
