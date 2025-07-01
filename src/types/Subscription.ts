export interface Subscription {
  id: string;
  name: string;
  phone_number: string;
  delivery_address: string;
  delivery_notes?: string;
  meal_plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    photo_url: string;
  };
  meal_types: string[];
  delivery_days: string[];
  allergies?: string;
  total_price: number;
  status: string;
  pause_start_date?: string;
  pause_end_date?: string;
  start_date: string;
  end_date?: string;
  created_at: string;
}

export interface PauseSubscriptionRequest {
  start_date: string;
  end_date: string;
}
