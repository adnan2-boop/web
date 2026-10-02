// server.js - Backend Server for Kelas 12F IPAS SMAN 1 Jogorogo
const express = require('express');
const path = require('path');
const students = require('./students-data.js');

const app = express();
const PORT = process.env.PORT || 3000;

// In-Memory Storage untuk pesan/ucapan antar siswa (Wall of Cheers)
const studentMessages = {
    31: [
        { id: 'm1', sender: 'Ananda Yunia Putri', role: 'Wakil Ketua Kelas', text: 'Semangat Pak Ketu! Terima kasih sudah memimpin 12F dengan dedikasi luar biasa. UGM Ilmu Pemerintahan menantimu! 👑🔥', emoji: '👑', timestamp: 'Hari ini, 09:15' },
        { id: 'm2', sender: 'Adnan Maulana', role: 'Sie IT', text: 'Terima kasih selalu kompak dan solid memimpin kelas kita capt! Sukses bareng di 2026! 🚀', emoji: '🔥', timestamp: 'Kemarin, 16:30' },
        { id: 'm3', sender: 'Nadia Rizki Aprilia', role: 'Bendahara I', text: 'Lancar terus ya Wakhid, urusan kas bulanan aman terkendali! 💸✨', emoji: '✨', timestamp: '2 hari lalu' }
    ],
    3: [
        { id: 'm4', sender: 'Wakhid Izam Bikhori', role: 'Ketua Kelas', text: 'Wakil ketua terbaik dan paling teliti! Makasih selalu siap backup kepengurusan 12F. UGM Bioteknologi & Farmasi pasti tembus!', emoji: '❤️', timestamp: 'Hari ini, 10:00' },
        { id: 'm5', sender: 'Iva Maghfirotul Milah', role: 'Sekretaris I', text: 'Catatan sainsmu penyelamat belajar sekelas Yun! Sukses selalu sahabat! 🧬👏', emoji: '👏', timestamp: 'Kemarin, 14:20' }
    ],
    1: [
        { id: 'm6', sender: 'Wakhid Izam Bikhori', role: 'Ketua Kelas', text: 'Website kelas kita keren banget Nan! ITS Teknik Informatika sudah menunggumu bro! 💻🔥', emoji: '🚀', timestamp: 'Hari ini, 08:30' },
        { id: 'm7', sender: 'Ananda Yunia Putri', role: 'Wakil Ketua Kelas', text: 'Makasih udah bikinin website 12F super estetik! Semangat terus yaa!', emoji: '✨', timestamp: 'Kemarin, 11:45' }
    ]
};

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Set up routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});

app.get('/students', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'students.html'));
});

// Route untuk halaman detail siswa
app.get('/student/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student-detail.html'));
});

// API endpoint untuk mendapatkan data semua siswa
app.get('/api/students', (req, res) => {
    res.json(students);
});

// API endpoint untuk mendapatkan data siswa berdasarkan ID
app.get('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    
    if (student) {
        const currentIndex = students.findIndex(s => s.id === studentId);
        const prevStudent = currentIndex > 0 ? { id: students[currentIndex - 1].id, name: students[currentIndex - 1].name, nickname: students[currentIndex - 1].nickname } : null;
        const nextStudent = currentIndex < students.length - 1 ? { id: students[currentIndex + 1].id, name: students[currentIndex + 1].name, nickname: students[currentIndex + 1].nickname } : null;
        const cheers = studentMessages[studentId] || [];

        const mergedStudent = {
            ...student,
            cheers
        };

        res.json({
            ...mergedStudent,
            student: mergedStudent,
            prevStudent,
            nextStudent,
            totalStudents: students.length
        });
    } else {
        res.status(404).json({ error: 'Siswa tidak ditemukan' });
    }
});

// API endpoint untuk mendapatkan pesan/wall of cheers siswa
app.get(['/api/students/:id/messages', '/api/students/:id/cheers'], (req, res) => {
    const studentId = parseInt(req.params.id);
    const messages = studentMessages[studentId] || [];
    res.json(messages);
});

// Handler fungsi untuk add cheers
function handleAddCheer(req, res) {
    const studentId = parseInt(req.params.id);
    const { sender, role, message, text, reactionEmoji, emoji } = req.body;
    const bodyMsg = message || text;
    const bodyEmoji = reactionEmoji || emoji || '🔥';

    if (!sender || !bodyMsg) {
        return res.status(400).json({ error: 'Nama pengirim dan pesan wajib diisi' });
    }

    if (!studentMessages[studentId]) {
        studentMessages[studentId] = [];
    }

    const newMessage = {
        id: 'msg_' + Date.now(),
        sender: sender.trim(),
        role: role ? role.trim() : 'Teman Sekelas',
        message: bodyMsg.trim(),
        text: bodyMsg.trim(),
        reactionEmoji: bodyEmoji,
        emoji: bodyEmoji,
        timestamp: 'Baru saja'
    };

    studentMessages[studentId].unshift(newMessage);
    res.status(201).json({ success: true, cheer: newMessage, message: newMessage });
}

// API endpoint untuk mengirim pesan/ucapan baru ke siswa
app.post('/api/students/:id/messages', handleAddCheer);
app.post('/api/students/:id/cheers', handleAddCheer);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
