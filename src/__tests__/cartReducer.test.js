import { describe, it, expect } from 'vitest';
import { cartReducer } from '../context/cartReducer';

describe('cartReducer - Unit & Invariance Tests', () => {
    const mockProduct1 = { id: 1, name: '無線藍牙耳機', price: 2999, emoji: '🎧', stepMultiplier: 1 };
    const mockProduct2 = { id: 2, name: 'USB 隨身碟 (雙入組)', price: 599, emoji: '💾', stepMultiplier: 2 };

    it('should add a new product to an empty cart with default quantity 1', () => {
        const initialState = { items: [] };
        const action = { type: 'ADD_TO_CART', payload: { product: mockProduct1, quantity: 1 } };
        const nextState = cartReducer(initialState, action);

        expect(nextState.items).toHaveLength(1);
        expect(nextState.items[0].product.id).toBe(1);
        expect(nextState.items[0].quantity).toBe(1);
    });

    it('should increment existing item quantity when added again', () => {
        const initialState = { items: [{ product: mockProduct1, quantity: 2 }] };
        const action = { type: 'ADD_TO_CART', payload: { product: mockProduct1, quantity: 3 } };
        const nextState = cartReducer(initialState, action);

        expect(nextState.items).toHaveLength(1);
        expect(nextState.items[0].quantity).toBe(5);
    });

    it('should update quantity by direct multiples and valid integer input', () => {
        const initialState = { items: [{ product: mockProduct1, quantity: 1 }] };
        const action = { type: 'UPDATE_QUANTITY', payload: { productId: 1, quantity: 15 } };
        const nextState = cartReducer(initialState, action);

        expect(nextState.items[0].quantity).toBe(15);
    });

    it('should sanitize negative, zero, and NaN inputs to minimum 1', () => {
        const initialState = { items: [{ product: mockProduct1, quantity: 5 }] };

        // Test zero
        const zeroAction = { type: 'UPDATE_QUANTITY', payload: { productId: 1, quantity: 0 } };
        expect(cartReducer(initialState, zeroAction).items[0].quantity).toBe(1);

        // Test negative
        const negAction = { type: 'UPDATE_QUANTITY', payload: { productId: 1, quantity: -10 } };
        expect(cartReducer(initialState, negAction).items[0].quantity).toBe(1);

        // Test NaN / string garbage
        const nanAction = { type: 'UPDATE_QUANTITY', payload: { productId: 1, quantity: 'abc' } };
        expect(cartReducer(initialState, nanAction).items[0].quantity).toBe(1);
    });

    it('should remove item correctly', () => {
        const initialState = { 
            items: [
                { product: mockProduct1, quantity: 2 },
                { product: mockProduct2, quantity: 4 }
            ] 
        };
        const action = { type: 'REMOVE_ITEM', payload: { productId: 1 } };
        const nextState = cartReducer(initialState, action);

        expect(nextState.items).toHaveLength(1);
        expect(nextState.items[0].product.id).toBe(2);
    });

    it('should clear cart on checkout completion', () => {
        const initialState = { 
            items: [
                { product: mockProduct1, quantity: 2 },
                { product: mockProduct2, quantity: 4 }
            ] 
        };
        const action = { type: 'CLEAR_CART' };
        const nextState = cartReducer(initialState, action);

        expect(nextState.items).toEqual([]);
    });
});
