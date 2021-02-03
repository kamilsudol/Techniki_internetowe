window.onload = elementsLoad();//wczytanie elementow w zaleznosci od trwajacaej sesji

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

function LoginWrapper(){//funkcja wyswietlajaca formularz logowania 
   var login = "<div class=\"text_center\"><input type=\"text\" id=\"log\" class=\"form-control\" placeholder=\"Proszę podać login\"> <br> <input type=\"password\" class=\"form-control\" id=\"pass\" placeholder=\"Proszę podać hasło\"> <br><br> <button type=\"button\" class=\"btn btn-dark\" onclick=\"Login(); return false;\">Zaloguj się</button></div>"
   document.getElementById("wyswietlacz").innerHTML = login;
}

function RegisterWrapper(){//funkcja wyswietlajaca formularz rejestracji
   var register = "<div class=\"text_center\"><input type=\"text\" class=\"form-control\" id=\"reg_log\" placeholder=\"Proszę podać login\"> <br> <input type=\"password\" class=\"form-control\" id=\"reg_pass\" placeholder=\"Proszę podać hasło\"> <br> <input type=\"password\" class=\"form-control\" id=\"reg_pass_check\" placeholder=\"Proszę powtórzyć hasło\"> <br><br> <button type=\"button\" class=\"btn btn-dark\" onclick=\"Register(); return false;\">Zarejestruj się</button></div>"
   document.getElementById("wyswietlacz").innerHTML = register;
}

function QuestionsWrapper(){//funkcja wyswietlajaca formularz ankiety
   var questions = "<br><h4>Jak w skali od 1 do 5 oceniasz swój ostatni sen?</h4> ";
   questions += "<input type=\"radio\" id=\"q1_1\" value=\"1\" name=\"q1\"> <label for=\"q1_1\"> 1 - bardzo źle </label><br>";
   questions += "<input type=\"radio\" id=\"q1_2\" value=\"2\" name=\"q1\"> <label for=\"q1_2\"> 2 - źle </label><br>";
   questions += "<input type=\"radio\" id=\"q1_3\" value=\"3\" name=\"q1\"> <label for=\"q1_3\"> 3 - średnio </label><br>";
   questions += "<input type=\"radio\" id=\"q1_4\" value=\"4\" name=\"q1\"> <label for=\"q1_4\"> 4 - dobrze </label><br>";
   questions += "<input type=\"radio\" id=\"q1_5\" value=\"5\" name=\"q1\"> <label for=\"q1_5\"> 5 - bardzo dobrze </label><br><br>";

   questions += "<h4>Jak w skali od 1 do 5 oceniasz swój ostatni posiłek?</h4> ";
   questions += "<input type=\"radio\" id=\"q2_1\" value=\"1\" name=\"q2\"> <label for=\"q2_1\"> 1 - bardzo źle </label><br>";
   questions += "<input type=\"radio\" id=\"q2_2\" value=\"2\" name=\"q2\"> <label for=\"q2_2\"> 2 - źle </label><br>";
   questions += "<input type=\"radio\" id=\"q2_3\" value=\"3\" name=\"q2\"> <label for=\"q2_3\"> 3 - średnio </label><br>";
   questions += "<input type=\"radio\" id=\"q2_4\" value=\"4\" name=\"q2\"> <label for=\"q2_4\"> 4 - dobrze </label><br>";
   questions += "<input type=\"radio\" id=\"q2_5\" value=\"5\" name=\"q2\"> <label for=\"q2_5\"> 5 - bardzo dobrze </label><br><br>";

   questions += "<h4>Jak w skali od 1 do 5 oceniasz ostatni obejrzany przez ciebie film?</h4> ";
   questions += "<input type=\"radio\" id=\"q3_1\" value=\"1\" name=\"q3\"> <label for=\"q3_1\"> 1 - bardzo źle </label><br>";
   questions += "<input type=\"radio\" id=\"q3_2\" value=\"2\" name=\"q3\"> <label for=\"q3_2\"> 2 - źle </label><br>";
   questions += "<input type=\"radio\" id=\"q3_3\" value=\"3\" name=\"q3\"> <label for=\"q3_3\"> 3 - średnio </label><br>";
   questions += "<input type=\"radio\" id=\"q3_4\" value=\"4\" name=\"q3\"> <label for=\"q3_4\"> 4 - dobrze </label><br>";
   questions += "<input type=\"radio\" id=\"q3_5\" value=\"5\" name=\"q3\"> <label for=\"q3_5\"> 5 - bardzo dobrze </label><br><br>";

   questions += "<h4>Jak w skali od 1 do 5 oceniasz ostatni obejrzany przez ciebie serial?</h4> ";
   questions += "<input type=\"radio\" id=\"q4_1\" value=\"1\" name=\"q4\"> <label for=\"q4_1\"> 1 - bardzo źle </label><br>";
   questions += "<input type=\"radio\" id=\"q4_2\" value=\"2\" name=\"q4\"> <label for=\"q4_2\"> 2 - źle </label><br>";
   questions += "<input type=\"radio\" id=\"q4_3\" value=\"3\" name=\"q4\"> <label for=\"q4_3\"> 3 - średnio </label><br>";
   questions += "<input type=\"radio\" id=\"q4_4\" value=\"4\" name=\"q4\"> <label for=\"q4_4\"> 4 - dobrze </label><br>";
   questions += "<input type=\"radio\" id=\"q4_5\" value=\"5\" name=\"q4\"> <label for=\"q4_5\"> 5 - bardzo dobrze </label><br><br>";

   questions += "<h4>Jak w skali od 1 do 5 oceniasz swój dzisiejszy humor?</h4>";
   questions += "<input type=\"radio\" id=\"q5_1\" value=\"1\" name=\"q5\"> <label for=\"q5_1\"> 1 - bardzo źle </label><br>";
   questions += "<input type=\"radio\" id=\"q5_2\" value=\"2\" name=\"q5\"> <label for=\"q5_2\"> 2 - źle </label><br>";
   questions += "<input type=\"radio\" id=\"q5_3\" value=\"3\" name=\"q5\"> <label for=\"q5_3\"> 3 - średnio </label><br>";
   questions += "<input type=\"radio\" id=\"q5_4\" value=\"4\" name=\"q5\"> <label for=\"q5_4\"> 4 - dobrze </label><br>";
   questions += "<input type=\"radio\" id=\"q5_5\" value=\"5\" name=\"q5\"> <label for=\"q5_5\"> 5 - bardzo dobrze </label><br><br>";

   document.getElementById("wyswietlacz").innerHTML = questions;
}

