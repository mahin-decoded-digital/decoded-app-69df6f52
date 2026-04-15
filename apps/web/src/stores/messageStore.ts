import { create } from 'zustand'
import { apiUrl } from '@/lib/api'

export interface Message {
  _id?: string
  id?: string
  text: string
  createdAt?: string
}

interface MessageStore {
  messages: Message[]
  loading: boolean
  loaded: boolean
  error: string | null
  
  fetchMessages: () => Promise<void>
  addMessage: (text: string) => Promise<void>
  updateMessage: (id: string, text: string) => Promise<void>
  deleteMessage: (id: string) => Promise<void>
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  loading: false,
  loaded: false,
  error: null,

  fetchMessages: async () => {
    if (get().loading || get().loaded) return
    set({ loading: true, error: null })
    try {
      const res = await fetch(apiUrl('/api/messages'))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const messages = await res.json()
      set({ messages, loading: false, loaded: true })
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to load messages' })
    }
  },

  addMessage: async (text) => {
    try {
      const res = await fetch(apiUrl('/api/messages'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const created = await res.json()
      set(s => ({ messages: [...s.messages, created] }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to add message' })
    }
  },

  updateMessage: async (id, text) => {
    try {
      const res = await fetch(apiUrl(`/api/messages/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const updated = await res.json()
      set(s => ({
        messages: s.messages.map(m => (m._id === id || m.id === id ? updated : m))
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to update message' })
    }
  },

  deleteMessage: async (id) => {
    try {
      const res = await fetch(apiUrl(`/api/messages/${id}`), { method: 'DELETE' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      set(s => ({
        messages: s.messages.filter(m => m._id !== id && m.id !== id)
      }))
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to delete message' })
    }
  }
}))