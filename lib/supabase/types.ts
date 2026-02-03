export type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type PaymentStatus = "pending" | "verified" | "failed";

/** Supabase expects each table to have Relationships (can be []), and schema to have Views + Functions. */
export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          order_number: string;
          full_name: string;
          email: string;
          phone: string | null;
          address: string;
          city: string;
          zip: string;
          items: OrderItem[];
          total_price: number;
          payment_status: PaymentStatus;
          referral_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          full_name: string;
          email: string;
          phone?: string | null;
          address: string;
          city: string;
          zip: string;
          items: OrderItem[];
          total_price: number;
          payment_status?: PaymentStatus;
          referral_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          order_number?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          address?: string;
          city?: string;
          zip?: string;
          items?: OrderItem[];
          total_price?: number;
          payment_status?: PaymentStatus;
          referral_code?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      referral_codes: {
        Row: {
          id: string;
          code: string;
          label: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          label?: string | null;
          created_at?: string;
        };
        Update: {
          code?: string;
          label?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
