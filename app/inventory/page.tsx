"use client"

import { useState } from "react"
import { SearchFilters } from "@/components/search-filters"
import { CarGrid } from "@/components/car-grid"
import { Pagination } from "@/components/pagination"

export default function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-black">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">
          Our <span className="text-hom-red">Inventory</span>
        </h1>
        <div className="bg-hom-dark p-6 rounded-lg mb-8">
          <SearchFilters />
        </div>
        <CarGrid currentPage={currentPage} onPageChange={handlePageChange} itemsPerPage={itemsPerPage} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(100 / itemsPerPage)} // This will be calculated based on actual data
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
