import React, { createContext, useContext, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const handleCart = (item) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
            if (existingItemIndex !== -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity = (newItems[existingItemIndex].quantity || 1) + 1;
                return newItems;
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
        toast.success("Added to Cart");
    };

    const updateQuantity = (id, amount) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, (item.quantity || 1) + amount);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        toast.info("Removed from Cart");
    };

    const clearCart = () => {
        setCartItems([]);
        toast.info("Cart Cleared");
    };

    const handleBuyNow = (item) => {
        toast.info(`Buy Now: ${item.name || 'Item'}`);
    };

    const value = useMemo(() => ({
        cartItems,
        handleCart,
        updateQuantity,
        removeItem,
        clearCart,
        handleBuyNow
    }), [cartItems]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
