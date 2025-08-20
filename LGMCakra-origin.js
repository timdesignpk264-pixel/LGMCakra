/* =========================================================
   LGMCakra — Editor 7 Halaman (Final, BG Terkunci PNG)
   ========================================================= */
"use strict";

/* ---------- Elemen utama ---------- */
const stage   = document.getElementById('stage');
const bgImg   = document.getElementById('bgImg');
const inputs  = document.getElementById('inputsArea');
// const labelPg = document.getElementById('labelPg'); // opsional (sudah tidak dipakai di HTML revisi)
const totalPg = document.getElementById('totalPg');   // opsional (tidak ada di HTML revisi, aman karena dikondisikan di buildPager)
const pager   = document.getElementById('pager');

/* (opsional, untuk dual preview) */
const stage2     = document.getElementById('stage2') || null;
const bgImg2     = document.getElementById('bgImg2') || null;
const stagesWrap = document.getElementById('stages') || null;
const stage2Wrap = document.getElementById('stage2Wrap') || null;

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
const ART_W = 1080;
const ART_H = 1350;
const k  = () => Math.min(1, stage.clientWidth / ART_W);
// => di desktop/kolom lebar: k = 1 (tidak membesar)
// => di layar sempit: k < 1 (boleh mengecil agar muat)
function autoSizeTA(el){ el.style.height='auto'; el.style.height = el.scrollHeight + 'px'; }

/* ---------- Palet warna ---------- */
const COLOR = {
  titleDefault:  '#2e6368',
  titleText:     '#daa520',
  bodyDefault:   '#f6e6c5',

  titleMulberry: '#61313e',
  titleTextGold: '#f7c64b',
  bodySelf:      '#e8c0b3',
};

/* ---------- Path BG ---------- */
const FRAME_BASE = './';              // ganti jika PNG di folder lain
const withBase = (name) => FRAME_BASE + name;

/* Error load BG */
if (bgImg) {
  bgImg.addEventListener('error', () => {
    console.error('[BG ERROR] Gagal memuat:', bgImg?.src);
    alert('Background tidak ditemukan:\n' + bgImg?.src + '\n\nCek nama file & path-nya.');
  });
}
if (bgImg2) {
  bgImg2.addEventListener('error', () => {
    console.error('[BG2 ERROR] Gagal memuat:', bgImg2?.src);
  });
}

/* =====================================================
   LIBRARY: Model → Skill list
===================================================== */
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
  "Corporate – Classic": [
    "Strategic Thinking","Results Orientation","Stakeholder Influence","Team Leadership & Coaching",
    "Customer Focus","Change Management","Emotional Intelligence"
  ],
  "Katz – Skills Trilogy": [
    "Technical (Hard) Skills","Human (Interpersonal) Skills","Conceptual (Big-Picture) Skills"
  ]
};

/* ===================== STATE (Skills Builder) ===================== */
let picked = []; // [{title, text}]
let skillsModel = Object.keys(SKILL_LIBRARY)[0]; // default

/* ---------- Frames (PNG) ---------- */
const FRAME = {
  1: withBase('frame-02.png'),               // Self Potential
  '1_EXTRA': withBase('frame-02-extra.png'), // Self Potential — Continued (preview B)
  2: withBase('frame-03.png'),               // Study Plan (1–4)
  3: withBase('frame-04.png'),               // Study Plan (5–8)
  4: withBase('frame-05.png'),               // Life Grand Map (2025–2035)
  5: withBase('frame-06.png'),               // Life Grand Map (2035–Beyond)
  6: withBase('frame-07.png'),               // Grand Goals & Plans
  7: withBase('frame-08.png'),               // Cover/Akhir
};

