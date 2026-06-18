"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Route,
  TrendingUp,
  TrendingDown,
  Users,
  MessageCircle,
  ThumbsUp,
  ChevronLeft,
  Award,
  Shield,
  Utensils,
  Wifi,
  ParkingCircle,
  CreditCard,
  Camera,
  TreePine,
  Music,
  Accessibility,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ── Types ─────────────────────────────────────────────── */

type Service = { icon: React.ElementType; label: string }
type Review = { name: string; flag: string; date: string; content: string; trust: number; verified: boolean }
type TrustFactor = { label: string; score: number; trend: "up" | "down" | "stable" }

interface PlaceData {
  id: number
  name: string
  category: string
  categoryLabel: string
  address: string
  hours: string
  phone: string
  visits: string
  trustScore: number
  trustDelta: string
  trustLabel: string
  description: string
  tags: string[]
  images: string[]
  services: Service[]
  trustFactors: TrustFactor[]
  reviews: Review[]
  experiences: number
}

/* ── Places database ────────────────────────────────────── */

const places: PlaceData[] = [
  {
    id: 1,
    name: "Catedral de Popayán",
    category: "religious",
    categoryLabel: "Religioso & Patrimonio",
    address: "Parque Caldas, Centro Histórico",
    hours: "Lunes a Domingo: 7am – 6pm",
    phone: "+57 2 824 2345",
    visits: "12.4K",
    trustScore: 97,
    trustDelta: "+1 pts este mes",
    trustLabel: "Excelente",
    description:
      "La imponente catedral neoclásica es el símbolo más representativo de la Ciudad Blanca. Reconstruida tras el terremoto de 1983, conserva su majestuosa fachada blanca que la convirtió en ícono del patrimonio arquitectónico colombiano. Declarada Bien de Interés Cultural de la Nación.",
    tags: ["Patrimonio", "Colonial", "Neoclásico", "UNESCO", "Histórico"],
    images: [
      "/images/catedral-popayan.png",
      "/images/popayan-hero.png",
      "/images/semana-santa.png",
      "/images/artesanias.png",
    ],
    services: [
      { icon: Camera, label: "Visitas guiadas" },
      { icon: Accessibility, label: "Accesibilidad" },
      { icon: Users, label: "Grupos escolares" },
      { icon: Wifi, label: "Info turística" },
    ],
    trustFactors: [
      { label: "Valor patrimonial", score: 99, trend: "up" },
      { label: "Estado de conservación", score: 97, trend: "up" },
      { label: "Experiencia del visitante", score: 96, trend: "up" },
      { label: "Guías certificados", score: 95, trend: "stable" },
      { label: "Señalización turística", score: 94, trend: "up" },
    ],
    reviews: [
      {
        name: "Sofía L.",
        flag: "🇦🇷",
        date: "Mar 2024",
        content: "Impresionante. La catedral es absolutamente majestuosa por dentro y por fuera. El guía que nos atendió conocía cada detalle de su historia. Una visita obligatoria si vienes a Popayán.",
        trust: 99,
        verified: true,
      },
      {
        name: "Thomas B.",
        flag: "🇫🇷",
        date: "Feb 2024",
        content: "Magnifique cathédrale! The white facade is stunning against the blue sky. The interior is peaceful and beautifully maintained. Must see in Popayán.",
        trust: 97,
        verified: true,
      },
      {
        name: "Jorge P.",
        flag: "🇨🇴",
        date: "Ene 2024",
        content: "He venido varias veces y cada vez me sorprende la grandeza de nuestra catedral. La reconstrucción tras el terremoto fue un ejemplo de resiliencia payanesa.",
        trust: 96,
        verified: true,
      },
    ],
    experiences: 342,
  },
  {
    id: 2,
    name: "Restaurante El Serrano",
    category: "gastronomy",
    categoryLabel: "Gastronomía",
    address: "Calle 4 #8-30, Barrio Bolívar",
    hours: "Lunes a Domingo: 12pm – 10pm",
    phone: "+57 310 456 7890",
    visits: "8.2K",
    trustScore: 93,
    trustDelta: "+2 pts este mes",
    trustLabel: "Excelente",
    description:
      "Restaurante familiar con más de 45 años de tradición en Popayán. Especializado en gastronomía caucana auténtica, el Restaurante El Serrano es el guardián de las recetas tradicionales del Cauca. Su pipián rojo ha ganado reconocimiento nacional como uno de los mejores del país.",
    tags: ["Pipián Rojo", "Empanadas Típicas", "Sancocho", "Champús", "Familiar"],
    images: [
      "/images/rest-tradicional.png",
      "/images/artesanias.png",
      "/images/catedral-popayan.png",
      "/images/semana-santa.png",
    ],
    services: [
      { icon: Wifi, label: "WiFi gratuito" },
      { icon: ParkingCircle, label: "Parqueadero cercano" },
      { icon: CreditCard, label: "Tarjetas aceptadas" },
      { icon: Utensils, label: "Menú tradicional" },
    ],
    trustFactors: [
      { label: "Calidad del servicio", score: 96, trend: "up" },
      { label: "Autenticidad cultural", score: 98, trend: "up" },
      { label: "Relación precio-valor", score: 91, trend: "stable" },
      { label: "Limpieza & comodidad", score: 94, trend: "up" },
      { label: "Atención al cliente", score: 95, trend: "up" },
    ],
    reviews: [
      {
        name: "Miguel R.",
        flag: "🇲🇽",
        date: "Mar 2024",
        content: "Absolutamente el mejor restaurante típico de Popayán. El pipián rojo es auténtico, como lo hacía mi abuela en Oaxaca. El servicio es cálido y los precios muy justos para la calidad.",
        trust: 98,
        verified: true,
      },
      {
        name: "Andrea K.",
        flag: "🇩🇪",
        date: "Ene 2024",
        content: "Incredible local food, very authentic. The empanadas de pipián were the best I had in Colombia. Highly recommended for anyone wanting to experience real Cauca cuisine.",
        trust: 95,
        verified: true,
      },
      {
        name: "Carlos M.",
        flag: "🇨🇴",
        date: "Feb 2024",
        content: "Un clásico de Popayán. He venido aquí cada vez que visito la ciudad y nunca me ha decepcionado. El sancocho de gallina es espectacular.",
        trust: 92,
        verified: true,
      },
    ],
    experiences: 218,
  },
  {
    id: 3,
    name: "Mercado de Artesanías",
    category: "crafts",
    categoryLabel: "Artesanías",
    address: "Carrera 7 #4-36, Centro",
    hours: "Lunes a Sábado: 9am – 6pm · Domingo: 10am – 4pm",
    phone: "+57 315 234 5678",
    visits: "5.8K",
    trustScore: 91,
    trustDelta: "+0 pts este mes",
    trustLabel: "Muy bueno",
    description:
      "El Mercado de Artesanías es el mejor lugar para encontrar piezas únicas del Cauca. Más de 60 artesanos locales exhiben tejidos en lana y fique, cerámicas, orfebrerías en plata y madera tallada. Cada pieza cuenta la historia de las culturas indígenas y mestizas de la región.",
    tags: ["Tejidos", "Cerámica", "Orfebrería", "Madera", "Indígena", "Auténtico"],
    images: [
      "/images/artesanias.png",
      "/images/catedral-popayan.png",
      "/images/rest-tradicional.png",
      "/images/popayan-hero.png",
    ],
    services: [
      { icon: CreditCard, label: "Tarjetas aceptadas" },
      { icon: Users, label: "60+ artesanos" },
      { icon: Camera, label: "Fotos permitidas" },
      { icon: ParkingCircle, label: "Parqueadero" },
    ],
    trustFactors: [
      { label: "Autenticidad de piezas", score: 95, trend: "up" },
      { label: "Calidad artesanal", score: 93, trend: "up" },
      { label: "Variedad de oferta", score: 90, trend: "stable" },
      { label: "Precio justo", score: 88, trend: "up" },
      { label: "Atención al visitante", score: 89, trend: "stable" },
    ],
    reviews: [
      {
        name: "Elena V.",
        flag: "🇪🇸",
        date: "Mar 2024",
        content: "Encontré piezas de cerámica preciosas que no había visto en ningún otro mercado de Colombia. Los artesanos son encantadores y explican el proceso de cada pieza. Me gasté más de lo planeado, pero sin arrepentimientos.",
        trust: 94,
        verified: true,
      },
      {
        name: "Robert H.",
        flag: "🇺🇸",
        date: "Feb 2024",
        content: "Best handicraft market in southern Colombia. The silver jewelry is outstanding and the woven textiles are beautiful. Prices are fair and the artisans are very friendly.",
        trust: 92,
        verified: true,
      },
      {
        name: "Ana T.",
        flag: "🇨🇴",
        date: "Ene 2024",
        content: "Siempre vengo aquí cuando regreso a Popayán. Los tejidos en fique son increíbles y se puede ver a los artesanos trabajando en vivo. Muy auténtico.",
        trust: 90,
        verified: true,
      },
    ],
    experiences: 156,
  },
  {
    id: 4,
    name: "Hotel Casa Colonial",
    category: "culture",
    categoryLabel: "Alojamiento & Cultura",
    address: "Calle 3 #2-75, Centro Histórico",
    hours: "Recepción 24 horas",
    phone: "+57 2 823 1122",
    visits: "3.1K",
    trustScore: 96,
    trustDelta: "+2 pts este mes",
    trustLabel: "Excelente",
    description:
      "Boutique hotel ubicado en una casona colonial restaurada del siglo XVIII. Sus 18 habitaciones preservan la arquitectura original con vigas de madera, pisos de barro y patios internos con jardines. El spa y la terraza con vista al cerro lo convierten en el alojamiento más exclusivo de Popayán.",
    tags: ["Boutique", "Colonial", "Spa", "Terraza", "Patio Interior", "Lujo"],
    images: [
      "/images/hotel-colonial.png",
      "/images/catedral-popayan.png",
      "/images/popayan-hero.png",
      "/images/semana-santa.png",
    ],
    services: [
      { icon: Wifi, label: "WiFi de alta velocidad" },
      { icon: Utensils, label: "Restaurante propio" },
      { icon: ParkingCircle, label: "Parqueadero privado" },
      { icon: CreditCard, label: "Todas las tarjetas" },
    ],
    trustFactors: [
      { label: "Comodidad & lujo", score: 98, trend: "up" },
      { label: "Autenticidad colonial", score: 97, trend: "up" },
      { label: "Servicio personalizado", score: 96, trend: "up" },
      { label: "Limpieza", score: 99, trend: "up" },
      { label: "Relación precio-valor", score: 90, trend: "stable" },
    ],
    reviews: [
      {
        name: "Laura F.",
        flag: "🇫🇷",
        date: "Mar 2024",
        content: "L'hôtel le plus charmant de Popayán. Le patio colonial est magnifique, les chambres sont luxueuses et le personnel est aux petits soins. Un séjour inoubliable.",
        trust: 98,
        verified: true,
      },
      {
        name: "James W.",
        flag: "🇬🇧",
        date: "Feb 2024",
        content: "Absolutely stunning colonial hotel. The restoration work is impeccable — you feel like you're staying in the 18th century but with all modern comforts. The spa is excellent.",
        trust: 97,
        verified: true,
      },
      {
        name: "Valentina G.",
        flag: "🇨🇴",
        date: "Ene 2024",
        content: "Para nuestra luna de miel fue la elección perfecta. El patio interior con jardín es mágico en la noche. El desayuno payanés que sirven es espectacular.",
        trust: 96,
        verified: true,
      },
    ],
    experiences: 89,
  },
  {
    id: 5,
    name: "Puente del Humilladero",
    category: "history",
    categoryLabel: "Historia & Patrimonio",
    address: "Calle 5 con Carrera 9, Centro",
    hours: "Siempre abierto",
    phone: "Sin teléfono (lugar público)",
    visits: "9.1K",
    trustScore: 88,
    trustDelta: "+1 pts este mes",
    trustLabel: "Muy bueno",
    description:
      "El Puente del Humilladero es uno de los íconos arquitectónicos más representativos de Popayán. Construido en el siglo XVII con arcos de mampostería de cal y canto, era el acceso principal a la ciudad colonial. Hoy es un mirador peatonal desde donde se aprecia el barrio histórico y el río Molino.",
    tags: ["Colonial", "Histórico", "Siglo XVII", "Patrimonio", "Fotografía"],
    images: [
      "/images/catedral-popayan.png",
      "/images/popayan-hero.png",
      "/images/semana-santa.png",
      "/images/artesanias.png",
    ],
    services: [
      { icon: Camera, label: "Punto fotográfico" },
      { icon: Accessibility, label: "Acceso peatonal" },
      { icon: Users, label: "Visitas guiadas" },
      { icon: MapPin, label: "Señalización" },
    ],
    trustFactors: [
      { label: "Valor histórico", score: 96, trend: "up" },
      { label: "Estado de conservación", score: 84, trend: "stable" },
      { label: "Señalización e info", score: 82, trend: "up" },
      { label: "Seguridad de la zona", score: 88, trend: "up" },
      { label: "Accesibilidad", score: 90, trend: "up" },
    ],
    reviews: [
      {
        name: "Pablo A.",
        flag: "🇦🇷",
        date: "Mar 2024",
        content: "Un puente con una historia fascinante. Las vistas desde arriba son increíbles, especialmente al atardecer. El guía nos contó leyendas coloniales que le dieron mucha vida al lugar.",
        trust: 91,
        verified: true,
      },
      {
        name: "Hanna M.",
        flag: "🇩🇪",
        date: "Ene 2024",
        content: "Very historic bridge with beautiful colonial architecture. A great spot for photos. The area around it is also worth exploring on foot.",
        trust: 88,
        verified: true,
      },
      {
        name: "Ricardo B.",
        flag: "🇨🇴",
        date: "Feb 2024",
        content: "Impresionante estructura colonial. Lástima que necesita más mantenimiento en algunos sectores, pero sigue siendo uno de los puntos históricos más hermosos de la ciudad.",
        trust: 86,
        verified: true,
      },
    ],
    experiences: 201,
  },
  {
    id: 6,
    name: "Cerro de las Tres Cruces",
    category: "nature",
    categoryLabel: "Naturaleza & Aventura",
    address: "Sector Cerro Las Cruces, Popayán",
    hours: "Lunes a Domingo: 6am – 6pm",
    phone: "+57 318 765 4321",
    visits: "6.7K",
    trustScore: 89,
    trustDelta: "+3 pts este mes",
    trustLabel: "Muy bueno",
    description:
      "El Cerro de las Tres Cruces es el mirador natural más emblemático de Popayán. Desde sus 2.700 metros de altura se tiene una vista panorámica de 360° sobre la ciudad blanca, el Valle del Pubenza y los nevados cercanos. El sendero de ascenso de 3 km es apto para senderismo moderado.",
    tags: ["Mirador", "Senderismo", "Vistas Panorámicas", "Naturaleza", "Fotografía"],
    images: [
      "/images/naturaleza.png",
      "/images/catedral-popayan.png",
      "/images/popayan-hero.png",
      "/images/semana-santa.png",
    ],
    services: [
      { icon: TreePine, label: "Sendero señalizado" },
      { icon: Camera, label: "Mirador fotográfico" },
      { icon: Users, label: "Guías locales" },
      { icon: ParkingCircle, label: "Parqueadero base" },
    ],
    trustFactors: [
      { label: "Belleza natural", score: 97, trend: "up" },
      { label: "Seguridad del sendero", score: 85, trend: "up" },
      { label: "Señalización de ruta", score: 83, trend: "up" },
      { label: "Vistas panorámicas", score: 98, trend: "up" },
      { label: "Infraestructura base", score: 80, trend: "stable" },
    ],
    reviews: [
      {
        name: "Camila R.",
        flag: "🇨🇴",
        date: "Mar 2024",
        content: "La mejor vista de Popayán sin duda. El ascenso vale cada paso. Llegamos al amanecer y la ciudad blanca con la niebla del valle fue algo que no olvidaré jamás. Llevé buenas botas.",
        trust: 95,
        verified: true,
      },
      {
        name: "Marco S.",
        flag: "🇮🇹",
        date: "Feb 2024",
        content: "Incredibile vista panoramica sulla città. Il sentiero è ben segnalato ma richiede buona forma fisica. Assolutamente consigliato per i fotografi.",
        trust: 90,
        verified: true,
      },
      {
        name: "Diego M.",
        flag: "🇨🇴",
        date: "Ene 2024",
        content: "Subí con mi familia y los niños lo disfrutaron mucho. El camino es moderado y hay puntos de descanso. Desde arriba ves toda Popayán. ¡Una experiencia única!",
        trust: 88,
        verified: true,
      },
    ],
    experiences: 178,
  },
  {
    id: 7,
    name: "Teatro Guillermo Valencia",
    category: "culture",
    categoryLabel: "Cultura & Arte",
    address: "Carrera 7 #6-14, Centro Histórico",
    hours: "Martes a Domingo: según función",
    phone: "+57 2 824 1890",
    visits: "4.2K",
    trustScore: 92,
    trustDelta: "+1 pts este mes",
    trustLabel: "Excelente",
    description:
      "El Teatro Guillermo Valencia es el principal escenario cultural de Popayán y uno de los teatros más importantes del suroccidente colombiano. Inaugurado en 1928, es sede del reconocido Festival Internacional de Teatro de Popayán y alberga ópera, danza, música clásica y teatro contemporáneo.",
    tags: ["Teatro", "Festival", "Cultura", "Arte", "Música", "Danza"],
    images: [
      "/images/catedral-popayan.png",
      "/images/semana-santa.png",
      "/images/popayan-hero.png",
      "/images/artesanias.png",
    ],
    services: [
      { icon: Music, label: "Sala de conciertos" },
      { icon: Wifi, label: "WiFi en el lobby" },
      { icon: Accessibility, label: "Accesibilidad" },
      { icon: CreditCard, label: "Venta en línea" },
    ],
    trustFactors: [
      { label: "Calidad programación", score: 95, trend: "up" },
      { label: "Acústica del teatro", score: 94, trend: "up" },
      { label: "Estado del recinto", score: 91, trend: "stable" },
      { label: "Atención al público", score: 90, trend: "up" },
      { label: "Relación precio-calidad", score: 92, trend: "up" },
    ],
    reviews: [
      {
        name: "Isabel M.",
        flag: "🇨🇴",
        date: "Mar 2024",
        content: "Asistí al Festival Internacional de Teatro y quedé maravillada. Las compañías internacionales ofrecen un nivel altísimo. El teatro en sí es hermoso, con una acústica perfecta.",
        trust: 96,
        verified: true,
      },
      {
        name: "Peter N.",
        flag: "🇳🇱",
        date: "Feb 2024",
        content: "Attended a classical music concert here — the acoustics are superb! The theater is a beautiful colonial building and the programming is very ambitious for a city this size.",
        trust: 93,
        verified: true,
      },
      {
        name: "Fernando C.",
        flag: "🇨🇴",
        date: "Ene 2024",
        content: "La joya cultural de Popayán. Cada presentación es una experiencia de altísimo nivel. Muy buena programación y el personal es muy atento.",
        trust: 91,
        verified: true,
      },
    ],
    experiences: 92,
  },
  {
    id: 8,
    name: "Parque Caldas",
    category: "culture",
    categoryLabel: "Espacio Público & Historia",
    address: "Carrera 6 con Calle 5, Centro",
    hours: "Abierto todos los días: 6am – 10pm",
    phone: "Alcaldía Municipal: +57 2 820 0100",
    visits: "15K",
    trustScore: 90,
    trustDelta: "+2 pts este mes",
    trustLabel: "Muy bueno",
    description:
      "El Parque Francisco José de Caldas es el corazón de Popayán. Rodeado de edificios coloniales, la Catedral, la Alcaldía y monumentos históricos, este parque es el punto de encuentro de la vida social payanesa. Sus palmeras imperiales, bancas coloniales y el busto de Caldas lo hacen inconfundible.",
    tags: ["Plaza Central", "Histórico", "Social", "Patrimonio", "Colonial"],
    images: [
      "/images/popayan-hero.png",
      "/images/catedral-popayan.png",
      "/images/semana-santa.png",
      "/images/artesanias.png",
    ],
    services: [
      { icon: Wifi, label: "WiFi público" },
      { icon: Accessibility, label: "Acceso universal" },
      { icon: Camera, label: "Zona fotográfica" },
      { icon: Users, label: "Guías de ciudad" },
    ],
    trustFactors: [
      { label: "Belleza del entorno", score: 93, trend: "up" },
      { label: "Seguridad", score: 88, trend: "up" },
      { label: "Mantenimiento", score: 90, trend: "stable" },
      { label: "Vida cultural activa", score: 92, trend: "up" },
      { label: "Señalización turística", score: 86, trend: "up" },
    ],
    reviews: [
      {
        name: "Mariana L.",
        flag: "🇧🇷",
        date: "Mar 2024",
        content: "O parque principal de Popayán é simplesmente lindo! Os edifícios coloniais brancos ao redor criam um cenário único. Tomei café num dos restaurantes próximos e ficamos horas ali contemplando a cidade.",
        trust: 93,
        verified: true,
      },
      {
        name: "Chris O.",
        flag: "🇺🇸",
        date: "Feb 2024",
        content: "The main square is stunning — all those white colonial buildings surrounding it make for amazing photos. Very lively on weekends with local music and families enjoying the space.",
        trust: 91,
        verified: true,
      },
      {
        name: "Adriana P.",
        flag: "🇨🇴",
        date: "Ene 2024",
        content: "El alma de Popayán. Cada vez que vengo paso tiempo aquí observando la vida payanesa. En Semana Santa la decoración es espectacular. Es el mejor mirador de la arquitectura colonial.",
        trust: 90,
        verified: true,
      },
    ],
    experiences: 421,
  },
  {
    id: 9,
    name: "Festival Gastronómico",
    category: "events",
    categoryLabel: "Eventos & Gastronomía",
    address: "Parque La Pamba, Popayán",
    hours: "Durante el festival: 10am – 11pm",
    phone: "+57 312 890 1234",
    visits: "8.2K",
    trustScore: 95,
    trustDelta: "+4 pts este edición",
    trustLabel: "Excelente",
    description:
      "El Festival Gastronómico de Popayán, declarado Patrimonio Cultural Inmaterial por la UNESCO, es el evento culinario más importante del suroccidente colombiano. Más de 200 expositores presentan platos tradicionales del Cauca, cocina en vivo, talleres de gastronomía ancestral y degustaciones de chicha y champús.",
    tags: ["Festival", "UNESCO", "Gastronomía", "Tradición", "Champús", "Chicha", "Artesanal"],
    images: [
      "/images/rest-tradicional.png",
      "/images/artesanias.png",
      "/images/popayan-hero.png",
      "/images/semana-santa.png",
    ],
    services: [
      { icon: Utensils, label: "200+ expositores" },
      { icon: Users, label: "Talleres culinarios" },
      { icon: CreditCard, label: "Entrada gratuita" },
      { icon: ParkingCircle, label: "Transporte especial" },
    ],
    trustFactors: [
      { label: "Autenticidad culinaria", score: 98, trend: "up" },
      { label: "Variedad gastronómica", score: 97, trend: "up" },
      { label: "Organización del evento", score: 93, trend: "up" },
      { label: "Precio de los platos", score: 94, trend: "up" },
      { label: "Ambiente y experiencia", score: 96, trend: "up" },
    ],
    reviews: [
      {
        name: "Pilar S.",
        flag: "🇨🇴",
        date: "Sep 2024",
        content: "El Festival Gastronómico es simplemente lo mejor que le ha pasado a Popayán. Probé platos que no conocía y aprendí sobre gastronomía ancestral del Cauca. El taller de empanadas de pipián fue revelador.",
        trust: 98,
        verified: true,
      },
      {
        name: "Giulia R.",
        flag: "🇮🇹",
        date: "Sep 2024",
        content: "Sono venuta appositamente per questo festival e ne è valsa la pena. La cucina caucana è sorprendentemente ricca e complessa. Il champús è diventato la mia bevanda preferita.",
        trust: 96,
        verified: true,
      },
      {
        name: "Andrés H.",
        flag: "🇨🇴",
        date: "Sep 2024",
        content: "Un evento que engrandece a Popayán. La calidad de los expositores mejora cada año. El reconocimiento UNESCO es totalmente merecido. ¡Imperdible!",
        trust: 95,
        verified: true,
      },
    ],
    experiences: 189,
  },
]

