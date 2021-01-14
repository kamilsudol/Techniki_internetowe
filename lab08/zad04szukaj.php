<?php
function __autoload($class_name) {
include $class_name . '.php' ;
}
$user = new Register_new;
if($user->_is_logged()){
    $table = $user->szukaj();
    if(count($table) == 0){
        echo "Uzytkownika nie ma";
    }else{
        echo "Email: ".$table['email'];
        echo "<br/>";
        echo "Imie: ".$table['fname'];
        echo "<br/>";
        echo "Nazwisko: ".$table['lname'];
        echo "<br/>";
    }
    echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
}
?>