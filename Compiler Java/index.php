<?php
session_start();
$starter = "import java.util.*;\n\n// The class name must be Main\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}\n";
$code = isset($_SESSION['java_code']) && $_SESSION['java_code'] !== '' ? $_SESSION['java_code'] : $starter;
$output = isset($_SESSION['output']) ? $_SESSION['output'] : '';
$_SESSION['java_code'] = $starter;
$_SESSION['output'] = '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Compiler | Java Learner</title>
<script>try{var t=localStorage.getItem("jl-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/codemirror.min.css">
<link rel="stylesheet" href="../assets/site.css">
<link rel="stylesheet" href="compiler.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap">
<a class="brand" href="../index.html"><img src="../images/logo.png" alt="">Java Learner</a>
<button id="menu-toggle" class="btn icon-btn menu-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">&#9776;</button>
<nav aria-label="Main" style="display:contents"><ul id="nav-links" class="nav-links">
<li><a href="../index.html">Home</a></li><li><a href="../text.html">Lessons</a></li><li><a href="../videos.html">Videos</a></li><li><a href="../practice%20code.html">Practice</a></li><li><a href="../quizzes.html">Quizzes</a></li><li><a href="index.php" aria-current="page">Compiler</a></li></ul></nav>
<button id="theme-toggle" class="btn icon-btn" aria-label="Toggle dark mode" aria-pressed="false">&#9681;</button>
</div></header>
<main id="main" class="wrap">
<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a> / <span aria-current="page">Compiler</span></nav>
<h1 class="page-title">Java compiler</h1>
<p class="lead">Write a program, add any input it reads, then compile and run it. The class must be named <code>Main</code>.</p>
<form action="compiler.php" method="post" id="run-form">
<div class="editor"><label class="skip" for="javaCode">Java code</label><textarea id="javaCode" name="code" rows="14"><?php echo htmlspecialchars($code, ENT_QUOTES, 'UTF-8'); ?></textarea></div>
<div class="toolbar">
<button type="submit" name="btn" id="run" class="btn btn-primary">Compile &amp; Run</button>
<button type="button" id="reset" class="btn">Reset</button>
<button type="button" id="copy" class="btn">Copy code</button>
<span class="hint">Ctrl/Cmd + Enter to run</span>
</div>
<div class="io">
<div><label for="input">Runtime input</label><textarea id="input" name="input" placeholder="Text your program reads from System.in"></textarea></div>
<div><h2 id="out-h">Output</h2><pre id="output" role="status" aria-live="polite" aria-labelledby="out-h"<?php echo $output === '' ? ' class="empty"' : ''; ?>><?php echo $output === '' ? 'Run your code to see the output here.' : htmlspecialchars($output, ENT_QUOTES, 'UTF-8'); ?></pre></div>
</div>
</form>
</main>
<footer class="site-footer"><div class="wrap"><span>Java Learner</span><nav aria-label="Footer"><a href="../text.html">Lessons</a> · <a href="../practice%20code.html">Practice</a></nav></div></footer>
<div id="toast" class="toast" role="status" hidden></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/mode/clike/clike.min.js"></script>
<script src="../assets/site.js"></script>
<script>
var starter = <?php echo json_encode($starter); ?>;
var ed = CodeMirror.fromTextArea(document.getElementById("javaCode"), {lineNumbers:true, mode:"text/x-java", theme:"jl", indentUnit:4, styleActiveLine:false});
var form = document.getElementById("run-form"), run = document.getElementById("run");
form.addEventListener("submit", function(){ ed.save(); run.disabled = true; run.textContent = "Running…"; });
document.getElementById("reset").addEventListener("click", function(){ if (confirm("Replace your code with the starter program?")) ed.setValue(starter); });
document.getElementById("copy").addEventListener("click", function(){
  var b = this; (navigator.clipboard ? navigator.clipboard.writeText(ed.getValue()) : Promise.reject()).then(function(){ b.textContent = "Copied"; }, function(){ b.textContent = "Copy failed"; });
  setTimeout(function(){ b.textContent = "Copy code"; }, 1500);
});
ed.setOption("extraKeys", {"Ctrl-Enter": function(){ form.requestSubmit(); }, "Cmd-Enter": function(){ form.requestSubmit(); }});
</script>
</body>
</html>
