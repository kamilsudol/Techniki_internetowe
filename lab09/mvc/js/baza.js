function fn_save()
 {
     var fname = document.getElementById("fname").value ;
     var lname = document.getElementById("lname").value ;
     var city  = document.getElementById("city").value ;
     document.getElementById("data").style.display = "none" ;
     var json_data = "{\"fname\":\"" + fname + "\",\"lname\":\"" + lname + "\",\"city\":\"" + city + "\"}" ;
     var msg = "data=" + encodeURIComponent(json_data) ;
     var url = "index.php?sub=baza&action=saveRec" ;
     resp = function(response) {
        // alert ( response ) ;
        document.getElementById("response").innerHTML = response ; 
      }
      xmlhttpPost (url, msg, resp) ;                          
}  
  
function xmlhttpPost(strURL, mess, respFunc) {
    var xmlHttpReq = false;
    var self = this;
    // Mozilla/Safari
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    self.xmlHttpReq.onreadystatechange = function() {
    if(self.xmlHttpReq.readyState == 4){
        // alert ( self.xmlHttpReq.status ) ;
        if ( self.xmlHttpReq.status == 200 ) {    
           // document.getElementById("data").innerHTML = http_request.responseText;
          respFunc( self.xmlHttpReq.responseText ) ;
        }
        else if ( self.xmlHttpReq.status == 401 ) {
           window.location.reload() ;
        } 
      }
    }
    self.xmlHttpReq.open('POST', strURL);
    self.xmlHttpReq.setRequestHeader("X-Requested-With","XMLHttpRequest");
    self.xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded; ");
    self.xmlHttpReq.setRequestHeader("Content-length", mess.length);
    self.xmlHttpReq.send(mess);        
}

function fn_find() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var city = document.getElementById("city").value;
    document.getElementById("data").style.display = "none";
    var json_data = "{\"fname\":\"" + fname + "\",\"lname\":\"" + lname + "\",\"city\":\"" + city + "\"}";
    var msg = "data=" + encodeURIComponent(json_data);
    var url = "index.php?sub=baza&action=find";
    resp = function (response) {
        // alert ( response ) ;
        document.getElementById("response").innerHTML = response;
    }
    xmlhttpPost(url, msg, resp);
}

function fn_login() {
    var email = document.getElementById("email").value;
    var haslo = document.getElementById("haslo").value;
    document.getElementById("data").style.display = "none";
    var json_data = "{\"email\":\"" + email + "\",\"haslo\":\"" + haslo + "\"}";
    var msg = "data=" + encodeURIComponent(json_data);
    var url = "index.php?sub=user&action=login";
    resp = function (response) {
        // alert ( response ) ;
        document.getElementById("response").innerHTML = response;
    }
    xmlhttpPost(url, msg, resp);
}  

function fn_register() {
    var email = document.getElementById("email").value;
    var haslo = document.getElementById("haslo").value;
    document.getElementById("data").style.display = "none";
    var json_data = "{\"email\":\"" + email + "\",\"haslo\":\"" + haslo + "\"}";
    var msg = "data=" + encodeURIComponent(json_data);
    var url = "index.php?sub=user&action=register";
    resp = function (response) {
        // alert ( response ) ;
        document.getElementById("response").innerHTML = response;
    }
    xmlhttpPost(url, msg, resp);
}  