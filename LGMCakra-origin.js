/* =========================================================
   LGMCakra — Editor 7 Halaman (Final, BG Terkunci PNG)
   (Revisi: Skills Builder hanya di Page 1, copywriting UI)
   ========================================================= */
"use strict";

/* ---------- Elemen utama ---------- */
const stage   = document.getElementById('stage');
const bgImg   = document.getElementById('bgImg');
const inputs  = document.getElementById('inputsArea');
const labelPg = document.getElementById('labelPg');
const totalPg = document.getElementById('totalPg');
const pager   = document.getElementById('pager');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

/* Kontrol FLOW (muncul hanya saat flow tidak dikunci) */
const flowCtr = {
  wrap:  document.getElementById('flowControls'),
  cols:  document.getElementById('fc_cols'),
  gap:   document.getElementById('fc_gap'),
  left:  document.getElementById('fc_left'),
  top:   document.getElementById('fc_top'),
  width: document.getElementById('fc_width'),
  padx:  document.getElementById('fc_padx'),
  pady:  document.getElementById('fc_pady'),
};

/* ---------- Util ---------- */
let cur = 0;
const k  = () => stage.clientWidth / 1080;   // skala (artboard 1080×1350)
function autoSizeTA(el){ el.style.height='auto'; el.style.height = el.scrollHeight + 'px'; }

/* ---------- Palet warna (override via style per halaman) ---------- */
const COLOR = {
  titleDefault:  '#2e6368', // deep teal (backup)
  titleText:     '#daa520', // goldenrod (backup)
  bodyDefault:   '#f6e6c5', // beige (backup)
  titleMulberry: '#61313e', // untuk Life Grand Map
  titleTextGold: '#f7c64b', // teks emas
  bodySelf:      '#e8c0b3', // body khusus halaman Self
};

/* ---------- Path BG ---------- */
const FRAME_BASE = './';              // ganti jika PNG di folder lain
const withBase = (name) => FRAME_BASE + name;

/* Error load BG */
bgImg.addEventListener('error', () => {
  console.error('[BG ERROR] Gagal memuat:', bgImg?.src);
  alert('Background tidak ditemukan:\n' + bgImg?.src + '\n\nCek nama file & path-nya.');
});

/* ---------- Frames (PNG) ---------- */
const FRAME = {
  1: withBase('frame-02.png'), // Self Potential
  2: withBase('frame-03.png'), // Study Plan (1–4)
  3: withBase('frame-04.png'), // Study Plan (5–8)
  4: withBase('frame-05.png'), // Life Grand Map (2025–2035)
  5: withBase('frame-06.png'), // Life Grand Map (2035–Beyond)
  6: withBase('frame-07.png'), // Grand Goals & Plans
  7: withBase('frame-08.png'), // Cover/Akhir
};

