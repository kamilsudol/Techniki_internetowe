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
 
function sendRequest(position, id){
    xmlHttp = getRequestObject() ;
    if (xmlHttp){
        try{
            var url = "/cgi-bin/zad6b.py?pos="+position;
            xmlHttp.onreadystatechange = function(){handleResponse(id);};
            xmlHttp.open("GET", url, true);
            xmlHttp.send(null);
        }
        catch(e){
            alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
        }
    }else{
        alert ("Blad") ;
    }
}

function handleResponse(id)      {
	myDiv = document.getElementById(id);
	if (xmlHttp.readyState == 4) {
	 if ( xmlHttp.status == 200 )  {
		 response = xmlHttp.responseXML;
         myDiv.innerHTML = response.documentElement.innerHTML;
		}
	}  
}
	
function takeData(position, id)
{
	sendRequest(position, id);
}

function textChange(id)
{   
    var txt = document.getElementById(id);
    document.getElementById("textCh").innerHTML = txt.value;
}