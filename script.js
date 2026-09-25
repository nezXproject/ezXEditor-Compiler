/* ============================================================
   ezX Editor Code — Ultimate
   ============================================================ */

// ===== Default Templates =====
const DEFAULT_CODE = {
  html: `<!-- 👋 Selamat datang di ezX Editor Code -->
<div class="card">
  <h1>Hello, World! 🚀</h1>
  <p>Edit kode di kiri, lihat hasilnya langsung di kanan.</p>
  <button id="btn" class="btn">Klik Aku</button>
  <p id="output"></p>
</div>`,
  css: `* { box-sizing: border-box; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 20px;
}
.card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  max-width: 400px;
}
h1 { color: #1e293b; margin-top: 0; }
p { color: #64748b; }
.btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn:hover { transform: scale(1.05); background: #1d4ed8; }
#output { margin-top: 16px; font-weight: 600; color: #10b981; }`,
  js: `let count = 0;
const btn = document.getElementById('btn');
const output = document.getElementById('output');

btn.addEventListener('click', () => {
  count++;
  output.textContent = \`Kamu klik \${count} kali 🎉\`;
  console.log('Klik ke-' + count);
});

console.log('ezX Editor Code siap digunakan! ✨');`
};

// ===== Storage Keys =====
const STORAGE_KEY = 'ezx_editor_code_v2';
const THEME_KEY = 'ezx_theme';
const LIBS_KEY = 'ezx_libs';
const LAYOUT_KEY = 'ezx_layout';

// ===== State =====
let activeLibs = [];      // [{url, name, type}]
let currentTab = 'html';
let editors = {};
let saveTimeout = null;
let consoleCount = 0;
let runTimer = null;

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initEditors();
  loadFromStorage();
  loadFromURL();
  loadTheme();
  loadLayout();
  loadLibs();
  bindUI();
  runPreview();
});

// ============================================================
// CODEMIRROR SETUP
// ============================================================
function createEditor(id, mode, extraOptions = {}) {
  return CodeMirror.fromTextArea(document.getElementById(id), {
    mode,
    theme: 'dracula',
    lineNumbers: true,
    lineWrapping: false,
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchBrackets: true,
    matchTags: { bothTags: true },
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    styleActiveLine: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    keyMap: 'sublime',
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Cmd-Space': 'autocomplete',
      'Ctrl-/': 'toggleComment',
      'Cmd-/': 'toggleComment',
      'Tab': (cm) => {
        if (cm.somethingSelected()) cm.indentSelection('add');
        else cm.replaceSelection('  ', 'end');
      },
      'Shift-Tab': (cm) => cm.indentSelection('subtract'),
      'Ctrl-S': runPreview,
      'Cmd-S': runPreview,
      'Ctrl-F': 'findPersistent',
      'Cmd-F': 'findPersistent'
    },
    ...extraOptions
  });
}

function initEditors() {
  editors.html = createEditor('html', 'htmlmixed');
  editors.css  = createEditor('css', 'css', {
    extraKeys: {
      ...CodeMirror.defaults.extraKeys,
      'Ctrl-Space': 'autocomplete'
    }
  });
  editors.js   = createEditor('js', 'javascript');

  // Change listener untuk auto-save & live preview
  Object.values(editors).forEach(cm => {
    cm.on('change', () => {
      updateStatus('saving');
      scheduleAutoRun();
      scheduleAutoSave();
    });

    // Autocomplete saat mengetik (Ctrl+Space juga bisa)
    cm.on('inputRead', (cm, change) => {
      if (change.text[0] && /[<a-zA-Z.]/.test(change.text[0])) {
        cm.showHint({ completeSingle: false });
      }
    });
  });
}

// ============================================================
// AUTOSAVE & LIVE PREVIEW
// ============================================================
function scheduleAutoRun() {
  clearTimeout(runTimer);
  runTimer = setTimeout(runPreview, 600);
}

function scheduleAutoSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveToStorage, 500);
}

function updateStatus(state) {
  const dot = document.getElementById('statusDot');
  const txt = document.getElementById('statusText');
  dot.classList.remove('saved', 'saving');
  if (state === 'saving') {
    dot.classList.add('saving');
    txt.textContent = 'Saving...';
  } else {
    dot.classList.add('saved');
    txt.textContent = 'Saved';
  }
}

