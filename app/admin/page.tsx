"use client"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminCarList } from "@/components/admin-car-list"
import { AdminAddCar } from "@/components/admin-add-car"
import { AdminInquiries } from "@/components/admin-inquiries"
import { AdminDashboardStats } from "@/components/admin-dashboard-stats"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/login")
    },
  })
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show nothing until client-side hydration is complete
  if (!mounted) return null

  if (status === "loading") {
    return <div className="container mx-auto py-12 px-4 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm">
            Signed in as: <span className="font-medium">{session?.user?.email}</span>
          </p>
          {process.env.NODE_ENV === "development" && (
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                if (confirm("This will generate random cars and inquiries. Continue?")) {
                  try {
                    const response = await fetch("/api/admin/seed", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ count: 10, inquiryCount: 5 }),
                    })

                    const data = await response.json()

                    if (data.success) {
                      toast({
                        title: "Seed Successful",
                        description: data.message,
                      })
                      // Reload the page to show new data
                      window.location.reload()
                    } else {
                      toast({
                        title: "Seed Failed",
                        description: data.message,
                        variant: "destructive",
                      })
                    }
                  } catch (error) {
                    console.error("Error seeding data:", error)
                    toast({
                      title: "Seed Failed",
                      description: "An error occurred while seeding data",
                      variant: "destructive",
                    })
                  }
                }
              }}
            >
              Seed Test Data
            </Button>
          )}
        </div>
      </div>

      <AdminDashboardStats />

      <Tabs defaultValue="inventory" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
          <TabsTrigger value="add">Add New Vehicle</TabsTrigger>
          <TabsTrigger value="inquiries">Customer Inquiries</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="p-6 bg-gray-50 rounded-lg mt-4">
          <AdminCarList />
        </TabsContent>
        <TabsContent value="add" className="p-6 bg-gray-50 rounded-lg mt-4">
          <AdminAddCar />
        </TabsContent>
        <TabsContent value="inquiries" className="p-6 bg-gray-50 rounded-lg mt-4">
          <AdminInquiries />
        </TabsContent>
      </Tabs>
      <></>
    </div>
  )
}