/* ── Component ──────────────────────────────────────────── */

export default function LugarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeImg, setActiveImg] = useState(0)

  const place = places.find((p) => p.id === Number(id))

  if (!place) {
    return (
      <div className="relative min-h-dvh bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 pb-28 pt-24 flex flex-col items-center justify-center gap-4 text-center">
          <MapPin className="size-12 text-muted-foreground" />
          <h1 className="font-heading text-2xl font-bold text-foreground">Lugar no encontrado</h1>
          <p className="text-muted-foreground">No existe un lugar con el ID {id} en nuestra base de datos.</p>
          <Link
            href="/mapa"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <ChevronLeft className="size-4" />
            Volver al mapa
          </Link>
        </div>
      </div>
    )
  }

  const maxScore = Math.max(...place.trustFactors.map((h) => h.score))
  const minScore = Math.min(...place.trustFactors.map((h) => h.score))

  return (
    <div className="relative min-h-dvh bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 pb-28 pt-16 md:pb-12 md:pt-24 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/mapa" className="hover:text-primary flex items-center gap-1 font-semibold transition-colors">
            <ChevronLeft className="size-4" />
            Volver al mapa
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Gallery */}
            <div className="flex flex-col gap-2">
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/10">
                <Image
                  src={place.images[activeImg]}
                  alt={place.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-card/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground">
                    {place.categoryLabel}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {place.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      "relative size-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all",
                      activeImg === i ? "border-primary scale-95" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="glass rounded-3xl p-6 border border-border/20">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div>
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    {place.name}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground font-medium">
                    <MapPin className="size-4 text-primary" />
                    {place.address}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wide">
                  <CheckCircle2 className="size-3.5" />
                  Verificado
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm text-pretty">
                {place.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-5">
                {place.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="glass rounded-3xl p-6 border border-border/20">
              <h2 className="font-semibold text-base text-foreground mb-4">Servicios & Comodidades</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {place.services.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-secondary/60 text-sm text-muted-foreground border border-border/10"
                  >
                    <Icon className="size-4 text-primary shrink-0" />
                    <span className="text-xs font-semibold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="glass rounded-3xl p-6 border border-border/20">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                  <MessageCircle className="size-5 text-primary" />
                  Experiencias verificadas
                </h2>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/25 bg-secondary/80 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                  {place.reviews.length} reseñas
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {place.reviews.map((r) => (
                  <Card key={r.name} className="rounded-2xl border border-border/10 bg-secondary/30">
                    <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                              {r.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-semibold text-foreground">
                                {r.name} {r.flag}
                              </span>
                              {r.verified && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-1.5 py-0.5 text-[8px] font-bold text-gold uppercase tracking-wide">
                                  <CheckCircle2 className="size-2.5" />
                                  Verificado
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground">{r.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gold font-bold">
                          <Shield className="size-3 text-gold" />
                          Confianza {r.trust}/100
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{r.content}</p>
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-semibold w-fit">
                        <ThumbsUp className="size-3.5 text-primary/70" />
                        Útil
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5">
            {/* Trust Index */}
            <Card className="rounded-2xl glass overflow-hidden border border-border/20 shadow-lg shadow-primary/5">
              <div className="bg-primary/15 border-b border-border/20 px-5 py-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Índice de Confianza Turística
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col leading-none">
                    <span className="text-5xl font-bold text-foreground tracking-tight">{place.trustScore}</span>
                    <span className="text-xs text-muted-foreground mt-1">/100 puntos</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold uppercase tracking-wide">
                      {place.trustLabel}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="size-3 text-gold" />
                      {place.trustDelta}
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-5 flex flex-col gap-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Factores de confianza
                </p>
                {place.trustFactors.map((factor) => (
                  <div key={factor.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{factor.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-foreground">{factor.score}</span>
                        {factor.trend === "up" ? (
                          <TrendingUp className="size-3 text-gold" />
                        ) : factor.trend === "down" ? (
                          <TrendingDown className="size-3 text-destructive" />
                        ) : null}
                      </div>
                    </div>
                    <Progress value={factor.score} className="h-1.5" />
                  </div>
                ))}

                {/* Mini bar chart */}
                <Separator className="border-border/10" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Comparativa de factores
                  </p>
                  <div className="flex items-end gap-1.5 h-14 pt-2">
                    {place.trustFactors.map((f) => {
                      const normalizedHeight = ((f.score - minScore) / Math.max(maxScore - minScore + 5, 1)) * 100
                      return (
                        <div key={f.label} className="flex flex-col items-center gap-1 flex-1">
                          <div
                            className="w-full rounded bg-primary/70 transition-all hover:bg-primary"
                            style={{ height: `${Math.max(20, normalizedHeight)}%` }}
                            title={`${f.label}: ${f.score}`}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="rounded-2xl glass p-1 transition-all duration-300 hover:border-primary/40">
              <CardContent className="p-5 flex flex-col gap-3.5">
                <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">Información</h3>
                {[
                  { icon: Clock, text: place.hours },
                  { icon: MapPin, text: place.address },
                  { icon: Phone, text: place.phone },
                  { icon: Users, text: `${place.visits} visitas verificadas` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground font-semibold">
                    <Icon className="size-4 shrink-0 text-primary" />
                    {text}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5">
              <Link
                href="/rutas"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] w-full"
              >
                <Route className="size-4" />
                Agregar a mi ruta
              </Link>
              <Link
                href="/experiencias"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary/70 hover:scale-[1.02] transition-all w-full"
              >
                <Award className="size-4 text-gold" />
                Ver experiencias ({place.experiences})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
