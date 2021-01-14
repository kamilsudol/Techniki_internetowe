<?php
$client = new SoapClient(null, array(
      'location' => "http://pascal.fis.agh.edu.pl/~8sudol/cgi-bin/soap/Serwer_3.cgi",
      'uri'      => "//pascal.fis.agh.edu.pl/SoapServer",
      'soap_version' => SOAP_1_1 ,
      'trace'    => 1 ));
  
   $return = $client->__soapCall("add", array(1,2));
   echo("\nDodawanie: ".$return);

   $return = $client->__soapCall("subtract",array(1,2));
   echo("\nOdejmowanie: ".$return);

   $return = $client->__soapCall("multiply",array(1,2));
   echo("\nMnozenie: ".$return);

   $return = $client->__soapCall("divide",array(1,2));
   echo("\nDzielenie: ".$return);
  
?>