function Register(){//funkcja opakowujaca proces rejestracji
   if(RegisterValidator()){
      AddRegister();
   }
}

function RegisterValidator(){//funkcja sprawdzajaca poprawnosc wprowadzonych danych w formularzu rejestracji
   var login = document.getElementById("reg_log").value;
   var pass = document.getElementById("reg_pass").value;
   var pass_check = document.getElementById("reg_pass_check").value;
   
   if(login == "" || pass == "" || pass_check == ""){
      document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Proszę wypełnić wszystkie pola!</div>";
      return false;
   }else{
      if(pass != pass_check){
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Wprowadzone hasła nie są takie same!</div>";
         return false;
      }else{
         return true;
      }
   }
}

function LocalDBWrapper(){//funckcja wywolujaca funkcje wyswietlajaca zawartosc bazy danych przegladarki
   readLocalDB();
}

function QuestionsLocalValidatorWrapper(){//funkcja opakowujaca dodajaca odpowiedni przycisk dla formularzu ankiety
   QuestionsWrapper();
   document.getElementById("wyswietlacz").innerHTML += "<div class=\"text_center\"><button type=\"button\" class=\"btn btn-dark\" onclick=\"QuestionsLocalValidator()\">Wyślij</button></div><br>";
}

function QuestionsGlobalValidatorWrapper(){//funkcja opakowujaca dodajaca odpowiedni przycisk dla formularzu ankiety
   QuestionsWrapper();
   document.getElementById("wyswietlacz").innerHTML += "<div class=\"text_center\"><button type=\"button\" class=\"btn btn-dark\" onclick=\"QuestionsGlobalValidator()\">Wyślij</button></div><br>";
}

function QuestionsLocalValidator(){//funkcja opakowujaca proces wysylania ankiety do lokalnej bazy danych
   if(validate()){
      prepareInsertData();
      addLocalDB();
   }else{
      document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Proszę zaznaczyć wszystkie odpowiedzi!</div>";
   }
}

