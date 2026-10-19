import { describe, it, expect } from 'vitest';
import { MOCK_PRODUCTS } from '../data/products';

describe('Search and Discovery Logic (Objective 4)', () => {
    it('should filter products in a case-insensitive manner for English terms', () => {
        const query = 'usb';
        const filtered = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

        expect(filtered.length).toBeGreaterThan(0);
        expect(filtered[0].name).toContain('USB');
    });

    it('should filter products accurately for Hanzi / Chinese terms', () => {
        const query = '手錶';
        const filtered = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

        expect(filtered).toHaveLength(1);
        expect(filtered[0].name).toBe('智慧手錶');
    });

    it('should return empty list when no products match', () => {
        const query = 'non-existent-product-xyz';
        const filtered = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

        expect(filtered).toHaveLength(0);
    });
});
