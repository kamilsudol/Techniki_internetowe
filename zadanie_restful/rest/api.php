<?php
          
require '../vendor/autoload.php' ;        
require_once("rest.php");
require_once("mongo.php");
ini_set('display_errors', 1);
      
class API extends REST {
      
    public $data = "";
      
    public function __construct(){
        parent::__construct();      // Init parent contructor
        $this->db = new db() ;             // Initiate Database
    }
              
    public function processApi(){
  
        $func = "_".$this->_endpoint ; 
        if((int)method_exists($this,$func) > 0) {
            $this->$func();
              }  else {
            $this->response('Page not found',404); }         
    }

    private function _device() {
        if($this->get_request_method() != "POST") {
            $this->response('',406);
        }
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);
                $res = $this->db->DeviceAdd($json_array);
                if ( $res ) {
                    $result = array('return'=>'Pomyslnie dodano urzadzenie do bazy danych!');
                    $this->response($this->json($result), 200);
                } else {
                    $result = array('return'=>'Nieznany blad w czasie dodawania odpowiedzi urzadzenia do bazy danych!');
                    $this->response($this->json($result), 400);
                }
            } catch (Exception $e) {
                $this->response('', 400) ;
            }
        } else {
            $error = array('status' => "Failed", "msg" => "Invalid send data");
            $this->response($this->json($error), 400);
        }
    }

    private function _add() {
        if($this->get_request_method() != "POST") {
            $this->response('',406);
        }
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);
                $res = $this->db->AnswersAdd($json_array);
                if ( $res ) {
                    $result = array('return'=>'Pomyslnie dodano odpowiedzi do bazy danych po stronie serwera!');
                    $this->response($this->json($result), 200);
                } else {
                    $result = array('return'=>'Nieznany blad w czasie dodawania odpowiedzi do bazy danych po stronie serwera!');
                    $this->response($this->json($result), 400);
                }
            } catch (Exception $e) {
                $this->response('', 400) ;
            }
        } else {
            $error = array('status' => "Failed", "msg" => "Invalid send data");
            $this->response($this->json($error), 400);
        }
    }

    private function _find() {
        if($this->get_request_method() != "POST") {
            $this->response('',406);
        }
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);
                $res = $this->db->FindDevice($json_array);
                if ( $res ) {
                    // $result = array('return'=>'Pomyslnie dodano odpowiedzi do bazy danych po stronie serwera!');
                    $this->response($this->json($res), 200);
                } else {
                    // $result = array('return'=>'Nieznany blad w czasie dodawania odpowiedzi do bazy danych po stronie serwera!');
                    // $this->response($this->json($result), 400);
                }
            } catch (Exception $e) {
                $this->response('', 400) ;
            }
        } else {
            $error = array('status' => "Failed", "msg" => "Invalid send data");
            $this->response($this->json($error), 400);
        }
    }

    private function _read(){   
        if($this->get_request_method() != "GET"){
            $this->response('',406);
        }
        $result = $this->db->Read() ;            
        $this->response($this->json($result), 200); 
    }
  
    private function json($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }
}
          
    $api = new API();
    $api->processApi();
  
?>