/* ---------- PAGES: Setting lokasi per halaman ----------
   - Halaman 1: FLOW (manual) — 1 kolom
   - Halaman 2: FLOW (manual) — 2 kolom
   - Halaman 3: FLOW (manual) — 2 kolom
   - Halaman 4–6: ABS (x,y,w)
   - Halaman 7: Cover (tanpa box)
---------------------------------------------------------*/
const PAGES = [
  /* 1) SELF POTENTIAL — flow 1 kolom (manual, locked) */
  { name:"Self Potential & Development Identification", type:'flow', bg: FRAME[1],
    flow:{
      cols:1, gapPct:1, leftPct:5.5, topPct:23, widthPct:89.5, padXPct:0, padYPct:0,
      lock:true, anchor:{ mode:'manual' }
    },
    boxes:[
      { id:"p1a", label:"Skill 1", fs:20, lh:1.35, val:"", style:{ bodyBg: COLOR.bodySelf } },
      { id:"p1b", label:"Skill 2", fs:20, lh:1.35, val:"", style:{ bodyBg: COLOR.bodySelf } },
      { id:"p1c", label:"Skill 3", fs:20, lh:1.35, val:"", style:{ bodyBg: COLOR.bodySelf } },
      { id:"p1d", label:"Skill 4", fs:20, lh:1.35, val:"", style:{ bodyBg: COLOR.bodySelf } },
    ]
  },

  /* 2) STUDY PLAN (1–4) — flow 2 kolom (manual, locked) */
  { name:"Study Plan & Academic Achievement (1–4)", type:'flow', bg: FRAME[2],
    flow:{
      cols:2, gapPct:2, leftPct:4, topPct:21, widthPct:93, padXPct:2, padYPct:2,
      lock:true, anchor:{ mode:'manual' }
    },
    boxes:[
      { id:"p2a", label:"1st Term", fs:20, lh:1.35, val:"" },
      { id:"p2b", label:"2nd Term", fs:20, lh:1.35, val:"" },
      { id:"p2c", label:"3rd Term", fs:20, lh:1.35, val:"" },
      { id:"p2d", label:"4th Term", fs:20, lh:1.35, val:"" },
    ]
  },

  /* 3) STUDY PLAN (5–8) — flow 2 kolom (manual, locked) */
  { name:"Study Plan & Academic Achievement (5–8)", type:'flow', bg: FRAME[3],
    flow:{
      cols:2, gapPct:2, leftPct:4, topPct:21, widthPct:93, padXPct:2, padYPct:2,
      lock:true, anchor:{ mode:'manual' }
    },
    boxes:[
      { id:"p3a", label:"5th Term", fs:20, lh:1.35, val:"" },
      { id:"p3b", label:"6th Term", fs:20, lh:1.35, val:"" },
      { id:"p3c", label:"7th Term", fs:20, lh:1.35, val:"" },
      { id:"p3d", label:"8th Term", fs:20, lh:1.35, val:"" },
    ]
  },

  /* 4) LIFE GRAND MAP (2025–2035) — flow 2 kolom */
  { name:"Life Grand Map (2025–2035)", type:'flow', bg: FRAME[4],
    flow:{
      cols:2, gapPct:2, leftPct:4, topPct:37, widthPct:93, padXPct:2, padYPct:2,
      lock:true, anchor:{ mode:'manual' }
    },
    boxes:[
      { id:"p4a", label:"2025 – 2030", fs:22, lh:1.35, val:"",
        style:{ titleBg: COLOR.titleMulberry, titleColor: COLOR.titleTextGold } },
      { id:"p4b", label:"2030 – 2035", fs:22, lh:1.35, val:"",
        style:{ titleBg: COLOR.titleMulberry, titleColor: COLOR.titleTextGold } },
    ]
  },

  /* 5) LIFE GRAND MAP (2035–Beyond) — flow 2 kolom */
  { name:"Life Grand Map (2035–Beyond)", type:'flow', bg: FRAME[5],
    flow:{
      cols:2, gapPct:2, leftPct:4, topPct:37, widthPct:93, padXPct:2, padYPct:2,
      lock:true, anchor:{ mode:'manual' }
    },
    boxes:[
      { id:"p5a", label:"2035 – 2040", fs:22, lh:1.35, val:"",
        style:{ titleBg: COLOR.titleMulberry, titleColor: COLOR.titleTextGold } },
      { id:"p5b", label:"2040 – Beyond", fs:22, lh:1.35, val:"",
        style:{ titleBg: COLOR.titleMulberry, titleColor: COLOR.titleTextGold } },
    ]
  },

  /* 6) GRAND GOALS & PLANS — flow 1 kolom */
  { name:"Grand Goals & Plans", type:'flow', bg: FRAME[6],
    flow:{
      cols:1, gapPct:3, leftPct:4, topPct:21, widthPct:93, padXPct:2, padYPct:2,
      lock:true, anchor:{ mode:'manual' }
    },
    boxes:[
      { id:"p6a", label:"Contribution Plans", fs:24, lh:1.36, val:"" },
      { id:"p6b", label:"Personal Grand Plans", fs:24, lh:1.36, val:"" },
    ]
  },

  /* 7) COVER — tanpa input */
  { name:"CAKRA NAWASENA — Cover", type:'abs', bg: FRAME[7], boxes:[] },
];