/* ---------- PAGES ---------- */
const PAGES = [
  /* 1) SELF POTENTIAL — flow 1 kolom (manual, locked) */
  { name:"Self Potential & Development Identification", type:'flow', bg: FRAME[1],
    flow:{
      cols:1, gapPct:1, leftPct:5.5, topPct:23, widthPct:89.5, padXPct:0, padYPct:0,
      lock:true, anchor:{ mode:'manual' }
    },
    boxes:[
      { id:"p1a", label:"Skill 1", fs:20, lh:1.35, val:"",
        style:{ bodyBg: COLOR.bodySelf, titleColor: "#f6e6c5" } },
      { id:"p1b", label:"Skill 2", fs:20, lh:1.35, val:"",
        style:{ bodyBg: COLOR.bodySelf, titleColor: "#f6e6c5" } },
      { id:"p1c", label:"Skill 3", fs:20, lh:1.35, val:"",
        style:{ bodyBg: COLOR.bodySelf, titleColor: "#f6e6c5" } },
      { id:"p1d", label:"Skill 4", fs:20, lh:1.35, val:"",
        style:{ bodyBg: COLOR.bodySelf, titleColor: "#f6e6c5" } },
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

/* =========================================================
   Tambahan: Header & Instruksi Form (7 langkah, 8 halaman)
   ========================================================= */
const pageContent = [
  { // Halaman 1
    title: "Langkah 1 dari 7: Identifikasi & Deskripsi Potensi Diri",
    instruction: "Pilih hingga 8 keahlian utama Anda pada daftar di samping. Kemudian, tuliskan deskripsi untuk setiap keahlian pada form yang tersedia. Sistem akan otomatis membuat halaman lanjutan jika Anda memilih lebih dari 4 keahlian."
  },
  { // Halaman 2 (lanjutan langkah 1)
    title: "Langkah 1 dari 7: Identifikasi & Deskripsi Potensi Diri (Lanjutan)",
    instruction: "Silakan lanjutkan untuk mengisi deskripsi keahlian Anda berikutnya."
  },
  { // Halaman 3
    title: "Langkah 2 dari 7: Rencana Studi & Akademik (S2)",
    instruction: "Uraikan rencana studi dan target pencapaian akademik Anda untuk empat semester pertama."
  },
  { // Halaman 4
    title: "Langkah 3 dari 7: Rencana Studi & Akademik (S3)",
    instruction: "Lanjutkan pemaparan rencana studi dan target pencapaian akademik Anda untuk empat semester terakhir."
  },
  { // Halaman 5
    title: "Langkah 4 dari 7: Peta Jalan Hidup (Jangka Menengah)",
    instruction: "Tuliskan visi dan rencana konkret Anda untuk 5–10 tahun ke depan setelah menyelesaikan studi."
  },
  { // Halaman 6
    title: "Langkah 5 dari 7: Peta Jalan Hidup (Jangka Panjang)",
    instruction: "Proyeksikan impian dan rencana besar Anda untuk masa depan yang lebih jauh, 10 tahun ke atas."
  },
  { // Halaman 7
    title: "Langkah 6 dari 7: Rencana Kontribusi & Tujuan Utama",
    instruction: "Rangkum rencana kontribusi Anda bagi masyarakat/bangsa serta tujuan besar pribadi yang ingin dicapai."
  },
  { // Halaman 8
    title: "Langkah 7 dari 7: Halaman Sampul (Cover)",
    instruction: "Ini adalah halaman sampul dari Life Grand Map Anda. Tidak ada isian yang diperlukan. Silakan periksa kembali halaman sebelumnya atau unduh hasilnya."
  }
];

/* ====== Baru: Update header by index fisik PAGES ====== */
function hasSkillContinuation(){
  return !!(PAGES[1] && PAGES[1].__isSkillCont);
}

// i = index fisik PAGES (0-based)
function updateFormHeaderByIndex(i){
  const hasCont = hasSkillContinuation();
  const contentIdx = hasCont ? i : (i === 0 ? 0 : i + 1);
  const idx = Math.min(contentIdx, pageContent.length - 1);

  const headerElement = document.getElementById('pageHeader');
  const instructionElement = document.getElementById('pageInstruction');
  const content = pageContent[idx];

  if (headerElement) headerElement.textContent = content.title;
  if (instructionElement) instructionElement.textContent = content.instruction;
}

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
  if (totalPg) totalPg.textContent = PAGES.length; // opsional
}

/* ---------- Helpers FLOW/ABS untuk render ke stage tertentu (BISA untuk stage2) ---------- */
function renderToStageOnly(i, targetStage, targetBg) {
  // bersihkan overlay di target stage
  targetStage.querySelectorAll('.overlay-abs, .flow-wrap').forEach(n=>n.remove());

  // set BG
  const src = PAGES[i].bg || '';
  if (targetBg) {
    targetBg.src = src || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="%23999">BG missing</text></svg>';
  }

  if (PAGES[i].type==='abs'){
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
      if (st.bodyPadX!==undefined) el.style.setProperty('--body-pad-x', (st.bodyPadX*s)+'px');
      if (st.bodyPadY!==undefined) el.style.setProperty('--body-pad-y', (st.bodyPadY*s)+'px');
      if (st.height) el.style.height = (st.height*s)+'px';

      const title = document.createElement('div'); title.className='box-title'; title.textContent = b.label;
      const out   = document.createElement('div'); out.className='box-body'; out.textContent = b.val || '';
      el.append(title, out); targetStage.appendChild(el);
    });
  } else {
    const f = PAGES[i].flow;
    const s = k();
    const toPxW=p=> (p*(ART_W/100)*s)+'px'; // p * 10.8 * s
    const toPxH=p=> (p*(ART_H/100)*s)+'px'; // p * 13.5 * s

    let leftPx=toPxW(f.leftPct), topPx=toPxH(f.topPct);

    if (f.anchor && f.anchor.mode==='first-box-xy' && PAGES[i].boxes?.[f.anchor.boxIndex||0]){
      const b0=PAGES[i].boxes[f.anchor.boxIndex||0];
      if (typeof b0.x==='number' && typeof b0.y==='number') {
        leftPx=(b0.x*s)+'px'; topPx=(b0.y*s)+'px';
      }
    }

    const wrap=document.createElement('div');
    wrap.className='flow-wrap';
    wrap.style.setProperty('--cols',   f.cols);
    wrap.style.setProperty('--gap-px', toPxW(f.gapPct));
    wrap.style.setProperty('--padX-px',toPxW(f.padXPct));
    wrap.style.setProperty('--padY-px',toPxH(f.padXPct));
    wrap.style.setProperty('--left-px',leftPx);
    wrap.style.setProperty('--top-px', topPx);
    wrap.style.setProperty('--w-px',   toPxW(f.widthPct));

    PAGES[i].boxes.forEach(b=>{
      const card=document.createElement('div');
      card.className='box';
      card.style.fontSize=(b.fs*s)+'px';
      card.style.lineHeight=b.lh;
      const st=b.style||{};
      if (st.shadow)     card.style.setProperty('--shadow', st.shadow);
      if (st.titleBg)    card.style.setProperty('--title-bg', st.titleBg);
      if (st.titleColor) card.style.setProperty('--title-color', st.titleColor);
      if (st.bodyBg)     card.style.setProperty('--body-bg', st.bodyBg);
      if (st.bodyBorder) card.style.setProperty('--body-border', st.bodyBorder);
      if (st.bodyPadX!==undefined) card.style.setProperty('--body-pad-x', (st.bodyPadX*s)+'px');
      if (st.bodyPadY!==undefined) card.style.setProperty('--body-pad-y', (st.bodyPadY*s)+'px');

      const title=document.createElement('div'); title.className='box-title'; title.textContent=b.label;
      const out  =document.createElement('div'); out.className='box-body'; out.id=`out_${b.id}`; out.textContent=b.val||'';
      card.append(title,out); wrap.appendChild(card);
    });

    targetStage.appendChild(wrap);
  }
}

