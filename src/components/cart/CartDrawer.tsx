import React from 'react';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { state } = useCart();

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed right-0 top-0 w-80 bg-white h-full shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={onClose} className="p-4 text-gray-600">Chiudi</button>
                <div className="p-4">
                    <h2 className="text-lg font-bold">Il Tuo Carrello</h2>
                    {state.items.length === 0 ? (
                        <p>Il tuo carrello è vuoto.</p>
                    ) : (
                        state.items.map(item => <CartItem key={item.id} item={item} />)
                    )}
                </div>
                <CartSummary />
            </div>
        </div>
    );
};

export default CartDrawer;