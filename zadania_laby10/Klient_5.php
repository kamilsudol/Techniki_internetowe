<?php
$client = new SoapClient("http://pascal.fis.agh.edu.pl/~8sudol/zadania_laby10/Serwer_5.php?wsdl");
  try {
         $wyniki = $client->getResults(5);
         print $wyniki ;
      }
  catch (SoapFault $exception)
      {
         echo $exception;
      }
?>