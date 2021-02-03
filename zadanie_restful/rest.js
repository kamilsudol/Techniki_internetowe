var request;
var objJSON;

function getRequestObject()      {
   if ( window.ActiveXObject)  {
      return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
   } else if (window.XMLHttpRequest)  {
      return (new XMLHttpRequest())  ;
   } else {
      return (null) ;
   }
}

function Add(){
   var description = "<p class=\"text-center\">";
   description += "<input type=\"text\" id=\"dev_name\" class=\"form-control\" placeholder=\"Nazwa urzadzenia\"> <br> ";
   description += "<input type=\"text\" class=\"form-control\" id=\"dev_temp\" placeholder=\"Proszę podać temperature\">";
   description += "<input type=\"text\" class=\"form-control\" id=\"dev_press\" placeholder=\"Proszę podać cisnienie\">";
   description += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"AddDB()\">Dodaj</button>"
   description += "<p>";
   document.getElementById("wyswietlacz").innerHTML = description;
}

function AddDB(){
   var device = {};
   device.name = document.getElementById("dev_name").value;
   device.temp = document.getElementById("dev_temp").value;
   device.pres = document.getElementById("dev_press").value;
   device.time = new Date();
   txt = JSON.stringify(device);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 || request.status == 400 )    {
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">"+tmp.return+"</div>";
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~8sudol/zadanie_restful/rest/device", true);
   request.send(txt);
}


function Find(){
   var description = "<p class=\"text-center\">";
   description += "<input type=\"text\" class=\"form-control\" id=\"dev_name\" placeholder=\"Nazwa urzadzenia\">";
   description += "<input type=\"text\" class=\"form-control\" id=\"dev_time\" placeholder=\"Proszę podać date\">";
   description += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"FindDB()\">Szukaj</button>"
   description += "<p>";
   document.getElementById("wyswietlacz").innerHTML = description;
}


function FindDB(){
   var device = {};
   device.name = document.getElementById("dev_name").value;
   device.time = document.getElementById("dev_time").value;
   txt = JSON.stringify(device);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 || request.status == 400 )    {
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = tmp.return;
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~8sudol/zadanie_restful/rest/find/", true);
   request.send(txt);
}

function Show(){
   var dev_name = [];
   var dev_temp = [];
   var dev_pres = [];
   var dev_time = [];
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4)    {
         objJSON = JSON.parse(request.response);
         for ( var id in objJSON )  {
            dev_name[id] = JSON.stringify(objJSON[id]["name"]);
            dev_temp[id] = JSON.stringify(objJSON[id]["temp"]);
            dev_temp[id] = JSON.stringify(objJSON[id]["pres"]);
            dev_temp[id] = JSON.stringify(objJSON[id]["time"]);
            }
            showRecords(dev_name, dev_temp, dev_pres, dev_time);
         }
      }
   request.open("GET", "http://pascal.fis.agh.edu.pl/~8sudol/zadanie_restful/rest/read", true);
   request.send(null);
}

function showRecords(dev_name, dev_temp, dev_pres, dev_time){
   var data = "<table class=\"table\"><tr><th scope=\"col\">Nazwa urzadzenia</th><th scope=\"col\">Temperatura</th><th scope=\"col\">Cisnienie</th><th scope=\"col\">Data</th></tr>";
   for (var i = 0; i < dev_name.length; i++) {
      data += "<tr><td>"+dev_name[i]+"</td><td>"+dev_temp[i]+"</td><td>"+dev_pres[i]+"</td><td>"+dev_time[i]+"</td></tr>";
   }
   data += "</table>";
   document.getElementById("wyswietlacz").innerHTML = data;
}