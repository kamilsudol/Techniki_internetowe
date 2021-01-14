function validate(){
    var string1=document.form1.pole3.value;
    var string2=document.form1.pole1.value;
    var string3=document.form1.pole2.value;
    var iter = 0;
    if (document.form1.pole1.value==""){
        alert ("Należy wypełnić pole imię!"); 
    }else if(string2.length < 4){
        alert ("Pole imię musi mieć co najmniej 4 znaki!");
    }else{
        iter += 1;
    } 
    
    if((document.form1.pole2.value=="")){
        alert ("Należy wypełnić pole nazwisko!");
    }else if(string3.length < 4){
        alert ("Pole nazwisko musi mieć co najmniej 4 znaki!");
    }else{
        iter += 1;
    } 
    
    if(string1.indexOf("@")==-1){
        alert ("Należy wypełnić pole e-mail!");
    }else{
        iter += 1;
    } 
    
    if(document.form1.pole4.options.selectedIndex == 0){
        alert ("Należy wybrać rok studiów!");
    }else{
        iter += 1;
    }

    if(iter == 4){
        status();
    }
}