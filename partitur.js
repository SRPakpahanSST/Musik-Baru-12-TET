// ================================================================
// KONSTANTA SISTEM 12-TET 20 NADA
// ================================================================
const NOTES_20 = ['E','E#','F','F#','G','G#','H','H#','I','J','J#','K','K#','A','A#','B','B#','C','C#','D'];
const MAYOR_INTERVALS_20 = [2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1];
const MINOR_INTERVALS_20 = [2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2];

let akordList = [];

// ================================================================
// RENDER HTML PARTITUR LANGSUNG (TANPA FETCH - DIJAMIN TAMPIL)
// ================================================================
function renderPartiturHTML() {
    const container = document.getElementById('partitur-container');
    if (!container) return;

    // HTML Partitur Lengkap (Tanpa perlu file partitur.html)
    container.innerHTML = `
        <div id="partitur-section">
            <h2>Partitur Notasi Angka (Sistem 12-TET 20 Nada)</h2>
            
            <div class="partitur-controls">
                <label>Nada Dasar:</label>
                <select id="nada-dasar">
                    <option value="E">E (Do Mayor)</option>
                    <option value="E#">E#</option>
                    <option value="F">F</option>
                    <option value="F#">F#</option>
                    <option value="G">G</option>
                    <option value="G#">G#</option>
                    <option value="H">H</option>
                    <option value="H#">H#</option>
                    <option value="I">I</option>
                    <option value="J">J</option>
                    <option value="J#">J#</option>
                    <option value="K">K</option>
                    <option value="K#">K#</option>
                    <option value="A">A (Do Minor)</option>
                    <option value="A#">A#</option>
                    <option value="B">B</option>
                    <option value="B#">B#</option>
                    <option value="C">C</option>
                    <option value="C#">C#</option>
                    <option value="D">D</option>
                </select>

                <label>Skala:</label>
                <select id="mayor-minor">
                    <option value="mayor">Mayor (E=1)</option>
                    <option value="minor">Minor (A=1)</option>
                </select>

                <button id="tampilkan-akord">Tampilkan Akord</button>
                
                <label>Pilih Akord:</label>
                <select id="pilih-akord" disabled>
                    <option value="">-- Pilih Akord --</option>
                </select>
            </div>

            <!-- Tombol Simbol Notasi -->
            <div class="symbol-palette">
                <button onclick="insertSymbol('•')">•</button>
                <button onclick="insertSymbol('••')">••</button>
                <button onclick="insertSymbol('•••')">•••</button>
                <button onclick="insertSymbol('|')">|</button>
                <button onclick="insertSymbol('‖')">‖</button>
                <button onclick="insertSymbol(':||')">:||</button>
                <button onclick="insertSymbol('/')">/</button>
                <button onclick="insertSymbol('\\')">\</button>
                <button onclick="insertSymbol('0')">0</button>
                <button onclick="insertSymbol('♯')">♯</button>
                <button onclick="insertSymbol('♭')">♭</button>
                <button onclick="insertSymbol('⌣')">⌣</button>
                <button onclick="insertSymbol('̅')">̅</button>
                <button onclick="insertSymbol('࠘')">࠘</button>
                <button onclick="insertSymbol('߫')">߫</button>
                <button onclick="insertSymbol('ᅞ')">ᅞ</button>
                <button onclick="insertSymbol('ᅟ')">ᅟ</button>
                <button onclick="insertSymbol('ᅝ')">ᅝ</button>
                <button onclick="insertSymbol('ᤘ')">ᤘ</button>
                <button onclick="insertSymbol('̈')">̈</button>
                <button onclick="insertSymbol('᳟')">᳟</button>
                <button onclick="insertSymbol('‿')">‿</button>
                <button onclick="insertSymbol('〢')">〢</button>
                <button onclick="insertSymbol('▕')">▕</button>
                <button onclick="insertSymbol('ࠡ')">ࠡ</button>
                <button onclick="insertSymbol('↑')">↑</button>
                <button onclick="insertSymbol('↓')">↓</button>
            </div>

            <textarea id="partitur-area" placeholder="Tulis partitur notasi angka di sini..."></textarea>

            <div class="partitur-actions">
                <button onclick="simpanPartitur()">💾 Simpan</button>
                <button onclick="bukaPartitur()">📂 Buka</button>
                <button onclick="cetakPartitur()">🖨️ Cetak</button>
                <button onclick="bersihkanPartitur()">🗑️ Bersihkan</button>
            </div>

            <div id="status-message"></div>
        </div>
    `;

    // Panggil event setelah HTML dirender
    initPartiturEvents();
}

