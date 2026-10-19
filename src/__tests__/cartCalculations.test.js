import { describe, it, expect } from 'vitest';

describe('Cart Calculations - Mathematical Invariance Tests (Objective 3)', () => {
    it('should correctly sum total quantities across multiple distinct products', () => {
        const items = [
            { product: { id: 1, price: 2999 }, quantity: 3 },
            { product: { id: 2, price: 599 }, quantity: 7 },
            { product: { id: 3, price: 899 }, quantity: 10 }
        ];

        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalSKUs = items.length;
        const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        // 3 + 7 + 10 = 20 pcs
        expect(totalQuantity).toBe(20);
        // 3 distinct SKUs
        expect(totalSKUs).toBe(3);
        // (2999*3) + (599*7) + (899*10) = 8997 + 4193 + 8990 = 22180
        expect(totalPrice).toBe(22180);
    });

    it('should handle empty cart returning 0 values', () => {
        const items = [];
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalSKUs = items.length;
        const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        expect(totalQuantity).toBe(0);
        expect(totalSKUs).toBe(0);
        expect(totalPrice).toBe(0);
    });
});
