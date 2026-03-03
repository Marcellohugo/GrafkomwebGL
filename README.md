# GrafkomwebGL

Proyek mata kuliah **Grafika Komputer** — visualisasi 3D interaktif menggunakan WebGL dengan library [Three.js](https://threejs.org/).

## Deskripsi

Aplikasi web yang menampilkan scene 3D dengan fitur:
- **WebGL Renderer** dengan anti-aliasing
- **Orbit Controls** untuk navigasi kamera secara interaktif
- **Pencahayaan atmosferik** — ambient light, spotlight, dan fog effect
- **Perspektif kamera** dengan high-angle view

## Tech Stack

| Teknologi | Keterangan |
|-----------|------------|
| Three.js | Library 3D / WebGL |
| Vite | Build tool & dev server |
| TailwindCSS | Utility-first CSS framework |
| JavaScript (ES Module) | Bahasa pemrograman |

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build untuk production
npm run build
```

## Struktur Proyek

```
GrafkomwebGL/
├── src/
│   ├── main.js          # Entry point — setup scene, kamera, lighting
│   └── tailwind.css     # Stylesheet
├── index.html           # Halaman utama
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Penulis

**Marco Marcello Hugo** — 5025221102  
Teknik Informatika, Institut Teknologi Sepuluh Nopember
