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
// Photo: <slug>.webp in the same folder as index.html (e.g. meditation.webp)
function photo(slug){return slug+".webp"}
function ini(f){return f.split(" ").map(function(w){return w[0]}).slice(0,2).join("")}
function star(c,s,x,y,r){return '<svg viewBox="0 0 100 100" style="width:'+s+'px;height:'+s+'px;left:'+x+';top:'+y+';transform:rotate('+r+'deg)"><use href="#s" fill="url(#g)" stroke="rgba(255,255,255,.5)" stroke-width=".5"/></svg>'}
var app=document.getElementById("app");
function home(){
var d=Math.min(dayNo(),90);
app.innerHTML='<section class="hero"><div><span class="badge"><i></i>'+(dayNo()<1?'Day 1 starts 19 Nov 2026':'Day '+d+' of 90 · Monk mode is on')+'</span><h1>Ninety days.<br>One discipline.</h1><p>Seven daily practices. One quiet log. Silence the noise and build the person you intend to be.</p><div class="cta"><a class="b f" href="#progress">Track progress →</a><a class="b" href="#quotes">Quotes</a><a class="b" href="#" data-go="list">Disciplines</a></div></div><div class="stars">'+star(0,300,"22%","4%",0)+star(0,110,"2%","58%",12)+star(0,64,"78%","70%",-8)+'</div></section>'+
'<div class="strip">'+P.map(function(p){return '<a href="#'+p.s+'">'+p.t+'</a>'}).join("")+'</div>'+
'<div class="sec" id="list"><h2>The seven disciplines</h2><span>Tap to open</span></div><div class="cards">'+P.map(function(p,i){return '<a class="card" href="#'+p.s+'"><div class="top"><span>0'+(i+1)+'</span><span class="av" style="position:relative;overflow:hidden">'+ini(p.f)+'</span></div><h3>'+p.t+'</h3><small>'+p.f+' · '+load(p.s).length+' / 90 days</small></a>'}).join("")+'</div>'}
function page(k){
if(k==="progress")return prog();if(k==="quotes")return quotes();
var i=P.findIndex(function(p){return p.s===k}),p=P[i];if(!p)return home();
var a=load(k),dn=dayNo(),im=photo(k),cells="";
for(var n=1;n<=90;n++)cells+='<button data-n="'+n+'"'+(n===dn?'':' disabled')+' class="'+(a.indexOf(n)>=0?"on ":"")+(n===dn?"today":"")+'">'+n+'</button>';
var pr=P[(i+6)%7],nx=P[(i+1)%7];
app.innerHTML='<div class="ph"><a class="back" href="#">← All disciplines</a><div style="margin-top:28px"><span class="badge">0'+(i+1)+' / 07</span></div><h1>'+p.t+'</h1><p>'+p.d+'</p></div>'+
'<div class="stage"><div class="big">'+p.f.split(' ').pop()+'</div><div class="pic">'+('<svg viewBox="0 0 200 260" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="100" cy="85" r="42" fill="#262626"/><path d="M20 260c0-70 35-100 80-100s80 30 80 100z" fill="#262626"/></svg><img src="'+im+'" alt="'+p.f+'" width="470" height="590" fetchpriority="high" decoding="async" style="position:absolute;inset:0" onerror="this.remove()">')+'</div><span class="l">0'+(i+1)+' / 07 · '+p.t+'</span><span class="r">'+p.f+'</span></div><div class="fig"><q>“'+p.q+'”</q><cite>— '+p.f+'</cite></div>'+
'<div class="stats"><div><b id="c1">'+a.length+'</b><small>Days done</small></div><div><b id="c2">'+streak(a)+'</b><small>Current streak</small></div><div><b>'+Math.max(0,Math.min(dn,90))+'</b><small>Current day · of 90</small></div></div>'+
'<div class="sec"><h2>90-day log</h2><span>'+(dn<1?'Locked until 19 Nov':dn>90?'Challenge complete':'Only today (day '+dn+') can be changed')+'</span></div><div class="grid">'+cells+'</div>'+
'<div class="sec"><h2>Today’s note</h2></div><textarea id="nt" placeholder="What did you do? What did you learn?"></textarea>'+
'<div class="pn"><a class="b" href="#'+pr.s+'">← '+pr.t+'</a><a class="b f" href="#'+nx.s+'">'+nx.t+' →</a></div>';
var nt=document.getElementById("nt"),key="mm:note:"+k+":"+dn;nt.value=g(key)||"";nt.disabled=dn<1||dn>90;nt.oninput=function(){st(key,nt.value)};
app.querySelector(".grid").onclick=function(e){var b=e.target.closest("button");if(!b||b.disabled)return;var n=+b.dataset.n,x;if(n!==dayNo())return;x=a.indexOf(n);if(x>=0)a.splice(x,1);else a.push(n);st("mm:"+k,JSON.stringify(a));b.classList.toggle("on");document.getElementById("c1").textContent=a.length;document.getElementById("c2").textContent=streak(a)}}
var Q=[
"The impediment to action advances action. What stands in the way becomes the way.|Marcus Aurelius",
"Waste no more time arguing about what a good man should be. Be one.|Marcus Aurelius",
"If it is not right, do not do it; if it is not true, do not say it.|Marcus Aurelius",
"Our life is what our thoughts make it.|Marcus Aurelius",
"Very little is needed to make a happy life; it is all within yourself, in your way of thinking.|Marcus Aurelius",
"The soul becomes dyed with the color of its thoughts.|Marcus Aurelius",
"We suffer more often in imagination than in reality.|Seneca",
"It is not that we have a short time to live, but that we waste much of it.|Seneca",
"Difficulties strengthen the mind, as labor does the body.|Seneca",
"Begin at once to live, and count each separate day as a separate life.|Seneca",
"As is a tale, so is life: not how long it is, but how good it is, is what matters.|Seneca",
"While we wait for life, life passes.|Seneca",
"No man is free who is not master of himself.|Epictetus",
"Make the best use of what is in your power, and take the rest as it happens.|Epictetus",
"First say to yourself what you would be; and then do what you have to do.|Epictetus",
"Wealth consists not in having great possessions, but in having few wants.|Epictetus",
"It’s not what happens to you, but how you react to it that matters.|Epictetus",
"We are what we repeatedly do. Excellence, then, is not an act, but a habit.|Will Durant",
"Well begun is half done.|Aristotle",
"The beginning is the most important part of the work.|Plato",
"The unexamined life is not worth living.|Socrates",
"If you have a garden and a library, you have everything you need.|Cicero",
"The journey of a thousand miles begins with a single step.|Lao Tzu",
"He who conquers others is strong; he who conquers himself is mighty.|Lao Tzu",
"Knowing others is intelligence; knowing yourself is true wisdom.|Lao Tzu",
"It does not matter how slowly you go as long as you do not stop.|Confucius",
"He who learns but does not think is lost.|Confucius",
"Better than a thousand hollow words is one word that brings peace.|The Buddha",
"He who has a why to live for can bear almost any how.|Friedrich Nietzsche",
"What does not kill me makes me stronger.|Friedrich Nietzsche",
"When we are no longer able to change a situation, we are challenged to change ourselves.|Viktor Frankl",
"In the midst of winter, I found there was, within me, an invincible summer.|Albert Camus",
"Do nothing that is of no use.|Miyamoto Musashi",
"Do what you can, with what you have, where you are.|Theodore Roosevelt",
"Nothing in the world is worth having or worth doing unless it means effort, pain, difficulty.|Theodore Roosevelt",
"You must do the thing you think you cannot do.|Eleanor Roosevelt",
"Alone we can do so little; together we can do so much.|Helen Keller",
"Life is either a daring adventure or nothing at all.|Helen Keller",
"Nothing will work unless you do.|Maya Angelou",
"We may encounter many defeats but we must not be defeated.|Maya Angelou",
"It always seems impossible until it’s done.|Nelson Mandela",
"Education is the passport to the future.|Malcolm X",
"Go confidently in the direction of your dreams. Live the life you’ve imagined.|Henry David Thoreau",
"It’s not what you look at that matters, it’s what you see.|Henry David Thoreau",
"Nothing great was ever achieved without enthusiasm.|Ralph Waldo Emerson",
"Do the thing and you will have the power.|Ralph Waldo Emerson",
"The best way out is always through.|Robert Frost",
"The world breaks everyone, and afterward many are strong at the broken places.|Ernest Hemingway",
"Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.|Samuel Beckett",
"Nothing will ever be attempted if all possible objections must first be overcome.|Samuel Johnson",
"Perfect is the enemy of good.|Voltaire",
"Well done is better than well said.|Benjamin Franklin",
"Lost time is never found again.|Benjamin Franklin",
"Genius is one percent inspiration and ninety-nine percent perspiration.|Thomas Edison",
"Imagination is more important than knowledge.|Albert Einstein",
"Strive not to be a success, but rather to be of value.|Albert Einstein",
"Knowing is not enough; we must apply. Willing is not enough; we must do.|Johann Wolfgang von Goethe",
"Stay hungry. Stay foolish.|Steve Jobs",
"Your time is limited, so don’t waste it living someone else’s life.|Steve Jobs",
"Design is not just what it looks like and feels like. Design is how it works.|Steve Jobs",
"Desire is a contract you make with yourself to be unhappy until you get what you want.|Naval Ravikant",
"Earn with your mind, not your time.|Naval Ravikant",
"Read what you love until you love to read.|Naval Ravikant",
"Peace is happiness at rest.|Naval Ravikant",
"Risk comes from not knowing what you’re doing.|Warren Buffett",
"Someone is sitting in the shade today because someone planted a tree a long time ago.|Warren Buffett",
"Do not save what is left after spending; instead spend what is left after saving.|Warren Buffett",
"The best investment you can make is an investment in yourself.|Warren Buffett",
"Spend each day trying to be a little wiser than you were when you woke up.|Charlie Munger",
"You do not rise to the level of your goals. You fall to the level of your systems.|James Clear",
"Every action you take is a vote for the type of person you wish to become.|James Clear",
"Discipline is the bridge between goals and accomplishment.|Jim Rohn",
"Discipline equals freedom.|Jocko Willink",
"Who’s gonna carry the boats?|David Goggins",
"Stay hard.|David Goggins",
"Ease is a greater threat to progress than hardship.|Denzel Washington",
"Fall forward.|Denzel Washington",
"Don’t just aspire to make a living. Aspire to make a difference.|Denzel Washington",
"Be water, my friend.|Bruce Lee",
"Absorb what is useful, discard what is not, add what is uniquely your own.|Bruce Lee",
"Suffer now and live the rest of your life as a champion.|Muhammad Ali",
"He who is not courageous enough to take risks will accomplish nothing in life.|Muhammad Ali",
"I’ve failed over and over and over again in my life. And that is why I succeed.|Michael Jordan",
"Everything negative, pressure and challenges, is all an opportunity for me to rise.|Kobe Bryant",
"It ain’t about how hard you hit. It’s about how hard you can get hit and keep moving forward.|Rocky Balboa",
"Everyone has a plan until they get punched in the mouth.|Mike Tyson",
"Why do we fall? So we can learn to pick ourselves up.|Thomas Wayne, Batman Begins",
"It’s not who I am underneath, but what I do that defines me.|Batman Begins",
"Yeah, I’m thinking I’m back.|John Wick",
"Perfection is not attainable, but if we chase perfection we can catch excellence.|Vince Lombardi",
"Do not let what you cannot do interfere with what you can do.|John Wooden",
"It’s the little details that are vital. Little things make big things happen.|John Wooden",
"If you can’t fly then run, if you can’t run then walk, if you can’t walk then crawl, but whatever you do you have to keep moving forward.|Martin Luther King Jr.",
"When something is important enough, you do it even if the odds are not in your favor.|Elon Musk",
"Good design is as little design as possible.|Dieter Rams",
"Design is so simple, that’s why it is so complicated.|Paul Rand",
"If you can design one thing, you can design everything.|Massimo Vignelli",
"The details are not the details. They make the design.|Charles Eames",
"Less is more.|Ludwig Mies van der Rohe",
"There are three responses to a piece of design: yes, no, and WOW! Wow is the one to aim for.|Milton Glaser"
];
function prog(){
var dn=dayNo(),el=Math.max(0,Math.min(dn,90)),D=P.map(function(p){return load(p.s)}),per=[];
for(var n=1;n<=90;n++){var c=0;D.forEach(function(a){if(a.indexOf(n)>=0)c++});per.push(c)}
var tot=D.reduce(function(s,a){return s+a.length},0),perfect=per.filter(function(c){return c===7}).length,pct=el?Math.round(tot/(el*7)*100):0,best=Math.max.apply(null,D.map(function(a){return streak(a)}));
app.innerHTML='<div class="ph"><a class="back" href="#">← Home</a><div style="margin-top:28px"><span class="badge">Overview</span></div><h1>Progress</h1><p>Every discipline, every day, in one place.</p></div>'+
'<div class="stats"><div><b>'+tot+'</b><small>Check-ins · of 630</small></div><div><b>'+pct+'%</b><small>Completion so far</small></div><div><b>'+perfect+'</b><small>Perfect days</small></div><div><b>'+best+'</b><small>Best current streak</small></div></div>'+
'<div class="sec"><h2>Daily completion</h2><span>Disciplines done per day</span></div><div class="bars">'+per.map(function(c,i){return '<span class="'+(c?'':'z ')+(i+1===dn?'t':'')+'" title="Day '+(i+1)+': '+c+'/7" style="height:'+Math.max(2,c/7*100)+'%"></span>'}).join("")+'</div>'+
'<div class="sec"><h2>By discipline</h2><span>Each square is a day</span></div>'+P.map(function(p,j){var a=D[j],h="";for(var n=1;n<=90;n++)h+='<i class="'+(a.indexOf(n)>=0?"on":"")+(n===dn?" t":"")+'"></i>';return '<a class="hr" href="#'+p.s+'"><div><span>'+p.t+'</span><small>'+a.length+' / 90</small></div><div class="heat">'+h+'</div></a>'}).join("")+
'<div class="pn"><a class="b" href="#">← Home</a><a class="b f" href="#quotes">Quotes →</a></div>'}
function quotes(){
app.innerHTML='<div class="ph"><a class="back" href="#">← Home</a><div style="margin-top:28px"><span class="badge">100 quotes</span></div><h1>Quotes</h1><p>One hundred lines to read when motivation runs low.</p></div><div class="ql">'+Q.map(function(x,i){var t=x.split("|");return '<div class="qi"><span class="qn">'+String(i+1).padStart(3,"0")+'</span><div><q>“'+t[0]+'”</q><cite>— '+t[1]+'</cite></div></div>'}).join("")+'</div><div class="pn"><a class="b" href="#">← Home</a><a class="b f" href="#progress">Progress →</a></div>'}
function route(){var h=location.hash.slice(1);var q=dayNo();document.getElementById("dn").textContent=q<1?"Starts 19 Nov":"Day "+Math.min(q,90)+" / 90";window.scrollTo(0,0);h?page(h):home()}
document.addEventListener("click",function(e){var a=e.target.closest("[data-go]");if(!a)return;e.preventDefault();if(location.hash&&location.hash!=="#"){location.hash="";setTimeout(function(){var l=document.getElementById("list");l&&l.scrollIntoView()},50)}else{var l=document.getElementById("list");l&&l.scrollIntoView()}});
window.addEventListener("hashchange",route);route();
document.getElementById("th").onclick=function(){var r=document.documentElement;r.dataset.theme=r.dataset.theme==="light"?"dark":"light"};
