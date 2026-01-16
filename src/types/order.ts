export type OrderType = 'pickup' | 'delivery';
export type OrderStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';
export type PaymentMethod = 'cash' | 'stripe' | 'paypal' | 'satispay';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export interface PaymentDetails {
  provider: PaymentMethod;
  transactionId?: string;
  status: PaymentStatus;
  paidAt?: string;
}

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
  payment_status?: PaymentStatus;
  payment_details?: PaymentDetails;
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