// ================================================================
// INISIALISASI EVENT
// ================================================================
function initPartiturEvents() {
    const tampilkanBtn = document.getElementById('tampilkan-akord');
    if (tampilkanBtn) {
        tampilkanBtn.addEventListener('click', function() {
            const nadaDasar = document.getElementById('nada-dasar').value;
            const mayorMinor = document.getElementById('mayor-minor').value;
            
            const skala = generateScale(nadaDasar, mayorMinor);
            let progresi = mayorMinor === "mayor" ? ["", "m", "m", "", "", "m", "dim"] : ["m", "dim", "", "m", "m", "", ""];
            
            akordList = [];
            for (let i = 0; i < skala.length; i++) {
                const chordNotes = buildChord20(skala[i], progresi[i]);
                let akordName = chordNotes[0];
                if (progresi[i] === 'minor') akordName += 'm';
                if (progresi[i] === 'diminished') akordName += '°';
                akordList.push(akordName);
            }
            
            const selectAkord = document.getElementById('pilih-akord');
            if (selectAkord) {
                selectAkord.innerHTML = '<option value="">-- Pilih Akord --</option>';
                akordList.forEach(akord => {
                    const option = document.createElement('option');
                    option.value = akord;
                    option.textContent = akord;
                    selectAkord.appendChild(option);
                });
                selectAkord.disabled = false;
            }
        });
    }

    const pilihAkord = document.getElementById('pilih-akord');
    if (pilihAkord) {
        pilihAkord.addEventListener('change', function() {
            if (this.value) {
                insertSymbol(this.value + ' ');
            }
        });
    }
}

// ================================================================
// FUNGSI DASAR 20 NADA
// ================================================================
function generateScale(nadaDasar, mayorMinor) {
    const rootIdx = NOTES_20.indexOf(nadaDasar);
    if (rootIdx === -1) return [];
    
    const intervals = mayorMinor === "mayor" ? MAYOR_INTERVALS_20 : MINOR_INTERVALS_20;
    let scale = [NOTES_20[rootIdx]];
    let currentIndex = rootIdx;
    
    for (let interval of intervals) {
        currentIndex = (currentIndex + interval) % 20;
        scale.push(NOTES_20[currentIndex]);
    }
    return scale.slice(0, 7);
}

function buildChord20(rootName, type) {
    const rootIdx = NOTES_20.indexOf(rootName);
    if (rootIdx === -1) return [];
    
    let third = 4;
    let fifth = 7;
    if (type === 'minor') third = 3;
    if (type === 'diminished') { third = 3; fifth = 6; }

    return [NOTES_20[rootIdx], NOTES_20[(rootIdx + third) % 20], NOTES_20[(rootIdx + fifth) % 20]];
}

// ================================================================
// FUNGSI EDIT PARTITUR
// ================================================================
function insertSymbol(symbol) {
    const area = document.getElementById('partitur-area');
    if (!area) return;
    
    const start = area.selectionStart;
    const end = area.selectionEnd;
    area.value = area.value.substring(0, start) + symbol + area.value.substring(end);
    area.focus();
    area.setSelectionRange(start + symbol.length, start + symbol.length);
}

function simpanPartitur() {
    const partitur = document.getElementById('partitur-area').value;
    localStorage.setItem('partiturNotasiAngka', partitur);
    tampilkanPesan("Partitur berhasil disimpan!", "green");
}

function bukaPartitur() {
    const partitur = localStorage.getItem('partiturNotasiAngka');
    if (partitur) {
        document.getElementById('partitur-area').value = partitur;
        tampilkanPesan("Partitur berhasil dibuka!", "blue");
    } else {
        tampilkanPesan("Belum ada partitur tersimpan.", "red");
    }
}

function cetakPartitur() {
    const area = document.getElementById('partitur-area');
    const partiturText = area.value;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<pre style="font-size: 16px; font-family: Courier New;">' + partiturText.replace(/</g, '&lt;') + '</pre>');
    printWindow.document.close();
    printWindow.print();
}

function bersihkanPartitur() {
    if (confirm("Yakin ingin menghapus semua isi partitur?")) {
        document.getElementById('partitur-area').value = '';
        tampilkanPesan("Partitur dibersihkan.", "black");
    }
}

function tampilkanPesan(msg, warna) {
    const statusDiv = document.getElementById('status-message');
    if (!statusDiv) return;
    
    statusDiv.textContent = msg;
    statusDiv.style.color = warna;
    setTimeout(() => {
        statusDiv.textContent = "";
    }, 3000);
}

// ================================================================
// JALANKAN SAAT DOM SIAP
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    renderPartiturHTML();
});