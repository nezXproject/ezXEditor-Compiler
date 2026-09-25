# 🚀 Setup Guide - ezX Editor Code

Panduan lengkap untuk setup dan deploy ezX Editor Code.

## Prerequisite

- Git (optional, bisa download ZIP)
- Browser modern (Chrome, Firefox, Safari, Edge)
- Text editor (untuk edit file)

## Installation

### Opsi 1: Download ZIP (Termudah)

1. Klik tombol **Code** di GitHub
2. Pilih **Download ZIP**
3. Extract file ZIP
4. Buka `index.html` di browser
5. Selesai! 🎉

### Opsi 2: Git Clone

```bash
# Clone repository
git clone https://github.com/username/ezX-Editor-Code.git

# Masuk ke folder
cd ezX-Editor-Code

# Buka di browser
# Windows: start index.html
# Mac: open index.html
# Linux: xdg-open index.html
```

### Opsi 3: GitHub Pages (Best untuk Sharing)

#### Langkah 1: Fork Repository
1. Buka https://github.com/username/ezX-Editor-Code
2. Klik tombol **Fork**

#### Langkah 2: Aktifkan GitHub Pages
1. Buka **Settings** repository Anda
2. Scroll ke bagian **Pages**
3. Pada **Source**, pilih branch `main` dan folder `/ (root)`
4. Klik **Save**

#### Langkah 3: Akses Editor
- URL akan muncul: `https://YOUR-USERNAME.github.io/ezX-Editor-Code/`
- Share URL ini ke siapa saja!

## 🎮 Usage

### Mulai Coding
1. **Pilih Tab**: HTML, CSS, atau JS
2. **Tulis Kode**: Tulis code di editor
3. **Lihat Preview**: Preview langsung di sebelah kanan
4. **Download**: Klik Download untuk export file HTML

### Shortcut Keyboard
```
Ctrl + S    = Auto-save (tidak perlu manual)
Ctrl + /    = Comment line
Ctrl + Z    = Undo
Ctrl + Y    = Redo
Tab         = Indent
Shift + Tab = Unindent
Ctrl + H    = Find & Replace
Ctrl + F    = Search
```

## 🔧 Customization

### Mengubah Default Content

Buka `index.html` dan cari baris ini:

```javascript
const initialHTML = `<!DOCTYPE html>
<html>
<head>
    <title>ezX Editor Code</title>
</head>
<body>
    <h1>Welcome to ezX Editor Code! 👨‍💻</h1>
    <p>Mulai coding di sini...</p>
</body>
</html>`;
```

Ubah sesuai keinginan Anda.

### Mengubah Warna Header

Cari CSS rule `.header`:

```css
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Ubah warna di atas */
}
```

Warna popular:
- Biru: `#2196F3` ke `#0b7dda`
- Merah: `#f44336` ke `#d32f2f`
- Hijau: `#4CAF50` ke `#388E3C`
- Ungu: `#667eea` ke `#764ba2` (default)

### Mengubah Bahasa

Ganti `lang="id"` menjadi `lang="en"` untuk English atau bahasa lain.

## 🐛 Troubleshooting

### Problem: Halaman putih/blank

**Solusi:**
- Refresh halaman (F5)
- Clear cache (Ctrl + Shift + Del)
- Buka browser baru

### Problem: Preview tidak update

**Solusi:**
- Cek Console (F12) untuk error
- Pastikan syntax JavaScript benar
- Hindari infinite loop

### Problem: File JavaScript error

**Solusi:**
- Buka DevTools (F12)
- Lihat error di Console tab
- Fix error di JavaScript editor

### Problem: Download tidak bekerja

**Solusi:**
- Gunakan browser yang lebih baru
- Disable adblocker
- Coba di browser lain

## 💾 Data Management

### Auto-Save ke LocalStorage

Kode Anda **otomatis tersimpan** di browser local storage. Tidak perlu khawatir kehilangan kode.

### Hapus Saved Data

Buka DevTools (F12) → Application → LocalStorage → Hapus `ezX-html`, `ezX-css`, `ezX-js`

### Export ke File

Klik tombol **Download** untuk export sebagai file HTML.

## 🌐 Deploy Alternatives

### Vercel
1. Buka https://vercel.com
2. Click "New Project"
3. Import dari GitHub repository
4. Deploy!

### Netlify
1. Buka https://netlify.com
2. Drag & drop folder ke "Sites"
3. Deploy!

### Heroku (dengan server)
```bash
git clone https://github.com/username/ezX-Editor-Code.git
cd ezX-Editor-Code
heroku create your-app-name
git push heroku main
```

## 📊 Performance Tips

### Untuk Optimal Performance:
1. Hindari kode CSS yang terlalu complex
2. Jangan buat infinite loop di JavaScript
3. Limit file size (< 1MB untuk smooth experience)
4. Gunakan modern browsers

### Monitor Performance:
- Buka DevTools (F12)
- Tab "Performance"
- Record dan analyze

## 🔒 Security Notes

- ✅ Semua code berjalan di **client-side**
- ✅ Tidak ada data yang dikirim ke server
- ✅ Aman untuk coding project sensitif
- ✅ 100% privacy guaranteed

## 🆘 Need Help?

### Resources
- [CodeMirror Docs](https://codemirror.net/doc/manual.html)
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)

### Contact
- 📧 Email: your.email@example.com
- 💬 Create Issue di GitHub
- 🐦 Twitter: [@username](https://twitter.com)

## ✅ Checklist untuk Production

- [ ] Ubah judul di HTML (`<title>`)
- [ ] Update logo/favicon jika diperlukan
- [ ] Test di berbagai browser
- [ ] Test di mobile
- [ ] Customize warna dan tema
- [ ] Update README.md dengan info Anda
- [ ] Add screenshot di README
- [ ] Deploy ke GitHub Pages atau service lain

## 🎉 Next Steps

Setelah setup berhasil:

1. **Customize** - Ubah warna, judul, dll
2. **Share** - Bagikan link ke teman
3. **Extend** - Tambahkan fitur baru
4. **Deploy** - Upload ke service hosting
5. **Promote** - Share di media sosial

---

**Selamat coding! 🚀**

Jika ada pertanyaan, buat issue di GitHub atau hubungi kami.
