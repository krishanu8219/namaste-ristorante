export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  serviceCost?: number;
  orderType?: 'delivery' | 'pickup';
  deliveryAddress?: string;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'INCREMENT_ITEM'; payload: { id: string } }
  | { type: 'DECREMENT_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SERVICE_COST'; payload: number }
  | { type: 'SET_ORDER_TYPE'; payload: 'delivery' | 'pickup' }
  | { type: 'SET_DELIVERY_ADDRESS'; payload: string };