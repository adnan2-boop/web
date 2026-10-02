// test-suite.js - Automated Test Suite
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = require('./server.js');
const students = require('./students-data.js');

let server, baseUrl;

function request(method, pathName, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(pathName, baseUrl);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {}
        };
        let bodyStr = null;
        if (body) {
            bodyStr = JSON.stringify(body);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
        }
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', c => { data += c; });
            res.on('end', () => {
                let json = null;
                try { json = JSON.parse(data); } catch (_) {}
                resolve({ status: res.statusCode, body: data, json });
            });
        });
        req.on('error', reject);
        if (bodyStr) req.write(bodyStr);
        req.end();
    });
}

async function run() {
    console.log('🧪 Starting 12F IPAS Test Suite...\n');
    let passed = 0, failed = 0;
    const assert = (cond, name) => {
        if (cond) { console.log(`  ✅ PASS: ${name}`); passed++; }
        else { console.error(`  ❌ FAIL: ${name}`); failed++; }
    };

    console.log('📋 [1/4] Validating Dataset...');
    assert(Array.isArray(students) && students.length === 33, '33 students in database');
    assert(students.every((s, i) => s.id === i + 1 && s.name && s.nickname && s.role), 'All students structured properly');

    console.log('\n📁 [2/4] Validating Public Files...');
    ['index.html', 'about.html', 'students.html', 'gallery.html', 'student-detail.html', 'styles.css'].forEach(f => {
        const p = path.join(__dirname, 'public', f);
        assert(fs.existsSync(p) && fs.statSync(p).size > 100, `public/${f} exists`);
    });

    console.log('\n🌐 [3/4] Starting Server & Testing Endpoints...');
    await new Promise(r => {
        server = app.listen(0, () => {
            baseUrl = `http://localhost:${server.address().port}`;
            r();
        });
    });

    try {
        const rIndex = await request('GET', '/');
        assert(rIndex.status === 200 && rIndex.body.includes('12F IPAS'), 'GET / -> 200 HTML');

        const rAbout = await request('GET', '/about');
        assert(rAbout.status === 200 && rAbout.body.includes('Tentang Keluarga Besar'), 'GET /about -> 200 HTML');

        const rStudents = await request('GET', '/students');
        assert(rStudents.status === 200 && rStudents.body.includes('Direktori Angkatan 2026'), 'GET /students -> 200 HTML');

        const rGallery = await request('GET', '/gallery');
        assert(rGallery.status === 200 && rGallery.body.includes('Galeri Momen Berharga'), 'GET /gallery -> 200 HTML');

        const rDetail1 = await request('GET', '/student/1');
        assert(rDetail1.status === 200 && rDetail1.body.includes('Profil Siswa'), 'GET /student/1 -> 200 HTML');

        const rCss = await request('GET', '/styles.css');
        assert(rCss.status === 200 && rCss.body.includes('--bg-main'), 'GET /styles.css -> 200 CSS');

        console.log('\n⚡ [4/4] Testing APIs...');
        const rApiAll = await request('GET', '/api/students');
        assert(rApiAll.status === 200 && rApiAll.json.length === 33, 'GET /api/students returns 33 items');

        const rApi1 = await request('GET', '/api/students/1');
        assert(rApi1.status === 200 && rApi1.json.name === 'Adnan Maulana' && rApi1.json.prevStudent === null && rApi1.json.nextStudent.id === 2, 'GET /api/students/1 correct prev/next');

        const rApi33 = await request('GET', '/api/students/33');
        assert(rApi33.status === 200 && rApi33.json.id === 33 && rApi33.json.nextStudent === null, 'GET /api/students/33 correct prev/next');

        const rApi404 = await request('GET', '/api/students/999');
        assert(rApi404.status === 404, 'GET /api/students/999 returns 404');

        const rGetCheers = await request('GET', '/api/students/1/cheers');
        assert(rGetCheers.status === 200 && Array.isArray(rGetCheers.json), 'GET /api/students/1/cheers -> array');

        const postRes = await request('POST', '/api/students/1/cheers', { sender: 'Bot', role: 'Tester', message: 'Keren!', reactionEmoji: '🔥' });
        assert(postRes.status === 201 && postRes.json.success === true, 'POST /api/students/1/cheers creates cheer');

        const postInvalid = await request('POST', '/api/students/1/cheers', { sender: '' });
        assert(postInvalid.status === 400, 'POST /api/students/1/cheers with missing text -> 400');
    } finally {
        server.close();
    }

    console.log(`\n========================================\nTest Results: ${passed} passed, ${failed} failed\n========================================\n`);
    if (failed > 0) process.exit(1);
}

run().catch(e => { console.error(e); process.exit(1); });
