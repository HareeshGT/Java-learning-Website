<?php
 session_start();
 if(isset($_SESSION['java_code'])){
    $code=$_SESSION['java_code'];
    
 }
?>
<!DOCTYPE html>
<html>

<head>
    <title>Online Java Compiler</title>
    <!-- Include CodeMirror CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/codemirror.min.css">
    <!-- Include custom Eclipse theme -->
    <link rel="stylesheet" href="eclipse.css"> <!-- Adjust the path as per your project structure -->
    <!-- Custom CSS for additional styling -->
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Online Java Compiler</h1>
    <form action="compiler.php" method="post">
        <!-- Create a textarea with an ID for CodeMirror -->
        <textarea id="javaCode" name="code" rows="10" cols="50"><?php
        if(isset($_SESSION['java_code'])){
            $code=$_SESSION['java_code'];
            echo $code;
            $_SESSION['java_code']="
import java.util.*;

//Class name should be Main

public class Main{  
    public static void main(String[] args){  
     
    }
}";
        }
    ?></textarea><br>
        <div class="io-box">
            <label for="input-show">Runtime Input:</label>
            <label for="output-show">Output:</label>
        </div>

        <div class="io-code">
            <!-- Change input type to textarea -->
            <textarea id="input" name="input" rows="1" cols="5"></textarea>
            <textarea id="input" name="output" rows="1" cols="5" readonly><?php
        if(isset($_SESSION['output'])){
            $output=$_SESSION['output'];
            echo $output;
            $_SESSION['output']="";
        }
    ?></textarea>
        </div>
        <br>
        <button type="submit" name="btn" id="run">Compile & Run</button> <br>

    </form>
    <br> <br>

    <!-- Include CodeMirror JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/codemirror.min.js"></script>
    <!-- Include Java mode for syntax highlighting -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/mode/clike/clike.min.js"></script>
    <!-- Initialize CodeMirror -->
    <script>
        // Initialize CodeMirror on the textarea with ID 'javaCode'
        var javaCodeEditor = CodeMirror.fromTextArea(document.getElementById("javaCode"), {
            lineNumbers: true, // Show line numbers
            mode: "text/x-java", // Set mode to Java for syntax highlighting
            theme: "vibrant-ink" // Set the theme to 'eclipse'
        });

    </script>
</body>

</html>