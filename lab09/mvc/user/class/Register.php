<?php
class Register{

   static $dbfile = 'sqlite:sql/dbase.db' ;
   protected static $db ;
   private $sth ;

   function __construct () {
      //session_start() ;
      self::$db = new PDO ( self::$dbfile ) ;
      self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) ;
   }

   function _is_logged() {
      if (isset($_SESSION['is_ok'])){
         $ret = $_SESSION['is_ok'] == 'y' ? true : false;
      }else{
         $ret = false;
      }
      return $ret;
   }

   public function _save ($uzytkownik) {
      $this->sth = self::$db->prepare('INSERT INTO user VALUES (:email, :haslo)');
      $this->sth->bindValue(':email',$uzytkownik->email,PDO::PARAM_STR) ;
      $this->sth->bindValue(':haslo',md5($uzytkownik->haslo),PDO::PARAM_STR) ;
      $resp = ($this->sth->execute() ? 'true' : 'false');
      return $resp;
   }

   public function _login($uzytkownik) {
      $dostep = 'false' ;
      $this->sth = self::$db->prepare('SELECT haslo FROM user WHERE email=:email');
      $this->sth->bindValue(':email',$uzytkownik->email,PDO::PARAM_STR);
      $this->sth->execute();
      $resp = ($this->sth->fetch()) ;
      if($resp['haslo'] == md5($uzytkownik->haslo)){
         $_SESSION['user'] = $uzytkownik->email;
         $dostep = 'true';
         $_SESSION['is_ok'] = 'y';
      }
      return $dostep ;

   }

   function _logout() {
      unset($_SESSION);
      session_destroy();
      return 'Wylogowano';
   }
}?>