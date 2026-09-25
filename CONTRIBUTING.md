# 🤝 Contributing to ezX Editor Code

Terima kasih atas minat Anda untuk berkontribusi! Panduan ini akan membantu Anda memulai.

## Code of Conduct

Kami berkomitmen untuk menyediakan lingkungan yang welcoming untuk semua orang:
- Bersikap hormat dan profesional
- Terima kritik konstruktif dengan terbuka
- Fokus pada apa yang terbaik untuk komunitas
- Tanpa harassment, bullying, atau diskriminasi

## Cara Berkontribusi

### 1. Report Bug 🐛

Menemukan bug? Silakan buat issue dengan informasi:

```markdown
## Bug Report

**Deskripsi Bug:**
[Jelaskan bug secara singkat]

**Langkah Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
[Apa yang seharusnya terjadi?]

**Actual Behavior:**
[Apa yang sebenarnya terjadi?]

**Environment:**
- Browser: [Chrome/Firefox/Safari/Edge]
- OS: [Windows/Mac/Linux]
- Version: [Browser version]

**Screenshots:**
[Jika ada, attach screenshot]
```

### 2. Suggest Feature 💡

Punya ide fitur baru?

```markdown
## Feature Request

**Deskripsi:**
[Jelaskan fitur yang Anda inginkan]

**Use Case:**
[Bagaimana ini akan membantu pengguna?]

**Implementasi (Optional):**
[Saran bagaimana cara implement]

**Priority:**
- [ ] Low
- [ ] Medium
- [ ] High
```

### 3. Submit Code Changes 💻

#### Setup Development Environment

```bash
# 1. Fork repository
git clone https://github.com/YOUR-USERNAME/ezX-Editor-Code.git
cd ezX-Editor-Code

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# Edit files sesuai kebutuhan

# 4. Commit changes
git commit -m "Add amazing feature"

# 5. Push to branch
git push origin feature/amazing-feature

# 6. Open Pull Request
```

#### Commit Message Guidelines

```
Format: <type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Feature baru
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, spacing)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test changes

**Contoh:**
```
feat(editor): add dark mode toggle

- Implement dark/light theme switcher
- Save theme preference to localStorage
- Update CSS variables for theming
```

### 4. Review Process

1. Submit Pull Request
2. Maintainer akan review
3. Mungkin ada requests untuk changes
4. Setelah approved, PR akan di-merge

## Development Guidelines

### Coding Standards

**JavaScript:**
```javascript
// Use const/let, not var
const myVar = 'value';

// Use camelCase for variables
const editorConfig = {};

// Use arrow functions for callbacks
editors.forEach(editor => editor.refresh());

// Add comments untuk logic kompleks
// Validate user input before processing
if (input && typeof input === 'string') {
    processInput(input);
}
```

**CSS:**
```css
/* Use meaningful class names */
.editor-section {
    display: flex;
}

/* Group related properties */
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

/* Use CSS variables untuk colors */
color: var(--primary-color);
```

**HTML:**
```html
<!-- Use semantic HTML -->
<header class="header">
    <h1>Title</h1>
</header>

<!-- Add alt text to images -->
<img src="image.png" alt="Description">

<!-- Use proper indentation -->
<div class="container">
    <section>
        <p>Content</p>
    </section>
</div>
```

### File Organization

```
ezX-Editor-Code/
├── index.html              # Main file
├── README.md               # Documentation
├── SETUP.md                # Setup guide
├── CONTRIBUTING.md         # This file
├── LICENSE                 # MIT License
├── .gitignore
└── assets/                 # Optional future folder
    ├── css/
    ├── js/
    └── images/
```

### Testing Changes

Sebelum submit:

1. **Test di Multiple Browsers:**
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **Test Responsiveness:**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

3. **Test Features:**
   - Typing code
   - Live preview
   - Download
   - Reset
   - Fullscreen

4. **Check Console:**
   - F12 → Console
   - Tidak boleh ada error

## Areas for Contribution

### High Priority ⭐⭐⭐
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Documentation improvements
- [ ] Accessibility features

### Medium Priority ⭐⭐
- [ ] New editor themes
- [ ] Code formatting
- [ ] Export options
- [ ] Keyboard shortcut improvements

### Low Priority ⭐
- [ ] UI/UX enhancements
- [ ] Animation improvements
- [ ] Comment translations
- [ ] Minor code cleanup

## Documentation

### Update README
Jika menambah fitur baru, update README:

```markdown
## ✨ Fitur Utama

- ✅ Feature baru Anda
- 🎨 Existing features...
```

### Add Code Comments
```javascript
// Jelaskan fungsi kompleks
function complexFunction(param) {
    // Step 1: Validate input
    if (!param) return null;
    
    // Step 2: Process data
    const result = processData(param);
    
    // Step 3: Return result
    return result;
}
```

## Pull Request Process

1. **Buat branch dari `main`**
   ```bash
   git checkout -b feature/your-feature main
   ```

2. **Update code Anda**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

3. **Sync dengan upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Push ke fork Anda**
   ```bash
   git push origin feature/your-feature
   ```

5. **Open Pull Request**
   - Go to original repo
   - Click "Compare & pull request"
   - Add description of changes
   - Click "Create pull request"

### PR Description Template
```markdown
## Description
Jelaskan changes yang Anda buat.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
Jelaskan bagaimana Anda test changes:
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile

## Checklist
- [ ] Code follows style guidelines
- [ ] No console errors
- [ ] Added comments untuk code kompleks
- [ ] Updated README jika diperlukan
```

## Getting Help

- 📧 **Email**: your.email@example.com
- 💬 **Discord**: [Join Server](https://discord.gg)
- 🐦 **Twitter**: [@username](https://twitter.com)
- 📚 **Discussions**: GitHub Discussions

## Recognition 🏆

Kontributor akan di-recognize di:
- README.md - Contributors section
- Commit message
- Release notes (untuk changes signifikan)

## License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah MIT License.

---

**Terima kasih telah berkontribusi! 🎉**

Pertanyaan? Buat issue atau hubungi kami!
