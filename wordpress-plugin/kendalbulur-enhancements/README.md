# Kendalbulur Website Enhancements

Plugin WordPress modular untuk memindahkan fitur dari prototype Vercel ke website WordPress Kendalbulur **tanpa mengganti theme, header, footer, menu, atau style global**.

## Prinsip

- Theme WordPress asli tetap menjadi sumber header, footer, navbar, typography, dan layout utama.
- Plugin hanya merender fitur di lokasi shortcode ditempatkan.
- Semua CSS frontend berada di bawah namespace `.kb-enhancement`.
- Asset CSS/JS hanya di-enqueue ketika salah satu shortcode plugin digunakan.
- Data dikelola dari Dashboard WordPress menggunakan Custom Post Type + field native, sehingga operator tidak perlu menyentuh kode.

## Instalasi

1. Zip folder `kendalbulur-enhancements`.
2. WordPress → Plugins → Add New → Upload Plugin.
3. Aktifkan **Kendalbulur Website Enhancements**.
4. Buka **Settings → Kendalbulur Enhancements** untuk URL Simpeldesa dan WhatsApp.
5. Isi konten melalui menu baru:
   - Agenda
   - Potensi Desa
   - Regulasi
   - Direktori RT/RW
6. Di Elementor, gunakan **Shortcode Widget** lalu masukkan shortcode sesuai halaman.

## Shortcodes

- `[kb_agenda]`
- `[kb_potensi]`
- `[kb_regulasi]`
- `[kb_rtrw]`
- `[kb_simpeldesa]`
- `[kb_data_warga penduduk="4190" kk="1477" dusun="3" rt="22" rw="7"]`
- `[kb_idm ekonomi="0.5000" lingkungan="0.7333" nilai="0.6435" kategori="BERKEMBANG"]`

## Contoh migrasi aman

### Halaman Agenda

Jangan ganti template halaman WordPress. Edit halaman Agenda asli dengan Elementor lalu tambahkan:

```
[kb_agenda]
```

Header, footer, breadcrumb, dan theme asli tetap digunakan.

### Halaman RT/RW

```
[kb_rtrw]
```

Operator mengisi setiap Ketua RT/RW dari Dashboard → Direktori RT/RW. Search/filter berjalan otomatis.

### Beranda Data Warga

Tambahkan Shortcode Widget:

```
[kb_data_warga penduduk="4190" kk="1477" dusun="3" rt="22" rw="7"]
```

## Rollout yang direkomendasikan

1. Backup website live.
2. Clone ke staging.
3. Install plugin hanya di staging.
4. Uji satu halaman dahulu, misalnya Agenda.
5. Pastikan theme/header/footer tidak berubah.
6. Uji mobile/tablet.
7. Minta approval operator.
8. Install plugin yang sama di production.
9. Pindahkan shortcode satu per satu.

## Belum masuk versi 0.1.0

APBDes/Realisasi belum dipindahkan karena membutuhkan model input finansial yang lebih terstruktur. Modul tersebut sebaiknya memakai data tahunan/akun dan import Excel, bukan Custom Post Type generik. Prototype Vercel tetap menjadi referensi UI untuk tahap tersebut.

## Keamanan style

Plugin tidak memodifikasi:

- `body`
- header theme
- footer theme
- menu WordPress
- Elementor global styles
- template page
- theme files

Tidak ada proses replace theme atau copy HTML Vercel secara keseluruhan.
