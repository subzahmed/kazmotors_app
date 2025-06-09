import clientPromise from "../mongodb"
import { isMongoAvailable } from "./cars"

// Mock data for when MongoDB isn't available
const mockStats = {
  totalVehicles: 0,
  vehiclesChange: 0,
  activeInquiries: 0,
  inquiriesChange: 0,
}

export async function getDashboardStats() {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log("Using mock dashboard stats (MongoDB not available)")
    return mockStats
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    // Get current month and previous month date ranges
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get total vehicles and monthly change
    const totalVehicles = await db.collection("cars").countDocuments()
    const previousMonthVehicles = await db.collection("cars").countDocuments({
      createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
    })

    // Get active inquiries and daily change
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)

    const activeInquiries = await db.collection("inquiries").countDocuments({ read: false })
    const yesterdayInquiries = await db.collection("inquiries").countDocuments({
      createdAt: { $gte: yesterday },
    })

    return {
      totalVehicles,
      vehiclesChange: totalVehicles - previousMonthVehicles,
      activeInquiries,
      inquiriesChange: yesterdayInquiries,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats from MongoDB:", error)
    return mockStats
  }
}
