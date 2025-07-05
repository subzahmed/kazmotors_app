"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, UserPlus, User } from "lucide-react"

type AdminUser = {
  _id: string
  email: string
  name?: string
  role: string
  createdAt?: string
}

export function AdminUserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()

      if (data.success) {
        setUsers(data.users)
      } else {
        console.error("Error fetching users:", data.message)
        toast({
          title: "Error",
          description: "Failed to load admin users. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to load admin users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Admin user created successfully",
        })
        setNewUser({
          email: "",
          password: "",
          name: "",
        })
        fetchUsers()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create admin user",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating user:", error)
      toast({
        title: "Error",
        description: "Failed to create admin user",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this admin user?")) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: "DELETE",
        })

        const data = await response.json()

        if (data.success) {
          toast({
            title: "Success",
            description: "Admin user deleted successfully",
          })
          fetchUsers()
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to delete admin user",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error deleting user:", error)
        toast({
          title: "Error",
          description: "Failed to delete admin user",
          variant: "destructive",
        })
      }
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return <div className="text-center py-8 text-white">Loading admin users...</div>
  }

  return (
    <div className="space-y-8">
      <Card className="bg-hom-gray border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Create New Admin User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                  className="bg-hom-dark border-hom-dark text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                  className="bg-hom-dark border-hom-dark text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="name" className="text-white">
                Name (Optional)
              </Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="bg-hom-dark border-hom-dark text-white"
              />
            </div>
            <Button type="submit" className="bg-hom-red hover:bg-red-700 text-white" disabled={isCreating}>
              <UserPlus className="mr-2 h-4 w-4" />
              {isCreating ? "Creating..." : "Create Admin User"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-hom-gray border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-center py-4 text-gray-400">No admin users found.</p>
          ) : (
            <div className="rounded-md border border-hom-dark overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-hom-dark">
                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Created</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t border-hom-dark">
                      <td className="px-4 py-3 text-white">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-hom-red mr-2" />
                          <span>{user.name || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white">{user.email}</td>
                      <td className="px-4 py-3 text-gray-400">{formatDate(user.createdAt)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-white hover:text-hom-red"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