function QuestionsGlobalValidator(){//funkcja opakowujaca proces wysylania ankiety do bazy danych po stronie serwera
   if(validate()){
      prepareInsertData();
      addGlobalDB(answersLocal);
   }else{
      document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Proszę zaznaczyć wszystkie odpowiedzi!</div>";
   }
}

function validate(){//funkcja sprawdzajaca, czy wszystkie pozycje w ankiecie zostaly zaznaczone
   return validate_check("q1") && validate_check("q2") && validate_check("q3") && validate_check("q4") && validate_check("q5");
}

function validate_check(q_id){//funkcja sprawdzajaca, czy wszystkie pozycje w ankiecie zostaly zaznaczone
   var check = document.getElementsByName(q_id);
   var flag = 0;
   for(var i = 0; i < check.length; i++){
      if(check[i].checked){
         flag++;
      }
   } 
   return flag != 0;
}

function answerValue(q_id){//funkcja zwracajaca wartosc z zaznaczonego pytania w ankiecie
   var val = document.getElementsByName(q_id);
   for(var i = 0; i < val.length; i++){
      if(val[i].checked){
         return val[i].value;
      }
   }
}

function prepareInsertData(){//funkcja zbierajaca wszystkie odpowiedzi
   var q1 = Number(answerValue("q1"));
   var q2 = Number(answerValue("q2"));
   var q3 = Number(answerValue("q3"));
   var q4 = Number(answerValue("q4"));
   var q5 = Number(answerValue("q5"));

   answersLocal = [q1, q2, q3, q4, q5]
}

var indexedDb = window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB;
var idDbRequest = indexedDb.open("surveyLocal", 3);
var answersLocal = [];
var login_flag = new Boolean(true);
var login_name = "";
var db;

idDbRequest.onupgradeneeded = function(event){//utworzenie lokalnej bazy danych
   db = event.target.result;
   var data = db.createObjectStore("survey", { keyPath: "id", autoIncrement: true });
   data.createIndex("answers", "answers", { unique: false });
   data.createIndex("date", "date", { unique: false });
};

idDbRequest.onsuccess = function(event){//utworzenie lokalnej bazy danych
   db = event.target.result;
};

function addLocalDB(){//funkcja dodajaca elementy do lokalnej bazy danych
   var data = {};
   data.answers = answersLocal.join([separator = ',']);
   data.date = new Date();
   var dbTransaction = db.transaction(["survey"], "readwrite");
   var objStore = dbTransaction.objectStore("survey");
   var objStoreRequest = objStore.add(data);
   objStoreRequest.onsuccess = function(event) {
      answersLocal = [];
      document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Pomyślnie dodano dane do bazy danych po stronie przeglądarki!</div>";
   };
}


function readLocalDB(){//funkcja czytajaca wszystkie elementy w lokalnej bazie danych
   var choices = [];
   var id = []
   var dbTransaction = db.transaction("survey", "readwrite");
   var objStore = dbTransaction.objectStore("survey");

   objStore.openCursor().onsuccess = function (event) {
      var result = event.target.result;
      if (result) {
            choices[choices.length] = result.value.answers.split(",");
            id[id.length] = result.value.id;
            result.continue();
      } else {
            showLocal(id, choices);
      }
   };
}

function showLocal(id, answ){//funkcja wyswietlajaca elementy z lokalnej bazy danych w formie tabeli
   var data = "<table class=\"table\"><tr><th scope=\"col\">id</th><th scope=\"col\">Pytanie 1</th><th scope=\"col\">Pytanie 2</th><th scope=\"col\">Pytanie 3</th><th scope=\"col\">Pytanie 4</th><th scope=\"col\">Pytanie 5</th></tr>";
   for (var i = 0; i < answ.length; i++) {
      data += "<tr><th scope=\"row\">"+id[i]+"</th><td>"+answ[i][0]+"</td><td>"+answ[i][1]+"</td><td>"+answ[i][2]+"</td><td>"+answ[i][3]+"</td><td>"+answ[i][4]+"</td></tr>";
   }
   data += "</table></div>";
   document.getElementById("wyswietlacz").innerHTML = data;
}


