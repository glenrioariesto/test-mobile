import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Navigation } from './Navigation';

export function Header({ onOpenCart, badgeBounce }) {
    const { totalQuantity } = useCart();

    return (
        <header className="app-header">
            <Link to="/" className="app-header__brand" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: '24px' }}>✨</span>
                <h1 className="app-header__title">精品商店</h1>
            </Link>

            <Navigation />

            <div className="app-header__actions">
                <button 
                    className={`cart-icon-btn ${badgeBounce ? 'bounce' : ''}`}
                    onClick={onOpenCart}
                    aria-label={`Buka drawer keranjang dengan ${totalQuantity} barang`}
                >
                    <span>🛒 購物車</span>
                    <span className="cart-count-badge" id="cartCount">{totalQuantity}</span>
                </button>
            </div>
        </header>
    );
}
