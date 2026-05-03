<?php 
echo "welcome to my first prgogram\n";
print("hi"); 
echo("$");
echo("1600");
//escape sequence
echo("welcome buddy $\"hello\" how are you");
print("hi hello\"buddy\"");
  
//print --> return 1;
// int print() --> syntax
//echo --> return 0;
//void echo()-->no return 
$name="barath";
$last="raj";
//difference between echo and print
echo "hello: ".$name,$last;
//print "hello: ".$name,$last; it provides error.
print "hello: ".$name; 

//variable
$n="barath"; 
echo "hello : $name";
print   "hello : $name";
//global variable accessing
$Name="barath";//global variable
$num=6;
function hareesh(){
    global$Name;
    global$num;
    $num1=12;
    $y=$GLOBALS['name'];
    echo "y: ".$y;
    print $num1;
    print $num;
    echo "name is:".$Name;
}
hareesh();

//reference variable  
$x="number";
$$x=100;
echo $x."</br>";
echo $$x."</br>";
echo $number."</br>";


?> 

