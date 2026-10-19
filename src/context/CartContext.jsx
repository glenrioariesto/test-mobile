import React, { createContext, useReducer, useMemo, useCallback } from 'react';

export const CartContext = createContext(null);

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product, quantity = 1 } = action.payload;
            const existingIndex = state.items.findIndex(item => item.product.id === product.id);
            
            if (existingIndex > -1) {
                const updatedItems = [...state.items];
                const currentQty = updatedItems[existingIndex].quantity;
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    quantity: Math.min(999, currentQty + quantity)
                };
                return { ...state, items: updatedItems };
            }

            return {
                ...state,
                items: [...state.items, { product, quantity: Math.min(999, Math.max(1, quantity)) }]
            };
        }

        case 'UPDATE_QUANTITY': {
            const { productId, quantity } = action.payload;
            const validQty = Math.max(1, Math.min(999, parseInt(quantity, 10) || 1));
            return {
                ...state,
                items: state.items.map(item => 
                    item.product.id === productId ? { ...item, quantity: validQty } : item
                )
            };
        }

        case 'REMOVE_ITEM': {
            const { productId } = action.payload;
            return {
                ...state,
                items: state.items.filter(item => item.product.id !== productId)
            };
        }

        case 'CLEAR_CART': {
            return { ...state, items: [] };
        }

        default:
            return state;
    }
};

export function CartProvider({ children, onNotify, onBounce }) {
    const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

    // Mathematical Invariance Calculations (Objective 3)
    const totalQuantity = useMemo(() => {
        return cartState.items.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartState.items]);

    const totalSKUs = useMemo(() => cartState.items.length, [cartState.items]);

    const totalPrice = useMemo(() => {
        return cartState.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    }, [cartState.items]);

    // Dispatcher Actions
    const addToCart = useCallback((product, qty = 1) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: qty } });
        if (onNotify) {
            onNotify(`Berhasil menambahkan ${qty}x "${product.name}" ke keranjang!`, 'success');
        }
        if (onBounce) {
            onBounce();
        }
    }, [onNotify, onBounce]);

    const updateQuantity = useCallback((productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }, []);

    const removeItem = useCallback((productId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    const value = useMemo(() => ({
        cartItems: cartState.items,
        totalQuantity,
        totalSKUs,
        totalPrice,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
    }), [cartState.items, totalQuantity, totalSKUs, totalPrice, addToCart, updateQuantity, removeItem, clearCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
