import React, { useState, useMemo } from 'react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from '../components/SearchBar';
import { ProductGrid } from '../components/ProductGrid';

export function ShopPage() {
    const { addToCart } = useCart();
    const { products, isLoading, error, refetch } = useProducts();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);

    const filteredProducts = useMemo(() => {
        const query = debouncedSearch.trim().toLowerCase();
        if (!query) return products;
        return products.filter(p => p.name.toLowerCase().includes(query));
    }, [products, debouncedSearch]);

    return (
        <main>
            {/* Search Bar for Product Discovery */}
            <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
                totalResults={filteredProducts.length}
            />

            {/* Product Grid Display */}
            <ProductGrid 
                products={filteredProducts}
                isLoading={isLoading}
                error={error}
                onRetry={refetch}
                searchQuery={searchQuery}
                onResetSearch={() => setSearchQuery('')}
                onAddToCart={addToCart}
            />
        </main>
    );
}
