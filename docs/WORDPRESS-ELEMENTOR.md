# Implementasi ke WordPress / Elementor

Website Kendalbulur terindikasi menggunakan WordPress + Elementor. Prototype ini sengaja dibuat HTML/CSS/JS biasa agar mudah dipindahkan.

## Pilihan implementasi

### A. Elementor HTML Widget (paling cepat untuk prototype)

1. Buat halaman baru/duplicate halaman yang akan diperbaiki.
2. Tambahkan **HTML Widget**.
3. Salin markup dari halaman prototype tanpa `<html>`, `<head>`, dan shell header/footer.
4. Pindahkan style relevan dari `assets/styles.css` ke Elementor Custom CSS atau Appearance > Customize > Additional CSS.
5. Pindahkan JavaScript minimal yang diperlukan ke HTML Widget atau plugin snippet yang disetujui operator.

### B. Elementor native widgets (lebih mudah dipelihara operator)

Gunakan prototype sebagai referensi desain, kemudian bangun ulang bagian berikut dengan widget native:
- heading/text/button;
- container/grid;
- progress bar;
- tabs/accordion;
- table dengan plugin yang disetujui;
- PDF button menggunakan WordPress Media Library.

## APBDes

Data ideal dipisahkan dari desain. Operator cukup memperbarui:
- tahun;
- anggaran;
- realisasi;
- persentase;
- link PDF.

Jangan menyalin angka dari desa contoh (Cibiru Wetan/Prayungan/Buduk) ke Kendalbulur.

## RT/RW

Sebelum publikasi foto, nomor telepon, atau alamat rumah, pastikan ada persetujuan. Lebih aman menggunakan wilayah tugas dan kontak resmi yang memang diperuntukkan bagi warga.

## Simpeldesa

Gunakan external link biasa. Jangan membuat integrasi login, API, iframe, atau sinkronisasi data kecuali pihak desa memiliki akses dan persetujuan teknis dari penyedia.

## QA sebelum publish

- Desktop + HP
- semua link
- PDF dapat dibuka
- kontras teks
- keyboard focus
- halaman kosong/placeholder tidak ikut tayang
- backup WordPress sebelum perubahan besar
