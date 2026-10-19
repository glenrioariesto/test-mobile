import React from 'react';

export function ProductCard({ product, onAddToCart }) {
    return (
        <div className="product-card">
            <div className="product-card__image-box">
                {product.stepMultiplier > 1 && (
                    <span className="product-card__badge">Pack x{product.stepMultiplier}</span>
                )}
                <span>{product.emoji}</span>
            </div>
            <h3 className="product-card__title">{product.name}</h3>
            <div className="product-card__price-row">
                <span className="product-card__price">NT$ {product.price.toLocaleString()}</span>
                {product.stepMultiplier > 1 && (
                    <span className="product-card__multiplier-info">Kelipatan {product.stepMultiplier} unit</span>
                )}
            </div>
            <button 
                className="product-card__add-btn" 
                onClick={() => onAddToCart(product, product.stepMultiplier || 1)}
            >
                <span>🛒</span> 加入購物車
            </button>
        </div>
    );
}
