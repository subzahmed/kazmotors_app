"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

export function SimilarCars({ currentCarId, make }: { currentCarId: string; make: string }) {
  const [similarCars, setSimilarCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSimilarCars() {
      try {
        // Fetch cars with the same make, excluding the current car
        const response = await fetch(`/api/cars?make=${make}`)
        const data = await response.json()

        if (data.success) {
          // Filter out the current car and limit to 3
          const filtered = data.cars.filter((car: Car) => car._id !== currentCarId).slice(0, 3)

          setSimilarCars(filtered)
        } else {
          console.error("Error fetching similar cars:", data.message)
        }
      } catch (error) {
        console.error("Error fetching similar cars:", error)
      } finally {
        setLoading(false)
      }
    }

    if (make) {
      fetchSimilarCars()
    }
  }, [currentCarId, make])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-8 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (similarCars.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p>No similar vehicles found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {similarCars.map((car) => (
        <Card key={car._id}>
          <div className="relative">
            <Link href={`/inventory/${car._id}`}>
              <Image
                src={car.images[0] || "/placeholder.jpeg?height=600&width=800"}
                alt={car.title}
                width={800}
                height={600}
                className="h-40 w-full object-cover"
              />
            </Link>
          </div>
          <CardContent className="p-4">
            <Link href={`/inventory/${car._id}`}>
              <h3 className="text-lg font-bold hover:text-primary transition-colors">{car.title}</h3>
            </Link>
            <p className="text-gray-500 mb-2">
              {car.year} • {car.mileage.toLocaleString()} miles
            </p>
            <p className="text-xl font-bold text-primary">${car.price.toLocaleString()}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/inventory/${car._id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
