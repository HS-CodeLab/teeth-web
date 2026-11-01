$(function(){
$('body').addClass('home');
const board=document.querySelector('.board'),cam=document.querySelector('.cam'),cards=[...document.querySelectorAll('.cd')],dots=$('.dots');
let cur=0,busy=false,bw,bh,cw,ch,gap;
dots.html(cards.map((_,i)=>'<i data-i="'+i+'"></i>').join(''));
// tooth made of shards that fly together
let sv='<svg viewBox="0 0 300 340"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#99f6e4"/><stop offset=".5" stop-color="#2dd4bf"/><stop offset="1" stop-color="#0f766e"/></linearGradient><g id="tp"><path d="M150 36c-30-24-90-20-100 40-5 40 15 60 20 100 5 40 15 100 40 100 20 0 20-70 40-70s20 70 40 70c25 0 35-60 40-100 5-40 25-60 20-100-10-60-70-64-100-40z" fill="url(#g)" fill-opacity=".85" stroke="#ccfbf1" stroke-width="3"/><path d="M95 62c14-14 36-12 48 0" stroke="#fff" stroke-opacity=".8" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M110 120c10 30 8 70 0 100M190 120c-10 30-8 70 0 100" stroke="#fff" stroke-opacity=".25" stroke-width="3" fill="none"/></g>';
for(let r=0;r<4;r++)for(let c=0;c<3;c++)sv+='<clipPath id="k'+(r*3+c)+'"><rect x="'+c*100+'" y="'+r*85+'" width="100" height="85"/></clipPath>';
sv+='</defs>';
for(let n=0;n<12;n++){const a=Math.random()*6.28,d=140+Math.random()*120;sv+='<g class="sh" style="--dx:'+Math.cos(a)*d+'px;--dy:'+Math.sin(a)*d+'px;--r:'+(Math.random()*120-60)+'deg"><g clip-path="url(#k'+n+')"><use href="#tp"/></g></g>'}
$('#tooth').html(sv+'</svg>');
$('.hero h1').html($('.hero h1').text().split(' ').map((w,i)=>'<span class="w" style="--i:'+i+'">'+w+'</span>').join(' '));
function dims(){const t=board.getBoundingClientRect().top+scrollY;board.style.height=Math.max(520,innerHeight-t-52)+'px';bw=board.clientWidth;bh=board.clientHeight;cw=bw*.95;ch=bh*.94;gap=cw*.07}
const ctr=i=>[(i%3)*(cw+gap)+cw/2,Math.floor(i/3)*(ch+gap)+ch/2];
const tf=(i,s,rz,rx)=>{const c=ctr(i);return 'translate('+bw/2+'px,'+bh/2+'px) rotateX('+rx+'deg) rotateZ('+rz+'deg) scale('+s+') translate('+-c[0]+'px,'+-c[1]+'px)'};
function activate(i){const c=cards[i];if(c.classList.contains('on'))return;c.classList.add('on');$('[data-c]',c).each(function(){const n=+this.dataset.c,el=this;let k=0;const id=setInterval(()=>{k+=Math.ceil(n/40);if(k>=n){k=n;clearInterval(id)}el.textContent=k+(el.dataset.s||'')},35)})}
function layout(){const flat=innerWidth<900;board.classList.toggle('flat',flat);if(flat){board.style.height='';cam.style.transform='';cards.forEach((c,i)=>{c.style.cssText='';activate(i)});return}
dims();cards.forEach((c,i)=>{c.style.width=cw+'px';c.style.height=ch+'px';c.style.left=(i%3)*(cw+gap)+'px';c.style.top=Math.floor(i/3)*(ch+gap)+'px'});cam.style.transition='none';cam.style.transform=tf(cur,1,0,0);dots.children().removeClass('a').eq(cur).addClass('a');setTimeout(()=>{cam.style.transition='';activate(cur)},150)}
function go(n){if(busy||n==cur||n<0||n>=cards.length)return;busy=true;cam.style.transition='transform .35s cubic-bezier(.65,0,.35,1)';cam.style.transform=tf(cur,.8,0,0);
setTimeout(()=>{cam.style.transition='transform .6s cubic-bezier(.65,0,.25,1)';cam.style.transform=tf(n,1,0,0);cur=n;dots.children().removeClass('a').eq(n).addClass('a');setTimeout(()=>activate(n),350);setTimeout(()=>busy=false,600)},350)}
board.addEventListener('wheel',e=>{if(innerWidth<900)return;const n=cur+(e.deltaY>0?1:-1);if(busy||(n>=0&&n<cards.length)){e.preventDefault();if(Math.abs(e.deltaY)>12)go(n)}},{passive:false});
document.addEventListener('keydown',e=>{if(innerWidth<900||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key=='ArrowDown'||e.key=='PageDown')go(cur+1);if(e.key=='ArrowUp'||e.key=='PageUp')go(cur-1)});
let ty=0;board.addEventListener('touchstart',e=>ty=e.touches[0].clientY);board.addEventListener('touchend',e=>{const d=ty-e.changedTouches[0].clientY;if(Math.abs(d)>60)go(cur+(d>0?1:-1))});
dots.on('click','i',function(){go(+this.dataset.i)});
addEventListener('resize',layout);layout();
$('.cn').on('click',function(){$('.car')[0].scrollBy({left:this.dataset.d*300,behavior:'smooth'})});
const G={clean:["Teeth Cleaning",20,"1 visit","Dr. Sara Malik"],white:["Teeth Whitening",30,"1 to 2 visits","Dr. Sara Malik"],braces:["Braces and Aligners",70,"6 to 18 months","Dr. Ayesha Khan"],implant:["Dental Implants",85,"3 to 6 months","Dr. Hamza Raza"],root:["Root Canal",55,"1 to 2 visits","Dr. Hamza Raza"]},N={fast:"Fastest option where possible.",gentle:"Gentlest approach with comfort first.",last:"Focused on long term results."};
function calc(){const a=$('[name=g]:checked').val(),k=$('[name=a]:checked').val(),c=$('[name=w]:checked').val()=='child',r=c?["Kids Dentistry",15,"1 gentle visit","Dr. Fatima Siddiqui"]:G[a];$('#rt').text(r[0]);$('#rc i').css('width',r[1]+'%');$('#rm').text(r[2]);$('#rs').text(r[3]);$('#rn').text(N[k])}
$('.calc input').on('change',calc);calc();
$('#bar').on('input',function(){$('#bef').css('clip-path','inset(0 '+(100-this.value)+'% 0 0)');$('.ln').css('left',this.value+'%')});
const S={a:["Areeba's smile, renewed","Areeba felt shy about her smile. After a whitening plan and a gentle cleaning, her teeth look natural and bright."],b:["Bilal's confident change","Bilal wanted a brighter smile before his wedding. A simple whitening session gave a clean and even shade."],c:["Zainab's healthy habits","Zainab fixed her routine with our patient guidance and now has no more bleeding gums."]};
$('.tb').on('click',function(){const s=S[this.dataset.k];$('.tb').removeClass('active');$(this).addClass('active');$('#st').text(s[0]);$('#sp').text(s[1])});
});
