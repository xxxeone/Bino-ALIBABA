// Bino EduTour — Confirm Page JS

function setLang(l){
  document.documentElement.setAttribute('data-lang',l);
  document.getElementById('btnZH').classList.toggle('on',l==='zh');
  document.getElementById('btnEN').classList.toggle('on',l==='en');
  document.title=l==='zh'?'Bino EduTour · 报名确认':'Bino EduTour · Registration Confirmed';
  document.querySelectorAll('.zh').forEach(el=>{
    el.style.display=l==='zh'?'':'none';
  });
  document.querySelectorAll('.en').forEach(el=>{
    const tag=el.tagName.toLowerCase();
    const inline=['span','a','strong','em','b','i'];
    el.style.display=l==='en'?(inline.includes(tag)?'inline':'block'):'none';
  });
}

// Read URL params
const p=new URLSearchParams(window.location.search);
const name    = p.get('name')    || '—';
const company = p.get('company') || '—';
const phone   = p.get('phone')   || '—';
const pax     = p.get('pax')     || '1';
const email   = p.get('email')   || '';

// Populate summary
document.getElementById('sum-name').textContent    = name;
document.getElementById('sum-company').textContent = company;
document.getElementById('sum-phone').textContent   = phone;
document.getElementById('sum-email').textContent   = email;
document.getElementById('sum-pax').textContent     = pax + ' pax';

// Build WhatsApp pre-filled message
const waMsg = encodeURIComponent(
  'Halooo! 我是 ' + name + ' 来自 ' + company + ' 👋\n' +
  '我刚报名了 Bino EduTour 阿里巴巴研学团 (11–16 Sept 2026)。\n' +
  '以下是我的 RM 1,000 订金转账收据，请查收！\n\n' +
  '联络电话: ' + phone
);
document.getElementById('waBtn').href = 'https://wa.me/60122468170?text=' + waMsg;

// Copy account number
function copyAcc(btnId) {
  navigator.clipboard.writeText('00100950892').then(() => {
    const btn = document.getElementById(btnId);
    btn.textContent = '✓';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = document.documentElement.getAttribute('data-lang') === 'zh' ? '复制' : 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}
