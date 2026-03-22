const memberNames = ["Aditya", "Sarah", "Rina", "Kevin", "Budi", "Sinta", "Dewi", "Fajar", "Gita", "Hendra", "Ika", "Joko", "Kiki", "Lulu", "Maya", "Nico", "Oka", "Putu", "Qori", "Rizal", "Siska", "Tio", "Umar", "Vina", "Wawan", "Xena", "Yayan", "Zaki", "Ani", "Beni", "Cica", "Dodo", "Euis", "Fifi", "Gogon", "Hani", "Iwan"];
const sched = {"Senin": ["Upacara", "Matematika", "B. Indonesia"], "Selasa": ["Kimia", "Biologi", "B. Inggris"], "Rabu": ["Olahraga", "Agama", "PKN"], "Kamis": ["Fisika", "Sejarah", "TIK"], "Jumat": ["Senam", "Agama", "BK"]};
const piket = {"Senin": ["Aditya", "Sarah"], "Selasa": ["Rina", "Kevin"], "Rabu": ["Budi", "Sinta"], "Kamis": ["Dewi", "Fajar"], "Jumat": ["Gita", "Hendra"]};

function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.remove('hidden');
    document.getElementById('btn-' + pageId).classList.add('active');
    if(window.innerWidth < 1024 && document.getElementById('sidebar').classList.contains('open')) {
        toggleSidebar();
    }
    window.scrollTo(0,0);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('live-clock');
    const dateEl = document.getElementById('live-date');
    if(clockEl) clockEl.innerText = now.toLocaleTimeString('id-ID', { hour12: false });
    if(dateEl) dateEl.innerText = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function sendMsg() {
    const to = document.getElementById('msg-to').value;
    const content = document.getElementById('msg-content').value;
    if(!to || !content) return;
    
    document.getElementById('msg-sent').classList.remove('hidden');
    document.getElementById('msg-to').value = '';
    document.getElementById('msg-content').value = '';
    setTimeout(() => document.getElementById('msg-sent').classList.add('hidden'), 3000);
}

function initData() {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const today = days[new Date().getDay()];
    
    const pToday = piket[today] || ["Libur"];
    const pDash = document.getElementById('dash-piket');
    pDash.innerHTML = '';
    pToday.forEach(n => { 
        pDash.innerHTML += `<span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[9px] font-bold text-emerald-400">${n}</span>`; 
    });

    const sToday = sched[today] || ["Libur"];
    const hr = new Date().getHours();
    const subjectEl = document.getElementById('dash-subject');
    if(subjectEl) {
        subjectEl.innerText = (hr < 7) ? "Persiapan" : (hr < 12 ? sToday[0] : "Selesai");
    }

    const mGrid = document.getElementById('members-grid');
    mGrid.innerHTML = '';
    memberNames.forEach((n, i) => {
        mGrid.innerHTML += `<div class="glass-card p-4 text-center group"><div class="aspect-square rounded-2xl bg-zinc-900 mb-3 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${n}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="${n}"></div><p class="text-[8px] font-bold text-slate-500 mb-1 uppercase">ABSEN ${i+1}</p><h6 class="text-[10px] font-bold uppercase truncate">${n}</h6></div>`;
    });

    const sFull = document.getElementById('full-sched');
    const pFull = document.getElementById('full-piket');
    sFull.innerHTML = ''; pFull.innerHTML = '';
    Object.keys(sched).forEach(day => {
        sFull.innerHTML += `<div class="flex justify-between p-4 rounded-2xl bg-white/5"><span class="text-xs font-black uppercase text-indigo-400">${day}</span><span class="text-xs font-bold text-slate-300">${sched[day].join(' • ')}</span></div>`;
        pFull.innerHTML += `<div class="p-4 rounded-2xl border border-white/5"><p class="text-[10px] font-black uppercase text-emerald-400 mb-1">${day}</p><p class="text-xs font-bold text-slate-400">${piket[day].join(', ')}</p></div>`;
    });

    const gCont = document.getElementById('gallery-container');
    const imgIds = ["1523050853064", "1509062522246", "15443675670f2", "1511632765486", "1529333166437", "1497633334911", "1501290504033", "1491843330752"];
    gCont.innerHTML = '';
    imgIds.forEach(id => {
        gCont.innerHTML += `<div class="masonry-item"><div class="glass-card overflow-hidden p-2"><img src="https://images.unsplash.com/photo-${id}?w=500&auto=format&fit=crop" class="w-full rounded-2xl hover:scale-105 transition duration-500" alt="Galeri"></div></div>`;
    });

    const inbox = document.getElementById('inbox-list');
    const fakeMsgs = [
        { to: "Siapa saja", msg: "Semangat buat yang besok mau tanding basket!" },
        { to: "Kevin", msg: "Tadi kamu keren banget pas presentasi di depan kelas." },
        { to: "Kelas 12.A2", msg: "Kapan-kapan kita jalan bareng sekelas ya sebelum lulus." }
    ];
    inbox.innerHTML = '';
    fakeMsgs.forEach(m => {
        inbox.innerHTML += `<div class="p-4 rounded-2xl bg-indigo-600/5 border border-indigo-500/10"><div class="flex justify-between mb-2"><span class="text-[9px] font-black text-indigo-400 uppercase">Untuk: ${m.to}</span><span class="text-[8px] text-slate-600">Baru saja</span></div><p class="text-xs text-slate-300 leading-relaxed">${m.msg}</p></div>`;
    });
}

function updateCd() {
    const target = new Date("July 1, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = target - now;
    if(diff < 0) return;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('cd-days-dash').innerText = d;
    document.getElementById('cd-hours-dash').innerText = h;
    document.getElementById('cd-mins-dash').innerText = m;
}

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let pts = [];
function initP() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    pts = []; 
    for(let i=0; i<40; i++) pts.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, vy: Math.random()*0.3+0.1}); 
}
function drawP() { 
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    ctx.fillStyle = "rgba(99, 102, 241, 0.1)"; 
    pts.forEach(p => { 
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2); 
        ctx.fill(); 
        p.y -= p.vy; 
        if(p.y < -5) p.y = canvas.height + 5; 
    }); 
    requestAnimationFrame(drawP); 
}

window.onload = function() {
    initP();
    drawP();
    initData();
    setInterval(updateClock, 1000);
    updateClock();
    setInterval(updateCd, 1000);
    updateCd();
};
window.onresize = initP;