function deleteFromLocalDB(){//funkcja czyszczaca cala lokalna baze danych
   var dbTransaction = db.transaction("survey", "readwrite");
   var objStore = dbTransaction.objectStore("survey");
   objStore.openCursor().onsuccess = function (event) {
      var result = event.target.result;
      if(result){
         result.delete();
         result.continue();
      }
   };
}

function setCookies(value){//funkcja ustawiajaca wartosci ciasteczek
   document.cookie = "sessionToken=" + value + "; path=/";
}
 
function getSessionCookie(){//funkcja zwracajaca akutalne ciasteczko
   var cookies = document.cookie.split(';');
   for (var i = 0; i < cookies.length; i++){
      var queue = cookies[i];
      while (queue.charAt(0) == ' ') {
         queue = queue.substring(1, queue.length);
      }
      if(queue.indexOf("sessionToken=") == 0){
         return queue.substring("sessionToken=".length, queue.length);
      }
   }
   return "";
}

function elementsLoggedIn(){//funkcja wczytujaca elementy strony dla zalogowanego uzytkownika
   var elements = "";
   elements += "<form name=\"f1\">";
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"LogoutWrapper(); return false;\">Wyloguj się</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"QuestionsGlobalValidatorWrapper()\">Wypełnij ankietę</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"AnalizeWrapper()\">Analiza danych</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"GlobalDBWrapper()\">Podgląd danych z bazy danych po stronie serwera</button>"
   elements += "</form>";
   document.getElementById("formularz").innerHTML = elements;
}

function elementsNotLoggedIn(){//funkcja wczytujaca elementy strony dla niezalogowanego uzytkownika
   var elements = "";
   elements += "<form name=\"f1\">";
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"LoginWrapper(); return false;\">Zaloguj się</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"RegisterWrapper()\">Zarejestruj się</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"QuestionsLocalValidatorWrapper()\">Wypełnij ankietę</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"LocalDBWrapper()\">Podgląd danych lokalnych</button>"
   elements += "</form>";
   document.getElementById("formularz").innerHTML = elements;
}

function elementsLoad(){//opakowanie procesu sprawdzajacego aktywne sesje
   checkSession();
}

function checkSession(){//funkcja sprawdzajaca aktywne sesje
   var session = {};
   var token = getSessionCookie();
   if(token == ""){
      elementsNotLoggedIn();
   }else{
      session.token = token;
      txt = JSON.stringify(session);
      request = getRequestObject() ;
      request.onreadystatechange = function() {
         if (request.readyState == 4 && request.status == 200)    {
            var tmp = JSON.parse(request.response);
            if(tmp.return.localeCompare("\"yes\"")){
               setCookies(token);
               login_flag = true;
               login_name = tmp.login;
               elementsLoggedIn();
            }
         }else if(request.status == 400){
            Logout();
            setCookies("");
            login_flag = false;
            login_name = "";
            elementsNotLoggedIn();
         }
      }
      request.open("POST", "http://pascal.fis.agh.edu.pl/~8sudol/projekt2/rest/sessionCheck", true);
      request.send(txt);
   }
}

function AddRegister(){//funkcja dodajaca nowego uzytkownika
   var user = {};
   user.login = document.getElementById("reg_log").value;
   user.pass = document.getElementById("reg_pass").value;
   txt = JSON.stringify(user);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 || request.status == 400 )    {
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">"+tmp.return+"</div>";
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~8sudol/projekt2/rest/register", true);
   request.send(txt);
}

function Login(){//funkcja realizujaca logowanie do serwisu
   var user = {};
   user.login = document.getElementById("log").value;
   user.pass = document.getElementById("pass").value;
   txt = JSON.stringify(user);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 )    {
         login_name = document.getElementById("log").value;
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">"+tmp.return+"</div>";
         setCookies(tmp.token);
         login_flag = true;
         elementsLoggedIn();
         synchronizeLocalToGlobalDB();
      }else if(request.readyState == 4 && request.status == 400){
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">"+tmp.return+"</div>";
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~8sudol/projekt2/rest/login", true);
   request.send(txt);
}

function LogoutWrapper(){//funkcja opakowujaca proces wylogowywania z serwisu
   Logout();
   login_flag = false;
   login_name = "";
   elementsNotLoggedIn();
}

