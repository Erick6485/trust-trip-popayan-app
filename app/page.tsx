import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/landing/hero"
import { FeaturesSection } from "@/components/landing/features-section"
import { FeaturedPlaces } from "@/components/landing/featured-places"
import { ExperiencesSection } from "@/components/landing/experiences-section"
import { Testimonials } from "@/components/landing/testimonials"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="relative min-h-dvh flex flex-col">
      <Navigation />
      <main className="flex-1 pb-28 pt-16 md:pb-12 md:pt-24">
        <Hero />
        <FeaturesSection />
        <FeaturedPlaces />
        <ExperiencesSection />
        <Testimonials />
      </main>

      <footer className="glass border-t border-border mt-12 rounded-t-3xl shadow-lg shadow-primary/5">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 overflow-hidden">
                <img 
                  src="/images/LOGO_TRAVESIA_BLANCA.png" 
                  alt="Escudo de Popayán" 
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-heading font-bold text-foreground">Travesía Blanca</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {[
                { label: "Mapa", href: "/mapa" },
                { label: "Rutas IA", href: "/rutas" },
                { label: "Experiencias", href: "/experiencias" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Soy proveedor", href: "/actor" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="hover:text-primary transition-colors font-medium">
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="text-xs text-muted-foreground">
              © 2024 Travesía Blanca. Hecho con IA en Colombia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
