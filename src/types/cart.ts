export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'INCREMENT_ITEM'; payload: { id: string } }
  | { type: 'DECREMENT_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' };