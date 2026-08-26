// Fungsi untuk memuat file HTML eksternal ke dalam container
async function loadPartiturHTML() {
    try {
        const response = await fetch('partitur.html');
        if (!response.ok) throw new Error('partitur.html tidak ditemukan');
        
        const html = await response.text();
        const container = document.getElementById('partitur-container');
        
        if (container) {
            container.innerHTML = html;
            // Inisialisasi event setelah HTML dimuat
            initPartiturEvents();
        } else {
            console.error('Container #partitur-container tidak ditemukan!');
        }
    } catch (error) {
        console.error('Gagal memuat partitur.html:', error);
        const container = document.getElementById('partitur-container');
        if (container) {
            container.innerHTML = '<p style="color:red; text-align:center;">⚠️ Gagal memuat fitur partitur. Pastikan file partitur.html ada.</p>';
        }
    }
}

// ================================================================
// KONSTANTA SISTEM 12-TET 20 NADA (Sesuai PMD Musik)
// ================================================================
const NOTES_20 = ['E','E#','F','F#','G','G#','H','H#','I','J','J#','K','K#','A','A#','B','B#','C','C#','D'];

// Interval Skala Mayor (E=1) dan Minor (A=1)
const MAYOR_INTERVALS_20 = [2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1];
const MINOR_INTERVALS_20 = [2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2];

let akordList = [];

// ================================================================
// FUNGSI DASAR 20 NADA
// ================================================================

// Fungsi untuk menghasilkan skala 20 nada
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
    
    // Ambil 7 nada utama untuk membentuk akord
    return scale.slice(0, 7);
}

// Fungsi untuk membentuk akord triad dalam sistem 20 nada
function buildChord20(rootName, type) {
    const rootIdx = NOTES_20.indexOf(rootName);
    if (rootIdx === -1) return [];
    
    let third = 4;  // Mayor third (interval 4)
    let fifth = 7;  // Perfect fifth (interval 7)
    
    if (type === 'minor') third = 3;
    if (type === 'diminished') { third = 3; fifth = 6; }

    const thirdName = NOTES_20[(rootIdx + third) % 20];
    const fifthName = NOTES_20[(rootIdx + fifth) % 20];
    return [rootName, thirdName, fifthName];
}

// ================================================================
// INISIALISASI EVENT SETELAH HTML DIMUAT
// ================================================================
function initPartiturEvents() {
    // Event listener untuk tombol tampilkan akord
    const tampilkanBtn = document.getElementById('tampilkan-akord');
    if (tampilkanBtn) {
        tampilkanBtn.addEventListener('click', function() {
            const nadaDasar = document.getElementById('nada-dasar').value;
            const mayorMinor = document.getElementById('mayor-minor').value;
            
            const skala = generateScale(nadaDasar, mayorMinor);
            
            // Progresi akord sesuai skala Mayor/Minor 20 nada
            let progresi = [];
            if (mayorMinor === 'mayor') {
                progresi = ["", "m", "m", "", "", "m", "dim"];
            } else {
                progresi = ["m", "dim", "", "m", "m", "", ""];
            }
            
            akordList = [];
            for (let i = 0; i < skala.length; i++) {
                const chordType = progresi[i];
                const chordNotes = buildChord20(skala[i], chordType);
                
                // Format nama akord (contoh: E, Em, Edim)
                let akordName = chordNotes[0];
                if (chordType === 'minor') akordName += 'm';
                if (chordType === 'diminished') akordName += '°';
                
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

    // Event listener untuk pilih akord
    const pilihAkord = document.getElementById('pilih-akord');
    if (pilihAkord) {
        pilihAkord.addEventListener('change', function() {
            const selectedAkord = this.value;
            if (selectedAkord) {
                insertSymbol(selectedAkord + ' ');
            }
        });
    }
}

// ================================================================
// FUNGSI EDIT PARTITUR
// ================================================================

// Fungsi untuk menyisipkan simbol ke textarea
function insertSymbol(symbol) {
    const area = document.getElementById('partitur-area');
    if (!area) return;
    
    const start = area.selectionStart;
    const end = area.selectionEnd;
    area.value = area.value.substring(0, start) + symbol + area.value.substring(end);
    area.focus();
    area.setSelectionRange(start + symbol.length, start + symbol.length);
}

// Fungsi untuk menyimpan partitur ke localStorage
function simpanPartitur() {
    const partitur = document.getElementById('partitur-area').value;
    localStorage.setItem('partiturNotasiAngka', partitur);
    tampilkanPesan("Partitur berhasil disimpan!", "green");
}

// Fungsi untuk membuka partitur dari localStorage
function bukaPartitur() {
    const partitur = localStorage.getItem('partiturNotasiAngka');
    if (partitur) {
        document.getElementById('partitur-area').value = partitur;
        tampilkanPesan("Partitur berhasil dibuka!", "blue");
    } else {
        tampilkanPesan("Belum ada partitur tersimpan.", "red");
    }
}

// Fungsi untuk mencetak partitur (hanya area partitur)
function cetakPartitur() {
    const area = document.getElementById('partitur-area');
    const partiturText = area.value;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<pre style="font-size: 16px; font-family: Courier New;">' + partiturText.replace(/</g, '&lt;') + '</pre>');
    printWindow.document.close();
    printWindow.print();
}

// Fungsi untuk membersihkan area partitur
function bersihkanPartitur() {
    if (confirm("Yakin ingin menghapus semua isi partitur?")) {
        document.getElementById('partitur-area').value = '';
        tampilkanPesan("Partitur dibersihkan.", "black");
    }
}

// Fungsi untuk menampilkan pesan status
function tampilkanPesan(msg, warna) {
    const statusDiv = document.getElementById('status-message');
    if (!statusDiv) return;
    
    statusDiv.textContent = msg;
    statusDiv.style.color = warna;
    setTimeout(() => {
        statusDiv.textContent = "";
    }, 3000);
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', loadPartiturHTML);