// ============================================================
// STORAGE
// ============================================================
function saveToStorage() {
  const data = {
    html: editors.html.getValue(),
    css: editors.css.getValue(),
    js: editors.js.getValue(),
    timestamp: Date.now()
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    updateStatus('saved');
  } catch (e) {
    console.warn('Storage penuh', e);
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Pertama kali → pakai default
      editors.html.setValue(DEFAULT_CODE.html);
      editors.css.setValue(DEFAULT_CODE.css);
      editors.js.setValue(DEFAULT_CODE.js);
      return;
    }
    const data = JSON.parse(raw);
    editors.html.setValue(data.html ?? DEFAULT_CODE.html);
    editors.css.setValue(data.css ?? DEFAULT_CODE.css);
    editors.js.setValue(data.js ?? DEFAULT_CODE.js);
    updateStatus('saved');
  } catch (e) {
    console.warn('Gagal load storage', e);
  }
}

// ============================================================
// URL SHARE
// ============================================================
function encodeState() {
  const data = {
    h: editors.html.getValue(),
    c: editors.css.getValue(),
    j: editors.js.getValue(),
    l: activeLibs.map(l => l.name)
  };
  // Encode UTF-8 → Base64 URL safe
  const json = JSON.stringify(data);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeState(str) {
  try {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch (e) { return null; }
}

function loadFromURL() {
  const hash = location.hash.slice(1);
  if (!hash) return;
  const data = decodeState(hash);
  if (!data) return;
  editors.html.setValue(data.h || '');
  editors.css.setValue(data.c || '');
  editors.js.setValue(data.j || '');
  // Restore libs from name
  if (data.l && data.l.length) {
    const libMap = {};
    document.querySelectorAll('#libPicker option').forEach(opt => {
      libMap[opt.value.split('|')[1]] = opt.value;
    });
    data.l.forEach(name => {
      const val = libMap[name];
      if (val) addLib(val.split('|')[0], name, false);
    });
  }
  showToast('Kode berhasil dimuat dari URL ✨', 'success');
}

// ============================================================
// LIBRARIES (CDN)
// ============================================================
function loadLibs() {
  try {
    const raw = localStorage.getItem(LIBS_KEY);
    if (!raw) return;
    const list = JSON.parse(raw);
    list.forEach(item => addLib(item.url, item.name, false, true));
  } catch (e) {}
}

function saveLibs() {
  localStorage.setItem(LIBS_KEY, JSON.stringify(activeLibs));
}

function addLib(url, name, toast = true, silent = false) {
  if (activeLibs.find(l => l.name === name)) {
    if (toast) showToast('Library sudah aktif', 'info');
    return;
  }
  const type = url.endsWith('.css') || url.includes('fonts.googleapis') ? 'css' : 'js';
  activeLibs.push({ url, name, type });
  renderLibs();
  saveLibs();
  if (!silent) runPreview();
  if (toast) showToast(`${name} ditambahkan ✅`, 'success');
}

function removeLib(name) {
  activeLibs = activeLibs.filter(l => l.name !== name);
  renderLibs();
  saveLibs();
  runPreview();
  showToast(`${name} dihapus`, 'info');
}

function renderLibs() {
  const container = document.getElementById('activeLibs');
  container.innerHTML = activeLibs.map(l => `
    <span class="lib-chip">
      ${l.name}
      <button data-lib="${l.name}" title="Hapus"><i class="fa-solid fa-times"></i></button>
    </span>
  `).join('');

  container.querySelectorAll('button[data-lib]').forEach(btn => {
    btn.addEventListener('click', () => removeLib(btn.dataset.lib));
  });
}

// ============================================================
// PREVIEW + CONSOLE
// ============================================================
function buildPreviewHTML() {
  const cssLibs = activeLibs.filter(l => l.type === 'css')
    .map(l => `<link rel="stylesheet" href="${l.url}">`).join('\n');
  const jsLibs = activeLibs.filter(l => l.type === 'js')
    .map(l => `<script src="${l.url}"><\/script>`).join('\n');

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${cssLibs}
<style>
${editors.css.getValue()}
</style>
</head>
<body>
${editors.html.getValue()}
${jsLibs}
<script>
// Intercept console untuk panel Console
(function(){
  const _send = (type, args) => {
    parent.postMessage({
      source: 'ezx-preview',
      type,
      args: args.map(a => {
        try {
          if (typeof a === 'object') return JSON.stringify(a, null, 2);
          return String(a);
        } catch(e) { return String(a); }
      })
    }, '*');
  };
  ['log','info','warn','error','debug'].forEach(k => {
    const orig = console[k];
    console[k] = (...args) => { _send(k, args); orig.apply(console, args); };
  });
  window.addEventListener('error', e => {
    _send('error', [e.message + ' (line ' + e.lineno + ')']);
  });
  window.addEventListener('unhandledrejection', e => {
    _send('error', ['Unhandled Promise: ' + e.reason]);
  });
})();
<\/script>
</body>
</html>`;
}

function runPreview() {
  const iframe = document.getElementById('preview');
  iframe.srcdoc = buildPreviewHTML();
  clearConsole();
  logConsole('Preview dijalankan', 'system');
}

function clearConsole() {
  document.getElementById('consoleOutput').innerHTML = '';
  consoleCount = 0;
  updateConsoleBadge();
}

function logConsole(message, type = 'log') {
  const out = document.getElementById('consoleOutput');
  const div = document.createElement('div');
  div.className = `console-line ${type}`;
  const icons = {
    log: '›', info: 'ℹ', warn: '⚠', error: '✕', system: '⚡'
  };
  div.textContent = `${icons[type] || '›'} ${message}`;
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
  consoleCount++;
  updateConsoleBadge();
}

function updateConsoleBadge() {
  const badge = document.getElementById('consoleBadge');
  badge.textContent = consoleCount;
  badge.style.display = consoleCount > 0 ? 'inline-block' : 'none';
}

// Listener pesan dari iframe
window.addEventListener('message', e => {
  if (e.data && e.data.source === 'ezx-preview') {
    e.data.args.forEach(arg => logConsole(arg, e.data.type));
  }
});

// ============================================================
// UI EVENT BINDING
// ============================================================
function bindUI() {
  // ===== Tab switching =====
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const t = tab.dataset.tab;
      currentTab = t;
      document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.editor-wrap').forEach(x => x.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-editor="${t}"]`).classList.add('active');
      setTimeout(() => editors[t].refresh(), 10);
    });
  });

  // ===== Preview tab switching =====
  document.querySelectorAll('.ptab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ptab').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.view').forEach(x => x.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.view).classList.add('active');
    });
  });

  // ===== Tombol utama =====
  document.getElementById('runBtn').addEventListener('click', () => {
    runPreview();
    showToast('Kode dijalankan ▶', 'success');
  });

  document.getElementById('downloadBtn').addEventListener('click', downloadHTML);
  document.getElementById('resetBtn').addEventListener('click', resetCode);
  document.getElementById('shareBtn').addEventListener('click', openShareModal);
  document.getElementById('copyShareBtn').addEventListener('click', copyShareURL);
  document.getElementById('closeShareBtn').addEventListener('click', closeShareModal);

  // ===== Editor tools =====
  document.getElementById('formatBtn').addEventListener('click', formatCode);
  document.getElementById('clearBtn').addEventListener('click', clearCurrentTab);
  document.getElementById('wrapBtn').addEventListener('click', toggleWrap);
  document.getElementById('refreshBtn').addEventListener('click', runPreview);
  document.getElementById('popoutBtn').addEventListener('click', popoutPreview);
  document.getElementById('clearConsoleBtn').addEventListener('click', clearConsole);

  // ===== Theme =====
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);

  // ===== Layout =====
  document.getElementById('layoutBtn').addEventListener('click', cycleLayout);

  // ===== Fullscreen =====
  document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);

  // ===== Lib picker =====
  document.getElementById('libPicker').addEventListener('change', (e) => {
    const val = e.target.value;
    if (!val) return;
    const [url, name] = val.split('|');
    addLib(url, name);
    e.target.value = '';
  });

  // ===== Resizer =====
  initResizer();

  // ===== Keyboard Shortcuts =====
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      runPreview();
      showToast('Kode dijalankan ▶', 'success');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      downloadHTML();
    }
    if (e.key === 'Escape') closeShareModal();
  });
}

