import { create } from 'zustand'
import { apiUrl } from '@/lib/api'

interface InteractionStore {
  visits: number
  loading: boolean
  error: string | null
  
  recordVisit: () => Promise<void>
}

export const useInteractionStore = create<InteractionStore>((set, get) => ({
  visits: 0,
  loading: false,
  error: null,

  recordVisit: async () => {
    if (get().loading) return
    set({ loading: true, error: null })
    try {
      const res = await fetch(apiUrl('/api/interactions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'page_load', timestamp: new Date().toISOString() })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      set({ visits: data.totalVisits, loading: false })
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to record visit' })
    }
  }
}))