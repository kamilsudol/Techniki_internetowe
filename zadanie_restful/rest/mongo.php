<?php
  
//require 'vendor/autoload.php' ;
ini_set('display_errors', 1);

class db {
    private $user = "8sudol" ;
    private $pass = "pass8sudol";
    private $host = "172.20.44.25";
    private $base = "8sudol";
    private $deviceColl = "device";
    private $deviceCollection;

    private $conn;
    private $dbase;
    
    function __construct() {
      $this->conn = new MongoDB\Client("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");    
      $this->deviceCollection = $this->conn->{$this->base}->{$this->deviceColl};
    }
  
    function Read() {
      $cursor = $this->deviceCollection->find();
      $table = iterator_to_array($cursor);
      return $table ;
    }

    // function FindDevice($dev) {
    //   $cursor = $this->deviceCollection->find(array('name' => $dev['name'], 'time' => $dev['time']);
    //   $arr = iterator_to_array($cursor);
    //   return $arr ;
    // }

    function DeviceAdd($answers){
      $ret = $this->deviceCollection->insertOne($answers) ;
      return $ret;
    }
}
?>