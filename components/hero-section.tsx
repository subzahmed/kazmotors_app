import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.jpeg?height=800&width=1600')",
          opacity: 0.3,
        }}
      />
      <div className="relative container mx-auto px-4 py-32 md:py-48">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Your <span className="text-hom-red">Perfect</span> Drive
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl">
            Premium selection of quality vehicles at competitive prices. Your dream car is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/inventory">
              <Button size="lg" className="w-full sm:w-auto bg-hom-red hover:bg-red-700 text-white">
                Browse Inventory
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}
