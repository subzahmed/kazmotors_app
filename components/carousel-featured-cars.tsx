"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"

type Car = {
  _id: string
  title: string
  price: number
  year: number
  make: string
  model: string
  mileage: number
  images: string[]
}

export function CarouselFeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedCars() {
      try {
        // Fetch only featured cars
        const response = await fetch("/api/cars?featured=true")
        const data = await response.json()

        if (data.success) {
          setFeaturedCars(data.cars)
        } else {
          console.error("Error fetching featured cars:", data.message)
        }
      } catch (error) {
        console.error("Error fetching featured cars:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedCars()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === featuredCars.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredCars.length - 1 : prevIndex - 1))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse bg-hom-gray border-0">
            <div className="h-48 bg-hom-dark rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-6 bg-hom-dark rounded mb-2" />
              <div className="h-4 bg-hom-dark rounded w-3/4 mb-4" />
              <div className="h-8 bg-hom-dark rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (featuredCars.length === 0) {
    return (
      <div className="text-center p-8 bg-hom-gray rounded-lg text-white">
        <p>No featured cars available. Add some in the admin dashboard.</p>
      </div>
    )
  }

  // Calculate visible cars based on screen size
  const visibleCars = featuredCars.slice(currentIndex, currentIndex + 3)
  if (visibleCars.length < 3 && featuredCars.length > 3) {
    // Add cars from the beginning if we're near the end
    visibleCars.push(...featuredCars.slice(0, 3 - visibleCars.length))
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto md:overflow-hidden gap-8 pb-4 md:pb-0">
        {visibleCars.map((car) => (
          <Card key={car._id} className="min-w-[300px] md:w-full flex-1 bg-hom-gray border-0 car-card-hover">
            <div className="relative">
              <Link href={`/inventory/${car._id}`}>
                <Image
                  src={car.images[0] || "/placeholder.jpeg?height=600&width=800"}
                  alt={car.title}
                  width={800}
                  height={600}
                  className="h-56 w-full object-cover transition-transform hover:scale-105"
                />
              </Link>
              <Badge className="absolute top-2 right-2 bg-hom-red text-white border-0">Featured</Badge>
            </div>
            <CardContent className="p-6">
              <Link href={`/inventory/${car._id}`}>
                <h3 className="text-xl font-bold hover:text-hom-red transition-colors text-white">{car.title}</h3>
              </Link>
              <p className="text-gray-400 mb-2">
                {car.year} • {car.mileage.toLocaleString()} miles
              </p>
              <p className="text-2xl font-bold text-hom-red">${car.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link href={`/inventory/${car._id}`} className="w-full">
                <Button className="w-full bg-hom-red hover:bg-red-700 text-white">
                  <Info className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {featuredCars.length > 3 && (
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-hom-red text-white border-0 hover:bg-red-700"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-hom-red text-white border-0 hover:bg-red-700"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </div>
  )
}
