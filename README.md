# 🛍️ Modern E-Commerce Mobile Shopping Cart

Refactoring dan modernisasi aplikasi web e-commerce mobile shopping cart dari legacy vanilla JS menjadi arsitektur berbasis komponen **React 18** modern, responsif mobile-first, dan bebas dependensi build (*zero-build CDN architecture*).

---

## 🚀 Fitur Utama & Pemenuhan Objektif

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

## 🛠️ Arsitektur & Standar Evaluasi

### 1. Code Structure (60%)
- **Framework:** React 18 & ReactDOM via CDN resmi.
- **Component Separation:** Komposisi komponen modular terisolasi (`SearchBar`, `ProductCard`, `CartDrawer`, `QuantityMultiplierControl`, `ConfirmationModal`, `ToastContainer`).
- **Hooks & Composition:** Menggunakan Hooks standar (`useState`, `useReducer`, `useEffect`, `useMemo`, `useCallback`, `useRef`).
- **State Management:** Terpusat menggunakan `CartContext` & `cartReducer` (*predictable state container*).
- **Custom Hooks:** `useCart()`, `useDebounce()`, `useNotification()`.
- **CSS Architecture:** Menggunakan *CSS Custom Properties (Design Tokens)*, metodologi BEM, CSS Grid, dan Flexbox responsif.

### 2. Problem Solving & Optimization (30%)
- Mengatasi layout fixed width 1200px dan `float: right`.
- Mengatasi overflow drawer pada viewport smartphone (320px–375px).
- Menghapus polusi variabel global dan manipulasi DOM `innerHTML` yang rentan XSS.
- Mencegah *double-click checkout* dengan status loading transaksi.
- Pembersihan event listener otomatis (*cleanup*) pada siklus unmount komponen.

---

## 🖥️ Cara Menjalankan

Aplikasi ini bersifat **Zero-Build**. Anda dapat menjalankannya dengan dua cara:

### Cara 1: Langsung di Browser
Cukup klik ganda berkas `index.html` atau buka melalui browser pilihan Anda:
```
file:///C:/project/test-mobile/index.html
```

### Cara 2: Menjalankan via Local HTTP Server (Opsional)
```bash
# Menggunakan Python
python -m http.server 3000

# Menggunakan Node.js
npx serve .
```
Akses di browser pada: `http://localhost:3000`
