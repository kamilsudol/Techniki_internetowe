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
            if(option == 'submit'){
                var tytul = document.f1.data1.value;
                var autor = document.f1.data2.value;
                var url = "/cgi-bin/zad6a_save.py?data1="+tytul+"&data2="+autor;
                xmlHttp.onreadystatechange = handleResponse1;
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
            }
            if(option == 'record'){
                var url = "/cgi-bin/zad6a_read.py";
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

function Add(){
    document.getElementById('formularz').style = "display:block;";
    document.getElementById('baza_rekordow').style = "display:none;";
}

async function Records(){
    document.getElementById('baza_rekordow').style = "display:block;";
    document.getElementById('formularz').style = "display:none;";
    await sendRequest('record');
}

function Submit(){
    sendRequest('submit');
}