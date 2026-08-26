// Fungsi untuk memuat file HTML eksternal ke dalam container
async function loadPartiturHTML() {
    try {
        const response = await fetch('partitur.html');
        const html = await response.text();
        document.getElementById('partitur-container').innerHTML = html;
        
        // Inisialisasi event setelah HTML dimuat
        initPartiturEvents();
    } catch (error) {
        console.error('Gagal memuat partitur.html:', error);
    }
}

// Semua fungsi partitur
function initPartiturEvents() {
    // Event listener untuk tombol tampilkan akord
    document.getElementById('tampilkan-akord').addEventListener('click', function() {
        const nadaDasar = document.getElementById('nada-dasar').value;
        const mayorMinor = document.getElementById('mayor-minor').value;
        
        const skala = generateScale(nadaDasar, mayorMinor);
        const progresi = mayorMinor === "mayor" ? ["", "m", "m", "", "", "m", "dim"] : ["m", "dim", "", "m", "m", "", ""];
        
        akordList = [];
        for (let i = 0; i < skala.length - 1; i++) {
            akordList.push(skala[i] + progresi[i]);
        }
        
        const selectAkord = document.getElementById('pilih-akord');
        selectAkord.innerHTML = '<option value="">-- Pilih Akord --</option>';
        akordList.forEach(akord => {
            const option = document.createElement('option');
            option.value = akord;
            option.textContent = akord;
            selectAkord.appendChild(option);
        });
        selectAkord.disabled = false;
    });

    // Event listener untuk pilih akord
    document.getElementById('pilih-akord').addEventListener('change', function() {
        const selectedAkord = this.value;
        if (selectedAkord) {
            insertSymbol(selectedAkord + ' ');
        }
    });
}

// Variabel global
let akordList = [];

// Fungsi untuk menyisipkan simbol ke textarea
function insertSymbol(symbol) {
    const area = document.getElementById('partitur-area');
    const start = area.selectionStart;
    const end = area.selectionEnd;
    area.value = area.value.substring(0, start) + symbol + area.value.substring(end);
    area.focus();
    area.setSelectionRange(start + symbol.length, start + symbol.length);
}

// Fungsi untuk menghasilkan skala Mayor/Minor
function generateScale(nadaDasar, mayorMinor) {
    const allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const mayorIntervals = [2, 2, 1, 2, 2, 2, 1];
    const minorIntervals = [2, 1, 2, 2, 1, 2, 2];
    
    const intervals = mayorMinor === "mayor" ? mayorIntervals : minorIntervals;
    const startIndex = allNotes.indexOf(nadaDasar);
    
    let scale = [allNotes[startIndex]];
    let currentIndex = startIndex;
    
    for (let interval of intervals) {
        currentIndex = (currentIndex + interval) % allNotes.length;
        scale.push(allNotes[currentIndex]);
    }
    
    return scale;
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
    statusDiv.textContent = msg;
    statusDiv.style.color = warna;
    setTimeout(() => {
        statusDiv.textContent = "";
    }, 3000);
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', loadPartiturHTML);