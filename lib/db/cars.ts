import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"

// Mock data for when MongoDB isn't available
const mockCars = [
  {
    _id: "1",
    title: "2023 Mercedes-Benz S-Class",
    price: 110000,
    year: 2023,
    make: "Mercedes-Benz",
    model: "S-Class",
    mileage: 5000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    exteriorColor: "Obsidian Black",
    interiorColor: "Black/Nappa Leather",
    engine: "4.0L V8 Biturbo",
    vin: "WDDUG8FB7MA456789",
    features: [
      "Premium Package",
      "Driver Assistance Package",
      "Burmester 3D Surround Sound",
      "Heated and Ventilated Seats",
      "Panoramic Sunroof",
    ],
    description: "Experience luxury and performance with this stunning 2023 Mercedes-Benz S-Class.",
    images: ["/placeholder.jpeg?height=600&width=800"],
    featured: true,
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "2022 BMW 7 Series",
    price: 95000,
    year: 2022,
    make: "BMW",
    model: "7 Series",
    mileage: 8000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    exteriorColor: "Alpine White",
    interiorColor: "Cognac Nappa Leather",
    engine: "3.0L Inline-6 Turbo",
    vin: "WBA7E2C55JG123456",
    features: [
      "Executive Package",
      "Driving Assistance Professional",
      "Bowers & Wilkins Diamond Surround Sound",
      "Panoramic Sky Lounge LED Roof",
    ],
    description: "Luxury meets performance in this elegant 2022 BMW 7 Series sedan.",
    images: ["/placeholder.jpeg?height=600&width=800"],
    featured: true,
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "2023 Audi A8",
    price: 88000,
    year: 2023,
    make: "Audi",
    model: "A8",
    mileage: 3000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    exteriorColor: "Mythos Black",
    interiorColor: "Valcona Leather",
    engine: "3.0L V6 TFSI",
    vin: "WAU8DAF85JN123789",
    features: [
      "Executive Package",
      "Bang & Olufsen 3D Advanced Sound System",
      "Head-up Display",
      "Night Vision Assistant",
    ],
    description: "Experience the pinnacle of Audi luxury with this 2023 A8 sedan.",
    images: ["/placeholder.jpeg?height=600&width=800"],
    featured: false,
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export type Car = {
  _id?: string | ObjectId
  title: string
  price: number
  year: number
  make: string
  model: string
  mileage: number
  fuelType: string
  transmission: string
  exteriorColor: string
  interiorColor: string
  engine: string
  vin: string
  features: string[]
  description: string
  images: string[]
  featured: boolean
  status: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

// Check if MongoDB is available
export const isMongoAvailable = async () => {
  try {
    if (!process.env.MONGODB_URI) return false
    const client = await clientPromise
    return !!client
  } catch (error) {
    console.error("MongoDB connection error:", error)
    return false
  }
}

export async function getCars() {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log("Using mock car data (MongoDB not available)")
    return mockCars
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    console.log("here")

    const cars = await db.collection("cars").find({}).sort({ createdAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(cars))
  } catch (error) {
    console.error("Error fetching cars from MongoDB:", error)
    return mockCars
  }
}

export async function getFeaturedCars() {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log("Using mock featured car data (MongoDB not available)")
    return mockCars.filter((car) => car.featured)
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    const cars = await db.collection("cars").find({ featured: true }).sort({ createdAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(cars))
  } catch (error) {
    console.error("Error fetching featured cars from MongoDB:", error)
    return mockCars.filter((car) => car.featured)
  }
}

export async function getCarById(id: string) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log(`Using mock car data for ID ${id} (MongoDB not available)`)
    return mockCars.find((car) => car._id === id) || null
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    let car
    try {
      // Try to find by ObjectId first
      car = await db.collection("cars").findOne({ _id: new ObjectId(id) })
    } catch (error) {
      // If that fails, try to find by string ID
      car = await db.collection("cars").findOne({ _id: id })
    }

    return car ? JSON.parse(JSON.stringify(car)) : null
  } catch (error) {
    console.error(`Error fetching car with ID ${id} from MongoDB:`, error)
    return mockCars.find((car) => car._id === id) || null
  }
}

export async function createCar(carData: Car) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log("Using mock data for creating car (MongoDB not available)")
    const newId = (mockCars.length + 1).toString()
    const newCar = {
      ...carData,
      _id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockCars.push(newCar as any)
    return newCar
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    const car = {
      ...carData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("cars").insertOne(car)

    return {
      ...car,
      _id: result.insertedId,
    }
  } catch (error) {
    console.error("Error creating car in MongoDB:", error)
    // Fallback to mock data
    const newId = (mockCars.length + 1).toString()
    const newCar = {
      ...carData,
      _id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockCars.push(newCar as any)
    return newCar
  }
}

export async function updateCar(id: string, carData: Partial<Car>) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log(`Using mock data for updating car ${id} (MongoDB not available)`)
    const carIndex = mockCars.findIndex((car) => car._id === id)
    if (carIndex === -1) return false

    mockCars[carIndex] = {
      ...mockCars[carIndex],
      ...carData,
      updatedAt: new Date().toISOString(),
    }
    return true
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    let result
    try {
      // Try to update by ObjectId first
      result = await db.collection("cars").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...carData,
            updatedAt: new Date(),
          },
        },
      )
    } catch (error) {
      // If that fails, try to update by string ID
      result = await db.collection("cars").updateOne(
        { _id: id },
        {
          $set: {
            ...carData,
            updatedAt: new Date(),
          },
        },
      )
    }

    return result.modifiedCount > 0
  } catch (error) {
    console.error(`Error updating car with ID ${id} in MongoDB:`, error)
    // Fallback to mock data
    const carIndex = mockCars.findIndex((car) => car._id === id)
    if (carIndex === -1) return false

    mockCars[carIndex] = {
      ...mockCars[carIndex],
      ...carData,
      updatedAt: new Date().toISOString(),
    }
    return true
  }
}

