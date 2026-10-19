import React from 'react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ 
    products, 
    isLoading, 
    error, 
    onRetry, 
    searchQuery, 
    onResetSearch, 
    onAddToCart 
}) {
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Sedang memuat katalog produk...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="empty-state">
                <div className="empty-state__icon">⚠️</div>
                <h2 className="empty-state__title">Terjadi Kesalahan</h2>
                <p className="empty-state__desc">{error}</p>
                <button className="btn-reset" onClick={onRetry}>Coba Muat Ulang</button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state__icon">🔍</div>
                <h2 className="empty-state__title">Produk Tidak Ditemukan</h2>
                <p className="empty-state__desc">
                    Tidak ada produk yang sesuai dengan kata kunci "{searchQuery}".
                </p>
                <button className="btn-reset" onClick={onResetSearch}>
                    Reset Pencarian
                </button>
            </div>
        );
    }

    return (
        <div className="products-grid" id="productsGrid">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={onAddToCart}
                    searchQuery={searchQuery}
                />
            ))}
        </div>
    );
}
