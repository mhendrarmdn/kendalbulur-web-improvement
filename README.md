# Kendalbulur Web Improvement

Prototype perbaikan website Desa Kendalbulur untuk program KKM. Fokus proyek berasal dari audit halaman publik `kendalbulur.id` dan hasil wawancara operator desa.

## Tujuan

- Mengubah APBDes dari infografis gambar menjadi dashboard HTML yang responsif.
- Menyediakan struktur laporan realisasi berbentuk tabel, progress, dan tautan PDF.
- Menyediakan landing page Simpeldesa tanpa integrasi API/SSO.
- Menyiapkan direktori RT/RW interaktif dengan perlindungan data pribadi.
- Mengembangkan Potensi Desa sebagai katalog terstruktur.
- Merapikan halaman lembaga, regulasi, layanan, link, tipografi, spacing, dan tampilan mobile.
- Menyediakan audit/checklist agar operator tahu pekerjaan yang belum selesai.

## Stack

Static HTML + CSS + vanilla JavaScript. Font: **Poppins** dengan fallback `sans-serif`.

Alasan stack ini dipilih:
1. langsung cocok untuk Vercel;
2. tidak perlu build process;
3. mudah dipindahkan per-section ke WordPress/Elementor;
4. mudah dipahami operator/mahasiswa berikutnya.

## Struktur

- `/` — beranda prototype & prioritas kerja
- `/apbdes/` — APBDes, realisasi, tabel, dokumen
- `/simpeldesa/` — penjelasan + external redirect
- `/rt-rw/` — template flip-card 7 RW + 22 RT
- `/potensi-desa/` — katalog potensi desa
- `/regulasi/` — struktur arsip Perdes/Perkades/SK
- `/lembaga/` — template pengisian halaman lembaga
- `/layanan/` — struktur layanan warga
- `/audit/` — seluruh temuan & status
- `/docs/` — panduan Vercel dan WordPress
- `/wordpress/` — snippet/guide khusus implementasi WordPress

## Data dan validasi

Jangan menganggap seluruh data di prototype sebagai data final. Data APBDes 2026 yang tampil merupakan transkripsi dari infografis yang terlihat pada website/screenshot saat audit dan **wajib dicocokkan dengan APBDes/Perdes resmi**. Data realisasi, biodata RT/RW, URL Simpeldesa khusus desa, dan beberapa profil lembaga sengaja tidak diisi karena belum ada sumber resmi yang diberikan.

## Deploy ke Vercel

Lihat `docs/DEPLOY-VERCEL.md`.

## Implementasi WordPress

Lihat `docs/WORDPRESS-ELEMENTOR.md`.

## Sumber publik awal

- https://kendalbulur.id/
- https://kendalbulur.id/anggaran/
- https://www.simpeldesa.com/
