<?php
class Register_new extends Register {
private $dbh;
private $dbfile = "files/datadb.db" ;
function __construct () {
parent::__construct() ;
session_start() ;
}
/* Zapis danych do bazy */
function _save () {
$this->dbh = dba_open( $this->dbfile, "c");
if ( !dba_exists($this->data['email'], $this->dbh )) {
$serialized_data = serialize($this->data) ;
dba_insert($this->data['email'],$serialized_data, $this->dbh) ;
$text = 'Dane zostaly zapisane' ;
} else {
$text = 'Dane dla podanego adresu e-mail sa w bazie danych' ;
}
dba_close($this->dbh) ;
return $text;
}
/* Logowanie uzytkownika do serwisu */
function _login() {
    $email = $_POST['email'] ;
    $pass = $_POST['pass'] ;
    $access = false ;
    $this->dbh = dba_open( $this->dbfile, "r");
    if ( ! dba_exists( $email ) ) {
    $serialized_data = dba_fetch($email, $this->dbh) ;
    $this->data = unserialize($serialized_data);
    if ($this->data ['pass'] == $pass ) {
    $_SESSION['auth'] = 'OK' ;
    $_SESSION['user'] = $email ;
    $access = true ;
    }
    }
    dba_close($this->dbh) ;
    $text = ( $access ? 'Uzytkownik zalogowany' : ' Uzytkownik niezalogowany ' ) ;
    return $text ;
    }
    /* Sprawdzamy czy uzytkownik jest zalogowany */
function _is_logged() {
    if ( isset ( $_SESSION['auth'] ) ) {
    $ret = $_SESSION['auth'] == 'OK' ? true : false ;
    } else { $ret = false ; }
    return $ret ;
    }
/* Wylogowanie uzytkownika do serwisu */
function _logout() {
    unset($_SESSION);
    session_destroy();
    $text = 'Uzytkownik wylogowany ' ;
    return $text ;
    }
/* Pobranie danych uzytkownika z bazy */
function _read_user() {
    $email = $_SESSION['user'] ;
    $this->dbh = dba_open( $this->dbfile, "r");
    if ( dba_exists( $email, $this->dbh ) ) {
    $serialized_data = dba_fetch($email, $this->dbh) ;
    $this->data = unserialize($serialized_data);
    }
    dba_close($this->dbh) ;
    }
    /* Pobranie danych uzytkownikow z bazy */
    function _read_all() {
    $table = array();
    $this->dbh = dba_open( $this->dbfile, "r");
    $key = dba_firstkey($this->dbh);
    while ($key) {
    $serialized_data = dba_fetch($key, $this->dbh) ;
    $this->data = unserialize($serialized_data);
    $table[$key]['email'] = $this->data['email'];
    $table[$key]['fname'] = $this->data['fname'];
    $table[$key]['lname'] = $this->data['lname'];
    $key = dba_nextkey($this->dbh);
    }
    dba_close($this->dbh) ;
    return $table;
    }

function szukaj() {
    $key = $_POST['email'] ;
    $this->dbh = dba_open( $this->dbfile, "r");
    $table = array();
    if(dba_exists($key, $this->dbh)){
        $serialized_data = dba_fetch($key, $this->dbh) ;
        $this->data = unserialize($serialized_data);
        $table['email'] = $this->data['email'];
        $table['fname'] = $this->data['fname'];
        $table['lname'] = $this->data['lname'];
    }
    dba_close($this->dbh) ;
    return $table;
}

}

?>