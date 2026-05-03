<?php

$new1 = __DIR__ . '/hello';

// Check if the folder doesn't exist
if (!is_dir($new1)) {
    // Create the folder
    if (mkdir($new1, 0777, true)) {
        echo "Folder created successfully.";
    } else {
        echo "Error creating folder.";
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Generate unique folder name
    $folderName = uniqid('compile_', true);
    $folderPath = __DIR__ . '/hello'.'/'. $folderName;
    mkdir($folderPath); // Create folder

    // Change directory to the newly created folder
    chdir($folderPath);
    session_start();
    // Get code and input from the request
    $code = $_POST['code'];
    $input = $_POST['input'];
    $_SESSION['java_code'] = $code;
    // Save Java code to a file
    $filename = 'Main.java';
    file_put_contents($filename, $code);

    // Compile Java code
    exec('javac ' . $filename . ' 2>&1', $output, $returnCode);

    if ($returnCode === 0) {
        // Run Java program with input
        $command = 'java Main';
        $descriptorspec = array(
            0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
            1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
            2 => array("pipe", "w")   // stderr is a pipe that the child will write to
        );

        $process = proc_open($command, $descriptorspec, $pipes);

        if (is_resource($process)) {
            fwrite($pipes[0], $input);
            fclose($pipes[0]);

            $output = stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            $error = stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            $returnCode = proc_close($process);

            // Display compilation error message with line number
            if (!empty($error)) {
                $errorLines = explode("\n", $error);
                foreach ($errorLines as $errorLine) {
                    // Extract line number from the error message
                    preg_match('/.*\.java:(\d+):/', $errorLine, $matches);
                    if (count($matches) === 2) {
                        $lineNumber = $matches[1];
                        $_SESSION['output']= $lineNumber.":".$errorLine;
                    } else {
                        echo "<p>Error: $errorLine</p>";

                    }
                   
                }
            } else {
                $_SESSION['output'] = $output;
                echo "<pre>Output:\n$output</pre>";
            }
        } else {
           
            echo "Error: Unable to create process.";
        }
    } else {
        echo "Error: Compilation failed.";
        // Display compilation error message
        $count=0;
        foreach ($output as $errorLine) {
            $_SESSION['output']=$_SESSION['output'].$errorLine;
            $count++;
            if($count==4){
                break;
            }
        }
    }

    // Clean up: remove temporary Java file and change back to the parent directory
    unlink($filename);
    chdir('..');
}
?>
<script>
    window.location.href="index.php";

</script>