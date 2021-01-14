<?php

class user extends controller {

   protected $layout ;
   protected $uzytkownik ;

   function __construct() {
      parent::__construct();
      $this->uzytkownik = new Register;
      $this->layout = new view('main');
      $this->layout->css = $this->css;
      $this->layout->menu = $this->menu;
   }

   function loginSite(){
      $this->layout->header = 'Logowanie';
      $this->view = new view('login');
      $this->layout->content = $this->view;
      return $this->layout;
   }

   function login(){
      $reg = new Register;
      $data = $_POST['data'];
      $db = json_decode($data);
      if(isset($db->email) and isset($db->haslo)) {
         $res = $this->uzytkownik->_login($db);
      }
      return ($res ? "Pomyslnie zalogowano" : "Nieprawidlowe dane") ;
   }

   function registerSite(){
      $this->layout->header = 'Rejestracja';
      $this->view = new view('register');
      $this->layout->content = $this->view;
      return $this->layout ;
   }

   function register(){
      $reg = new Register ;
      $data = $_POST['data'] ;
      $db = json_decode($data) ;
      if(isset($db->email) and isset($db->haslo)){
         $res = $this->uzytkownik->_save($db);
      }
      return ($res ? "Pomyslnie zarejestrowano uzytkownika" : "Nieprawidlowe dane") ;
   }

   function logOut(){
      $reg = new Register ;
      $data = $_POST['data'] ;
      $db = json_decode($data) ;
      if(isset($db->email) and isset($db->haslo)){
         $res = $this->uzytkownik->_logout($db);
      }
      $this->layout->header = $res;
      $this->view = new view('login');
      $this->layout->content = $this->view;
      return $this->layout;
   }

}?>
