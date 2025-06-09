"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Eye, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Car = {
  _id: string
  title: string
  price: number
  year: number
  make: string
  model: string
  mileage: number
  images: string[]
  featured: boolean
  status: string
}

export function AdminCarList() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchCars()
  }, [])

  async function fetchCars() {
    try {
      const response = await fetch("/api/cars")
      const data = await response.json()

      if (data.success) {
        setCars(data.cars)
      } else {
        console.error("Error fetching cars:", data.message)
        toast({
          title: "Error",
          description: "Failed to load vehicles. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching cars:", error)
      toast({
        title: "Error",
        description: "Failed to load vehicles. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      try {
        const response = await fetch(`/api/cars/${id}`, {
          method: "DELETE",
        })

        const data = await response.json()

        if (data.success) {
          // Update local state
          setCars(cars.filter((car) => car._id !== id))

          toast({
            title: "Vehicle deleted",
            description: "The vehicle has been removed from inventory.",
          })
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to delete vehicle.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error deleting car:", error)
        toast({
          title: "Error",
          description: "There was a problem deleting the vehicle.",
          variant: "destructive",
        })
      }
    }
  }

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ featured: !featured }),
      })

      const data = await response.json()

      if (data.success) {
        // Update local state
        setCars(cars.map((car) => (car._id === id ? { ...car, featured: !featured } : car)))

        toast({
          title: featured ? "Removed from featured" : "Added to featured",
          description: `The vehicle has been ${featured ? "removed from" : "added to"} featured listings.`,
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update vehicle.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating car:", error)
      toast({
        title: "Error",
        description: "There was a problem updating the vehicle.",
        variant: "destructive",
      })
    }
  }

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="text-center py-8">Loading inventory...</div>
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search inventory..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-4">
          <Badge variant="outline">{cars.length} Vehicles</Badge>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-medium">Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Year</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Mileage</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Featured</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car._id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={car.images[0] || "/placeholder.jpeg?height=600&width=800"}
                          alt={car.title}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{car.title}</div>
                        <div className="text-xs text-gray-500">
                          {car.make} {car.model}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">${car.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{car.year}</td>
                  <td className="px-4 py-3 text-sm">{car.mileage.toLocaleString()} mi</td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant={car.status === "available" ? "default" : "secondary"}>
                      {car.status === "available" ? "Available" : "Sold"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Button
                      variant={car.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeatured(car._id, car.featured)}
                    >
                      {car.featured ? "Featured" : "Not Featured"}
                    </Button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/inventory/${car._id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(car._id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCars.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                    No vehicles found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
