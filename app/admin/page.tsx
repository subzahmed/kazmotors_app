"use client"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminCarList } from "@/components/admin-car-list"
import { AdminAddCar } from "@/components/admin-add-car"
import { AdminInquiries } from "@/components/admin-inquiries"
import { AdminDashboardStats } from "@/components/admin-dashboard-stats"
import { AdminUserManagement } from "@/components/admin-user-management"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { LogOut, Users } from "lucide-react"

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
    return <div className="container mx-auto py-12 px-4 text-center text-white">Loading...</div>
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-300">
              Signed in as: <span className="font-medium text-white">{session?.user?.email}</span>
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="border-hom-gray text-white hover:bg-hom-dark"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <AdminDashboardStats />

        <Tabs defaultValue="inventory" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 bg-hom-dark">
            <TabsTrigger value="inventory" className="data-[state=active]:bg-hom-red data-[state=active]:text-white">
              Inventory Management
            </TabsTrigger>
            <TabsTrigger value="add" className="data-[state=active]:bg-hom-red data-[state=active]:text-white">
              Add New Vehicle
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-hom-red data-[state=active]:text-white">
              Customer Inquiries
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-hom-red data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Admin Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inventory" className="p-6 bg-hom-dark rounded-lg mt-4">
            <AdminCarList />
          </TabsContent>
          <TabsContent value="add" className="p-6 bg-hom-dark rounded-lg mt-4">
            <AdminAddCar />
          </TabsContent>
          <TabsContent value="inquiries" className="p-6 bg-hom-dark rounded-lg mt-4">
            <AdminInquiries />
          </TabsContent>
          <TabsContent value="users" className="p-6 bg-hom-dark rounded-lg mt-4">
            <AdminUserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
