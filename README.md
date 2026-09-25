# ezX Editor Code 👨‍💻

**Sebuah Web-Based Code Editor profesional yang powerful dan mudah digunakan**

![Version](https://img.shields.io/badge/version-1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow)

## ✨ Fitur Utama

- 🎨 **Multi-Language Support** - Editor terpisah untuk HTML, CSS, dan JavaScript
- 👁️ **Live Preview** - Preview real-time saat Anda mengetik
- 🎯 **Syntax Highlighting** - Tema Dracula dengan CodeMirror
- 💾 **Auto-Save** - Simpan kode ke LocalStorage secara otomatis
- 📥 **Download HTML** - Export project sebagai file HTML
- 📊 **Statistics** - Jumlah karakter dan baris kode
- 📱 **Responsive Design** - Bekerja dengan sempurna di desktop dan mobile
- ⌨️ **Keyboard Shortcuts** - Support CodeMirror shortcuts
- 🖥️ **Fullscreen Mode** - Bekerja dalam mode fullscreen
- 🎨 **Modern UI** - Interface yang cantik dan intuitif

## 🚀 Quick Start

### Cara 1: Langsung di Browser
1. Clone repository ini atau download file `index.html`
2. Buka `index.html` di browser favorit Anda
3. Mulai coding! 🎉

```bash
git clone https://github.com/username/ezX-Editor-Code.git
cd ezX-Editor-Code
# Buka index.html di browser
```

### Cara 2: GitHub Pages (Recommended)
1. Fork repository ini
2. Buka Settings → Pages
3. Pilih `main` branch sebagai source
4. Tunggu beberapa detik, editor akan live di `https://username.github.io/ezX-Editor-Code`

### Cara 3: Local Server
```bash
# Menggunakan Python 3
python -m http.server 8000

# Atau menggunakan Node.js (jika punya http-server)
npx http-server

# Buka http://localhost:8000
```

## 📖 Cara Menggunakan

### Editor Sections
- **HTML Tab**: Tulis struktur HTML Anda
- **CSS Tab**: Tambahkan styling
- **JavaScript Tab**: Tambahkan interaktivitas

### Buttons
- **Reset** ↺ - Hapus semua kode (dengan konfirmasi)
- **Download** ⬇️ - Download sebagai file HTML
- **Fullscreen** ⛶ - Mode fullscreen

### Keyboard Shortcuts
Semua shortcut CodeMirror tersedia:
- `Ctrl + S` - Tidak diperlukan (auto-save)
- `Ctrl + /` - Comment/Uncomment
- `Tab` - Indent
- `Shift + Tab` - Unindent
- `Ctrl + H` - Ganti (Find & Replace)

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur markup
- **CSS3** - Styling dan responsiveness
- **JavaScript (Vanilla)** - Fungsionalitas
- **CodeMirror 5** - Editor dengan syntax highlighting
- **Font Awesome 6** - Icons
- **LocalStorage API** - Penyimpanan lokal

## 📂 Struktur File

```
ezX-Editor-Code/
├── index.html          # Main editor file
├── README.md           # Dokumentasi ini
├── LICENSE             # MIT License
└── .gitignore          # Git ignore file
```

## ⚙️ Customization

### Mengubah Tema
Di dalam `<style>`, ubah:
```javascript
theme: 'dracula'  // Ubah ke tema lain seperti 'monokai', 'default', dll
```

### Menambah HTML Default
Di dalam JavaScript section, ubah `initialHTML`:
```javascript
const initialHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>My Custom Template</title>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
    </html>
`;
```

### Mengubah Warna Header
Di dalam `<style>`, ubah gradient:
```css
.header {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}
```

## 🎨 Customization Lanjutan

### Menambah Bahasa Baru
1. Tambahkan script CodeMirror mode di section `<script>`
2. Tambahkan tab baru di HTML
3. Initialize editor baru di JavaScript

### Integrasi dengan Backend
Untuk menyimpan ke server:
```javascript
// Di fungsi saveToStorage, tambahkan:
fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify({
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue()
    })
});
```

## 🐛 Troubleshooting

### Kode tidak muncul di preview
- Pastikan syntax HTML, CSS, dan JavaScript benar
- Cek browser console untuk error messages
- Reload halaman

### Performa lambat
- Kurangi ukuran kode
- Hindari loop infinite di JavaScript
- Bersihkan console dari warning

### File tidak bisa didownload
- Pastikan browser support Blob API
- Cek file size (browser ada limitasi)
- Gunakan browser modern (Chrome, Firefox, Safari, Edge)

## 📱 Browser Support

| Browser | Support | Version |
|---------|---------|---------|
| Chrome | ✅ | Latest |
| Firefox | ✅ | Latest |
| Safari | ✅ | Latest |
| Edge | ✅ | Latest |
| IE | ❌ | Not supported |

## 🔐 Privacy & Security

- ✅ Semua kode disimpan di **browser lokal** (LocalStorage)
- ✅ Tidak ada data yang dikirim ke server
- ✅ 100% privacy
- ✅ Aman untuk coding project sensitif

## 📄 License

MIT License - Bebas digunakan untuk keperluan komersial dan personal.

Lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 🤝 Kontribusi

Kontribusi sangat diterima! 

### Cara Berkontribusi:
1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 🐛 Report Bug

Temukan bug? Silakan buat [issue](https://github.com/username/ezX-Editor-Code/issues) dengan detail lengkap:
- Deskripsi bug
- Langkah-langkah reproduce
- Expected behavior
- Browser dan OS yang digunakan

## 💡 Feature Request

Punya ide fitur baru? Buat [issue](https://github.com/username/ezX-Editor-Code/issues) dengan label `enhancement`.

Ide populer:
- Dark mode toggle
- Format code otomatis
- Prettier integration
- Export ke CodePen
- Themes lebih banyak
- Collaborative editing

## 📞 Kontak & Support

- 📧 Email: your.email@example.com
- 🐦 Twitter: [@yourusername](https://twitter.com)
- 💬 Discord: [Join Server](https://discord.gg)

## 🙏 Terima Kasih

Terima kasih kepada:
- [CodeMirror](https://codemirror.net/) - Editor library
- [Font Awesome](https://fontawesome.com/) - Icons
- [CDN JS](https://cdnjs.com/) - Libraries hosting

## 📈 Roadmap

### v1.1 (Coming Soon)
- [ ] Dark/Light theme toggle
- [ ] Code formatting dengan Prettier
- [ ] Export ke CodePen/JSFiddle
- [ ] Multiple files support

### v2.0 (Planned)
- [ ] Real-time collaboration
- [ ] User accounts & cloud save
- [ ] Built-in JavaScript console
- [ ] Mobile app

## ⭐ Show Your Support

Jika project ini membantu Anda, berikan **star** ⭐ dan **share** ke teman-teman!

---

**Made with ❤️ by [Your Name]**

*Happy Coding! 👨‍💻*
