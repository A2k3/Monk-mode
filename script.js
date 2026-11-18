var P=[
{s:"meditation",t:"Meditation",d:"Sit. Breathe. Watch the mind without obeying it.",f:"Marcus Aurelius",q:"You have power over your mind, not outside events. Realize this, and you will find strength."},
{s:"exercise",t:"Exercise",d:"Train the body. Earn the calm.",f:"David Goggins",q:"Who’s gonna carry the boats?"},
{s:"reading",t:"Reading",d:"Quiet pages, deep focus, one idea a day.",f:"Naval Ravikant",q:"Read what you love until you love to read."},
{s:"designing",t:"Designing",d:"Deliberate practice in grid, type and craft.",f:"Steve Jobs",q:"Design is not just what it looks like and feels like. Design is how it works."},
{s:"english",t:"English",d:"Words are tools. Sharpen them daily.",f:"Nelson Mandela",q:"If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart."},
{s:"calligraphy",t:"Calligraphy",d:"Slow strokes. Steady hand. Patient mind.",f:"Denzel Washington",q:"Ease is a greater threat to progress than hardship."},
{s:"finance",t:"Personal Finance",d:"Spend less than you earn. Invest the difference.",f:"Warren Buffett",q:"Do not save what is left after spending; instead spend what is left after saving."}];
function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
function st(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function dayNo(){var a=new Date(2026,10,19),b=new Date();b.setHours(0,0,0,0);return Math.round((b-a)/864e5)+1}
function load(s){try{var a=JSON.parse(g("mm:"+s));return Array.isArray(a)?a:[]}catch(e){return[]}}
function streak(a){var d=Math.min(dayNo(),90),n=0;if(a.indexOf(d)<0)d--;while(d>0&&a.indexOf(d)>=0){n++;d--}return n}
// Photo: an uploaded one wins, otherwise images/<slug>.jpg from your folder
function photo(slug){return g("mm:img:"+slug)||"images/"+slug+".png"}
function ini(f){return f.split(" ").map(function(w){return w[0]}).slice(0,2).join("")}
function star(c,s,x,y,r){return '<svg viewBox="0 0 100 100" style="width:'+s+'px;height:'+s+'px;left:'+x+';top:'+y+';transform:rotate('+r+'deg)"><use href="#s" fill="url(#g)" stroke="rgba(255,255,255,.5)" stroke-width=".5"/></svg>'}
var app=document.getElementById("app");
function home(){
var d=Math.min(dayNo(),90);
app.innerHTML='<section class="hero"><div><span class="badge"><i></i>'+(dayNo()<1?'Day 1 starts 19 Nov 2026':'Day '+d+' of 90 · Monk mode is on')+'</span><h1>Ninety days.<br>One discipline.</h1><p>Seven daily practices. One quiet log. Silence the noise and build the person you intend to be.</p><a class="b f" href="#meditation">Begin today →</a> <a class="b" href="#" data-go="list">View disciplines</a></div><div class="stars">'+star(0,300,"22%","4%",0)+star(0,110,"2%","58%",12)+star(0,64,"78%","70%",-8)+'</div></section>'+
'<div class="strip">'+P.map(function(p){return '<a href="#'+p.s+'">'+p.t+'</a>'}).join("")+'</div>'+
'<div class="sec" id="list"><h2>The seven disciplines</h2><span>Tap to open</span></div><div class="cards">'+P.map(function(p,i){var im=photo(p.s);return '<a class="card" href="#'+p.s+'"><div class="top"><span>0'+(i+1)+'</span><span class="av" style="position:relative;overflow:hidden">'+ini(p.f)+'<img src="'+im+'" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.remove()"></span></div><h3>'+p.t+'</h3><small>'+p.f+' · '+load(p.s).length+' / 90 days</small></a>'}).join("")+'</div>'}
function page(k){
var i=P.findIndex(function(p){return p.s===k}),p=P[i];if(!p)return home();
var a=load(k),dn=dayNo(),im=photo(k),cells="";
for(var n=1;n<=90;n++)cells+='<button data-n="'+n+'"'+(n===dn?'':' disabled')+' class="'+(a.indexOf(n)>=0?"on ":"")+(n===dn?"today":"")+'">'+n+'</button>';
var pr=P[(i+6)%7],nx=P[(i+1)%7];
app.innerHTML='<div class="ph"><a class="back" href="#">← All disciplines</a><div style="margin-top:28px"><span class="badge">0'+(i+1)+' / 07</span></div><h1>'+p.t+'</h1><p>'+p.d+'</p></div>'+
'<div class="stage"><div class="big">'+p.f.split(' ').pop()+'</div><div class="pic">'+('<svg viewBox="0 0 200 260" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="100" cy="85" r="42" fill="#262626"/><path d="M20 260c0-70 35-100 80-100s80 30 80 100z" fill="#262626"/></svg><img src="'+im+'" alt="'+p.f+'" style="position:absolute;inset:0" onerror="this.remove()">')+'</div><label class="up">'+'Upload photo of '+p.f+'<input type="file" accept="image/*" id="up"></label><span class="l">0'+(i+1)+' / 07 · '+p.t+'</span><span class="r">'+p.f+'</span></div><div class="fig"><q>“'+p.q+'”</q><cite>— '+p.f+'</cite></div>'+
'<div class="stats"><div><b id="c1">'+a.length+'</b><small>Days done</small></div><div><b id="c2">'+streak(a)+'</b><small>Current streak</small></div><div><b>'+Math.max(0,Math.min(dn,90))+'</b><small>Current day · of 90</small></div></div>'+
'<div class="sec"><h2>90-day log</h2><span>'+(dn<1?'Locked until 19 Nov':dn>90?'Challenge complete':'Only today (day '+dn+') can be changed')+'</span></div><div class="grid">'+cells+'</div>'+
'<div class="sec"><h2>Today’s note</h2></div><textarea id="nt" placeholder="What did you do? What did you learn?"></textarea>'+
'<div class="pn"><a class="b" href="#'+pr.s+'">← '+pr.t+'</a><a class="b f" href="#'+nx.s+'">'+nx.t+' →</a></div>';
var nt=document.getElementById("nt"),key="mm:note:"+k+":"+dn;nt.value=g(key)||"";nt.disabled=dn<1||dn>90;nt.oninput=function(){st(key,nt.value)};
document.getElementById("up").onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var m=new Image();m.onload=function(){var s=Math.min(1,640/Math.max(m.width,m.height)),c=document.createElement("canvas");c.width=m.width*s;c.height=m.height*s;c.getContext("2d").drawImage(m,0,0,c.width,c.height);st("mm:img:"+k,c.toDataURL("image/jpeg",.85));page(k)};m.src=r.result};r.readAsDataURL(f)};
app.querySelector(".grid").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;var n=+b.dataset.n,x;if(n!==dayNo())return;x=a.indexOf(n);if(x>=0)a.splice(x,1);else a.push(n);st("mm:"+k,JSON.stringify(a));b.classList.toggle("on");document.getElementById("c1").textContent=a.length;document.getElementById("c2").textContent=streak(a)}}
function route(){var h=location.hash.slice(1);var q=dayNo();document.getElementById("dn").textContent=q<1?"Starts 19 Nov":"Day "+Math.min(q,90)+" / 90";window.scrollTo(0,0);h?page(h):home()}
document.addEventListener("click",function(e){var a=e.target.closest("[data-go]");if(!a)return;e.preventDefault();if(location.hash&&location.hash!=="#"){location.hash="";setTimeout(function(){var l=document.getElementById("list");l&&l.scrollIntoView()},50)}else{var l=document.getElementById("list");l&&l.scrollIntoView()}});
window.addEventListener("hashchange",route);route();
document.getElementById("th").onclick=function(){var r=document.documentElement;r.dataset.theme=r.dataset.theme==="light"?"dark":"light"};
