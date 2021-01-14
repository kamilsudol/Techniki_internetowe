var xmlHttp;
 
function getRequestObject(){
    if ( window.ActiveXObject){
        return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
    } else if (window.XMLHttpRequest)  {
        return (new XMLHttpRequest())  ;
    } else {
        return (null) ;
    }
}
 
async function sendRequest(option){
    xmlHttp = getRequestObject() ;
    if (xmlHttp){
        try{
            if(option == 3){
                var name = document.f1.data1.value;
                var x1 = document.f1.x1.value;
                var x2 = document.f1.x2.value;
                var x3 = document.f1.x3.value;

                var y1 = document.f1.y1.value;
                var y2 = document.f1.y2.value;
                var y3 = document.f1.y3.value;
               

                var url = "../cgi-bin/ajax_save.py?data1="+name+"&data2=Draw3("+x1+","+x2+","+x3+","+y1+","+y2+","+y3+")";
                xmlHttp.onreadystatechange = handleResponse1;
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
            }
            if(option == 4){
                var name = document.f1.data1.value;
                var x1 = document.f1.x1.value;
                var x2 = document.f1.x2.value;
                var x3 = document.f1.x3.value;
                var x4 = document.f1.x4.value;

                var y1 = document.f1.y1.value;
                var y2 = document.f1.y2.value;
                var y3 = document.f1.y3.value;
                var y4 = document.f1.y4.value;
               

                var url = "../cgi-bin/ajax_save.py?data1="+name+"&data2=Draw4("+x1+","+x2+","+x3+","+y1+","+y2+","+y3+","+x4+","+y4+")";
                xmlHttp.onreadystatechange = handleResponse1;
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
            }
            if(option == 5){
                var name = document.f1.data1.value;
                var x1 = document.f1.x1.value;
                var x2 = document.f1.x2.value;
                var x3 = document.f1.x3.value;
                var x4 = document.f1.x4.value;
                var x5 = document.f1.x5.value;

                var y1 = document.f1.y1.value;
                var y2 = document.f1.y2.value;
                var y3 = document.f1.y3.value;
                var y4 = document.f1.y4.value;
                var y5 = document.f1.y5.value;
               

                var url = "../cgi-bin/ajax_save.py?data1="+name+"&data2=Draw4("+x1+","+x2+","+x3+","+y1+","+y2+","+y3+","+x4+","+y4+","+x5+","+y5+")";
                xmlHttp.onreadystatechange = handleResponse1;
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
            }
            if(option == 'record'){
                var url = "../cgi-bin/ajax_read.py";
                xmlHttp.onreadystatechange = handleResponse2;
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
            }
        }
        catch(e){
            alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
        }
    }else{
        alert ("Blad") ;
    }
}

function handleResponse1(){
    if (xmlHttp.readyState == 4) {
        if ( xmlHttp.status == 200 )  {
            document.f1.data1.value = "";
            document.f1.data2.value = "";
            document.f1.x1.value = "";
            document.f1.x2.value = "";
            document.f1.x3.value = "";
            document.f1.x4.value = "";
            document.f1.x5.value = "";

            document.f1.y1.value = "";
            document.f1.y2.value = "";
            document.f1.y3.value = "";
            document.f1.y4.value = "";
            document.f1.y5.value = "";
            document.getElementById('formularz').style = "display:none;";
        }
    } 
}

function handleResponse2(){
	if (xmlHttp.readyState == 4) {
	 if ( xmlHttp.status == 200 )  {
            response = xmlHttp.responseText;
            document.getElementById("baza_rekordow").innerHTML = response;
    	}
    }  
}

function w3(w, h){
    var i = 0;
    if(document.f1.x1.value == "" || document.f1.x1.value < 0 || document.f1.x1.value > w){
        alert("Prosze podac poprawne wspolrzedne x1!");
    }else{
        i+=1;
    }
    if(document.f1.x2.value == "" || document.f1.x2.value < 0 || document.f1.x2.value > w){
        alert("Prosze podac poprawne wspolrzedne x2!");
    }else{
        i+=1;
    }
    if(document.f1.x3.value == "" || document.f1.x3.value < 0 || document.f1.x3.value > w){
        alert("Prosze podac poprawne wspolrzedne x3!");
    }else{
        i+=1;
    }
    if(document.f1.y1.value == "" || document.f1.y1.value < 0 || document.f1.y1.value > h){
        alert("Prosze podac poprawne wspolrzedne y1!");
    }else{
        i+=1;
    }
    if(document.f1.y2.value == "" || document.f1.y2.value < 0 || document.f1.y2.value > h){
        alert("Prosze podac poprawne wspolrzedne y2!");
    }else{
        i+=1;
    }
    if(document.f1.y3.value == "" || document.f1.y3.value < 0 || document.f1.y3.value > h){
        alert("Prosze podac poprawne wspolrzedne y3!");
    }else{
        i+=1;
    }
    return i == 6;
}

