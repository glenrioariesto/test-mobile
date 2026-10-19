import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { useModal } from './hooks/useModal';
import { useNotification } from './hooks/useNotification';
import { useDebounce } from './hooks/useDebounce';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ToastContainer } from './components/ToastContainer';

export function AppContent() {
    // 1. Product Catalog Custom Hook
    const { products, isLoading: isLoadingProducts, error: catalogError, refetch: loadProducts } = useProducts();

    // 2. Search State with Debounce (Objective 4)
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);

    // 3. UI Drawer & Modal States
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [badgeBounce, setBadgeBounce] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // 4. Modal Lifecycle Custom Hook (Objective 1)
    const { modalConfig, openModal, closeModal } = useModal();

    // 5. Notification Queue Custom Hook (Objective 2)
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

    // Case-Insensitive Filtered Products (Objective 4)
    const filteredProducts = useMemo(() => {
        const query = debouncedSearch.trim().toLowerCase();
        if (!query) return products;
        return products.filter(p => p.name.toLowerCase().includes(query));
    }, [products, debouncedSearch]);

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
                                {item.product.name} &times; {item.quantity} unit (NT$ {(item.product.price * item.quantity).toLocaleString()})
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-gray-400)', paddingTop: '6px', fontWeight: 700 }}>
                        <span>Total Pembayaran ({totalQuantity} unit):</span>
                        <span style={{ color: 'var(--color-primary)' }}>NT$ {totalPrice.toLocaleString()}</span>
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
            <AppLayout
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearSearch={() => setSearchQuery('')}
                filteredProducts={filteredProducts}
                isLoadingProducts={isLoadingProducts}
                catalogError={catalogError}
                onRetryLoadProducts={loadProducts}
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
        </CartProvider>
    );
}

function AppLayout({
    searchQuery,
    onSearchChange,
    onClearSearch,
    filteredProducts,
    isLoadingProducts,
    catalogError,
    onRetryLoadProducts,
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
    const { addToCart, removeItem, clearCart, cartItems, totalQuantity, totalPrice } = useCart();

    return (
        <div className="app-container">
            {/* Header with Title and Cart Icon */}
            <Header onOpenCart={onOpenCart} badgeBounce={badgeBounce} />

            {/* Search Bar for Product Discovery */}
            <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onClear={onClearSearch}
                totalResults={filteredProducts.length}
            />

            {/* Product Grid and States */}
            <main>
                <ProductGrid 
                    products={filteredProducts}
                    isLoading={isLoadingProducts}
                    error={catalogError}
                    onRetry={onRetryLoadProducts}
                    searchQuery={searchQuery}
                    onResetSearch={onClearSearch}
                    onAddToCart={addToCart}
                />
            </main>

            {/* Cart Drawer Sidebar */}
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

            {/* Floating Toast Container */}
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