function Logout(){//funkcja realizujaca proces wylogowywania z serwisu
   var session = {};
   var token = getSessionCookie();
   
   session.token = token;
   txt = JSON.stringify(session);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 || request.status == 400 )    {
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">"+tmp.return+"</div>";
         setCookies("");
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~8sudol/projekt2/rest/logout", true);
   request.send(txt);
}

function addGlobalDB(answers){//funkcja realizujaca dodawanie danych do bazy danych po stronie serwera
   var data = {};
   data.date = new Date();

   data.user = login_name;
   data.answers = answers;
   txt = JSON.stringify(data);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 || request.status == 400)    {
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML += "<div class=\"alert alert-primary\" role=\"alert\">"+tmp.return+"</div>";
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~8sudol/projekt2/rest/add", true);
   request.send(txt);
}

function synchronizeLocalToGlobalDB(){//funkcja realizujaca synchronizacje danych z bazy danych przegladarki do bazy danych po stronie serwera zaraz po zalogowaniu sie uzytkownika
   var choices = [];

   var dbTransaction = db.transaction("survey", "readwrite");
   var objStore = dbTransaction.objectStore("survey");

   objStore.openCursor().onsuccess = function (event) {
      var result = event.target.result;
      if (result) {
         var tmp = result.value.answers.split(",");
         for(var i = 0; i < tmp.length; i++){
            tmp[i] = new Number(tmp[i]);
         }
         choices[choices.length] = tmp;
         result.continue();
      } else {
         if(choices.length != 0){
            for(var i = 0; i < choices.length; i++){
               addGlobalDB(choices[i]);
            }
            deleteFromLocalDB();
            document.getElementById("wyswietlacz").innerHTML += "<div class=\"alert alert-primary\" role=\"alert\">Pomyslnie zsynchronizowano dane!</div>";
         }
      }
   };
}

function GlobalDBWrapper(){//funkcja opakowujaca proces wyswietlania danych z bazy danych po stronie serwera
   readGlobalDB();
}

function readGlobalDB(){//funkcja realizujaca proces odczytania danych z bazy danych po stronie serwera
   var idx = [];
   var choices = [];
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4)    {
         objJSON = JSON.parse(request.response);
         for ( var id in objJSON )  {
            idx[id] = id;
            choices[id] = JSON.stringify(objJSON[id]["answers"]).split(",");
            }
            showGlobal(idx, choices);
         }
      }
   request.open("GET", "http://pascal.fis.agh.edu.pl/~8sudol/projekt2/rest/read", true);
   request.send(null);
}

function showGlobal(id, answ){//funkcja realizujaca proces wyswietlenia danych z bazy danych po stronie serwera w formie tabeli
   var data = "<table class=\"table\"><tr><th scope=\"col\">id</th><th scope=\"col\">Pytanie 1</th><th scope=\"col\">Pytanie 2</th><th scope=\"col\">Pytanie 3</th><th scope=\"col\">Pytanie 4</th><th scope=\"col\">Pytanie 5</th></tr>";
   for (var i = 0; i < answ.length; i++) {
      data += "<tr><th scope=\"row\">"+id[i]+"</th><td>"+answ[i][0].split("[")[1]+"</td><td>"+answ[i][1]+"</td><td>"+answ[i][2]+"</td><td>"+answ[i][3]+"</td><td>"+answ[i][4].split("]")[0]+"</td></tr>";
   }
   data += "</table>";
   document.getElementById("wyswietlacz").innerHTML = data;
}

function AnalizeWrapper(){//funkcja opakowujaca dla procesu wizualizacji danych z bazy danych po stronie serwera
   var choices = [];
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4)    {
         objJSON = JSON.parse(request.response);
         for ( var id in objJSON )  {
            choices[id] = JSON.stringify(objJSON[id]["answers"]).split(",");
            }
            Analize(choices);
         }
      }
   request.open("GET", "http://pascal.fis.agh.edu.pl/~8sudol/projekt2/rest/read", true);
   request.send(null);
}

function Analize(answers){//analiza zlozonych odpowiedzi
   var count = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
   for(var i = 0; i < answers.length; i++){
      for(var j = 0; j < answers[i].length; j++){
         if(j == 0){
            var idx = answers[i][j].split("[")[1];
            count[j][new Number(idx)-1] += 1;
         }else if(j == answers[i].length-1){
            var idx = answers[i][j].split("]")[0];
            count[j][new Number(idx)-1] += 1;
         }else{
            count[j][new Number(answers[i][j])-1] += 1;
         }
      }
   }
   CreateCanvas(count);
}

