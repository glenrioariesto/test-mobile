import React, { createContext, useReducer, useMemo, useCallback, useEffect } from 'react';
import { cartReducer, getInitialCartState, STORAGE_KEY } from './cartReducer';

export const CartContext = createContext(null);

export function CartProvider({ children, onNotify, onBounce }) {
    const [cartState, dispatch] = useReducer(cartReducer, null, getInitialCartState);

    // Sync to LocalStorage on state change
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
            } catch (e) {
                // Ignore storage write errors (e.g. private mode)
            }
        }
    }, [cartState]);

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
