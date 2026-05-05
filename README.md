# Portfolio — React + TypeScript

Portfolio website terinspirasi dari desain bold modern dengan warna biru electric & lime green.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build untuk production
npm run build
```

## 📁 Struktur Project

```
src/
├── components/
│   ├── Navbar.tsx       # Fixed navbar dengan logo & nav links
│   ├── SocialBar.tsx    # Social media sidebar (kiri)
│   └── Footer.tsx       # Footer lengkap
├── sections/
│   ├── Hero.tsx         # Hero section dengan big typography
│   ├── Features.tsx     # 3 feature cards + marquee
│   ├── About.tsx        # About + services + skill tags
│   ├── Work.tsx         # Project grid dengan filter
│   ├── Stack.tsx        # Tech stack grid
│   └── Contact.tsx      # Contact form + emoji rating
├── App.tsx              # Root component + custom cursor
├── index.css            # Design system + animations
└── main.tsx             # Entry point
```

## 🎨 Design System

- **Primary**: `#1a3bff` (Electric Blue)
- **Accent**: `#c5f400` (Lime Green)
- **Font Display**: Syne (bold, geometric)
- **Font Mono**: Space Mono

## ✏️ Cara Kustomisasi

1. **Nama**: Cari `YOUR` / `NAME` di `Navbar.tsx` dan `Footer.tsx`
2. **Projects**: Edit array `projects` di `Work.tsx`
3. **Stack**: Edit array `stackItems` di `Stack.tsx`
4. **Social links**: Edit array `socials` di `SocialBar.tsx`
5. **About text**: Edit teks di `About.tsx`

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- CSS Variables (no CSS framework needed)