/* ---------- Render ---------- */
function renderPage(i){
  cur = i;

  // Update header & instruksi form kiri berbasis index fisik
  updateFormHeaderByIndex(i);

  // bersihkan stage utama & form kiri
  if (stage) stage.querySelectorAll('.overlay-abs, .flow-wrap').forEach(n=>n.remove());
  inputs.innerHTML='';

  // MODE DUAL: jika continued ada & user berada di page 0/1
  const dual = hasSkillContinuation() && (i===0 || i===1) && stage2 && bgImg2 && stagesWrap && stage2Wrap;
  if (stagesWrap && stage2Wrap){
    stagesWrap.classList.toggle('dual', !!dual);
    stage2Wrap.classList.toggle('d-none', !dual);
  }

  if (dual){
    // Render Stage A (Page 1) & Stage B (Continued)
    renderToStageOnly(0, stage, bgImg);
    renderToStageOnly(1, stage2, bgImg2);

    // Tampilkan builder khusus Page 1 di panel kiri
    inputs.innerHTML = skillsBuilderHTML();
    setupSkillsBuilderUI();

    // highlight pager
    pager.querySelectorAll('button.nav-link').forEach((a,ix)=>{
      a.classList.toggle('active', ix===i);
      a.classList.toggle('text-white', ix===i);
    });
    return;
  }

  // —— Mode SINGLE: render normal ——
  const src = PAGES[i].bg || '';
  if (bgImg) {
    bgImg.src = src || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="%23999">BG missing</text></svg>';
  }

  // bersihkan overlay stage2 kalau ada
  if (stage2) stage2.querySelectorAll('.overlay-abs, .flow-wrap').forEach(n=>n.remove());

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

    // anchor first-box-xy akan menonaktifkan left/top (di sini manual semua)
    flowCtr.left.disabled = !!(f.anchor && f.anchor.mode==='first-box-xy');
    flowCtr.top.disabled  = !!(f.anchor && f.anchor.mode==='first-box-xy');

    const s = k();
    const toPxW=p=> (p*(ART_W/100)*s)+'px';
    const toPxH=p=> (p*(ART_H/100)*s)+'px';

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
    wrap.style.setProperty('--padY-px',toPxH(f.padXPct));
    wrap.style.setProperty('--left-px',leftPx);
    wrap.style.setProperty('--top-px', topPx);
    wrap.style.setProperty('--w-px',   toPxW(f.widthPct));

    // —— KHUSUS HALAMAN 1: ganti form kiri dengan Skills Builder
    const isPage1 = (i === 0);
    if(isPage1){
      inputs.innerHTML = skillsBuilderHTML();
      setupSkillsBuilderUI();
    }

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

      // halaman selain 1: buat input kiri default
      if(!isPage1){
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
      }
    });

    stage.appendChild(wrap);
  }

  // highlight pager aktif
  pager.querySelectorAll('button.nav-link').forEach((a,ix)=>{
    a.classList.toggle('active', ix===i);
    a.classList.toggle('text-white', ix===i);
  });
}