export async function deleteCar(id: string) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log(`Using mock data for deleting car ${id} (MongoDB not available)`)
    const initialLength = mockCars.length
    const filteredCars = mockCars.filter((car) => car._id !== id)
    mockCars.length = 0
    mockCars.push(...filteredCars)
    return mockCars.length < initialLength
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    let result
    try {
      // Try to delete by ObjectId first
      result = await db.collection("cars").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
      // If that fails, try to delete by string ID
      result = await db.collection("cars").deleteOne({ _id: id })
    }

    return result.deletedCount > 0
  } catch (error) {
    console.error(`Error deleting car with ID ${id} from MongoDB:`, error)
    // Fallback to mock data
    const initialLength = mockCars.length
    const filteredCars = mockCars.filter((car) => car._id !== id)
    mockCars.length = 0
    mockCars.push(...filteredCars)
    return mockCars.length < initialLength
  }
}

export async function searchCars(query: any) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log("Using mock data for searching cars (MongoDB not available)")
    // Basic filtering for mock data
    return mockCars.filter((car) => {
      let matches = true

      if (query.make && query.make !== "All Makes") {
        matches = matches && car.make === query.make
      }

      if (query.model && query.model !== "All Models") {
        matches = matches && car.model === query.model
      }

      if (query.minYear) {
        matches = matches && car.year >= Number.parseInt(query.minYear)
      }

      if (query.maxYear) {
        matches = matches && car.year <= Number.parseInt(query.maxYear)
      }

      if (query.minPrice) {
        matches = matches && car.price >= Number.parseInt(query.minPrice)
      }

      if (query.maxPrice) {
        matches = matches && car.price <= Number.parseInt(query.maxPrice)
      }

      if (query.featured) {
        matches = matches && car.featured === (query.featured === "true")
      }

      return matches
    })
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    // Build the search query
    const searchQuery: any = {}

    if (query.make && query.make !== "All Makes") {
      searchQuery.make = query.make
    }

    if (query.model && query.model !== "All Models") {
      searchQuery.model = query.model
    }

    if (query.minYear) {
      searchQuery.year = { $gte: Number.parseInt(query.minYear) }
    }

    if (query.maxYear) {
      searchQuery.year = { ...searchQuery.year, $lte: Number.parseInt(query.maxYear) }
    }

    if (query.minPrice && query.maxPrice) {
      searchQuery.price = {
        $gte: Number.parseInt(query.minPrice),
        $lte: Number.parseInt(query.maxPrice),
      }
    } else if (query.minPrice) {
      searchQuery.price = { $gte: Number.parseInt(query.minPrice) }
    } else if (query.maxPrice) {
      searchQuery.price = { $lte: Number.parseInt(query.maxPrice) }
    }

    if (query.bodyType && query.bodyType !== "All Types") {
      searchQuery.bodyType = query.bodyType
    }

    if (query.transmission && query.transmission !== "All") {
      searchQuery.transmission = query.transmission
    }

    if (query.featured) {
      searchQuery.featured = query.featured === "true"
    }

    if (query.keyword) {
      searchQuery.$or = [
        { title: { $regex: query.keyword, $options: "i" } },
        { description: { $regex: query.keyword, $options: "i" } },
        { make: { $regex: query.keyword, $options: "i" } },
        { model: { $regex: query.keyword, $options: "i" } },
      ]
    }

    const cars = await db.collection("cars").find(searchQuery).sort({ createdAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(cars))
  } catch (error) {
    console.error("Error searching cars in MongoDB:", error)
    // Fallback to mock data with basic filtering
    return mockCars.filter((car) => {
      let matches = true

      if (query.make && query.make !== "All Makes") {
        matches = matches && car.make === query.make
      }

      if (query.model && query.model !== "All Models") {
        matches = matches && car.model === query.model
      }

      if (query.minYear) {
        matches = matches && car.year >= Number.parseInt(query.minYear)
      }

      if (query.maxYear) {
        matches = matches && car.year <= Number.parseInt(query.maxYear)
      }

      if (query.minPrice) {
        matches = matches && car.price >= Number.parseInt(query.minPrice)
      }

      if (query.maxPrice) {
        matches = matches && car.price <= Number.parseInt(query.maxPrice)
      }

      if (query.featured) {
        matches = matches && car.featured === (query.featured === "true")
      }

      return matches
    })
  }
}