/* ---------- Instruksi per halaman (copywriting) ---------- */
const PAGE_INSTR = [
  "Langkah 1 dari 7: Identifikasi & Deskripsi Potensi Diri. Pilih hingga 8 keahlian pada daftar. Isi deskripsi tiap keahlian. Sistem otomatis membuat halaman lanjutan jika Anda memilih lebih dari 4 keahlian.",
  "Langkah 1 dari 7 (Lanjutan): Silakan lanjutkan untuk mengisi deskripsi keahlian berikutnya.",
  "Langkah 2 dari 7: Rencana Studi & Akademik (S2). Uraikan rencana studi dan target akademik untuk empat semester pertama.",
  "Langkah 3 dari 7: Rencana Studi & Akademik (S3). Lanjutkan pemaparan untuk empat semester terakhir.",
  "Langkah 4 dari 7: Peta Jalan Hidup (Jangka Menengah). Tuliskan visi & rencana konkret 5–10 tahun ke depan.",
  "Langkah 5 dari 7: Peta Jalan Hidup (Jangka Panjang). Proyeksikan impian dan rencana besar 10 tahun ke atas.",
  "Langkah 6 dari 7: Rencana Kontribusi & Tujuan Utama. Rangkum rencana kontribusi serta tujuan besar pribadi.",
  "Langkah 7 dari 7: Halaman Sampul (Cover). Tidak ada isian; periksa kembali halaman sebelumnya atau unduh hasilnya."
];

/* ---------- Pager ---------- */
function buildPager(){
  pager.innerHTML = '';
  PAGES.forEach((p,ix)=>{
    const li = document.createElement('li'); li.className='nav-item';
    const a  = document.createElement('button');
    a.type='button'; a.className='nav-link'; a.title=p.name; a.textContent=ix+1;
    a.addEventListener('click', ()=>renderPage(ix));
    li.appendChild(a); pager.appendChild(li);
  });
  if (totalPg) totalPg.textContent = PAGES.length;
}

/* ---------- Show/Hide Skills Builder hanya di Halaman 1 ---------- */
function toggleSkillsBuilder(pageIndex){
  const sb = document.getElementById('skillsBuilder');
  if (!sb) return;
  sb.classList.toggle('d-none', pageIndex !== 0); // tampil hanya index 0
}

