# Alur Presentasi Prototype ke Operator Desa

Branch: `prototype/full-site-replica`

## Prinsip

Prototype dibuat sebagai **re-engineering front-end** dari website Kendalbulur yang sekarang. Tujuannya bukan menunjukkan website baru yang berbeda total, tetapi membuat operator langsung mengenali struktur yang sudah biasa mereka kelola.

- Header, menu, identitas desa, Poppins, pola warna, footer, dan struktur halaman mengikuti situs sekarang.
- Fitur baru diberi badge **FITUR USULAN**.
- Data yang belum diberikan/terverifikasi tidak diisi secara fiktif.
- Backend WordPress, database, akun admin, plugin, dan data sensitif tidak dicloning.

## Urutan demo yang disarankan

### 1. Beranda
Tunjukkan bahwa tampilan masih terasa seperti Kendalbulur:
- logo dan menu;
- data warga;
- agenda;
- berita;
- profil singkat;
- perangkat desa;
- BUMDes;
- APBDes;
- SOP.

Kemudian tunjukkan bahwa masalah lama seperti Lorem Ipsum diberi status yang jelas.

### 2. APBDes
Buka `/anggaran/`.

Jelaskan:
- infografis lama masih dapat dipertahankan sebagai arsip/visual;
- angka utama sekarang menjadi data HTML;
- progress bar membantu warga membaca komposisi;
- tahun bisa dipilih;
- PDF anggaran tetap disediakan.

### 3. Realisasi
Buka `/realisasi-apbdesa/`.

Jelaskan:
- tabel memiliki Anggaran, Realisasi, Lebih/Kurang, Persentase;
- progress dihitung dari Realisasi / Anggaran;
- PDF realisasi disediakan;
- saat ini angka realisasi sengaja belum diisi karena berkas resmi Kendalbulur belum diberikan.

### 4. Simpeldesa
Buka `/simpeldesa/`.

Jelaskan bahwa ini **bukan integrasi API**:
website hanya memberi penjelasan dan tombol ke layanan resmi. Ini meminimalkan risiko dan tidak memerlukan sinkronisasi database WordPress.

### 5. RT/RW
Buka `/rt-rw/`.

Tunjukkan:
- 7 slot RW;
- 22 slot RT;
- flip card;
- sisi depan foto/nama/jabatan;
- sisi belakang wilayah/kontak.

Tekankan bahwa data pribadi hanya dimasukkan setelah disetujui.

### 6. Potensi Desa
Buka `/potensi-desa/`.

Jelaskan pembagian kategori:
- Nangkula Park;
- Minapadi;
- pertanian;
- perikanan;
- UMKM;
- budaya.

Tujuan: bukan hanya berita, tetapi katalog potensi yang bisa dicari pengunjung.

### 7. Halaman lembaga & regulasi
Tunjukkan bahwa halaman yang sebelumnya kosong/minim isi tetap mempertahankan menu lama namun sekarang memiliki template yang jelas.

## Pertanyaan untuk operator setelah demo

1. Apakah struktur menu sekarang perlu dipertahankan persis atau boleh disederhanakan?
2. Apakah data realisasi APBDes per tahun tersedia dalam Excel/PDF?
3. Di mana PDF APBDes dan realisasi akan disimpan?
4. URL Simpeldesa khusus Kendalbulur yang benar yang mana?
5. Apakah foto dan kontak RT/RW boleh dipublikasikan?
6. Siapa yang memvalidasi data BUMDes/KDMP?
7. Halaman potensi mana yang ingin diprioritaskan?
8. Apakah implementasi dilakukan di halaman WordPress yang ada atau menggunakan staging dahulu?

## Catatan penting

Prototype tidak dimaksudkan sebagai website produksi sebelum:
- angka APBDes diverifikasi;
- laporan realisasi diterima;
- data RT/RW disetujui;
- arsip regulasi diperiksa;
- link Simpeldesa dikonfirmasi;
- backup WordPress dibuat.