function w4(w, h){
    var i = 0;
    if(document.f1.x4.value == "" || document.f1.x4.value < 0 || document.f1.x4.value > w){
        alert("Prosze podac poprawne wspolrzedne x4!");
    }else{
        i+=1;
    }
    if(document.f1.y4.value == "" || document.f1.y4.value < 0 || document.f1.y4.value > h){
        alert("Prosze podac poprawne wspolrzedne y4!");
    }else{
        i+=1;
    }
    return i == 2 && w3();
}

function w5(w, h){
    var i = 0;
    if(document.f1.x5.value == "" || document.f1.x5.value < 0 || document.f1.x5.value > w){
        alert("Prosze podac poprawne wspolrzedne x5!");
    }else{
        i+=1;
    }
    if(document.f1.y5.value == "" || document.f1.y5.value < 0 || document.f1.y5.value > h){
        alert("Prosze podac poprawne wspolrzedne y5!");
    }else{
        i+=1;
    }
    return i == 2 && w4();
}

function wierz_Validator(n, obszar){
    var w = obszar.width;
    var h = obszar.height;
    if(n == 3){
        return w3(w, h);
    }else if(n == 4){
        return w4(w, h);
    }else if(n == 5){
        return w5(w, h);
    }
}

function Validator(obszar){
    var w = false;
    var i = 0;
    if(document.f1.data1.value == ""){
        alert("Prosze podac nazwe figury!");
    }else{
        i+=1;
    }
    if(document.f1.data2.value < 3 || document.f1.data2.value > 5 ){
        alert("Prosze podac poprawna liczbe wierzcholkow!");
    }else{
        i+=1;
        w = wierz_Validator(document.f1.data2.value, obszar);
    }
    return i==2 && w;
}

function Submit(){
    var obszar1 = document.getElementById("obszar1");
    if(Validator(obszar1)){
        sendRequest(document.f1.data2.value);
    }else{
        return null;
    }
}

function Add(){
    document.getElementById('formularz').style = "display:block;";
    document.getElementById('baza_rekordow').style = "display:none;";
}

function Records(){
    document.getElementById('formularz').style = "display:none;";
    document.getElementById('baza_rekordow').style = "display:block;";
    sendRequest('record');
}

function Draw3(x1,x2,x3,y1,y2,y3){
    var obszar = document.getElementById("obszar1");
    var context = obszar.getContext("2d");
    context.font = "bold 20px sans-serif";
    context.fillText("Obrazek canvas", 25, 390);
    context.strokeStyle = "#FF0000";

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

    context.moveTo(x2, y2);
    context.lineTo(x3, y3);

    context.moveTo(x3, y3);
    context.lineTo(x1, y1);
    context.stroke();
}

function Draw4(x1,x2,x3,y1,y2,y3,x4,y4){
    var obszar = document.getElementById("obszar1");
    var context = obszar.getContext("2d");
    context.font = "bold 20px sans-serif";
    context.fillText("Obrazek canvas", 25, 390);
    context.strokeStyle = "#FF0000";

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

    context.moveTo(x2, y2);
    context.lineTo(x3, y3);

    context.moveTo(x3, y3);
    context.lineTo(x4, y4);

    context.moveTo(x4, y4);
    context.lineTo(x1, y1);
    context.stroke();
}

function Draw5(x1,x2,x3,y1,y2,y3,x4,y4,x5,y5){
    var obszar = document.getElementById("obszar1");
    var context = obszar.getContext("2d");
    context.font = "bold 20px sans-serif";
    context.fillText("Obrazek canvas", 25, 390);
    context.strokeStyle = "#FF0000";

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

    context.moveTo(x2, y2);
    context.lineTo(x3, y3);

    context.moveTo(x3, y3);
    context.lineTo(x4, y4);
    
    context.moveTo(x4, y4);
    context.lineTo(x5, y5);

    context.moveTo(x5, y5);
    context.lineTo(x1, y1);
    context.stroke();
}