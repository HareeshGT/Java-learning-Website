(function(){
var root=document.documentElement,JL=window.JL=window.JL||{lessons:[],index:[]};
function load(k){try{var v=JSON.parse(localStorage.getItem(k));return Array.isArray(v)?v.filter(function(x){return typeof x==="string"}):[]}catch(e){return[]}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function last(){try{return localStorage.getItem("jl-last")}catch(e){return null}}
function toast(m){var t=document.getElementById("toast");if(!t)return;t.textContent=m;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(function(){t.hidden=true},1800)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function title(f){for(var i=0;i<JL.lessons.length;i++)if(JL.lessons[i][0]===f)return JL.lessons[i][1];return null}
var KW="abstract assert boolean break byte case catch char class continue default do double else enum extends final finally float for if implements import instanceof int interface long new package private protected public return short static super switch this throw throws try void volatile while true false null var String".split(" ");
var RX=new RegExp("(\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)|(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*')|\\b("+KW.join("|")+")\\b|\\b(\\d+(?:\\.\\d+)?[fFLdD]?)\\b","g");
function hl(t){var o="",i=0,m;RX.lastIndex=0;while((m=RX.exec(t))){o+=esc(t.slice(i,m.index));o+='<span class="'+(m[1]?"c":m[2]?"s":m[3]?"k":"n")+'">'+esc(m[0])+"</span>";i=RX.lastIndex}return o+esc(t.slice(i))}
document.addEventListener("DOMContentLoaded",function(){
 var tb=document.getElementById("theme-toggle");
 if(tb)tb.addEventListener("click",function(){var t=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=t;try{localStorage.setItem("jl-theme",t)}catch(e){}tb.setAttribute("aria-pressed",t==="dark")});
 var mt=document.getElementById("menu-toggle"),nl=document.getElementById("nav-links");
 if(mt)mt.addEventListener("click",function(){mt.setAttribute("aria-expanded",nl.classList.toggle("open"))});
 /* code blocks */
 document.querySelectorAll(".prose pre").forEach(function(pre){
  var code=pre.textContent.replace(/\n+$/,""),w=document.createElement("div");w.className="codeblock";
  w.innerHTML='<div class="code-head"><span>Java</span><button type="button">Copy</button></div><pre><code></code></pre>';
  w.querySelector("code").innerHTML=hl(code);pre.replaceWith(w);
  var b=w.querySelector("button");b.setAttribute("aria-label","Copy code");
  b.addEventListener("click",function(){(navigator.clipboard?navigator.clipboard.writeText(code):Promise.reject()).then(function(){b.textContent="Copied";toast("Code copied")},function(){toast("Copy failed")});setTimeout(function(){b.textContent="Copy"},1500)})});
 document.querySelectorAll("pre.code").forEach(function(p){p.firstChild.innerHTML=hl(p.textContent)});
 document.querySelectorAll("[data-copy]").forEach(function(b){b.addEventListener("click",function(){var t=document.getElementById(b.dataset.copy).textContent;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){toast("Code copied")},function(){toast("Copy failed")})})});
 /* search */
 var inp=document.getElementById("search-input"),res=document.getElementById("search-results");
 function run(){var q=inp.value.trim().toLowerCase();res.innerHTML="";res.hidden=!q;inp.setAttribute("aria-expanded",!!q);if(!q)return;
  var hits=JL.index.filter(function(e){return(e.t+" "+e.x).toLowerCase().indexOf(q)>-1}).slice(0,30);
  if(!hits.length){res.innerHTML='<li class="empty">No results for “'+esc(inp.value.trim())+'”. Try a topic such as “array” or “loop”.</li>';return}
  var g="";hits.forEach(function(e){if(e.g!==g){g=e.g;res.insertAdjacentHTML("beforeend",'<li class="grp">'+esc(g)+"</li>")}
   res.insertAdjacentHTML("beforeend",'<li><a href="'+esc(e.u)+'">'+esc(e.t)+"<br><small>"+esc(e.x)+"</small></a></li>")})}
 if(inp){inp.addEventListener("input",run);
  inp.addEventListener("keydown",function(e){if(e.key==="Escape"){inp.value="";run()}if(e.key==="ArrowDown"){var a=res.querySelector("a");if(a){e.preventDefault();a.focus()}}});
  res.addEventListener("keydown",function(e){var a=[].slice.call(res.querySelectorAll("a")),i=a.indexOf(document.activeElement);
   if(e.key==="ArrowDown"&&i<a.length-1){e.preventDefault();a[i+1].focus()}else if(e.key==="ArrowUp"){e.preventDefault();(i>0?a[i-1]:inp).focus()}else if(e.key==="Escape"){inp.focus()}});
  document.addEventListener("click",function(e){if(!e.target.closest(".search"))res.hidden=true})}
 /* lesson progress */
 var m=document.querySelector("main[data-lesson]");
 if(m){var f=m.dataset.lesson;try{localStorage.setItem("jl-last",f)}catch(e){}
  var d=document.getElementById("btn-done"),b=document.getElementById("btn-bm");
  function paint(){var D=load("jl-done").indexOf(f)>-1,B=load("jl-bm").indexOf(f)>-1;
   d.setAttribute("aria-pressed",D);d.textContent=D?"✓ Completed":"Mark as complete";b.setAttribute("aria-pressed",B);b.textContent=B?"Bookmarked":"Bookmark"}
  function flip(k,msgOn,msgOff){var a=load(k),i=a.indexOf(f);if(i>-1){a.splice(i,1);toast(msgOff)}else{a.push(f);toast(msgOn)}save(k,a);paint()}
  d.addEventListener("click",function(){flip("jl-done","Lesson marked complete","Completion removed")});
  b.addEventListener("click",function(){flip("jl-bm","Lesson bookmarked","Bookmark removed")});paint()}
 /* dashboard */
 var dash=document.getElementById("dash");
 if(dash){var done=load("jl-done").filter(title),bm=load("jl-bm").filter(title),L=last(),n=JL.lessons.length,p=Math.round(done.length/n*100);
  var next=null;for(var i=0;i<n;i++)if(done.indexOf(JL.lessons[i][0])<0){next=JL.lessons[i];break}
  var h='<p><strong>'+done.length+" of "+n+' lessons completed</strong> <small>(saved in this browser only)</small></p><div class="progress" role="progressbar" aria-valuenow="'+p+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+p+'%"></i></div><p class="actions">';
  if(L&&title(L))h+='<a class="btn btn-primary" href="'+esc(L)+'">Continue: '+esc(title(L))+"</a>";
  if(next&&next[0]!==L)h+='<a class="btn" href="'+esc(next[0])+'">Next up: '+esc(next[1])+"</a>";
  h+="</p>";if(bm.length)h+="<h3>Bookmarks</h3><ul>"+bm.map(function(f){return'<li><a href="'+esc(f)+'">'+esc(title(f))+"</a></li>"}).join("")+"</ul>";
  dash.innerHTML=h;
  document.querySelectorAll("[data-badge]").forEach(function(e){if(done.indexOf(e.dataset.badge)>-1){e.textContent="✓ Completed"}})}
 /* tabs */
 var tabs=document.querySelectorAll("[data-tabs] button");
 if(tabs.length){var panels=document.querySelectorAll("[data-panel]");
  function show(id){tabs.forEach(function(t){t.setAttribute("aria-selected",t.dataset.tab===id)});panels.forEach(function(p){p.hidden=p.dataset.panel!==id})}
  tabs.forEach(function(t){t.addEventListener("click",function(){show(t.dataset.tab);history.replaceState(null,"","#"+t.dataset.tab)})});
  show((location.hash||"").slice(1)||tabs[0].dataset.tab)}
 /* quiz */
 var qa=document.getElementById("quiz");
 if(qa&&JL.quiz){var sel=document.getElementById("quiz-topic"),Q,i,score,rev;
  Object.keys(JL.quiz).forEach(function(f){sel.insertAdjacentHTML("beforeend",'<option value="'+esc(f)+'">'+esc(title(f)||f)+"</option>")});
  function start(){var f=sel.value;Q=f==="all"?[].concat.apply([],Object.keys(JL.quiz).map(function(k){return JL.quiz[k]})):JL.quiz[f];i=0;score=0;rev=[];ask()}
  function ask(){var q=Q[i];qa.innerHTML='<form><fieldset><legend>Question '+(i+1)+" of "+Q.length+": "+esc(q[0])+"</legend>"+q[1].map(function(o,k){return'<label><input type="radio" name="a" value="'+k+'" required> '+esc(o)+"</label>"}).join("")+'</fieldset><button class="btn btn-primary">Check answer</button><div id="fb" role="status" aria-live="polite"></div></form>';
   qa.querySelector("form").addEventListener("submit",function(e){e.preventDefault();var v=+qa.querySelector("input:checked").value,ok=v===q[2];if(ok)score++;rev.push([q,v,ok]);
    qa.querySelectorAll("input").forEach(function(x){x.disabled=true});this.querySelector("button").remove();
    document.getElementById("fb").innerHTML='<p class="'+(ok?"ok":"bad")+'"><strong>'+(ok?"✓ Correct.":"✗ Not quite. Answer: "+esc(q[1][q[2]]))+"</strong> "+esc(q[3])+'</p><button type="button" class="btn">'+(i+1<Q.length?"Next question":"See results")+"</button>";
    document.querySelector("#fb button").addEventListener("click",function(){i++;i<Q.length?ask():done()})})}
  function done(){qa.innerHTML="<h2>Score: "+score+" / "+Q.length+'</h2><ol>'+rev.map(function(r){return"<li><span class=\""+(r[2]?"ok":"bad")+'">'+(r[2]?"✓":"✗")+"</span> "+esc(r[0][0])+"<br><small>Your answer: "+esc(r[0][1][r[1]])+(r[2]?"":" · Correct: "+esc(r[0][1][r[0][2]]))+"</small></li>"}).join("")+'</ol><button class="btn btn-primary" id="retry">Retry</button>';
   document.getElementById("retry").addEventListener("click",start)}
  document.getElementById("quiz-start").addEventListener("click",start)}
});
})();
