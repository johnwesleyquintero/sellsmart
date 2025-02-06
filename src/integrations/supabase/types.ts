export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      amazon_ads_metrics: {
        Row: {
          account_id: string | null
          account_name: string | null
          account_type: string | null
          acos: number | null
          ad_group_created_date: string | null
          ad_group_created_datetime: string | null
          ad_group_creative_type: string | null
          ad_group_delivery_reasons: string | null
          ad_group_delivery_status: string | null
          ad_group_id: string | null
          ad_group_name: string | null
          ad_group_status: string | null
          ad_group_updated_date: string | null
          ad_group_updated_datetime: string | null
          ad_id: string | null
          ad_type: string | null
          advertised_asin: string | null
          advertised_product_brand: string | null
          advertised_product_category: string | null
          advertised_product_price: number | null
          advertised_product_title: string | null
          advertised_sku: string | null
          amount_spent: number | null
          best_seller_rank: string | null
          bid_optimization: string | null
          brands_creative_type: string | null
          campaign_bid_strategy: string | null
          campaign_budget: number | null
          campaign_budget_type: string | null
          campaign_cost_type: string | null
          campaign_created_date: string | null
          campaign_created_datetime: string | null
          campaign_delivery_reasons: string | null
          campaign_delivery_status: string | null
          campaign_end_date: string | null
          campaign_id: string | null
          campaign_name: string | null
          campaign_start_date: string | null
          campaign_status: string | null
          campaign_targeting_type: string | null
          campaign_updated_date: string | null
          campaign_updated_datetime: string | null
          clicks: number | null
          conversion_rate: number | null
          country_code: string | null
          cpc: number | null
          ctr: number | null
          currency_code: string | null
          date: string | null
          fourteen_days_acos: number | null
          fourteen_days_acos_view_attributed: number | null
          fourteen_days_cvr: number | null
          fourteen_days_cvr_view_attributed: number | null
          fourteen_days_roas: number | null
          fourteen_days_roas_view_attributed: number | null
          fourteen_days_total_orders: number | null
          fourteen_days_total_orders_view_attributed: number | null
          fourteen_days_total_sales: number | null
          fourteen_days_total_sales_view_attributed: number | null
          id: number
          impressions: number | null
          is_valid_payment_method: boolean | null
          keyword: string | null
          keyword_bid: number | null
          keyword_id: string | null
          keyword_status: string | null
          keyword_type: string | null
          marketplace_string_id: string | null
          month: string | null
          month_number: number | null
          one_day_acos: number | null
          one_day_cvr: number | null
          one_day_roas: number | null
          one_day_total_orders: number | null
          one_day_total_sales: number | null
          placement: string | null
          portfolio_id: string | null
          portfolio_name: string | null
          portfolio_status: string | null
          product_availability: string | null
          product_image_url: string | null
          profile_id: string | null
          return_on_ad_spend: number | null
          search_term: string | null
          seven_days_acos: number | null
          seven_days_cvr: number | null
          seven_days_roas: number | null
          seven_days_total_orders: number | null
          seven_days_total_sales: number | null
          target_id: string | null
          targeting_expression: string | null
          targeting_type: string | null
          thirty_days_acos: number | null
          thirty_days_cvr: number | null
          thirty_days_roas: number | null
          thirty_days_total_orders: number | null
          thirty_days_total_sales: number | null
          timezone: string | null
          total_ad_orders: number | null
          total_ad_sales: number | null
          view_impressions: number | null
          week_number_mon_sun: number | null
          week_number_sun_sat: number | null
          week_start_date_mon_sun: string | null
          week_start_date_sun_sat: string | null
          year: number | null
          year_month: string | null
          year_month_number: number | null
        }
        Insert: {
          account_id?: string | null
          account_name?: string | null
          account_type?: string | null
          acos?: number | null
          ad_group_created_date?: string | null
          ad_group_created_datetime?: string | null
          ad_group_creative_type?: string | null
          ad_group_delivery_reasons?: string | null
          ad_group_delivery_status?: string | null
          ad_group_id?: string | null
          ad_group_name?: string | null
          ad_group_status?: string | null
          ad_group_updated_date?: string | null
          ad_group_updated_datetime?: string | null
          ad_id?: string | null
          ad_type?: string | null
          advertised_asin?: string | null
          advertised_product_brand?: string | null
          advertised_product_category?: string | null
          advertised_product_price?: number | null
          advertised_product_title?: string | null
          advertised_sku?: string | null
          amount_spent?: number | null
          best_seller_rank?: string | null
          bid_optimization?: string | null
          brands_creative_type?: string | null
          campaign_bid_strategy?: string | null
          campaign_budget?: number | null
          campaign_budget_type?: string | null
          campaign_cost_type?: string | null
          campaign_created_date?: string | null
          campaign_created_datetime?: string | null
          campaign_delivery_reasons?: string | null
          campaign_delivery_status?: string | null
          campaign_end_date?: string | null
          campaign_id?: string | null
          campaign_name?: string | null
          campaign_start_date?: string | null
          campaign_status?: string | null
          campaign_targeting_type?: string | null
          campaign_updated_date?: string | null
          campaign_updated_datetime?: string | null
          clicks?: number | null
          conversion_rate?: number | null
          country_code?: string | null
          cpc?: number | null
          ctr?: number | null
          currency_code?: string | null
          date?: string | null
          fourteen_days_acos?: number | null
          fourteen_days_acos_view_attributed?: number | null
          fourteen_days_cvr?: number | null
          fourteen_days_cvr_view_attributed?: number | null
          fourteen_days_roas?: number | null
          fourteen_days_roas_view_attributed?: number | null
          fourteen_days_total_orders?: number | null
          fourteen_days_total_orders_view_attributed?: number | null
          fourteen_days_total_sales?: number | null
          fourteen_days_total_sales_view_attributed?: number | null
          id?: never
          impressions?: number | null
          is_valid_payment_method?: boolean | null
          keyword?: string | null
          keyword_bid?: number | null
          keyword_id?: string | null
          keyword_status?: string | null
          keyword_type?: string | null
          marketplace_string_id?: string | null
          month?: string | null
          month_number?: number | null
          one_day_acos?: number | null
          one_day_cvr?: number | null
          one_day_roas?: number | null
          one_day_total_orders?: number | null
          one_day_total_sales?: number | null
          placement?: string | null
          portfolio_id?: string | null
          portfolio_name?: string | null
          portfolio_status?: string | null
          product_availability?: string | null
          product_image_url?: string | null
          profile_id?: string | null
          return_on_ad_spend?: number | null
          search_term?: string | null
          seven_days_acos?: number | null
          seven_days_cvr?: number | null
          seven_days_roas?: number | null
          seven_days_total_orders?: number | null
          seven_days_total_sales?: number | null
          target_id?: string | null
          targeting_expression?: string | null
          targeting_type?: string | null
          thirty_days_acos?: number | null
          thirty_days_cvr?: number | null
          thirty_days_roas?: number | null
          thirty_days_total_orders?: number | null
          thirty_days_total_sales?: number | null
          timezone?: string | null
          total_ad_orders?: number | null
          total_ad_sales?: number | null
          view_impressions?: number | null
          week_number_mon_sun?: number | null
          week_number_sun_sat?: number | null
          week_start_date_mon_sun?: string | null
          week_start_date_sun_sat?: string | null
          year?: number | null
          year_month?: string | null
          year_month_number?: number | null
        }
        Update: {
          account_id?: string | null
          account_name?: string | null
          account_type?: string | null
          acos?: number | null
          ad_group_created_date?: string | null
          ad_group_created_datetime?: string | null
          ad_group_creative_type?: string | null
          ad_group_delivery_reasons?: string | null
          ad_group_delivery_status?: string | null
          ad_group_id?: string | null
          ad_group_name?: string | null
          ad_group_status?: string | null
          ad_group_updated_date?: string | null
          ad_group_updated_datetime?: string | null
          ad_id?: string | null
          ad_type?: string | null
          advertised_asin?: string | null
          advertised_product_brand?: string | null
          advertised_product_category?: string | null
          advertised_product_price?: number | null
          advertised_product_title?: string | null
          advertised_sku?: string | null
          amount_spent?: number | null
          best_seller_rank?: string | null
          bid_optimization?: string | null
          brands_creative_type?: string | null
          campaign_bid_strategy?: string | null
          campaign_budget?: number | null
          campaign_budget_type?: string | null
          campaign_cost_type?: string | null
          campaign_created_date?: string | null
          campaign_created_datetime?: string | null
          campaign_delivery_reasons?: string | null
          campaign_delivery_status?: string | null
          campaign_end_date?: string | null
          campaign_id?: string | null
          campaign_name?: string | null
          campaign_start_date?: string | null
          campaign_status?: string | null
          campaign_targeting_type?: string | null
          campaign_updated_date?: string | null
          campaign_updated_datetime?: string | null
          clicks?: number | null
          conversion_rate?: number | null
          country_code?: string | null
          cpc?: number | null
          ctr?: number | null
          currency_code?: string | null
          date?: string | null
          fourteen_days_acos?: number | null
          fourteen_days_acos_view_attributed?: number | null
          fourteen_days_cvr?: number | null
          fourteen_days_cvr_view_attributed?: number | null
          fourteen_days_roas?: number | null
          fourteen_days_roas_view_attributed?: number | null
          fourteen_days_total_orders?: number | null
          fourteen_days_total_orders_view_attributed?: number | null
          fourteen_days_total_sales?: number | null
          fourteen_days_total_sales_view_attributed?: number | null
          id?: never
          impressions?: number | null
          is_valid_payment_method?: boolean | null
          keyword?: string | null
          keyword_bid?: number | null
          keyword_id?: string | null
          keyword_status?: string | null
          keyword_type?: string | null
          marketplace_string_id?: string | null
          month?: string | null
          month_number?: number | null
          one_day_acos?: number | null
          one_day_cvr?: number | null
          one_day_roas?: number | null
          one_day_total_orders?: number | null
          one_day_total_sales?: number | null
          placement?: string | null
          portfolio_id?: string | null
          portfolio_name?: string | null
          portfolio_status?: string | null
          product_availability?: string | null
          product_image_url?: string | null
          profile_id?: string | null
          return_on_ad_spend?: number | null
          search_term?: string | null
          seven_days_acos?: number | null
          seven_days_cvr?: number | null
          seven_days_roas?: number | null
          seven_days_total_orders?: number | null
          seven_days_total_sales?: number | null
          target_id?: string | null
          targeting_expression?: string | null
          targeting_type?: string | null
          thirty_days_acos?: number | null
          thirty_days_cvr?: number | null
          thirty_days_roas?: number | null
          thirty_days_total_orders?: number | null
          thirty_days_total_sales?: number | null
          timezone?: string | null
          total_ad_orders?: number | null
          total_ad_sales?: number | null
          view_impressions?: number | null
          week_number_mon_sun?: number | null
          week_number_sun_sat?: number | null
          week_start_date_mon_sun?: string | null
          week_start_date_sun_sat?: string | null
          year?: number | null
          year_month?: string | null
          year_month_number?: number | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          id: string
          key_type: string
          key_value: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_type: string
          key_value: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          key_type?: string
          key_value?: string
          user_id?: string
        }
        Relationships: []
      }
      campaign_targets: {
        Row: {
          created_at: string
          current_value: number | null
          end_date: string
          id: string
          name: string
          start_date: string
          target_type: string
          target_value: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_value?: number | null
          end_date: string
          id?: string
          name: string
          start_date: string
          target_type: string
          target_value: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_value?: number | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          target_type?: string
          target_value?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      google_workspace_settings: {
        Row: {
          auto_sync: boolean | null
          created_at: string
          id: string
          last_synced_at: string | null
          sheet_name: string | null
          spreadsheet_id: string | null
          sync_frequency: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_sync?: boolean | null
          created_at?: string
          id?: string
          last_synced_at?: string | null
          sheet_name?: string | null
          spreadsheet_id?: string | null
          sync_frequency?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_sync?: boolean | null
          created_at?: string
          id?: string
          last_synced_at?: string | null
          sheet_name?: string | null
          spreadsheet_id?: string | null
          sync_frequency?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profile_creation_errors: {
        Row: {
          created_at: string | null
          error_message: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sales_data: {
        Row: {
          ad_clicks: number
          ad_impressions: number
          ad_spend: number
          created_at: string | null
          date: string
          id: string
          orders: number
          sales: number
          user_id: string
        }
        Insert: {
          ad_clicks?: number
          ad_impressions?: number
          ad_spend?: number
          created_at?: string | null
          date: string
          id?: string
          orders?: number
          sales?: number
          user_id: string
        }
        Update: {
          ad_clicks?: number
          ad_impressions?: number
          ad_spend?: number
          created_at?: string | null
          date?: string
          id?: string
          orders?: number
          sales?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_metrics:
        | {
            Args: Record<PropertyKey, never>
            Returns: undefined
          }
        | {
            Args: {
              p_sales: number
              p_ad_spend: number
              p_ad_clicks: number
              p_ad_impressions: number
            }
            Returns: Json
          }
      pg_get_tabledef:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              input_table_name: string
            }
            Returns: string
          }
      upsert_sales_data: {
        Args: {
          p_user_id: string
          p_date: string
          p_sales: number
          p_ad_spend: number
          p_orders: number
          p_ad_clicks: number
          p_ad_impressions: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
