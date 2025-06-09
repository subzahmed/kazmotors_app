import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { createUser, getAdminUsers } from "@/lib/db/users"

// Get all admin users
export async function GET() {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const adminUsers = await getAdminUsers()

    return NextResponse.json({ success: true, users: adminUsers })
  } catch (error) {
    console.error("Error fetching admin users:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch admin users" }, { status: 500 })
  }
}

// Create a new admin user
export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { email, password, name } = data

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Create new admin user
    const newUser = await createUser({
      email,
      password,
      name: name || email.split("@")[0],
      role: "admin",
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser || {}

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      user: userWithoutPassword,
    })
  } catch (error: any) {
    console.error("Error creating admin user:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create admin user",
      },
      { status: 500 },
    )
  }
}
