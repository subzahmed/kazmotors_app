"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface PaginationProps {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function Pagination({ currentPage = 1, totalPages = 5, onPageChange = () => {} }: PaginationProps) {
  const [activePage, setActivePage] = useState(currentPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page)
      onPageChange(page)
    }
  }

  const handlePrevious = () => {
    if (activePage > 1) {
      handlePageChange(activePage - 1)
    }
  }

  const handleNext = () => {
    if (activePage < totalPages) {
      handlePageChange(activePage + 1)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, activePage - 2)
      let endPage = Math.min(totalPages, activePage + 2)

      // Adjust if we're near the beginning or end
      if (activePage <= 3) {
        endPage = Math.min(totalPages, 5)
      }
      if (activePage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4)
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        className="border-hom-gray text-white hover:bg-hom-dark disabled:opacity-50"
        onClick={handlePrevious}
        disabled={activePage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {getPageNumbers().map((pageNumber) => (
        <Button
          key={pageNumber}
          variant="outline"
          className={`h-9 w-9 ${
            activePage === pageNumber
              ? "bg-hom-red text-white border-hom-red"
              : "border-hom-gray text-white hover:bg-hom-dark"
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="border-hom-gray text-white hover:bg-hom-dark disabled:opacity-50"
        onClick={handleNext}
        disabled={activePage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
