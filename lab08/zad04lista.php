<?php
function __autoload($class_name) {
include $class_name . '.php' ;
}
$user = new Register_new;
$rec = new Note;
if($user->_is_logged()){
    $table = $rec->_read_messages();
    echo "<h1>Informacje uzytkownika ".$_SESSION['user']." </h1>";
    foreach ( $table as $key => $record ) {
        echo "<p>". date('D Y-m-d H:m', intval($key)) ."</p>";
        echo "<p>".$record['wpis']."</p>";
    }
}
echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
?>