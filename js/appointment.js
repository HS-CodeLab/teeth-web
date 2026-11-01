$(function(){
const K='appointments_list',get=()=>JSON.parse(localStorage.getItem(K)||'[]'),put=a=>localStorage.setItem(K,JSON.stringify(a));
const today=new Date();today.setHours(0,0,0,0);
$('#dt').attr('min',new Date(today-today.getTimezoneOffset()*6e4).toISOString().slice(0,10));
function slots(){const d=$('#dt').val(),r=$('#dr').val(),b=get().filter(x=>x.date==d&&x.doctor==r&&r!='No preference').map(x=>x.time),o=[];
for(let m=540;m<1200;m+=30){const t=String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');o.push('<option'+(b.includes(t)?' disabled':'')+'>'+t+'</option>')}
$('#tm').html(o.join(''))}
function list(){const a=get();$('#bk').html(a.length?a.map((x,i)=>'<div class="border-bottom py-2"><b>'+x.service+'</b> with '+x.doctor+'<br>'+x.date+' at '+x.time+' <small>(Ref '+x.id+')</small> <button class="btn btn-sm btn-outline-info float-end cx" data-i="'+i+'">Cancel</button></div>').join(''):'No appointments yet.')}
$('#dt,#dr').on('change',slots);slots();list();
$('#bk').on('click','.cx',function(){const a=get();a.splice(+this.dataset.i,1);put(a);list();slots()});
$('#ap').on('submit',function(e){e.preventDefault();const m=$('#am').removeClass('d-none alert-success alert-danger'),d=$('#dt').val(),err=s=>m.addClass('alert-danger').text(s);
if(!$('#n').val().trim()||!d||!$('#tm').val())return err('Please fill in your name, date and time.');
if(!/^[0-9+\s-]{10,15}$/.test($('#ph').val().trim()))return err('Enter a valid phone number.');
if(!/^\S+@\S+\.\S+$/.test($('#em').val()))return err('Enter a valid email address.');
if(new Date(d+'T00:00').getDay()==0)return err('The clinic is closed on Sunday. Please pick another day.');
const a=get(),id='BD'+String(Date.now()).slice(-6);
a.push({id,name:$('#n').val().trim(),phone:$('#ph').val(),email:$('#em').val(),service:$('#sv').val(),doctor:$('#dr').val(),date:d,time:$('#tm').val(),notes:$('#nt').val()});put(a);
m.addClass('alert-success').text('Appointment confirmed. Your reference number is '+id+'.');this.reset();slots();list()});
});
