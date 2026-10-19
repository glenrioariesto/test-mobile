import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useCart } from './hooks/useCart';
import { useModal } from './hooks/useModal';
import { useNotification } from './hooks/useNotification';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ToastContainer } from './components/ToastContainer';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { formatCurrency } from './utils/formatters';

export function AppContent() {
    // UI Drawer & Modal States
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [badgeBounce, setBadgeBounce] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Modal Lifecycle Custom Hook (Objective 1)
    const { modalConfig, openModal, closeModal } = useModal();

    // Notification Queue Custom Hook (Objective 2)
    const { toasts, showToast, removeToast } = useNotification();

    // Trigger Badge Bounce Animation
    const triggerBadgeBounce = useCallback(() => {
        setBadgeBounce(true);
        setTimeout(() => setBadgeBounce(false), 500);
    }, []);

    // Keyboard Accessibility: Escape key closes modal & cart drawer
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (modalConfig?.isOpen) {
                    closeModal();
                } else if (isCartOpen) {
                    setIsCartOpen(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalConfig?.isOpen, closeModal, isCartOpen]);

    // Dialog Prompt: Remove Item Confirmation (Objective 1)
    const promptRemoveItem = useCallback((product, onConfirmRemove) => {
        openModal({
            icon: '🗑️',
            title: 'Hapus Item dari Keranjang?',
            message: `Apakah Anda yakin ingin menghapus "${product.name}" dari keranjang belanja?`,
            confirmText: 'Ya, Hapus',
            cancelText: 'Batal',
            confirmVariant: 'danger',
            onConfirm: () => {
                onConfirmRemove(product.id);
                showToast(`"${product.name}" telah dihapus dari keranjang.`, 'warning');
            }
        });
    }, [openModal, showToast]);

    // Dialog Prompt: Checkout Confirmation (Objective 1)
    const promptCheckout = useCallback((cartItems, totalQuantity, totalPrice, onClearCart) => {
        if (cartItems.length === 0) {
            showToast('Keranjang belanja kosong! Silakan pilih produk terlebih dahulu.', 'warning');
            return;
        }

        openModal({
            icon: '💳',
            title: 'Konfirmasi Transaksi Pembayaran',
            message: 'Mohon tinjau rincian pesanan Anda sebelum melanjutkan ke proses pembayaran:',
            details: (
                <div>
                    <div style={{ marginBottom: '6px', fontWeight: 600 }}>Ringkasan Belanja:</div>
                    <ul style={{ paddingLeft: '18px', marginBottom: '8px' }}>
                        {cartItems.map(item => (
                            <li key={item.product.id}>
                                {item.product.name} &times; {item.quantity} unit ({formatCurrency(item.product.price * item.quantity)})
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-gray-400)', paddingTop: '6px', fontWeight: 700 }}>
                        <span>Total Pembayaran ({totalQuantity} unit):</span>
                        <span style={{ color: 'var(--color-primary)' }}>{formatCurrency(totalPrice)}</span>
                    </div>
                </div>
            ),
            confirmText: 'Konfirmasi & Bayar',
            cancelText: 'Periksa Kembali',
            confirmVariant: 'success',
            onConfirm: () => {
                setIsCheckingOut(true);
                // Simulate Checkout API call
                setTimeout(() => {
                    onClearCart();
                    setIsCheckingOut(false);
                    setIsCartOpen(false);
                    showToast('Pembayaran Berhasil! Terima kasih telah berbelanja.', 'success', 4000);
                }, 1200);
            }
        });
    }, [openModal, showToast]);

    return (
        <CartProvider onNotify={showToast} onBounce={triggerBadgeBounce}>
            <HashRouter>
                <AppLayout
                    isCartOpen={isCartOpen}
                    onOpenCart={() => setIsCartOpen(true)}
                    onCloseCart={() => setIsCartOpen(false)}
                    badgeBounce={badgeBounce}
                    modalConfig={modalConfig}
                    onCloseModal={closeModal}
                    toasts={toasts}
                    onDismissToast={removeToast}
                    promptRemoveItem={promptRemoveItem}
                    promptCheckout={promptCheckout}
                    isCheckingOut={isCheckingOut}
                />
            </HashRouter>
        </CartProvider>
    );
}

function AppLayout({
    isCartOpen,
    onOpenCart,
    onCloseCart,
    badgeBounce,
    modalConfig,
    onCloseModal,
    toasts,
    onDismissToast,
    promptRemoveItem,
    promptCheckout,
    isCheckingOut
}) {
    const { removeItem, clearCart, cartItems, totalQuantity, totalPrice } = useCart();

    return (
        <div className="app-container">
            {/* Header with Title, Navigation Links & Cart Button */}
            <Header onOpenCart={onOpenCart} badgeBounce={badgeBounce} />

            {/* React Router Page Routes */}
            <Routes>
                <Route path="/" element={<ShopPage />} />
                <Route 
                    path="/cart" 
                    element={<CartPage onPromptRemove={(prod) => promptRemoveItem(prod, removeItem)} />} 
                />
                <Route 
                    path="/checkout" 
                    element={
                        <CheckoutPage 
                            onPromptCheckout={promptCheckout} 
                            isCheckingOut={isCheckingOut} 
                        />
                    } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Quick Slide Cart Drawer Sidebar */}
            <CartDrawer 
                isOpen={isCartOpen}
                onClose={onCloseCart}
                onPromptRemove={(prod) => promptRemoveItem(prod, removeItem)}
                onPromptCheckout={() => promptCheckout(cartItems, totalQuantity, totalPrice, clearCart)}
                isCheckingOut={isCheckingOut}
            />

            {/* Accessible Confirmation Modal */}
            <ConfirmationModal 
                config={modalConfig}
                onClose={onCloseModal}
            />

            {/* Floating Toast Notification Container */}
            <ToastContainer 
                toasts={toasts}
                onDismiss={onDismissToast}
            />
        </div>
    );
}

export default function App() {
    return <AppContent />;
}
