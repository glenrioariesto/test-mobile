import { useState, useEffect, useCallback } from 'react';
import { MOCK_PRODUCTS } from '../data/products';

/**
 * Custom Hook: useProducts
 * Mengenkapsulasi pemanggilan API katalog produk, status pemuatan (loading),
 * penanganan kesalahan (error boundary), dan logika coba ulang (retry).
 */
export function useProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(() => {
        setIsLoading(true);
        setError(null);

        const timer = setTimeout(() => {
            try {
                setProducts(MOCK_PRODUCTS);
                setIsLoading(false);
            } catch (err) {
                setError('Gagal memuat katalog produk. Periksa koneksi Anda.');
                setIsLoading(false);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const cleanup = fetchProducts();
        return () => {
            if (typeof cleanup === 'function') cleanup();
        };
    }, [fetchProducts]);

    return {
        products,
        isLoading,
        error,
        refetch: fetchProducts
    };
}