/* ---------- Render ---------- */
function renderPage(i){
  cur = i;
  if (labelPg) labelPg.textContent = i+1;

  // Set instruksi per halaman
  const inst = document.getElementById('pageInstruction');
  if (inst) inst.textContent = PAGE_INSTR[i] || "";

  // BG dari definisi PAGES + fallback
  const src = PAGES[i].bg || '';
  bgImg.src = src || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="%23999">BG missing</text></svg>';

  // bersihkan overlay & form
  stage.querySelectorAll('.overlay-abs, .flow-wrap').forEach(n=>n.remove());
  inputs.innerHTML='';

  if (PAGES[i].type==='abs'){
    /* ---------- ABS ---------- */
    flowCtr.wrap.classList.add('d-none');

    const s = k();
    PAGES[i].boxes.forEach(b=>{
      const el = document.createElement('div');
      el.className='overlay-abs box';
      el.style.left  = (b.x*s)+'px';
      el.style.top   = (b.y*s)+'px';
      el.style.width = (b.w*s)+'px';
      el.style.fontSize = (b.fs*s)+'px';
      el.style.lineHeight = b.lh;

      const st = b.style||{};
      if (st.shadow)     el.style.setProperty('--shadow', st.shadow);
      if (st.titleBg)    el.style.setProperty('--title-bg', st.titleBg);
      if (st.titleColor) el.style.setProperty('--title-color', st.titleColor);
      if (st.bodyBg)     el.style.setProperty('--body-bg', st.bodyBg);
      if (st.bodyBorder) el.style.setProperty('--body-border', st.bodyBorder);
      if (st.bodyPadX!==undefined)   el.style.setProperty('--body-pad-x', (st.bodyPadX*s)+'px');
      if (st.bodyPadY!==undefined)   el.style.setProperty('--body-pad-y', (st.bodyPadY*s)+'px');
      if (st.height)                 el.style.height = (st.height*s)+'px';

      const title = document.createElement('div');
      title.className='box-title';
      title.textContent = b.label;

      const out = document.createElement('div');
      out.className='box-body';
      out.id = `out_${b.id}`;
      out.textContent = b.val || '';

      el.append(title, out);
      stage.appendChild(el);

      // input kiri
      const grp=document.createElement('div');
      grp.className='mb-3';
      grp.innerHTML = `
        <label class="form-label">${b.label}</label>
        <textarea id="in_${b.id}" class="form-control" rows="4" placeholder="Tulis konten..."></textarea>
        <div class="mini">x:${b.x}, y:${b.y}, w:${b.w}, fs:${b.fs}</div>`;
      inputs.appendChild(grp);

      const ta = grp.querySelector('textarea');
      ta.value = b.val || '';
      autoSizeTA(ta);
      ta.addEventListener('input', e=>{
        b.val = e.target.value;
        const outEl = document.getElementById('out_'+b.id);
        if(outEl) outEl.textContent = b.val;
        autoSizeTA(e.target);
      });
    });

  } else {
    /* ---------- FLOW ---------- */
    const f = PAGES[i].flow;

    // tampilkan flow controls kalau tidak lock
    if (f.lock) flowCtr.wrap.classList.add('d-none');
    else        flowCtr.wrap.classList.remove('d-none');

    // sinkron nilai kontrol (meski hidden)
    flowCtr.cols.value=f.cols; flowCtr.gap.value=f.gapPct; flowCtr.left.value=f.leftPct;
    flowCtr.top.value=f.topPct; flowCtr.width.value=f.widthPct; flowCtr.padx.value=f.padXPct; flowCtr.pady.value=f.padYPct;

    // anchor first-box-xy akan menonaktifkan left/top (di sini kita manual semua, jadi tidak aktif)
    flowCtr.left.disabled = !!(f.anchor && f.anchor.mode==='first-box-xy');
    flowCtr.top.disabled  = !!(f.anchor && f.anchor.mode==='first-box-xy');

    const s = k();
    const toPxW=p=> (p*10.8*s)+'px';
    const toPxH=p=> (p*13.5*s)+'px';

    // hitung posisi area flow
    let leftPx  = toPxW(f.leftPct);
    let topPx   = toPxH(f.topPct);

    if (f.anchor && f.anchor.mode==='first-box-xy' && PAGES[i].boxes?.[f.anchor.boxIndex||0]){
      const b0 = PAGES[i].boxes[f.anchor.boxIndex||0];
      if (typeof b0.x==='number' && typeof b0.y==='number') {
        leftPx = (b0.x * s) + 'px';
        topPx  = (b0.y * s) + 'px';
      }
    }

    const wrap=document.createElement('div');
    wrap.className='flow-wrap';
    wrap.style.setProperty('--cols',   f.cols);
    wrap.style.setProperty('--gap-px', toPxW(f.gapPct));
    wrap.style.setProperty('--padX-px',toPxW(f.padXPct));
    wrap.style.setProperty('--padY-px',toPxH(f.padYPct));
    wrap.style.setProperty('--left-px',leftPx);
    wrap.style.setProperty('--top-px', topPx);
    wrap.style.setProperty('--w-px',   toPxW(f.widthPct));

    PAGES[i].boxes.forEach(b=>{
      const card=document.createElement('div');
      card.className='box';
      card.style.fontSize=(b.fs*s)+'px';
      card.style.lineHeight=b.lh;

      const st = b.style||{};
      if (st.shadow)     card.style.setProperty('--shadow', st.shadow);
      if (st.titleBg)    card.style.setProperty('--title-bg', st.titleBg);
      if (st.titleColor) card.style.setProperty('--title-color', st.titleColor);
      if (st.bodyBg)     card.style.setProperty('--body-bg', st.bodyBg);
      if (st.bodyBorder) card.style.setProperty('--body-border', st.bodyBorder);
      if (st.bodyPadX!==undefined)   card.style.setProperty('--body-pad-x', (st.bodyPadX*s)+'px');
      if (st.bodyPadY!==undefined)   card.style.setProperty('--body-pad-y', (st.bodyPadY*s)+'px');

      const title = document.createElement('div');
      title.className='box-title';
      title.textContent = b.label;

      const out = document.createElement('div');
      out.className='box-body';
      out.id = `out_${b.id}`;
      out.textContent = b.val || '';

      card.append(title, out);
      wrap.appendChild(card);

      // input kiri
      const grp=document.createElement('div');
      grp.className='mb-3';
      grp.innerHTML=`<label class="form-label">${b.label}</label>
        <textarea id="in_${b.id}" class="form-control" rows="4" placeholder="Tulis konten..."></textarea>`;
      inputs.appendChild(grp);

      const ta=grp.querySelector('textarea');
      ta.value = b.val || '';
      autoSizeTA(ta);
      ta.addEventListener('input', e=>{
        b.val=e.target.value;
        const outEl = document.getElementById('out_'+b.id);
        if(outEl) outEl.textContent = b.val;
        autoSizeTA(e.target);
      });
    });

    stage.appendChild(wrap);
  }

  // highlight pager aktif
  pager.querySelectorAll('button.nav-link').forEach((a,ix)=>{
    a.classList.toggle('active', ix===i);
    a.classList.toggle('text-white', ix===i);
  });

  // tampilkan/ sembunyikan Skills Builder
  toggleSkillsBuilder(i);
}

