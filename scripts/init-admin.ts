import { ensureAdminExists } from "@/lib/db/users"

async function main() {
  try {
    console.log("Initializing admin user...")
    await ensureAdminExists()
    console.log("Admin user initialization complete")
  } catch (error) {
    console.error("Error initializing admin user:", error)
  }
}

main()