// ============================================================
// FUNCTIONS
// ============================================================
function downloadHTML() {
  const html = buildPreviewHTML();
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ezx-project-${Date.now()}.html`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('File HTML berhasil didownload 📥', 'success');
}

function resetCode() {
  if (!confirm('Reset semua kode ke default? Perubahan akan hilang.')) return;
  editors.html.setValue(DEFAULT_CODE.html);
  editors.css.setValue(DEFAULT_CODE.css);
  editors.js.setValue(DEFAULT_CODE.js);
  runPreview();
  showToast('Kode direset ke default 🔄', 'info');
}

function formatCode() {
  // Format sederhana: rapikan indentasi berdasarkan { } dan tag HTML
  const cm = editors[currentTab];
  const val = cm.getValue();
  const formatted = simpleFormat(val, currentTab);
  const cursor = cm.getCursor();
  cm.setValue(formatted);
  cm.setCursor(cursor);
  showToast('Kode diformat ✨', 'success');
}

function simpleFormat(code, lang) {
  // Format sangat sederhana (bukan prettier penuh)
  let indent = 0;
  const out = [];
  const lines = code.replace(/>\s*</g, '>\n<').split('\n');
  for (let line of lines) {
    line = line.trim();
    if (!line) { out.push(''); continue; }
    // Turunkan indent jika diawali closing tag / bracket
    if (/^(<\/(?!html|body|head)|}|\))/.test(line)) indent = Math.max(0, indent - 1);
    out.push('  '.repeat(indent) + line);
    // Naikkan indent jika diakhiri opening tag / bracket
    if ((/<[^\/!][^>]*[^\/]>$/.test(line) && !/<(br|hr|img|input|meta|link)/i.test(line))
        || /[{(]$/.test(line)) {
      indent++;
    }
  }
  return out.join('\n');
}

function clearCurrentTab() {
  if (!confirm(`Kosongkan tab ${currentTab.toUpperCase()}?`)) return;
  editors[currentTab].setValue('');
  showToast(`Tab ${currentTab.toUpperCase()} dikosongkan`, 'info');
}

function toggleWrap() {
  const cm = editors[currentTab];
  cm.setOption('lineWrapping', !cm.getOption('lineWrapping'));
  cm.refresh();
  showToast(`Word wrap: ${cm.getOption('lineWrapping') ? 'ON' : 'OFF'}`, 'info');
}

function popoutPreview() {
  const html = buildPreviewHTML();
  const w = window.open('', '_blank');
  w.document.open();
  w.document.write(html);
  w.document.close();
}

// ============================================================
// THEME
// ============================================================
function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
  document.getElementById('themeBtn').innerHTML = isLight
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  // Ganti tema CodeMirror
  const cmTheme = isLight ? 'default' : 'dracula';
  Object.values(editors).forEach(cm => cm.setOption('theme', cmTheme));

  // Adjust preview bg
  if (isLight) {
    document.querySelectorAll('.CodeMirror').forEach(el => {
      el.style.background = '#fff';
      el.style.color = '#0f172a';
    });
  }
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light') toggleTheme();
}

// ============================================================
// LAYOUT
// ============================================================
const LAYOUTS = ['', 'layout-code-only', 'layout-preview-only'];
function cycleLayout() {
  let current = '';
  LAYOUTS.forEach(l => { if (document.body.classList.contains(l)) current = l; });
  LAYOUTS.forEach(l => l && document.body.classList.remove(l));
  const idx = LAYOUTS.indexOf(current);
  const next = LAYOUTS[(idx + 1) % LAYOUTS.length];
  if (next) document.body.classList.add(next);
  localStorage.setItem(LAYOUT_KEY, next);

  const icons = {
    '': 'fa-table-columns',
    'layout-code-only': 'fa-code',
    'layout-preview-only': 'fa-eye'
  };
  document.getElementById('layoutBtn').innerHTML =
    `<i class="fa-solid ${icons[next]}"></i>`;

  setTimeout(() => Object.values(editors).forEach(cm => cm.refresh()), 50);
}

function loadLayout() {
  const saved = localStorage.getItem(LAYOUT_KEY);
  if (saved) {
    document.body.classList.add(saved);
    const icons = {
      '': 'fa-table-columns',
      'layout-code-only': 'fa-code',
      'layout-preview-only': 'fa-eye'
    };
    document.getElementById('layoutBtn').innerHTML =
      `<i class="fa-solid ${icons[saved] || 'fa-table-columns'}"></i>`;
  }
}

// ============================================================
// FULLSCREEN
// ============================================================
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ============================================================
// RESIZER
// ============================================================
function initResizer() {
  const resizer = document.getElementById('resizer');
  const editorSide = document.getElementById('editorSide');
  const main = document.getElementById('main');
  let dragging = false;

  resizer.addEventListener('mousedown', () => {
    dragging = true;
    resizer.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = main.getBoundingClientRect();
    const isMobile = window.innerWidth <= 900;
    if (isMobile) {
      const pct = ((e.clientY - rect.top) / rect.height) * 100;
      const clamped = Math.max(20, Math.min(80, pct));
      editorSide.style.flex = `0 0 ${clamped}%`;
    } else {
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(20, Math.min(80, pct));
      editorSide.style.flex = `0 0 ${clamped}%`;
    }
    Object.values(editors).forEach(cm => cm.refresh());
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    resizer.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}

// ============================================================
// SHARE MODAL
// ============================================================
function openShareModal() {
  const encoded = encodeState();
  const url = `${location.origin}${location.pathname}#${encoded}`;
  document.getElementById('shareUrl').value = url;
  document.getElementById('shareModal').classList.add('show');
}

function closeShareModal() {
  document.getElementById('shareModal').classList.remove('show');
}

async function copyShareURL() {
  const input = document.getElementById('shareUrl');
  try {
    await navigator.clipboard.writeText(input.value);
    showToast('Link dicopy ke clipboard 📋', 'success');
  } catch (e) {
    input.select();
    document.execCommand('copy');
    showToast('Link dicopy 📋', 'success');
  }
  closeShareModal();
}

// ============================================================
// TOAST
// ============================================================
let toastTimer;
function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span> ${msg}`;
  toast.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