/* ---------- Kontrol FLOW (debounce) ---------- */
let reT=null;
const rerender = () => { clearTimeout(reT); reT = setTimeout(()=>renderPage(cur), 150); };
['cols','gap','left','top','width','padx','pady'].forEach(key=>{
  const map = {cols:flowCtr.cols,gap:flowCtr.gap,left:flowCtr.left,top:flowCtr.top,width:flowCtr.width,padx:flowCtr.padx,pady:flowCtr.pady};
  const el = map[key];
  el.addEventListener('input', ()=>{
    if (PAGES[cur]?.type!=='flow' || PAGES[cur]?.flow?.lock) return;  // abaikan jika dikunci
    const f=PAGES[cur].flow || {};
    if(key==='cols')  f.cols   = +flowCtr.cols.value;
    if(key==='gap')   f.gapPct = +flowCtr.gap.value;
    if(key==='left')  f.leftPct= +flowCtr.left.value;
    if(key==='top')   f.topPct = +flowCtr.top.value;
    if(key==='width') f.widthPct= +flowCtr.width.value;
    if(key==='padx')  f.padXPct= +flowCtr.padx.value;
    if(key==='pady')  f.padYPct= +flowCtr.pady.value;
    rerender();
  });
});

/* ---------- LocalStorage ---------- */
const KEY='seven_pages_editor_final_lockedbg_v4'; // bump versi

document.getElementById('save').onclick = ()=>{
  const data = PAGES.map(p => {
    const { boxes, flow, name, type } = p;
    return { name, type, boxes, flow }; // BG tidak ikut disimpan
  });
  localStorage.setItem(KEY, JSON.stringify(data));
  alert('Tersimpan di browser.');
};

(function restore(){
  try{
    const raw=localStorage.getItem(KEY);
    if(!raw) return;
    const saved=JSON.parse(raw);
    if(Array.isArray(saved) && saved.length===PAGES.length){
      for(let i=0;i<PAGES.length;i++){
        const curPg = PAGES[i], savPg = saved[i] || {};
        if (savPg.flow && curPg.flow) curPg.flow = {...curPg.flow, ...savPg.flow};
        if (Array.isArray(savPg.boxes) && Array.isArray(curPg.boxes)){
          curPg.boxes = curPg.boxes.map((b, idx)=> ({...b, ...(savPg.boxes[idx]||{})}));
        }
      }
    }
  }catch(e){}
})();

/* ---------- Export (UPDATED) ---------- */
async function renderCanvasSafe() {
  try { await bgImg.decode(); } catch(e) {}
  // Aktifkan mode exporting (hilangkan radius & overflow agar PNG kotak)
  stage.classList.add('exporting');

  // Pastikan layout settle sebelum render
  await new Promise(r => requestAnimationFrame(()=>requestAnimationFrame(r)));

  try{
    // Render ke canvas dengan latar putih agar sudut solid (bukan transparan)
    const cv = await html2canvas(stage,{
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    });
    return cv;
  } finally {
    // Kembalikan preview ke rounded
    stage.classList.remove('exporting');
  }
}

document.getElementById('export').onclick = async ()=>{
  const cv = await renderCanvasSafe();
  cv.toBlob(b=>saveAs(b,`page-${cur+1}.png`));
};

document.getElementById('exportAll').onclick = async ()=>{
  const zip=new JSZip(); const keep=cur;
  for(let i=0;i<PAGES.length;i++){
    renderPage(i);
    const cv=await renderCanvasSafe();
    await new Promise(r=>cv.toBlob(b=>{
      const fr=new FileReader();
      fr.onload=()=>{ zip.file(`page-${i+1}.png`, fr.result.split(',')[1], {base64:true}); r(); };
      fr.readAsDataURL(b);
    }));
  }
  const blob=await zip.generateAsync({type:'blob'});
  saveAs(blob,'All-Pages.zip');
  renderPage(keep);
};

/* ---------- Navigasi & responsive ---------- */
btnPrev.onclick = ()=> renderPage((cur-1+PAGES.length)%PAGES.length);
btnNext.onclick = ()=> renderPage((cur+1)%PAGES.length);
window.addEventListener('keydown', e=>{
  if(e.key==='ArrowLeft')  btnPrev.click();
  if(e.key==='ArrowRight') btnNext.click();
});
window.addEventListener('resize', ()=>renderPage(cur));

