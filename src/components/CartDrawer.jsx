import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';

export function CartDrawer({ isOpen, onClose, onPromptRemove, onPromptCheckout, isCheckingOut }) {
    const { cartItems, totalQuantity, totalSKUs, totalPrice, updateQuantity } = useCart();

    return (
        <>
            <div 
                className={`cart-overlay ${isOpen ? 'open' : ''}`} 
                onClick={onClose} 
                aria-hidden={!isOpen}
            />
            <aside 
                className={`cart-drawer ${isOpen ? 'open' : ''}`} 
                aria-label="Keranjang Belanja"
            >
                <div className="cart-drawer__header">
                    <h2 className="cart-drawer__title">
                        🛒 購物車 
                        <span style={{ fontSize: '13px', fontWeight: 'normal', color: 'var(--color-gray-600)' }}>
                            ({totalSKUs} varian)
                        </span>
                    </h2>
                    <button 
                        className="cart-drawer__close" 
                        onClick={onClose}
                        aria-label="Tutup keranjang"
                    >
                        ×
                    </button>
                </div>

                <div className="cart-drawer__body">
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-gray-600)' }}>
                            <div style={{ fontSize: '42px', marginBottom: '8px' }}>🛍️</div>
                            <p style={{ fontWeight: 600 }}>購物車是空的</p>
                            <p style={{ fontSize: '13px', marginTop: '4px' }}>Belum ada produk yang ditambahkan.</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <CartItem 
                                key={item.product.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onPromptRemove={onPromptRemove}
                            />
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-drawer__footer">
                        <div className="cart-summary-line">
                            <span>Total Kuantitas:</span>
                            <strong>{totalQuantity} pcs</strong>
                        </div>
                        <div className="cart-summary-line total">
                            <span>總計金額:</span>
                            <span style={{ color: 'var(--color-primary)' }}>
                                NT$ {totalPrice.toLocaleString()}
                            </span>
                        </div>
                        <button 
                            className="checkout-submit-btn" 
                            onClick={onPromptCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? (
                                <>
                                    <span className="spinner" style={{ width: '18px', height: '18px', margin: 0, borderWidth: '2px' }}></span>
                                    Memproses Transaksi...
                                </>
                            ) : (
                                <>結帳 (Checkout)</>
                            )}
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
