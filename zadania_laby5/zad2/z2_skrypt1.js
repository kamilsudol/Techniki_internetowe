function validate(){
    var string1=document.form1.pole3.value;
    var string2=document.form1.pole1.value;
    var string3=document.form1.pole2.value;

    var iter = 0;

    if (document.form1.pole1.value==""){
        document.getElementById("err1").innerHTML = "Brak podanego imienia";
    }else if(string2.length < 4){
        document.getElementById("err1").innerHTML = "Pole imię musi mieć co najmniej 4 znaki!";
    }else{
        document.getElementById("err1").innerHTML = "";
        iter += 1;
    }
    
    if((document.form1.pole2.value=="")){
        document.getElementById("err2").innerHTML = "Brak podanego nazwiska";
    }else if(string3.length < 4){
        document.getElementById("err2").innerHTML = "Pole nazwisko musi mieć co najmniej 4 znaki!";
    }else{
        document.getElementById("err2").innerHTML = "";
        iter += 1;
    } 
    
    if(string1.indexOf("@")==-1){
        document.getElementById("err3").innerHTML = "Brak podanego e-mail'a";
    }else{
        document.getElementById("err3").innerHTML = "";
        iter += 1;
    } 
    
    if(document.form1.pole4.options.selectedIndex == 0){
        document.getElementById("err4").innerHTML = "Brak podanego roku";
    }else{
        document.getElementById("err4").innerHTML = "";
        iter += 1;
    }
    
    if(iter == 4){
        status();
    }
}