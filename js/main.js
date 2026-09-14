document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-id][data-en]').forEach((el) => {
    const text = lang === 'en' ? el.dataset.en : el.dataset.id;
    const attr = el.dataset.i18nAttr;
    if (attr) el.setAttribute(attr, text);
    else el.textContent = text;
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  try { localStorage.setItem('nest-lang', lang); } catch (e) {}
}

let savedLang = 'id';
try { savedLang = localStorage.getItem('nest-lang') || 'id'; } catch (e) {}
applyLanguage(savedLang);

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});
