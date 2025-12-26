export type OrderType = 'pickup' | 'delivery';
export type OrderStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';
export type PaymentMethod = 'cash' | 'satispay' | 'card';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id?: string;
  created_at?: string;
  customer_name: string;
  phone: string;
  email?: string;
  order_type: OrderType;
  payment_method?: PaymentMethod;
  address?: string;
  location_description?: string;
  items: OrderItem[];
  total_price: number;
  status?: OrderStatus;
}

export interface OrderFormData {
  customer_name: string;
  phone: string;
  email: string;
  order_type: OrderType;
  payment_method: PaymentMethod;
  address: string;
  location_description: string;
}