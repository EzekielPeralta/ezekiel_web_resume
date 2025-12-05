// Set year
document.getElementById('year').textContent = new Date().getFullYear();

/* Typed.js for keywords */
const typed = new Typed('#typed-keywords', {
  strings: ['Agile','IT Projects','Leadership','Digital Transformation','Efficiency'],
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 1400,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

/* GSAP entrance animations */
function startAnimations(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.from('.hero-portrait', {duration:1.2, x:-60, opacity:0, ease: 'power3.out'});
  gsap.from('.hero-content', {duration:1.0, x:60, opacity:0, delay:0.15, ease:'power3.out'});
  gsap.from('.hero-name', {duration:.8, y:8, opacity:0, delay:0.3, ease:'power3.out'});
  gsap.from('.hero-ctas .btn', {duration:.6, y:8, opacity:0, stagger:0.08, delay:0.6});
  gsap.from('.job-card', {duration:.9, y:12, opacity:0, stagger:0.12, ease:'power2.out', scrollTrigger:{trigger:'.job-card', start:'top 80%'}});
}

/* Simple particle background - canvas based */
(function(){
  const canvas = document.getElementById('particles-bg');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const qty = Math.round((w*h)/90000);

  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; init(); }
  window.addEventListener('resize', resize);

  function init(){
    particles = [];
    for(let i=0;i<qty;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.6+0.4,
        vx: (Math.random()-0.5)*0.3,
        vy: (Math.random()-0.5)*0.3,
        alpha: Math.random()*0.6+0.1
      });
    }
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if(p.x<0) p.x = w;
      if(p.x>w) p.x = 0;
      if(p.y<0) p.y = h;
      if(p.y>h) p.y = 0;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(80,170,255,'+p.alpha+')';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(step);
  }
  init();
  step();
})();

/* Counters animation */
function animateCounters(){
  document.querySelectorAll('.metric .num').forEach(el=>{
    const target = +el.getAttribute('data-count') || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const id = setInterval(()=>{
      current += step;
      if(current >= target){
        el.textContent = target;
        clearInterval(id);
      } else {
        el.textContent = current;
      }
    }, 16);
  });
}

/* Intersection observer to trigger animations and counters */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      startAnimations();
      animateCounters();
      observer.disconnect();
    }
  });
},{threshold:0.15});
observer.observe(document.querySelector('#hero'));

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href.startsWith('#')){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* Accessible focus states */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('focus', () => btn.style.boxShadow = '0 8px 30px rgba(0,176,255,0.16)');
  btn.addEventListener('blur',  () => btn.style.boxShadow = '');
});