/* ---------- Init ---------- */
window.addEventListener('DOMContentLoaded', ()=>{
  buildPager();
  renderPage(0);
});

/* =====================================================================
   Skills Builder — Halaman 1 (Self Potential) — Drop-in Module
   - Membangun UI secara otomatis di panel kiri (HTML sudah menyediakan host)
   - Pilih model → pilih hingga 8 skill → tulis narasi tiap skill
   - 4 pertama → Page 1; sisanya → disisipkan jadi "Self Potential — Continued"
   ===================================================================== */
(function(){
  /* ---------- Library Model → Skill list ---------- */
  const SKILL_LIBRARY = {
    "WEF – Future Skills": [
      "Analytical & Critical Thinking","Creativity & Innovation","Leadership & Social Influence",
      "Technology Literacy & AI","Resilience & Agility","Emotional Intelligence & Empathy",
      "Curiosity & Lifelong Learning","Service Orientation","Talent Management","Motivation & Self-Awareness"
    ],
    "P21 – 21st Century Skills (4Cs)": [
      "Critical Thinking","Creativity","Collaboration","Communication","Information & Media Literacy","Initiative & Self-Direction"
    ],
    "EU – Key Competences": [
      "Literacy & Multilingual","Digital Competence","Personal & Social Learning","Civic Competence",
      "Entrepreneurship Competence","Cultural Awareness & Expression","STEM Competence"
    ],
    "Corporate – Katz": [
      "Strategic Thinking","Results Orientation","Stakeholder Influence","Team Leadership & Coaching",
      "Customer Focus","Change Management","Emotional Intelligence, Technical (Hard) Skills","Human (Interpersonal) Skills","Conceptual (Big-Picture) Skills"
    ],
   
  };

  /* ---------- State ---------- */
  let picked = [];                         // [{ title, text }]
  let skillsModel = Object.keys(SKILL_LIBRARY)[0]; // default model pertama

  /* ---------- Guard: FRAME/withBase tersedia? ---------- */
  try{
    if (typeof FRAME === 'object' && typeof withBase === 'function') {
      if (!FRAME['1_EXTRA']) FRAME['1_EXTRA'] = withBase('frame-02-extra.png');
    }
  }catch(_e){ /* abaikan */ }

  /* ---------- Refs HTML yang sudah ada ---------- */
  let skillsBuilder = document.getElementById('skillsBuilder');
  let modelSelect  = document.getElementById('modelSelect');
  let skillOptions = document.getElementById('skillOptions');
  let skillsForm   = document.getElementById('skillsForm');

  /* ---------- CSS ringan (agar mandiri) ---------- */
  (function injectCSS(){
    if (document.getElementById('sb-inline-style')) return;
    const css = `
      #skillsBuilder .form-label{font-weight:700;margin-bottom:.25rem}
      #skillsBuilder .text-muted{opacity:.85}
      #skillsBuilder #modelSelect.form-select{
        border-radius:10px;border-color:var(--panel-border,#e9ecef);background:#fff;
        padding-top:.4rem;padding-bottom:.4rem
      }
      #skillsBuilder #modelSelect:focus{
        box-shadow:0 0 0 .25rem rgba(25,97,174,.15);border-color:rgba(25,97,174,.35);outline:0
      }
      #skillsBuilder #skillOptions{display:flex;flex-wrap:wrap;gap:.5rem}
      #skillsBuilder #skillOptions .pill{
        display:inline-block;padding:.38rem .66rem;border:1px solid var(--secondary,#E4E6EF);
        border-radius:999px;background:#fff;cursor:pointer;user-select:none;font-size:.86rem;line-height:1;
        transition:background .15s ease,color .15s ease,border-color .15s ease,transform .06s ease
      }
      #skillsBuilder #skillOptions .pill:hover{border-color:rgba(0,0,0,.12);transform:translateY(-1px)}
      #skillsBuilder #skillOptions .pill:active{transform:translateY(0)}
      #skillsBuilder #skillOptions .pill.active{
        background:var(--primary,#1961AE);color:#fff;border-color:var(--primary,#1961AE)
      }
      #skillsBuilder .sb-card{
        border:1px solid var(--panel-border,#e9ecef);border-radius:12px;padding:.9rem;background:#fff;
        box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:.8rem
      }
      #skillsBuilder .sb-wcount{font-size:.85rem;opacity:.9}
      #skillsBuilder .sb-wcount.ok{color:#198754}
      #skillsBuilder .sb-wcount.warn{color:#fd7e14}
      #skillsBuilder .sb-wcount.bad{color:#dc3545}
      #skillsBuilder .sb-ctr .btn{margin-right:.25rem}
      @media (max-width:576px){
        #skillsBuilder #skillOptions{gap:.4rem}
        #skillsBuilder #skillOptions .pill{font-size:.82rem;padding:.34rem .58rem}
      }
    `;
    const style = document.createElement('style');
    style.id = 'sb-inline-style';
    style.textContent = css;
    document.head.appendChild(style);
  })();

  /* =====================================================
     RENDERERS (UI)
     ===================================================== */
  function renderModelSelect(){
    if (!modelSelect) return;
    modelSelect.innerHTML = Object.keys(SKILL_LIBRARY)
      .map(m => `<option value="${m}">${m}</option>`).join('');
    modelSelect.value = skillsModel;
  }

  function renderPills(){
    if (!skillOptions) return;
    const all = SKILL_LIBRARY[skillsModel] || [];
    const sel = new Set(picked.map(p=>p.title));
    skillOptions.innerHTML = all.map(name => {
      const active = sel.has(name) ? 'active' : '';
      return `<button type="button" class="pill ${active}" data-skill="${encodeURIComponent(name)}">${name}</button>`;
    }).join('');
  }

  // Helpers untuk word count & kelas
  function wordCount(text){
    return (text||'').trim().split(/\s+/).filter(Boolean).length;
  }
  function wcClass(n){
    if (!n) return '';
    if (n < 50) return 'bad';
    if (n <= 150) return 'ok';
    if (n <= 200) return 'warn';
    return 'bad';
  }

  // Kolom kanan sesuai template (Heading, Description, counter, ctr)
  const renderForms = ()=> {
    if (!skillsForm) return;
    if (!picked.length){
      skillsForm.innerHTML = `<div class="text-muted small">Belum ada skill dipilih.</div>`;
      return;
    }
    skillsForm.innerHTML = picked.map((p,ix)=>{
      const n = wordCount(p.text||'');
      return `
        <div class="sb-card" data-ix="${ix}">
          <label class="form-label">Heading</label>
          <input class="form-control sb-title" value="${(p.title||'').replace(/"/g,'&quot;')}" />

          <label class="form-label mt-2">Description (50–150 words)</label>
          <textarea class="form-control sb-text" rows="4"
            placeholder="Tulis dengan pola STAR: konteks, aksi, hasil terukur, pembelajaran kunci.">${p.text||''}</textarea>

          <div class="d-flex justify-content-between align-items-center mt-1">
            <small class="text-muted">Skill #${ix+1}</small>
            <div class="sb-wcount ${wcClass(n)}">${n} words</div>
          </div>

          <div class="sb-ctr mt-2">
            <button type="button" class="btn btn-outline-secondary btn-sm sb-up">↑</button>
            <button type="button" class="btn btn-outline-secondary btn-sm sb-down">↓</button>
            <button type="button" class="btn btn-outline-danger btn-sm sb-remove">Remove</button>
          </div>
        </div>
      `;
    }).join('');
  };

  /* =====================================================
     SINKRONISASI → PAGES
     - 4 pertama → PAGES[0] (Self Potential)
     - Sisanya → halaman lanjutan (index 1)
     ===================================================== */
  function syncToPages(){
    try{
      const page1 = (typeof PAGES!=='undefined') ? PAGES[0] : null;
      if(!page1 || page1.type!=='flow') return;

      // Pastikan style judul & body konsisten
      page1.boxes.forEach(b=>{
        b.style = b.style || {};
        if(!b.style.titleColor) b.style.titleColor = "#f6e6c5"; // heading krem
        if(!b.style.bodyBg && typeof COLOR!=='undefined') b.style.bodyBg = COLOR.bodySelf;
      });

      // 4 pertama → page 1
      const first4 = picked.slice(0,4);
      for(let i=0;i<4;i++){
        const b = page1.boxes[i];
        const src = first4[i];
        if(!b) continue;
        if(src){
          b.label = src.title;
          b.val   = src.text||'';
        }else{
          b.label = `Skill ${i+1}`;
          b.val   = '';
        }
      }

      // Sisa → halaman lanjutan
      const rest = picked.slice(4);
      ensureSkillContinuationPage(rest.length>0, {...page1.flow});

      if(rest.length>0){
        const pCont = PAGES[1]; // sudah ada dari ensure*
        pCont.bg = (FRAME && (FRAME['1_EXTRA'] || FRAME[1])) || (page1.bg || null);
        pCont.boxes = rest.slice(0,4).map((s,idx)=>({
          id: 'p1c'+idx,
          label: s.title,
          fs: 20, lh: 1.35,
          val: s.text||'',
          style:{
            bodyBg: (typeof COLOR!=='undefined' ? COLOR.bodySelf : undefined),
            titleColor: "#f6e6c5"
          }
        }));
      }

      // Render ulang halaman aktif (tidak memaksa pindah)
      if (typeof renderPage === 'function' && typeof cur!=='undefined') renderPage(cur);
    }catch(_e){
      // swallow untuk jaga stabilitas UI
    }
  }

  function ensureSkillContinuationPage(needed, flowSample){
    try{
      const exists = typeof PAGES!=='undefined' && PAGES[1] && PAGES[1].__isSkillCont;
      if(needed && !exists){
        PAGES.splice(1,0,{
          __isSkillCont:true,
          name:"Self Potential — Continued",
          type:'flow',
          bg: (FRAME && (FRAME['1_EXTRA'] || FRAME[1])) || null,
          flow:{ ...flowSample, lock:true },
          boxes:[]
        });
        if (typeof buildPager === 'function') buildPager();
      } else if(!needed && exists){
        PAGES.splice(1,1);
        if (typeof buildPager === 'function') buildPager();
        if (typeof cur!=='undefined' && cur===1) cur=0; // bila sedang di page lanjutan, kembali ke page 1
      }
    }catch(_e){ /* abaikan */ }
  }

  /* =====================================================
     EVENTS & INIT
     ===================================================== */
  function boot(){
    if (!skillsBuilder) return; // tidak ada host

    // Inisialisasi UI
    renderModelSelect();
    renderPills();
    renderForms();
    syncToPages();

    // Ganti model
    modelSelect?.addEventListener('change', ()=>{
      skillsModel = modelSelect.value;
      picked = [];
      renderPills(); renderForms(); syncToPages();
    });

    // Toggle pill
    skillOptions?.addEventListener('click', (e)=>{
      const btn = e.target.closest('.pill'); if(!btn) return;
      const name = decodeURIComponent(btn.dataset.skill||'');
      const ix = picked.findIndex(p=>p.title===name);
      if(ix>=0){
        picked.splice(ix,1);
      }else{
        if(picked.length>=8){ alert('Max 8 skills.'); return; }
        picked.push({title:name, text:''});
      }
      renderPills(); renderForms(); syncToPages();
    });

    // Edit form (judul/narasi) + word count + naik/turun/hapus
    skillsForm?.addEventListener('input', (e)=>{
      const card = e.target.closest('.sb-card'); if(!card) return;
      const ix = +card.dataset.ix;
      if(e.target.classList.contains('sb-title')) picked[ix].title = e.target.value;
      if(e.target.classList.contains('sb-text'))  picked[ix].text  = e.target.value;

      if(e.target.classList.contains('sb-text')){
        const n = (e.target.value||'').trim().split(/\s+/).filter(Boolean).length;
        const wc = card.querySelector('.sb-wcount');
        if (wc){
          wc.textContent = `${n} words`;
          wc.className = 'sb-wcount ' + (n===0?'': (n<50?'bad': n<=150?'ok': n<=200?'warn':'bad'));
        }
      }
      syncToPages();
    });

    skillsForm?.addEventListener('click', (e)=>{
      const card = e.target.closest('.sb-card'); if(!card) return;
      const ix = +card.dataset.ix;

      if(e.target.classList.contains('sb-remove')){
        picked.splice(ix,1);
        renderPills(); renderForms(); syncToPages();
        return;
      }
      if(e.target.classList.contains('sb-up') && ix>0){
        [picked[ix-1], picked[ix]] = [picked[ix], picked[ix-1]];
        renderPills(); renderForms(); syncToPages();
        return;
      }
      if(e.target.classList.contains('sb-down') && ix<picked.length-1){
        [picked[ix+1], picked[ix]] = [picked[ix], picked[ix+1]];
        renderPills(); renderForms(); syncToPages();
        return;
      }
    });
  }

  // Mulai
  boot();
})();

