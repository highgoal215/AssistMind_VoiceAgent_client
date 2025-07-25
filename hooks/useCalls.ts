import { useState, useEffect, useMemo } from 'react'
import { Call, CallFilters, CallStats, PaginationState } from '@/components/calls/types'
import { MOCK_CALLS, ITEMS_PER_PAGE } from '@/components/calls/constants'

export function useCalls() {
  const [calls, setCalls] = useState<Call[]>(MOCK_CALLS)
  const [filters, setFilters] = useState<CallFilters>({
    searchTerm: '',
    callType: 'All',
    status: 'All',
    dateRange: 'All'
  })
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: Math.ceil(MOCK_CALLS.length / ITEMS_PER_PAGE),
    itemsPerPage: ITEMS_PER_PAGE
  })
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)
  const [noteMenuOpen, setNoteMenuOpen] = useState<string | null>(null)

  // Filter calls based on current filters
  const filteredCalls = useMemo(() => {
    return calls.filter(call => {
      const matchesSearch = call.caller.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        call.number.includes(filters.searchTerm)
      
      const matchesType = filters.callType === 'All' || 
        call.type === filters.callType.toLowerCase()
      
      const matchesStatus = filters.status === 'All' || 
        call.status === filters.status.toLowerCase()
      
      return matchesSearch && matchesType && matchesStatus
    })
  }, [calls, filters])

  // Paginate filtered calls
  const paginatedCalls = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
    const endIndex = startIndex + pagination.itemsPerPage
    return filteredCalls.slice(startIndex, endIndex)
  }, [filteredCalls, pagination])

  // Calculate stats
  const stats: CallStats = useMemo(() => {
    const totalCalls = calls.length
    const averageDuration = '2m 9s' // This would be calculated from actual data
    const uniqueCallers = new Set(calls.map(call => call.caller)).size

    return {
      totalCalls,
      averageDuration,
      uniqueCallers
    }
  }, [calls])

  // Update pagination when filters change
  useEffect(() => {
    const totalPages = Math.ceil(filteredCalls.length / pagination.itemsPerPage)
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalPages
    }))
  }, [filteredCalls, pagination.itemsPerPage])

  const updateFilters = (newFilters: Partial<CallFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const goToPage = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }))
  }

  const deleteCall = (callId: string) => {
    setCalls(prev => prev.filter(call => call.id !== callId))
  }

  const toggleFlag = (callId: string) => {
    setCalls(prev => prev.map(call => 
      call.id === callId ? { ...call, isFlagged: !call.isFlagged } : call
    ))
  }

  return {
    // State
    calls: paginatedCalls,
    filters,
    pagination,
    stats,
    actionMenuOpen,
    noteMenuOpen,
    
    // Actions
    updateFilters,
    goToPage,
    deleteCall,
    toggleFlag,
    setActionMenuOpen,
    setNoteMenuOpen
  }
} 