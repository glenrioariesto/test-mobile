export const STORAGE_KEY = 'test_mobile_cart_storage_v1';

/**
 * Pure Reducer for Cart State
 */
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

/**
 * Safe LocalStorage Initializer
 */
export const getInitialCartState = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed?.items)) {
                    return parsed;
                }
            }
        } catch (e) {
            // Fallback gracefully on storage quota or parsing errors
        }
    }
    return { items: [] };
};