/* ---------- Skills Builder HTML ---------- */
function skillsBuilderHTML() {
  return `
    <section class="panel">
      <h5 class="mb-2">Daftar Skill</h5>
      
      <div class="mini mb-2">
        Silakan isi <b>Judul</b> dan <b>Deskripsi</b>. Untuk hasil terbaik, tulis deskripsi sepanjang 50–150 kata.
      </div>

      <div class="mb-3">
        <label class="form-label">Pilih Model Referensi</label>
        <select id="modelSelect" class="form-select"></select>
      </div>

      <div class="mb-2">
        <label class="form-label">Pilih maksimal 8 skill</label>
        <div id="skillOptions" class="pillbox"></div>
        
        <div class="mini">
          Sistem akan otomatis menyusun skill ke halaman-halaman berikutnya (4 skill per halaman).
        </div>
      </div>

      <div id="skillsForm"></div>
    </section>
  `;
}

/* ---------- Skills Builder Logic ---------- */
function setupSkillsBuilderUI(){
  const modelSelect  = document.getElementById('modelSelect');
  const skillOptions = document.getElementById('skillOptions');
  const skillsForm   = document.getElementById('skillsForm');

  // Populate models
  modelSelect.innerHTML = Object.keys(SKILL_LIBRARY)
    .map(m => `<option value="${m}" ${m===skillsModel?'selected':''}>${m}</option>`).join('');

  // Render pills
  const renderPills = ()=>{
    const list = SKILL_LIBRARY[skillsModel] || [];
    skillOptions.innerHTML = list.map(name=>{
      const active = picked.find(p=>p.title===name);
      return `<button type="button" class="pill ${active?'active':''}" data-skill="${encodeURIComponent(name)}">${name}</button>`;
    }).join('');
  };

  // Render forms
  const wordCount = (t)=> (t||'').trim().split(/\s+/).filter(Boolean).length;
  const wcClass = (n)=>{
    if(n===0) return '';
    if(n<40) return 'bad';
    if(n<=160) return 'ok';
    if(n<=220) return 'warn';
    return 'bad';
  };
  const renderForms = ()=>{
    skillsForm.innerHTML = picked.map((p,ix)=>`
      <div class="sb-card" data-ix="${ix}">
        <label class="form-label">Heading</label>
        <input class="form-control sb-title" value="${p.title.replace(/"/g,'&quot;')}" />

        <label class="form-label mt-2">Description (50–150 words)</label>
        <textarea class="form-control sb-text" rows="4" placeholder="Tulis dengan pola STAR: konteks, aksi, hasil terukur, pembelajaran kunci.">${p.text||''}</textarea>
        <div class="sb-wcount ${wcClass(wordCount(p.text||''))}">
          ${wordCount(p.text||'')} words
        </div>

        <div class="sb-ctr">
          <button type="button" class="btn btn-outline-secondary btn-sm sb-up">↑</button>
          <button type="button" class="btn btn-outline-secondary btn-sm sb-down">↓</button>
          <button type="button" class="btn btn-outline-danger btn-sm sb-remove">Remove</button>
        </div>
      </div>
    `).join('');
  };

  // Sync ke PAGES (Page 1 dan halaman lanjutan)
  const syncToPages = ()=>{
    const page1 = PAGES[0];
    const flowSample = {...page1.flow};

    const first4 = picked.slice(0,4);
    for(let i=0;i<4;i++){
      const b = page1.boxes[i];
      if(!b) continue;
      const src = first4[i];
      if(src){
        b.label = src.title;
        b.val   = src.text||'';
      }else{
        b.label = `Skill ${i+1}`;
        b.val   = '';
      }
    }

    const rest = picked.slice(4);
    ensureSkillContinuationPage(rest.length>0, flowSample);

    if(rest.length>0){
      const pCont = PAGES[1]; // disisipkan setelah Page 1
      pCont.boxes = rest.slice(0,4).map((s,idx)=>({
        id: 'p1c'+idx,
        label: s.title,
        fs: 20, lh: 1.35,
        val: s.text||'',
        style:{
          bodyBg: COLOR.bodySelf,
          titleColor: "#f6e6c5"
        }
      }));
      pCont.bg = FRAME['1_EXTRA']; // pakai BG khusus
    }

    // refresh tampilan jika user sedang di Page 1/2 (dual) atau halaman aktif lain
    renderPage(cur);
  };

  // Tambah/hapus page lanjutan
  const ensureSkillContinuationPage = (needed, flowSample)=>{
    const exists = PAGES[1] && PAGES[1].__isSkillCont;
    if(needed && !exists){
      PAGES.splice(1,0,{
        __isSkillCont:true,
        name:"Self Potential — Continued",
        type:'flow',
        bg: FRAME['1_EXTRA'],
        flow:{ ...flowSample, lock:true },
        boxes:[]
      });
      buildPager();
    } else if(!needed && exists){
      PAGES.splice(1,1);
      buildPager();
      if(cur===1) cur=0; // kalau sedang di page lanjutan, balikin ke page 1
    }
  };

  // Event: ganti model
  modelSelect.addEventListener('change', ()=>{
    skillsModel = modelSelect.value;
    picked = [];
    renderPills(); renderForms(); syncToPages();
  });

  // Event: toggle pill
  skillOptions.addEventListener('click', (e)=>{
    const btn = e.target.closest('.pill'); if(!btn) return;
    const name = decodeURIComponent(btn.dataset.skill||'');
    const idx = picked.findIndex(p=>p.title===name);
    if(idx>=0){
      picked.splice(idx,1);
    }else{
      if(picked.length>=8){ alert('Max 8 skills.'); return; }
      picked.push({title:name, text:''});
    }
    renderPills(); renderForms(); syncToPages();
  });

  // Event: form edit
  skillsForm.addEventListener('input', (e)=>{
    const card = e.target.closest('.sb-card'); if(!card) return;
    const ix = +card.dataset.ix;
    if(e.target.classList.contains('sb-title')) picked[ix].title = e.target.value;
    if(e.target.classList.contains('sb-text'))  picked[ix].text  = e.target.value;

    if(e.target.classList.contains('sb-text')){
      const n = (e.target.value||'').trim().split(/\s+/).filter(Boolean).length;
      const wc = card.querySelector('.sb-wcount');
      wc.textContent = `${n} words`;
      wc.className = 'sb-wcount ' + (n===0?'': (n<40?'bad': n<=160?'ok': n<=220?'warn':'bad'));
    }
    syncToPages();
  });

  skillsForm.addEventListener('click', (e)=>{
    const card = e.target.closest('.sb-card'); if(!card) return;
    const ix = +card.dataset.ix;
    if(e.target.classList.contains('sb-remove')){
      picked.splice(ix,1);
      renderPills(); renderForms(); syncToPages();
    }
    if(e.target.classList.contains('sb-up') && ix>0){
      [picked[ix-1], picked[ix]] = [picked[ix], picked[ix-1]];
      renderPills(); renderForms(); syncToPages();
    }
    if(e.target.classList.contains('sb-down') && ix<picked.length-1){
      [picked[ix+1], picked[ix]] = [picked[ix], picked[ix+1]];
      renderPills(); renderForms(); syncToPages();
    }
  });

  // Render awal
  renderPills(); renderForms();

  // Tombol paksa render (opsional)
  const btnRN = document.getElementById('renderNow');
  if(btnRN) btnRN.onclick = ()=> renderPage(cur);
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
const KEY='seven_pages_editor_final_lockedbg_v5'; // bump versi

document.getElementById('save').onclick = ()=>{
  const data = PAGES.map(p => {
    const { boxes, flow, name, type, __isSkillCont } = p;
    return { name, type, boxes, flow, __isSkillCont }; // BG tidak ikut disimpan
  });
  localStorage.setItem(KEY, JSON.stringify(data));
  alert('Tersimpan di browser.');
};

(function restore(){
  try{
    const raw=localStorage.getItem(KEY);
    if(!raw) return;
    const saved=JSON.parse(raw);
    if(Array.isArray(saved) && saved.length){
      // reset total: kita rebuild dari default lalu merge nilai
      const n = Math.min(saved.length, PAGES.length + 1); // antisipasi cont page
      for(let i=0;i<n;i++){
        const curPg = PAGES[i], savPg = saved[i] || {};
        if(!curPg) {
          // jika saved punya page lanjutan tapi default tidak: sisipkan
          if (savPg.__isSkillCont) {
            PAGES.splice(1,0, savPg);
          }
          continue;
        }
        if (savPg.flow && curPg.flow) curPg.flow = {...curPg.flow, ...savPg.flow};
        if (Array.isArray(savPg.boxes) && Array.isArray(curPg.boxes)){
          curPg.boxes = curPg.boxes.map((b, idx)=> ({...b, ...(savPg.boxes[idx]||{})}));
        }
      }
      buildPager();
    }
  }catch(e){}
})();

/* ---------- Export (UPDATED) ---------- */
async function renderCanvasSafe(targetStage=stage){
  try {
    // decode BG pada stage terkait
    if (targetStage===stage && bgImg)  { try{ await bgImg.decode(); }catch(e){} }
    if (targetStage===stage2 && bgImg2){ try{ await bgImg2.decode(); }catch(e){} }
  } catch(e){}

  // toggle exporting pada stage target
  targetStage.classList.add('exporting');
  await new Promise(r => requestAnimationFrame(()=>requestAnimationFrame(r)));
  try{
    const cv = await html2canvas(targetStage,{
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    });
    return cv;
  } finally {
    targetStage.classList.remove('exporting');
  }
}

document.getElementById('export').onclick = async ()=>{
  const cv = await renderCanvasSafe(stage);
  cv.toBlob(b=>saveAs(b,`page-${cur+1}.png`));
};

document.getElementById('exportAll').onclick = async ()=>{
  const zip=new JSZip(); const keep=cur;
  for(let i=0;i<PAGES.length;i++){
    renderPage(i);
    const cv=await renderCanvasSafe(stage); // export stage utama per index
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
let rafId=null;
window.addEventListener('resize', ()=>{
  if(rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(()=>renderPage(cur));
});

/* ---------- Init ---------- */
window.addEventListener('DOMContentLoaded', ()=>{
  buildPager();
  renderPage(0); // otomatis set header & instruksi halaman 1
});
