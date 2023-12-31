export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      board: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      post: {
        Row: {
          board_id: number
          content: string | null
          created_at: string | null
          id: number
          title: string | null
        }
        Insert: {
          board_id: number
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          board_id?: number
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_board_id_fkey"
            columns: ["board_id"]
            referencedRelation: "board"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
