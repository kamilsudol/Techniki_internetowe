function status(){
    var index = document.form1.pole4.options.selectedIndex;
    var text1 = document.form1.pole1.value;
    var text2 = document.form1.pole2.value;
    var text3 = document.form1.pole3.value;
    var text4 = document.form1.pole4.options[index].value;
    var text5 = document.form1.pole5.value;
    var text = "Imię: " + text1 + "\n";
    text += "Nazwisko: " + text2 + "\n";
    text += "E-mail: " + text3 + "\n";
    text += "Rok studiów: " + text4 + "\n";
    text += "Uwagi: " + text5 + "\n";

    alert(text);
}