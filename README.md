# Website Kelas 12F IPAS - SMAN 1 Jogorogo

Website kelas untuk menampilkan profil 33 siswa kelas 12F IPAS dengan desain modern dan interaktif.

## 🚀 Fitur Utama

- **Halaman Beranda**: Menampilkan preview 6 siswa dan statistik kelas
- **Daftar Siswa**: Grid card untuk 33 siswa dengan fitur pencarian
- **Profil Siswa**: Halaman detail untuk setiap siswa (klik pada card siswa)
- **Tentang Kelas**: Informasi visi, misi, struktur, dan prestasi kelas
- **Galeri**: Dokumentasi kegiatan dan kenangan kelas

## 📁 Struktur File

```
sman1-jogorogo/
├── server.js              # Server Express dengan data 33 siswa
├── package.json           # Dependencies
├── public/
│   ├── index.html         # Halaman beranda
│   ├── students.html      # Daftar semua siswa
│   ├── student-detail.html # Detail profil siswa
│   ├── about.html         # Tentang kelas
│   ├── gallery.html       # Galeri kegiatan
│   └── styles.css         # Styling modern
└── README.md
```

## 🎨 Teknologi

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Desain**: Modern gradient dengan responsive layout

## 📋 Data Siswa

Website ini berisi data lengkap 33 siswa meliputi:
- Nama lengkap
- Nama panggilan
- Motto hidup
- Hobi
- Cita-cita
- Instagram

## 🔧 Cara Menjalankan

### Opsi 1: Menggunakan Node.js langsung

```bash
node server.js
```

### Opsi 2: Menggunakan Command Prompt (jika npm tidak bisa digunakan)

```cmd
cd c:\Users\adnan\sman1-jogorogo
node server.js
```

Kemudian buka browser dan akses: **http://localhost:3000**

## 🌐 Halaman Website

1. **Beranda** (`/`) - Halaman utama dengan intro kelas
2. **Tentang Kami** (`/about`) - Info lengkap kelas 12F IPAS
3. **Daftar Siswa** (`/students`) - Grid card 33 siswa dengan search
4. **Galeri** (`/gallery`) - Foto dan kenangan kegiatan
5. **Profil Siswa** (`/student/:id`) - Detail siswa individual

## 🎯 API Endpoints

- `GET /api/students` - Mendapatkan data semua siswa
- `GET /api/students/:id` - Mendapatkan data siswa berdasarkan ID

## 📱 Responsive Design

Website fully responsive untuk:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎓 Data Siswa (33 Orang)

1. Ahmad Fadhil Rahman - Ketua Kelas
2. Anisa Putri Maharani - Wakil Ketua
3. Budi Santoso
4. Citra Dewi Lestari - Sekretaris
5. Dimas Prasetyo
... dan 28 siswa lainnya

## 💡 Fitur Interaktif

- **Search**: Cari siswa berdasarkan nama, panggilan, atau cita-cita
- **Hover Effect**: Card interaktif dengan animasi smooth
- **Navigation**: Menu sticky yang user-friendly
- **Click to Detail**: Klik card siswa untuk melihat profil lengkap

## 🎨 Color Scheme

- Primary: Indigo (#4f46e5)
- Secondary: Cyan (#06b6d4)
- Accent: Amber (#f59e0b)

## 📝 Catatan

Website ini dibuat sebagai platform untuk mempererat kebersamaan kelas 12F IPAS dan mendokumentasikan perjalanan bersama menuju kelulusan tahun 2026.

---

**Made with ❤️ by Kelas 12F IPAS - SMAN 1 Jogorogo**
