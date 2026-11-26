const PIN = '123456';          // <- ganti PIN (6 angka) di sini
let input = '';

const $ = id => document.getElementById(id);
const dots = [...document.querySelectorAll('#dots i')];

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  $(id).classList.add('on');
}

$('folder').onclick = () => show('s2');

// bikin tombol keypad: 1-9, hapus, 0
const pad = $('pad');
[...'123456789', 'del', '0'].forEach(k => {
  const b = document.createElement('button');
  if (k === 'del') { b.className = 'del'; b.textContent = '⌫'; b.setAttribute('aria-label', 'Delete'); }
  else { b.innerHTML = `<img src="img/${k}.png" alt="${k}">`; }
  b.onclick = () => (k === 'del' ? del() : press(k));
  pad.appendChild(b);
});

function render() { dots.forEach((d, i) => d.classList.toggle('fill', i < input.length)); }

function press(n) {
  if (input.length >= 6) return;
  input += n; render();
  $('msg').textContent = '6 digits'; $('msg').classList.remove('err');
  if (input.length === 6) setTimeout(check, 200);
}
function del() { input = input.slice(0, -1); render(); }

function check() {
  if (input === PIN) { show('s3'); cd.classList.add('show'); return; }
  $('dots').classList.add('shake');
  $('msg').textContent = 'Wrong PIN, try again'; $('msg').classList.add('err');
  setTimeout(() => { input = ''; render(); $('dots').classList.remove('shake'); }, 500);
}

// keyboard laptop
document.addEventListener('keydown', e => {
  if (!$('s2').classList.contains('on')) return;
  if (/^\d$/.test(e.key)) press(e.key);
  if (e.key === 'Backspace') del();
});


// ===== piringan musik =====
const cd = $('cd'), np = $('np'), lagu = $('lagu');

function toggleLagu() {
  if (!cd.classList.contains('started')) {      // ketukan pertama: mengecil ke sudut
    cd.classList.add('started', 'mini');
    np.classList.add('show');
    $('judul3').textContent = 'Now playing...';
    $('teks3').textContent = 'sit back, the next scene is loading';
  }
  if (lagu.paused) {
    lagu.play().catch(() => { $('teks3').textContent = '(file lagu.mp3 belum ada di folder)'; });
  } else {
    lagu.pause();
  }
}
lagu.onplay  = () => cd.classList.add('playing');
lagu.onpause = () => cd.classList.remove('playing');
cd.onclick = toggleLagu;
cd.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLagu(); } };
