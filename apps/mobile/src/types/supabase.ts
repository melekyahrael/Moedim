export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      feast_content: {
        Row: {
          category: string | null
          code: string
          created_at: string | null
          description: string | null
          duration: number | null
          hebrew_name: string | null
          id: string
          month: number
          name: string
          observance_notes: string | null
          scripture_refs: Json | null
          start_day: number
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string | null
          description?: string | null
          duration?: number | null
          hebrew_name?: string | null
          id?: string
          month: number
          name: string
          observance_notes?: string | null
          scripture_refs?: Json | null
          start_day: number
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string | null
          description?: string | null
          duration?: number | null
          hebrew_name?: string | null
          id?: string
          month?: number
          name?: string
          observance_notes?: string | null
          scripture_refs?: Json | null
          start_day?: number
        }
        Relationships: []
      }
      torah_portions: {
        Row: {
          brit_chadasha: string | null
          created_at: string | null
          haftarah: string | null
          hebrew: string | null
          id: string
          name: string
          number: number
          summary: string | null
          torah_reading: string
        }
        Insert: {
          brit_chadasha?: string | null
          created_at?: string | null
          haftarah?: string | null
          hebrew?: string | null
          id?: string
          name: string
          number: number
          summary?: string | null
          torah_reading: string
        }
        Update: {
          brit_chadasha?: string | null
          created_at?: string | null
          haftarah?: string | null
          hebrew?: string | null
          id?: string
          name?: string
          number?: number
          summary?: string | null
          torah_reading?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          item_code: string
          item_type: string
          notes: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_code: string
          item_type: string
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_code?: string
          item_type?: string
          notes?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          location_name: string | null
          notifications_enabled: boolean | null
          theme: string | null
          updated_at: string | null
          user_id: string | null
          year_anchor: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          location_name?: string | null
          notifications_enabled?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
          year_anchor?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          location_name?: string | null
          notifications_enabled?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
          year_anchor?: string | null
        }
        Relationships: []
      }
      waitlist_signups: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          phone: string | null
          platform: string | null
          referral_code: string | null
          referred_by: string | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          phone?: string | null
          platform?: string | null
          referral_code?: string | null
          referred_by?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          platform?: string | null
          referral_code?: string | null
          referred_by?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waitlist_signups_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "waitlist_signups"
            referencedColumns: ["id"]
          },
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
