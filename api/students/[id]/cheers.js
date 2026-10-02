// api/students/[id]/cheers.js - Vercel Serverless Function for GET & POST /api/students/:id/cheers
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

const cheersStore = { ...defaultMessages };

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const studentId = parseInt(req.query.id);

    if (req.method === 'GET') {
        const messages = cheersStore[studentId] || [];
        return res.status(200).json(messages);
    }

    if (req.method === 'POST') {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const { sender, senderName, role, senderRole, message, text, reactionEmoji, emoji } = body;
        const validSender = sender || senderName;
        const validMsg = message || text;
        const validRole = role || senderRole || 'Teman Sekelas';
        const validEmoji = reactionEmoji || emoji || '🔥';

        if (!validSender || !validMsg) {
            return res.status(400).json({ error: 'Nama pengirim dan pesan wajib diisi' });
        }

        if (!cheersStore[studentId]) {
            cheersStore[studentId] = [];
        }

        const newCheer = {
            id: 'msg_' + Date.now(),
            sender: validSender.trim(),
            senderName: validSender.trim(),
            role: validRole.trim(),
            senderRole: validRole.trim(),
            message: validMsg.trim(),
            text: validMsg.trim(),
            reactionEmoji: validEmoji,
            emoji: validEmoji,
            timestamp: 'Baru saja'
        };

        cheersStore[studentId].unshift(newCheer);
        return res.status(201).json({ success: true, cheer: newCheer, message: newCheer });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
