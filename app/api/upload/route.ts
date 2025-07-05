import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    console.log("Upload request received")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.log("No file found in request")
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
    }

    console.log("File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
    })

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      console.log("Invalid file type:", file.type)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
        },
        { status: 400 },
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.log("File too large:", file.size)
      return NextResponse.json(
        {
          success: false,
          message: "File too large. Maximum size is 5MB.",
        },
        { status: 400 },
      )
    }

    // Check if BLOB_READ_WRITE_TOKEN is available
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN environment variable is not set")
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: Blob storage not configured",
        },
        { status: 500 },
      )
    }

    // Generate a unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const fileName = `vehicles/${timestamp}-${randomString}.${fileExtension}`

    console.log("Uploading file:", fileName)

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    console.log("Upload successful:", blob.url)

    return NextResponse.json({
      success: true,
      fileUrl: blob.url,
      message: "File uploaded successfully",
    })
  } catch (error) {
    console.error("Detailed upload error:", error)

    // Provide more specific error messages
    let errorMessage = "Failed to upload file"

    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)

      // Check for specific error types
      if (error.message.includes("token")) {
        errorMessage = "Authentication error: Invalid or missing blob storage token"
      } else if (error.message.includes("network") || error.message.includes("fetch")) {
        errorMessage = "Network error: Unable to connect to blob storage"
      } else if (error.message.includes("size") || error.message.includes("limit")) {
        errorMessage = "File size error: File exceeds storage limits"
      } else {
        errorMessage = `Upload error: ${error.message}`
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
