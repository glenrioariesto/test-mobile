import React from 'react';
import { useCart } from '../hooks/useCart';

export function Header({ onOpenCart, badgeBounce }) {
    const { totalQuantity } = useCart();

    return (
        <header className="app-header">
            <div className="app-header__brand">
                <span style={{ fontSize: '24px' }}>✨</span>
                <h1 className="app-header__title">精品商店</h1>
            </div>
            <div className="app-header__actions">
                <button 
                    className={`cart-icon-btn ${badgeBounce ? 'bounce' : ''}`}
                    onClick={onOpenCart}
                    aria-label={`Keranjang belanja dengan ${totalQuantity} barang`}
                >
                    <span>🛒 購物車</span>
                    <span className="cart-count-badge" id="cartCount">{totalQuantity}</span>
                </button>
            </div>
        </header>
    );
}
