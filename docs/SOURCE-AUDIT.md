# Source Audit — kendalbulur.id

Dokumen ini berasal dari inspeksi paket save-web yang diberikan user pada 22 Oktober 2026.

## Elementor / WordPress

- Theme: Hello Elementor
- Elementor Kit: 6
- Header template: Elementor 3016
- Footer template: Elementor 3116
- Homepage Elementor page: 15

## Global design tokens

- Primary: `#7F1110`
- Secondary: `#F4E8D0`
- Text: `#292525`
- Accent: `#D4A72C`
- White: `#FFFFFF`
- Light gray: `#F4F4F4`
- Dark red: `#490606`
- Pink: `#FFD7D7`

Typography:
- Primary / headings: Poppins 700
- Secondary: Inter 33.18px / 600
- Body text: Inter 16px / 400
- Accent: Inter 13.33px / 400
- H1 scale: Poppins 47.78px
- H2 scale: Poppins 39.81px
- H3 scale: Poppins 33.18px
- H4 scale: Poppins 27.65px
- H5 scale: Poppins 23.04px
- H6 scale: Poppins 19.2px
- Small text: Inter 14px

## Header

Source template 3016:
- min height: 67px
- white background
- bottom border: `#E9E9E963`
- shadow: `0 0 8px rgba(70,0,0,.3)`
- desktop columns: identity 23%, navigation 77%
- desktop logo: max 55px
- nav: Poppins 13.33px / 500
- nav item horizontal margin: 10px
- nav vertical padding: 15px
- submenu: white, 1px `#E8E8E8`, radius 10px
- submenu hover: primary red + white text

## Homepage hero

Container ID: `5fbdd0e`
- min-height: 800px
- slideshow:
  - `/storage/2026/10/balai-desa-kendalbulur-scaled.webp`
  - `/storage/2026/10/jembatan-gantung.jpeg`
- overlay: black, opacity .65, luminosity blend
- background position: bottom center
- transition duration: 3000ms
- slide duration: 10000ms
- Ken Burns: enabled

Text:
- “SELAMAT DATANG DI” — Poppins 27.65 / 500 / white
- “WEBSITE RESMI” — Poppins 39.81 / 700 / accent
- “PEMERINTAH DESA KENDALBULUR” — Poppins 39.81 / 700 / accent
- tagline — Inter 16 / 400 / white
- buttons — primary red, Inter 16, padding 10×30

## Homepage source sections

Top-level Elementor containers:
1. `5fbdd0e` — hero
2. `2ec4df2` — data warga, agenda, map, berita
3. `bc0c818` — sekilas desa, perangkat, BUMDes
4. `89e69d6` — APBDes and SOP

Important data shown:
- Penduduk: 4.190
- KK: 1.477
- Dusun: 03
- RT/RW: 22/07

Section `bc0c818` background: `#FFF7F7`.

## Footer

Source template 3116:
- gradient `#7F1110 → #490606`
- overlay image:
  `https://kendalbulur.id/wp-content/uploads/2026/10/Website-overlay-1.webp`
- desktop padding: 100px 0 50px
- mobile overlay:
  `Website-overlay-e1791474571541.webp`
- copyright bar uses primary red.

## APBDes page source behavior

Original page is not an Elementor page body.

Structure:
1. header
2. plain `site-main`
3. centered year selector (2026, 2025)
4. `#poster-landing` image
5. footer

Source CSS:
- inline menu centered, top -1em
- active year: `#69a619` with white text
- poster bottom padding: 3em
- poster max-width: 100%, centered

The prototype must preserve this visual block before introducing the proposed interactive APBDes dashboard.
