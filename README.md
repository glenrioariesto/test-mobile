# 🛍️ Modern E-Commerce Mobile Shopping Cart

Refactoring dan modernisasi aplikasi web e-commerce mobile shopping cart menjadi arsitektur modular **React 18 + Vite** tingkat enterprise, menerapkan pemisahan komponen (*code splitting*), custom hooks, state management terpusat, dan desain mobile-first responsif.

---

## 📁 Struktur Proyek (Modular Code Splitting)

Proyek ini telah dipecah secara modular ke dalam direktori terstruktur:

```
test-mobile/
├── index.html                           # Entry point HTML5
├── vite.config.js                       # Konfigurasi bundler Vite + React
├── package.json                         # Dependensi dan script manajemen
├── README.md                            # Dokumentasi lengkap
├── .gitignore                           # Git ignore aturan node_modules & dist
│
└── src/
    ├── main.jsx                         # React 18 DOM mount point
    ├── App.jsx                          # Root orchestrator komponen
    │
    ├── data/
    │   └── products.js                  # Data katalog produk (MOCK_PRODUCTS)
    │
    ├── context/
    │   └── CartContext.jsx              # Predictable State Container (useReducer + Context)
    │
    ├── hooks/
    │   ├── useCart.js                   # Hook abstraksi keranjang belanja
    │   ├── useDebounce.js               # Hook optimasi debounce pencarian (300ms)
    │   └── useNotification.js           # Hook pengelolaan antrean toast melayang
    │
    ├── components/
    │   ├── Header.jsx                   # Header bar, brand, ikon & badge counter bounce
    │   ├── SearchBar.jsx                # Input pencarian, ikon, tombol clear & info hasil
    │   ├── ProductCard.jsx              # Kartu produk, chip kelipatan & tombol tambah
    │   ├── ProductGrid.jsx              # Grid katalog, loading spinner, error & empty state
    │   ├── CartDrawer.jsx               # Sidebar drawer keranjang, total ringkasan & checkout
    │   ├── CartItem.jsx                 # Baris produk keranjang dengan subtotal
    │   ├── QuantityMultiplierControl.jsx# Kontrol kuantitas: input, stepper & batch (+5, +10)
    │   ├── ConfirmationModal.jsx        # Dialog modal konfirmasi (checkout & hapus item)
    │   └── ToastContainer.jsx           # Notifikasi melayang non-blocking auto-dismiss
    │
    └── styles/
        ├── variables.css                # CSS Custom Properties (Design Tokens)
        ├── base.css                     # Reset, base container & tipografi
        ├── header.css                   # Tata letak header & animasi bounce badge
        ├── search.css                   # Gaya input pencarian
        ├── products.css                 # Grid responsif & kartu produk
        ├── cart.css                     # Drawer keranjang & kontrol kuantitas
        ├── modal.css                    # Dialog modal & backdrop blur
        ├── toast.css                    # Notifikasi toast & transisi
        └── index.css                    # Master stylesheet mengimpor seluruh modul
```

---

## 🚀 Fitur Utama & Pemenuhan 5 Objektif

1. **Jendela Dialog Konfirmasi (Confirmation Modal):**
   - Dialog konfirmasi saat pengguna menekan tombol *Checkout*, menyajikan rincian pesanan (item, total unit, total harga) sebelum transaksi diproses.
   - Dialog konfirmasi destruktif saat menghapus produk atau mengurangi kuantitas item dari $\le 1$ untuk mencegah kehilangan data keranjang secara tidak sengaja.
2. **Sistem Notifikasi Feedback Real-Time (Toast System):**
   - Notifikasi mengambang (*floating toasts*) non-blocking saat menambahkan barang ke keranjang belanja, lengkap dengan auto-dismiss 3 detik.
   - Efek animasi *badge bounce* interaktif pada ikon keranjang di header.
3. **Kalkulasi Total Kuantitas Terpadu (Accurate Cart Count):**
   - Sinkronisasi reaktif antara jumlah akumulasi unit barang (*total pcs*), varian unik (*total SKU*), dan total harga.
   - Ditampilkan di header badge, drawer header, dan drawer footer summary.
4. **Search Box Penemuan Produk (Product Discovery):**
   - Kotak pencarian produk dengan debounce 300ms untuk performa tinggi.
   - Pencarian *case-insensitive* untuk karakter alfabet dan hanzi.
   - State hasil pencarian kosong (*empty state*) dengan tombol reset pencarian.
5. **Update Kuantitas Berkelipatan & Fleksibel (Multiples & Direct Input):**
   - Input angka langsung (`<input type="number">`).
   - Tombol stepper kuantitas (`+` / `-`).
   - Chip kelipatan cepat instan (`+5`, `+10`).
   - Dukungan produk berkemasan kelipatan (*step multiplier*).

---

## 🛠️ Standar Evaluasi yang Dipenuhi

### 1. Code Structure (60%)
- **Modern Framework:** Menggunakan React 18 dengan Vite build toolchain.
- **Component Separation:** Setiap komponen UI dipisahkan ke dalam berkas independen pada direktori `src/components/`.
- **Modern Frontend Features:** Menggunakan React Hooks modern (`useState`, `useReducer`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useContext`).
- **State Management (3 Poin):** Terpusat menggunakan `CartContext` & `cartReducer` (*predictable state container*).
- **Custom Hooks:** Terisolasi pada `src/hooks/` (`useCart`, `useDebounce`, `useNotification`).
- **CSS Architecture:** Terbagi rapi ke dalam 8 berkas modular pada `src/styles/` menggunakan *CSS Custom Properties* dan BEM.

### 2. Problem Solving & Optimization (30%)
- Memperbaiki layout fixed width 1200px dan `float: right`.
- Memperbaiki overflow drawer pada viewport smartphone (320px–375px).
- Menghapus polusi variabel global dan manipulasi DOM `innerHTML` yang rentan XSS.
- Mencegah *double-click checkout* dengan status loading transaksi.
- Pembersihan event listener otomatis (*cleanup*) pada siklus unmount komponen.

---

## 🖥️ Cara Menjalankan

### 1. Mode Pengembangan (Development Server)
```bash
npm run dev
```
Buka browser pada: `http://localhost:3000` (didukung Hot Module Replacement / HMR).

### 2. Membangun untuk Produksi (Production Build)
```bash
npm run build
```
Hasil kompilasi siap produksi akan tersedia di direktori `dist/`.

### 3. Pratinjau Hasil Build (Preview)
```bash
npm run preview
```
