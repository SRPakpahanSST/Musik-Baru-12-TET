# pmd-musik-12tet

🎵 PMD Musik 12 TET

Pedang Mata Dua Musik Digital — Eksplorasi Mikrotonal 20 Nada per Oktaf

https://img.shields.io/badge/Deployed-GitHub%20Pages-blue
https://img.shields.io/badge/APINDO-Innovation%20Challenge%202026-orange
https://img.shields.io/badge/License-MIT-green

---

Akses aplikasi di: https://srpakpahansst.github.io/Musik-Baru-12-TET/

Tempelkan URL Link Aplikasi ke Browser Anda. Jangan langsung URL di klik karena nanti tidak bisa membuka Tombol "Mulai"

https://srpakpahansst.github.io/Musik-Baru-12-TET/

📖 Tentang Aplikasi

PMD Musik 12 TET adalah aplikasi web interaktif untuk eksplorasi sistem musik 12-Tone Equal Temperament (12-TET) dengan 20 nada per oktaf — sebuah inovasi dalam dunia musik mikrotonal.

Aplikasi ini dikembangkan berdasarkan karya tulis ilmiah berjudul "Eksplorasi Musik Sistem 12 TET (20 Nada per Oktaf): Inovasi dan Peluang dalam Seni Musik Modern" oleh Sukma Riadi Pakpahan, SST.

🎯 Tujuan

· Memperkenalkan sistem musik baru dengan 20 nada per oktaf (berbeda dari sistem konvensional 12 nada).
· Menyediakan alat eksplorasi musik mikrotonal bagi musisi, komposer, dan peneliti.
· Mengintegrasikan kecerdasan buatan (AI) untuk komposisi dan transkripsi musik.
· Membuka peluang baru dalam seni musik, pendidikan, dan pelestarian budaya.

---

✨ Fitur Utama

1. 🎹 Keyboard Interaktif

· 20 nada per oktaf dengan sistem notasi unik: E, E#, F, F#, G, G#, H, H#, I, J, J#, K, K#, A, A#, B, B#, C, C#, D
· 3, 4, atau 5 oktaf (C2 - D6)
· 8 pilihan instrumen: Sine, Square, Sawtooth, Triangle, Organ, Piano, Flute, Trumpet
· Mode Nada Tunggal (rekam melodi otomatis) dan Akord (sustain dengan piano)
· Efek suara: Reverb, Delay, Amplifier

2. 🎵 AI Composer

· Mode Deskripsi: Tulis deskripsi melodi (misal: "melodi romantis yang perlahan"), sistem akan menghasilkan melodi otomatis.
· Mode Prompt AI: Gunakan OpenAI API (GPT-3.5) untuk menghasilkan melodi dari prompt spesifik.
· Pilih mood (Happy, Sad, Romantic, Mysterious, Energetic, Calm) dan skala (Mayor/Minor).
· Atur tempo (BPM) dan putar hasil melodi.

3. 🎤 AI Transcriber

· Rekam suara atau instrumen langsung dari mikrofon (maks. 22 menit).
· Deteksi pitch real-time dengan algoritma Autokorelasi atau YIN.
· Transkripsi otomatis ke notasi 20 nada per oktaf.
· Visualisasi waveform dan progress bar.
· Putar ulang hasil transkripsi.
· Kirim hasil langsung ke Chord Progression untuk analisis lanjutan.

4. 🎶 Chord Progression Generator

· Analisis progresi akord dari hasil transkripsi.
· Deteksi nada dasar dan skala (Mayor/Minor) secara otomatis.
· Tampilkan akord-akord dalam notasi Romawi (I, ii, iii, IV, V, vi, vii°).
· Mendukung mode analisis: Otomatis, Mayor, atau Minor.

5. 📖 Informasi & Referensi

· Teori dasar sistem 12-TET 20 nada per oktaf.
· Tabel frekuensi (5 desimal) untuk setiap nada.
· Skala Mayor (E=1) dan Minor (A=1) dengan interval.
· Referensi akord dan pembentukan triad.

6. 📖 Tutorial Interaktif

· Panduan langkah demi langkah untuk semua fitur.
· Dapat dibuka kapan saja dengan tombol "Tutorial".

---

🎵 Sistem 12-TET 20 Nada per Oktaf

Rumus Frekuensi

```
f_n = 440 × 3^(n/20)
```

· f_n = frekuensi nada ke-n
· n = jumlah langkah dari A4 (n=0 untuk A4 = 440 Hz)
· Oktaf berikutnya = frekuensi × 3

Notasi Nada

Index Nada Index Nada
0 E 10 J#
1 E# 11 K
2 F 12 K#
3 F# 13 A
4 G 14 A#
5 G# 15 B
6 H 16 B#
7 H# 17 C
8 I 18 C#
9 J 19 D

Skala Mayor (E=1)

```
E - F - G - H - I - J - K - A - B - C - D - E
Interval: 1 - 1 - 1 - 1 - ½ - 1 - 1 - 1 - 1 - 1 - ½
```

Skala Minor (A=1)

```
A - B - C - D - E - F - G - H - I - J - K - A
Interval: 1 - 1 - 1 - ½ - 1 - 1 - 1 - 1 - ½ - 1 - 1
```

---

🚀 Cara Menggunakan

Online (GitHub Pages)

Akses aplikasi di: https://srpakpahansst.github.io/Musik-Baru-12-TET/

Lokal

1. Clone repository:
   ```bash
   git clone https://github.com/SRPakpahanSST/pmd-musik-12tet.git
   cd pmd-musik-12tet
   ```
2. Buka file index.html di browser favorit Anda (Chrome/Edge/Firefox).
3. Izinkan akses mikrofon jika menggunakan fitur AI Transcriber.

---

📋 Teknologi yang Digunakan

· HTML5 + CSS3 — Struktur dan styling aplikasi.
· JavaScript (ES6+) — Logika aplikasi, audio engine, dan deteksi pitch.
· Web Audio API — Sintesis suara dan efek audio.
· MediaDevices API — Akses mikrofon untuk rekaman.
· OpenAI API — Integrasi AI untuk komposisi musik (opsional).

---

🏆 Partisipasi dalam Lomba

Aplikasi ini dipersembahkan untuk mengikuti APINDO Innovation Challenge 2026 dengan tema:

"Teman Cerdas, Solusi Tuntas"

Link Pendaftaran: bit.ly/RegAIChallenge2026
Tenggat Pengumpulan: 17 Mei 2026

---

👨‍💻 Kontributor

· Sukma Riadi Pakpahan, SST — Konsep, penelitian, dan pengembangan aplikasi.

---

📄 Lisensi

Aplikasi ini dilisensikan di bawah MIT License — silakan digunakan, dimodifikasi, dan didistribusikan.

---

📞 Kontak

· Email: (opsional, tambahkan jika ada)
· GitHub: SRPakpahanSST
· LinkedIn: (opsional)

---

🙏 Ucapan Terima Kasih

· Badan Riset dan Inovasi Nasional (BRIN) — Dukungan riset dan inovasi.
· APINDO — Penyelenggara lomba Innovation Challenge 2026.
· Komunitas Musik Mikrotonal — Inspirasi dan dukungan.

---

🎵 Selamat Berkarya dengan PMD Musik 12 TET!