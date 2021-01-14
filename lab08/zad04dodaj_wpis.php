<?php
function __autoload($class_name) {
include $class_name . '.php' ;
}
$user = new Register_new;
$rec = new Note;
if($user->_is_logged()){
    $rec->_read();
    $rec->_save_messages();
    echo "<p>Dodano nowy wpis!</p>";
}
echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
?>