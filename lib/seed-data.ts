import { createCar } from "./db/cars"
import { createInquiry } from "./db/inquiries"
import { isMongoAvailable } from "./db/cars"

// Car makes and models
const carMakes = [
  { make: "Toyota", models: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"] },
  { make: "Honda", models: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey"] },
  { make: "Ford", models: ["F-150", "Escape", "Explorer", "Mustang", "Edge"] },
  { make: "Chevrolet", models: ["Silverado", "Equinox", "Tahoe", "Malibu", "Traverse"] },
  { make: "BMW", models: ["3 Series", "5 Series", "X3", "X5", "7 Series"] },
  { make: "Mercedes-Benz", models: ["C-Class", "E-Class", "GLC", "GLE", "S-Class"] },
  { make: "Audi", models: ["A4", "A6", "Q5", "Q7", "A8"] },
  { make: "Lexus", models: ["RX", "ES", "NX", "GX", "LS"] },
]

// Car colors
const exteriorColors = ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Brown"]
const interiorColors = ["Black", "Gray", "Beige", "Brown", "Red", "Tan"]

// Car features
const carFeatures = [
  "Leather Seats",
  "Sunroof",
  "Navigation System",
  "Bluetooth",
  "Backup Camera",
  "Parking Sensors",
  "Heated Seats",
  "Keyless Entry",
  "Remote Start",
  "Apple CarPlay",
  "Android Auto",
  "Lane Departure Warning",
  "Adaptive Cruise Control",
  "Blind Spot Monitoring",
  "Premium Sound System",
  "Third Row Seating",
  "Roof Rack",
  "Towing Package",
  "All-Wheel Drive",
  "Panoramic Roof",
]

// Create a random car
function generateRandomCar() {
  // Pick a random make and model
  const makeIndex = Math.floor(Math.random() * carMakes.length)
  const make = carMakes[makeIndex].make
  const model = carMakes[makeIndex].models[Math.floor(Math.random() * carMakes[makeIndex].models.length)]

  // Generate random year between 2015 and current year
  const currentYear = new Date().getFullYear()
  const year = Math.floor(Math.random() * (currentYear - 2015 + 1)) + 2015

  // Generate random mileage based on age
  const maxMileage = (currentYear - year) * 15000
  const mileage = Math.floor(Math.random() * maxMileage) + 1000

  // Generate random price between $10,000 and $80,000
  const price = Math.floor(Math.random() * 70000) + 10000

  // Random colors
  const exteriorColor = exteriorColors[Math.floor(Math.random() * exteriorColors.length)]
  const interiorColor = interiorColors[Math.floor(Math.random() * interiorColors.length)]

  // Random engine based on make
  const engines = [
    "2.0L I4",
    "2.5L I4",
    "3.0L V6",
    "3.5L V6",
    "4.0L V8",
    "5.0L V8",
    "2.0L Turbo",
    "3.0L Turbo",
    "2.0L Hybrid",
  ]
  const engine = engines[Math.floor(Math.random() * engines.length)]

  // Random transmission
  const transmissions = ["Automatic", "Manual", "CVT", "Dual-Clutch"]
  const transmission = transmissions[Math.floor(Math.random() * transmissions.length)]

  // Random fuel type
  const fuelTypes = ["Gasoline", "Diesel", "Hybrid", "Electric"]
  const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)]

  // Random VIN
  const vinChars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"
  let vin = ""
  for (let i = 0; i < 17; i++) {
    vin += vinChars.charAt(Math.floor(Math.random() * vinChars.length))
  }

  // Random features (4-8)
  const numFeatures = Math.floor(Math.random() * 5) + 4
  const features = []
  for (let i = 0; i < numFeatures; i++) {
    const feature = carFeatures[Math.floor(Math.random() * carFeatures.length)]
    if (!features.includes(feature)) {
      features.push(feature)
    }
  }

  // Random status
  const statuses = ["available", "sold", "pending"]
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  // Random featured status (20% chance)
  const featured = Math.random() < 0.2

  return {
    title: `${year} ${make} ${model}`,
    price: price,
    year: year,
    make: make,
    model: model,
    mileage: mileage,
    fuelType: fuelType,
    transmission: transmission,
    exteriorColor: exteriorColor,
    interiorColor: interiorColor,
    engine: engine,
    vin: vin,
    features: features,
    description: `This ${year} ${make} ${model} is a great vehicle with ${mileage.toLocaleString()} miles. It features a ${engine} engine, ${transmission} transmission, and a beautiful ${exteriorColor} exterior with ${interiorColor} interior. Well maintained and ready for a new owner.`,
    images: ["/placeholder.jpeg?height=600&width=800"],
    featured: featured,
    status: status,
  }
}

// Generate random inquiries
function generateRandomInquiry(cars) {
  const firstNames = ["John", "Jane", "David", "Sarah", "Michael", "Emma", "Robert", "Emily", "William", "Olivia"]
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"]

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

  // Random car from available cars
  const car = cars[Math.floor(Math.random() * cars.length)]

  // Random message
  const messages = [
    `I'm interested in the ${car.year} ${car.make} ${car.model}. Is it still available?`,
    `Hello, I'd like to get more information about the ${car.year} ${car.make} ${car.model}. What financing options do you offer?`,
    `Can I schedule a test drive for the ${car.year} ${car.make} ${car.model} this weekend?`,
    `I have a trade-in and I'm interested in the ${car.year} ${car.make} ${car.model}. Can you provide an estimate?`,
    `What's your best price for the ${car.year} ${car.make} ${car.model}?`,
  ]
  const message = messages[Math.floor(Math.random() * messages.length)]

  // Random email
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`

  // Random phone
  const area = Math.floor(Math.random() * 800) + 200
  const prefix = Math.floor(Math.random() * 900) + 100
  const line = Math.floor(Math.random() * 9000) + 1000
  const phone = `(${area}) ${prefix}-${line}`

  // Random read status (70% chance of being read)
  const read = Math.random() < 0.7

  return {
    name: `${firstName} ${lastName}`,
    email: email,
    phone: phone,
    message: message,
    carId: car._id,
    carTitle: car.title,
    read: read,
  }
}

export async function seedDatabase(count = 20, inquiryCount = 10) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.error("MongoDB is not available. Cannot seed database.")
    return { success: false, message: "MongoDB is not available" }
  }

  try {
    console.log(`Seeding database with ${count} cars and ${inquiryCount} inquiries...`)

    // Generate and insert cars
    const cars = []
    for (let i = 0; i < count; i++) {
      const car = generateRandomCar()
      const newCar = await createCar(car)
      cars.push(newCar)
      console.log(`Created car: ${newCar.title}`)
    }

    // Generate and insert inquiries
    for (let i = 0; i < inquiryCount; i++) {
      const inquiry = generateRandomInquiry(cars)
      await createInquiry(inquiry)
      console.log(`Created inquiry from: ${inquiry.name}`)
    }

    return {
      success: true,
      message: `Successfully seeded database with ${count} cars and ${inquiryCount} inquiries.`,
    }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { success: false, message: "Error seeding database" }
  }
}
