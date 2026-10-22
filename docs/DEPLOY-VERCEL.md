# Deploy ke Vercel

## Dari GitHub

1. Buat repository baru di GitHub, misalnya `kendalbulur-web-improvement`.
2. Masukkan seluruh isi folder proyek ini ke branch `main`.
3. Masuk ke Vercel dan pilih **Add New > Project**.
4. Hubungkan akun GitHub lalu pilih repository tersebut.
5. Framework Preset: **Other** / static.
6. Build Command: kosong.
7. Output Directory: kosong / root project.
8. Deploy.

`vercel.json` sudah mengaktifkan `cleanUrls` dan `trailingSlash`.

## Preview sebelum produksi

Gunakan URL Vercel sebagai tempat review operator desa. Setelah data dan desain disetujui, baru pindahkan komponen ke WordPress produksi.
