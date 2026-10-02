// api/students/[id].js - Vercel Serverless Function for GET /api/students/:id
const students = require('../../students-data.js');

const defaultMessages = {
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

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const studentId = parseInt(req.query.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({ error: 'Siswa tidak ditemukan' });
    }

    const currentIndex = students.findIndex(s => s.id === studentId);
    const prevStudent = currentIndex > 0 ? { id: students[currentIndex - 1].id, name: students[currentIndex - 1].name, nickname: students[currentIndex - 1].nickname } : null;
    const nextStudent = currentIndex < students.length - 1 ? { id: students[currentIndex + 1].id, name: students[currentIndex + 1].name, nickname: students[currentIndex + 1].nickname } : null;
    const cheers = defaultMessages[studentId] || [];

    const mergedStudent = {
        ...student,
        cheers
    };

    return res.status(200).json({
        ...mergedStudent,
        student: mergedStudent,
        prevStudent,
        nextStudent,
        totalStudents: students.length
    });
};
