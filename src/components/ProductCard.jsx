import React, { useState, memo } from 'react';
import { formatCurrency } from '../utils/formatters';

// Helper to highlight matching search characters
function HighlightedText({ text, query }) {
    if (!query || !query.trim()) return <>{text}</>;

    const trimmedQuery = query.trim();
    const regex = new RegExp(`(${trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) => 
                regex.test(part) ? (
                    <mark key={index} className="search-highlight">{part}</mark>
                ) : (
                    part
                )
            )}
        </>
    );
}

export const ProductCard = memo(function ProductCard({ product, onAddToCart, searchQuery }) {
    const [isAddedRecently, setIsAddedRecently] = useState(false);

    const handleAdd = () => {
        onAddToCart(product, product.stepMultiplier || 1);
        setIsAddedRecently(true);
        setTimeout(() => setIsAddedRecently(false), 900);
    };

    return (
        <div className="product-card">
            <div className="product-card__image-box">
                {product.stepMultiplier > 1 && (
                    <span className="product-card__badge">Pack x{product.stepMultiplier}</span>
                )}
                <span>{product.emoji}</span>
            </div>
            <h3 className="product-card__title">
                <HighlightedText text={product.name} query={searchQuery} />
            </h3>
            <div className="product-card__price-row">
                <span className="product-card__price">{formatCurrency(product.price)}</span>
                {product.stepMultiplier > 1 && (
                    <span className="product-card__multiplier-info">Kelipatan {product.stepMultiplier} unit</span>
                )}
            </div>
            <button 
                className={`product-card__add-btn ${isAddedRecently ? 'added' : ''}`}
                onClick={handleAdd}
                aria-label={`Tambah ${product.name} ke keranjang`}
            >
                <span>{isAddedRecently ? '✓' : '🛒'}</span>
                <span>{isAddedRecently ? 'Tersimpan!' : '加入購物車'}</span>
            </button>
        </div>
    );
});
