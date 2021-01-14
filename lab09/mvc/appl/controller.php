<?php
 
 
abstract class controller {
 
   protected $css ;
   protected $menu ;
   protected $user;
    
   function __construct() {
	$this->user = new Register;
    $this->css  = "<link rel=\"stylesheet\" href=\"css/main.css\" type=\"text/css\" media=\"screen\" >" ;
    if(!$this->user->_is_logged()){
		$this->menu = file_get_contents ('template/menu1.tpl') ;
	}else{
		$this->menu = file_get_contents ('template/menu2.tpl') ;
	}
   }
 
   static function http404() {
      header('HTTP/1.1 404 Not Found') ;
      print '<!doctype html><html><head><title>404 Not Found</title></head><body><p>Invalid URL</p></body></html>' ;
      exit ;
   }
 
   function __call($name, $arguments)
   {
        self::http404();
   }
}
 
?>