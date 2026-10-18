(function(){
var LESSONS=[["java basics.html","Java Basics","Syntax, structure and your first program"],["ControlStatements.html","Control Statements","if, switch, loops and branching"],["java array.html","Java Array","Declaring, indexing and looping arrays"],["java strings.html","Java String","Creating and working with strings"],["java string methods.html","Java String Methods","Common String API methods"],["java object class.html","Java Object Class","Classes, objects and methods"],["java inheritance.html","Java Inheritance","Reusing behaviour with extends"],["java polymorphism.html","Java Polymorphism","Overloading and overriding"],["abstraction.html","Java Abstraction","Abstract classes and interfaces"],["encapsulation.html","Java Encapsulation","Hiding state behind methods"]];
window.JL={lessons:LESSONS};
var root=document.documentElement,KEY="jl-theme";
function store(f){try{return f()}catch(e){return null}}
function theme(t){root.dataset.theme=t;store(function(){localStorage.setItem(KEY,t)})}
document.addEventListener("DOMContentLoaded",function(){
 var tb=document.getElementById("theme-toggle");
 if(tb)tb.addEventListener("click",function(){theme(root.dataset.theme==="dark"?"light":"dark")});
 var mt=document.getElementById("menu-toggle"),nl=document.getElementById("nav-links");
 if(mt)mt.addEventListener("click",function(){var o=nl.classList.toggle("open");mt.setAttribute("aria-expanded",o)});
 var inp=document.getElementById("search-input"),res=document.getElementById("search-results");
 if(inp)inp.addEventListener("input",function(){
  var q=inp.value.trim().toLowerCase();res.innerHTML="";res.hidden=!q;if(!q)return;
  var hits=LESSONS.filter(function(l){return (l[1]+" "+l[2]).toLowerCase().indexOf(q)>-1});
  if(!hits.length){res.innerHTML='<li class="empty">No lessons match “'+q.replace(/[<>&"]/g,"")+'”.</li>';return}
  hits.forEach(function(l){var li=document.createElement("li"),a=document.createElement("a");a.href=l[0];a.textContent=l[1];li.appendChild(a);res.appendChild(li)})});
 if(inp)inp.addEventListener("keydown",function(e){if(e.key==="Escape"){inp.value="";res.hidden=true}});
 document.querySelectorAll("[data-copy]").forEach(function(b){b.addEventListener("click",function(){
  var t=document.getElementById(b.dataset.copy).innerText;
  (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.textContent="Copied"},function(){b.textContent="Copy failed"});
  setTimeout(function(){b.textContent="Copy"},1500)})});
});
})();
