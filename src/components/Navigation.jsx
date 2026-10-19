import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export function Navigation() {
    const { totalQuantity } = useCart();

    return (
        <>
            {/* Desktop Navigation Links */}
            <nav className="nav-links" aria-label="Navigasi Utama">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                    🛍️ Toko
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    🛒 Keranjang
                    {totalQuantity > 0 && (
                        <span style={{ background: 'white', color: 'var(--color-dark)', borderRadius: '99px', padding: '1px 6px', fontSize: '11px', fontWeight: 800 }}>
                            {totalQuantity}
                        </span>
                    )}
                </NavLink>
                <NavLink to="/checkout" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    💳 Checkout
                </NavLink>
            </nav>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="mobile-bottom-nav" aria-label="Navigasi Seluler Bawah">
                <NavLink to="/" className={({ isActive }) => `mobile-bottom-nav__item ${isActive ? 'active' : ''}`} end>
                    <span className="mobile-bottom-nav__icon">🛍️</span>
                    <span>Toko</span>
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => `mobile-bottom-nav__item ${isActive ? 'active' : ''}`}>
                    <span className="mobile-bottom-nav__icon">🛒</span>
                    <span>Keranjang</span>
                    {totalQuantity > 0 && (
                        <span className="mobile-bottom-nav__badge">{totalQuantity}</span>
                    )}
                </NavLink>
                <NavLink to="/checkout" className={({ isActive }) => `mobile-bottom-nav__item ${isActive ? 'active' : ''}`}>
                    <span className="mobile-bottom-nav__icon">💳</span>
                    <span>Bayar</span>
                </NavLink>
            </nav>
        </>
    );
}
