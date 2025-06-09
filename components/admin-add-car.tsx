"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X } from "lucide-react"

export function AdminAddCar() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>(["/placeholder.svg?height=600&width=800"])
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    year: new Date().getFullYear().toString(),
    make: "",
    model: "",
    mileage: "",
    fuelType: "Gasoline",
    transmission: "Automatic",
    exteriorColor: "",
    interiorColor: "",
    engine: "",
    vin: "",
    features: "",
    description: "",
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsSubmitting(true)

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]
        const formData = new FormData()
        formData.append("file", file)

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          const data = await response.json()

          if (data.success) {
            setImages((prev) => [...prev, data.fileUrl])
          } else {
            toast({
              title: "Upload Failed",
              description: data.message || "Failed to upload image.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Error uploading image:", error)
          toast({
            title: "Upload Error",
            description: "There was a problem uploading your image.",
            variant: "destructive",
          })
        }
      }

      setIsSubmitting(false)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format the data
      const carData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        year: Number.parseInt(formData.year),
        mileage: Number.parseInt(formData.mileage),
        features: formData.features.split(",").map((feature) => feature.trim()),
        images,
        status: "available",
      }

      // Send the data to the API
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Vehicle Added",
          description: "The vehicle has been added to your inventory.",
        })

        // Reset form
        setFormData({
          title: "",
          price: "",
          year: new Date().getFullYear().toString(),
          make: "",
          model: "",
          mileage: "",
          fuelType: "Gasoline",
          transmission: "Automatic",
          exteriorColor: "",
          interiorColor: "",
          engine: "",
          vin: "",
          features: "",
          description: "",
          featured: false,
        })
        setImages(["/placeholder.jpeg?height=600&width=800"])
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to add vehicle.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding car:", error)
      toast({
        title: "Error",
        description: "There was a problem adding the vehicle.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vehicle Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
              <img
                src={image || "/placeholder.jpeg?height=600&width=800"}
                alt={`Vehicle image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ))}
          <div className="aspect-square rounded-md border border-dashed flex items-center justify-center">
            <Label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
            >
              <Upload className="h-8 w-8 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">Upload Image</span>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </Label>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Vehicle Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. 2023 Mercedes-Benz S-Class"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 85000"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="e.g. Mercedes-Benz"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g. S-Class"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            id="mileage"
            name="mileage"
            type="number"
            value={formData.mileage}
            onChange={handleChange}
            placeholder="e.g. 5000"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select value={formData.fuelType} onValueChange={(value) => handleSelectChange("fuelType", value)}>
            <SelectTrigger id="fuelType">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gasoline">Gasoline</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
              <SelectItem value="Plug-in Hybrid">Plug-in Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission</Label>
          <Select value={formData.transmission} onValueChange={(value) => handleSelectChange("transmission", value)}>
            <SelectTrigger id="transmission">
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="CVT">CVT</SelectItem>
              <SelectItem value="Semi-Automatic">Semi-Automatic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="exteriorColor">Exterior Color</Label>
          <Input
            id="exteriorColor"
            name="exteriorColor"
            value={formData.exteriorColor}
            onChange={handleChange}
            placeholder="e.g. Obsidian Black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interiorColor">Interior Color</Label>
          <Input
            id="interiorColor"
            name="interiorColor"
            value={formData.interiorColor}
            onChange={handleChange}
            placeholder="e.g. Black/Nappa Leather"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="engine">Engine</Label>
          <Input
            id="engine"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
            placeholder="e.g. 4.0L V8 Biturbo"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vin">VIN</Label>
        <Input id="vin" name="vin" value={formData.vin} onChange={handleChange} placeholder="e.g. WDDUG8FB7MA456789" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features (comma separated)</Label>
        <Textarea
          id="features"
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="e.g. Premium Package, Driver Assistance Package, Burmester 3D Surround Sound"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description of the vehicle..."
          rows={5}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => handleCheckboxChange("featured", checked as boolean)}
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Feature this vehicle on the homepage
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Adding Vehicle..." : "Add Vehicle"}
      </Button>
    </form>
  )
}
