import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/CartItem';
import { formatCurrency } from '../utils/formatters';

export function CartPage({ onPromptRemove }) {
    const { cartItems, totalQuantity, totalSKUs, totalPrice, updateQuantity } = useCart();
    const navigate = useNavigate();

    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
                    🛒 Keranjang Belanja ({totalSKUs} produk)
                </h2>
                <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
                    &larr; Lanjut Belanja
                </Link>
            </div>

            {cartItems.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state__icon">🛍️</div>
                    <h2 className="empty-state__title">Keranjang Belanja Kosong</h2>
                    <p className="empty-state__desc">Anda belum memilih barang apa pun untuk dibeli.</p>
                    <Link to="/" className="btn-reset" style={{ display: 'inline-block', textDecoration: 'none' }}>
                        Jelajahi Produk Sekarang
                    </Link>
                </div>
            ) : (
                <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                        {cartItems.map(item => (
                            <CartItem 
                                key={item.product.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onPromptRemove={onPromptRemove}
                            />
                        ))}
                    </div>

                    <div style={{ borderTop: '2px solid var(--color-gray-200)', paddingTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px' }}>
                            <span>Total Unit Barang:</span>
                            <strong>{totalQuantity} pcs</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '20px', fontWeight: 800 }}>
                            <span>Total Pembayaran:</span>
                            <span style={{ color: 'var(--color-primary)' }}>{formatCurrency(totalPrice)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <Link 
                                to="/" 
                                className="modal-btn modal-btn-cancel" 
                                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                            >
                                Tambah Produk Lain
                            </Link>
                            <button 
                                className="checkout-submit-btn" 
                                style={{ minWidth: '200px' }}
                                onClick={() => navigate('/checkout')}
                            >
                                Lanjut ke Pembayaran &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