function getMax(table){
   var max = 0;
   for(var i = 0; i < table.length; i++){
      for(var j = 0; j < table[i].length; j++){
         if(table[i][j] > max){
            max = table[i][j];
         }
      }
   }
   return max;
}

function CreateCanvas(data){//wizualizacja danych w formie histogramow
   document.getElementById("wyswietlacz").innerHTML = "<canvas id=\"obszar1\"></canvas>";
   obszar1 = document.getElementById("obszar1");
   obszar1.width = 0.8*window.innerWidth;
   obszar1.height = 400;
   context = obszar1.getContext("2d");
   context.strokeStyle = "#FF0000";
   var max = getMax(data);
   var pos = obszar1.width/6;
   if(max != 0){
      CreateChart(obszar1,context, data[0], obszar1.height/max, pos, "Ocena snu");
      CreateChart(obszar1,context, data[1], obszar1.height/max, 2*pos, "Ocena posilku");
      CreateChart(obszar1,context, data[2], obszar1.height/max, 3*pos, "Ocena filmu");
      CreateChart(obszar1,context, data[3], obszar1.height/max, 4*pos, "Ocena serialu");
      CreateChart(obszar1,context, data[4], obszar1.height/max, 5*pos, "Ocena humoru");
   }else{
      CreateChart(obszar1,context, data[0], 0, pos, "Ocena snu");
      CreateChart(obszar1,context, data[1], 0, 2*pos, "Ocena posilku");
      CreateChart(obszar1,context, data[2], 0, 3*pos, "Ocena filmu");
      CreateChart(obszar1,context, data[3], 0, 4*pos, "Ocena serialu");
      CreateChart(obszar1,context, data[4], 0, 5*pos, "Ocena humoru");
   }
   context.stroke();
}

function CreateChart(obszar, ctx, data, ratio, position, title){//funkcja wyswietlajaca slupki odpowiedzi
   ctx.fillStyle = "black";
   ctx.font = "bold 10px sans-serif";
   ctx.fillText(title, position-30, obszar.height-10);

   var start = position - 70;
   for(var i = 0; i < data.length; i++){
      ctx.fillStyle = "black";  
      ctx.fillRect(start + i*30,obszar.height-20, 20, - data[i]*ratio);
      ctx.fillStyle = "white";
      ctx.fillText(i+1, start + i*30 + 10, obszar.height-25);
   }
}

function DescriptionShow(){//funkcja wyswietlajaca opis funkcjonalnosci projektu
   var description = "<p class=\"text-center\">";
   description += "<h3>Poniżej przedstawiono krótki opis funkcjonalości projektu:</h3>";
   description += "<h4>Funkcjonalność przed zalogowaniem:</h4>";
   description += "<li>Przycisk \"Zaloguj się\" - umożliwia zalogowanie się do serwisu,</li>";
   description += "<li>Przycisk \"Zarejestruj się\" - umożliwia zarejestrowanie się do serwisu,</li>";
   description += "<li>Przycisk \"Wypełnij ankietę\" - umożliwia dodanie swoich odpowiedzi do bazy danych przeglądarki,</li>";
   description += "<li>Przycisk \"Podgląd danych lokalnych\" - umożliwia podgląd do bazy danych po stronie przeglądarki,</li>";
   description += "<h4>Funkcjonalność po zalogowaniu:</h4>";
   description += "<li>Przycisk \"Wyloguj się\" - umożliwia wylogowanie się z serwisu,</li>";
   description += "<li>Przycisk \"Wypełnij ankietę\" - umożliwia dodanie swoich odpowiedzi do bazy danych po stronie serwera,</li>";
   description += "<li>Przycisk \"Analiza danych\" - umożliwia wizualizacje wszystkich danych w postaci histogramów,</li>";
   description += "<li>Przycisk \"Podgląd danych z bazy danych po stronie serwera\" - umożliwia podgląd do bazy danych po stronie serwera.</li>";
   description += "<p>";
   document.getElementById("opisShow").innerHTML = description;
}