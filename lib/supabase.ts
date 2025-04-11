import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lsvvyeqbkigoocmmmayd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdnZ5ZXFia2lnb29jbW1tYXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2OTgwNzYsImV4cCI6MjA1NDI3NDA3Nn0.dpcZac5zUm93bknNdh1nXw188w5A13Lu_S6XCia7zgg'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipo que coincide exactamente con tu tabla en Supabase
export interface Note {
  id: number;
  title: string;
  text: string;
  date: string;
}

// Funciones simples para interactuar con la tabla
export const notesApi = {
  async getNotes() {
    const { data, error } = await supabase
      .from('note')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    return data as Note[]
  },

  async createNote(note: { title: string; text: string }) {
    const { data, error } = await supabase
      .from('note')
      .insert(note)
      .select()
      .single()
    
    if (error) throw error
    return data as Note
  },

  async updateNote(id: number, updates: { title?: string; text?: string }) {
    const { data, error } = await supabase
      .from('note')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Note
  },

  async deleteNote(id: number) {
    const { error } = await supabase
      .from('note')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
} 