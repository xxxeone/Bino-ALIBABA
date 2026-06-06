const cur=document.getElementById('cur'),ring=document.getElementById('ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function loop(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();

function setLang(l){
  document.documentElement.setAttribute('data-lang',l);
  document.getElementById('btnZH').classList.toggle('on',l==='zh');
  document.getElementById('btnEN').classList.toggle('on',l==='en');
  document.title=l==='zh'?'Bino EduTour · 阿里巴巴研学团 2026':'Bino EduTour · Alibaba Study Tour 2026';
  // Explicitly set display for all lang elements
  document.querySelectorAll('.zh').forEach(el=>{
    el.style.display = l==='zh' ? '' : 'none';
  });
  document.querySelectorAll('.en').forEach(el=>{
    // Detect original display type from tag
    const tag = el.tagName.toLowerCase();
    const inline = ['span','a','strong','em','b','i'];
    el.style.display = l==='en' ? (inline.includes(tag) ? 'inline' : 'block') : 'none';
  });
}

const LB={
  "SAM02920":{s:"assets/img_04.jpg"},
  "SAM03779":{s:"assets/img_05.jpg"},
  "SAM00181":{s:"assets/img_21.jpg"},
  "SAM01590":{s:"assets/img_06.jpg"},
  "SAM00134":{s:"assets/img_07.jpg"},
  "SAM00373":{s:"assets/img_08.jpg"},
  "SAM00553":{s:"assets/img_03.jpg"},
  "SAM00802":{s:"assets/img_09.jpg"},
  "SAM01517":{s:"assets/img_10.jpg"},
  "SAM00844":{s:"assets/img_11.jpg"},
  "SAM01323":{s:"assets/img_12.jpg"},
  "SAM00735":{s:"assets/img_13.jpg"},
  "SAM03392":{s:"assets/img_14.jpg"},
  "SAM02594":{s:"assets/img_15.jpg"},
  "SAM02467":{s:"assets/img_16.jpg"},
  "SAM02469":{s:"assets/img_17.jpg"},
  "SAM00376":{s:"assets/img_18.jpg"},
  "SAM00009":{s:"assets/img_19.jpg"},
  "SAM03320":{s:"assets/img_20.jpg"},
};
const LO=["SAM02920", "SAM03779", "SAM00181", "SAM01590", "SAM00134", "SAM00373",  "SAM00553", "SAM00802", "SAM01517", "SAM00844", "SAM01323", "SAM00735",  "SAM03392", "SAM02594", "SAM02467", "SAM02469", "SAM00376", "SAM00009", "SAM03320"];

let lbCur='',lbIdx=0;
function lb(fn){
  const i=LO.indexOf(fn);
  if(i<0) return;
  lbCur=fn;lbIdx=i;
  document.getElementById('lb-img').src=LB[fn].s;
  document.getElementById('lb-ctr').textContent=(i+1)+' / '+LO.length;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLb(){document.getElementById('lb').classList.remove('open');document.body.style.overflow='';}
function lbNav(dir){
  lbIdx=(lbIdx+dir+LO.length)%LO.length;
  lb(LO[lbIdx]);
}
document.getElementById('lb').addEventListener('click',function(e){if(e.target===this)closeLb()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb();if(e.key==='ArrowRight')lbNav(1);if(e.key==='ArrowLeft')lbNav(-1)});

const io=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i*55);io.unobserve(e.target)}});
},{threshold:.08,rootMargin:'0px 0px -24px 0px'});
document.querySelectorAll('.sr,.srl').forEach(el=>io.observe(el));

function openModal(){document.getElementById('ppModal').classList.add('open')}
function closeModal(){document.getElementById('ppModal').classList.remove('open')}
document.getElementById('ppModal').addEventListener('click',function(e){if(e.target===this)closeModal()});

function validateField(el){
  const empty=el.value.trim()===''||(el.tagName==='SELECT'&&el.value==='');
  const emailFail=el.type==='email'&&el.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
  el.classList.toggle('err',empty||emailFail);
  return !empty&&!emailFail;
}
['f-name','f-company','f-role','f-phone','f-email','f-pax'].forEach(id=>{
  const el=document.getElementById(id);
  if(el) el.addEventListener('blur',()=>validateField(el));
});
function doSubmit(e){
  e.preventDefault();
  let valid=true;
  ['f-name','f-company','f-role','f-phone','f-email','f-pax'].forEach(id=>{const el=document.getElementById(id);if(el&&!validateField(el))valid=false});
  const pdpa=document.getElementById('pdpa-check');
  if(!pdpa.checked){pdpa.style.outline='2px solid #C62828';valid=false}else{pdpa.style.outline='none'}
  if(!valid) return;
  const data={
    name:document.getElementById('f-name').value.trim(),
    company:document.getElementById('f-company').value.trim(),
    role:document.getElementById('f-role').value.trim(),
    phone:document.getElementById('f-phone').value.trim(),
    email:document.getElementById('f-email').value.trim(),
    pax:document.getElementById('f-pax').value,
    goal:document.getElementById('f-goal').value.trim(),
    source:document.getElementById('f-source').value,
    ts:new Date().toISOString()
  };
  document.getElementById('regForm').style.display='none';
  document.getElementById('processing').style.display='block';
  const APPS='https://script.google.com/macros/s/AKfycbw9OQZ9F8b7Eyu8FmiUTk8tZuh95WHTQwUbraiFx6sPxdH98GjKJ2OvtyazpwEivNBr/exec';
  const go=()=>{
    const params=new URLSearchParams({
      name:data.name, company:data.company,
      phone:data.phone, email:data.email,
      pax:data.pax, role:data.role
    });
    window.location.href='confirm.html?'+params.toString();
  };
  fetch(APPS,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(go).catch(go);
}
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const h=a.getAttribute('href');
    if(h==='#') return;
    e.preventDefault();
    const t=document.querySelector(h);
    if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
  });
});