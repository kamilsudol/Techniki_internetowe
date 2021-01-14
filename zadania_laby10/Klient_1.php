<?php
$debug  = 1;
   $client = new SoapClient(null, array(
      'location' => "http://pascal.fis.agh.edu.pl/~8sudol/zadania_laby10/Serwer_1.php",
      'uri'      => "http://pascal.fis.agh.edu.pl/Demo",
      'soap_version' => SOAP_1_2,
      'trace'    => $debug ));
  
   $return = $client->__soapCall("test",array(""));
   echo("\nReturning value of __soapCall() call: ".$return);
  
   if ( $debug == 1 ) {
  
   echo("\nDumping request headers:\n"
      .$client->__getLastRequestHeaders());
  
   echo("\nDumping request:\n".$client->__getLastRequest());
  
   echo("\nDumping response headers:\n"
      .$client->__getLastResponseHeaders());
  
   echo("\nDumping response:\n".$client->__getLastResponse());
  
   }
  
?>