import { useState } from 'react'

export const useActiveFilters = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(['all'])

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => {
      if (filter === 'all') {
        return ['all']
      }

      if (prev.includes(filter)) {
        const result = prev.filter((item) => item !== filter)
        if (result.length === 0) {
          return ['all']
        }

        return result
      }

      const result = prev.filter((filter) => filter !== 'all')

      return [...result, filter]
    })
  }

  const isActive = (filter: string) => activeFilters.includes(filter)

  return {
    isActive,
    toggleFilter,
    activeFilters,
  }
}
