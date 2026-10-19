import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

export function CheckoutPage({ onPromptCheckout, isCheckingOut }) {
    const { cartItems, totalQuantity, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState('Pelanggan Setia');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    if (cartItems.length === 0) {
        return (
            <main style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
                <div className="empty-state">
                    <div className="empty-state__icon">💳</div>
                    <h2 className="empty-state__title">Tidak Ada Pesanan untuk Dibayar</h2>
                    <p className="empty-state__desc">Keranjang belanja Anda kosong.</p>
                    <Link to="/" className="btn-reset" style={{ display: 'inline-block', textDecoration: 'none' }}>
                        Kembali ke Belanja
                    </Link>
                </div>
            </main>
        );
    }

    const handleConfirmOrder = () => {
        onPromptCheckout(cartItems, totalQuantity, totalPrice, () => {
            clearCart();
            navigate('/');
        });
    };

    return (
        <main style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
                    💳 Checkout & Pembayaran
                </h2>
                <Link to="/cart" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
                    &larr; Ubah Keranjang
                </Link>
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '24px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Customer Information Simulation */}
                <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>1. Informasi Pemesan</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', color: 'var(--color-gray-600)' }}>Nama Lengkap</label>
                        <input 
                            type="text" 
                            value={customerName} 
                            onChange={e => setCustomerName(e.target.value)}
                            style={{ padding: '8px 12px', border: '1px solid var(--color-gray-400)', borderRadius: 'var(--radius-sm)' }}
                        />
                    </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>2. Metode Pembayaran</h3>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '10px 14px', border: '1px solid var(--color-gray-400)', borderRadius: 'var(--radius-sm)' }}>
                            <input 
                                type="radio" 
                                name="payment" 
                                checked={paymentMethod === 'credit_card'} 
                                onChange={() => setPaymentMethod('credit_card')} 
                            />
                            <span>Kartu Kredit / Debit</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '10px 14px', border: '1px solid var(--color-gray-400)', borderRadius: 'var(--radius-sm)' }}>
                            <input 
                                type="radio" 
                                name="payment" 
                                checked={paymentMethod === 'qris'} 
                                onChange={() => setPaymentMethod('qris')} 
                            />
                            <span>QRIS / E-Wallet</span>
                        </label>
                    </div>
                </div>

                {/* Order Review List */}
                <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>3. Rincian Pesanan ({totalQuantity} unit)</h3>
                    <div style={{ background: 'var(--color-gray-100)', borderRadius: 'var(--radius-sm)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {cartItems.map(item => (
                            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span>{item.product.name} &times; <strong>{item.quantity}</strong></span>
                                <span style={{ fontWeight: 600 }}>{formatCurrency(item.product.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div style={{ borderTop: '1px dashed var(--color-gray-400)', paddingTop: '10px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800 }}>
                            <span>Total Tagihan:</span>
                            <span style={{ color: 'var(--color-primary)' }}>{formatCurrency(totalPrice)}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Confirmation Trigger */}
                <button 
                    className="checkout-submit-btn" 
                    onClick={handleConfirmOrder}
                    disabled={isCheckingOut}
                    style={{ marginTop: '10px' }}
                >
                    {isCheckingOut ? (
                        <>
                            <span className="spinner" style={{ width: '18px', height: '18px', margin: 0, borderWidth: '2px' }}></span>
                            Memproses Transaksi...
                        </>
                    ) : (
                        <>Konfirmasi Pembayaran ({formatCurrency(totalPrice)})</>
                    )}
                </button>
            </div>
        </main>
    );
}
