import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"
import bcrypt from "bcryptjs"

export type User = {
  _id?: string | ObjectId
  email: string
  password: string
  name?: string
  role: "admin" | "user"
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

// Create initial admin user if none exists
export async function ensureAdminExists() {
  try {
    const mongoAvailable = await isMongoAvailable()
    if (!mongoAvailable) {
      console.log("MongoDB not available, cannot ensure admin exists")
      return false
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")
    const usersCollection = db.collection("users")

    // Check if any admin user exists
    const adminExists = await usersCollection.findOne({ role: "admin" })

    if (!adminExists) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash("123456789", 10)

      await usersCollection.insertOne({
        email: "subahmed67@gmail.com",
        password: hashedPassword,
        name: "Admin User",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      console.log("Created default admin user")
      return true
    }

    return true
  } catch (error) {
    console.error("Error ensuring admin exists:", error)
    return false
  }
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const mongoAvailable = await isMongoAvailable()
    if (!mongoAvailable) {
      console.log("MongoDB not available, cannot get user by email")
      return null
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    const user = await db.collection("users").findOne({ email })
    return user as User | null
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

// Create a new user
export async function createUser(userData: Omit<User, "_id">): Promise<User | null> {
  try {
    const mongoAvailable = await isMongoAvailable()
    if (!mongoAvailable) {
      console.log("MongoDB not available, cannot create user")
      return null
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: userData.email })
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const newUser = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("users").insertOne(newUser)

    return {
      ...newUser,
      _id: result.insertedId,
    }
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Get all admin users
export async function getAdminUsers(): Promise<User[]> {
  try {
    const mongoAvailable = await isMongoAvailable()
    if (!mongoAvailable) {
      console.log("MongoDB not available, cannot get admin users")
      return []
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    const users = await db
      .collection("users")
      .find({ role: "admin" })
      .project({ password: 0 }) // Exclude password
      .toArray()

    return users as User[]
  } catch (error) {
    console.error("Error getting admin users:", error)
    return []
  }
}

// Delete a user
export async function deleteUser(userId: string): Promise<boolean> {
  try {
    const mongoAvailable = await isMongoAvailable()
    if (!mongoAvailable) {
      console.log("MongoDB not available, cannot delete user")
      return false
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    let result
    try {
      // Try to delete by ObjectId first
      result = await db.collection("users").deleteOne({ _id: new ObjectId(userId) })
    } catch (error) {
      // If that fails, try to delete by string ID
      result = await db.collection("users").deleteOne({ _id: userId })
    }

    return result.deletedCount > 0
  } catch (error) {
    console.error("Error deleting user:", error)
    return false
  }
}
