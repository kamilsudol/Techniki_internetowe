function Submit(){
    var x = document.f1.data1.value;
    var y = document.f1.data2.value;
    var r = document.f1.data3.value;
    var obszar1 = document.getElementById("obszar1");
    var obszar2 = document.getElementById("obszar2");

    var context = obszar1.getContext("2d");
    context.strokeStyle = "#FF0000";

    var flag = validate(x, y, r, obszar1);
    if(flag){
        draw1(x, y, r, context);
        draw2(x, y, r, obszar2);
    }else{
        return null;
    }
}

function validate(x, y, r, obszar){
    var w = new Number(obszar.width);
    var h = new Number(obszar.height);
    var x1 = new Number(x);
    var y1 = new Number(y);
    var r1 = new Number(r);

    if(x1 < 0 || x1 > w || y1 < 0 || y1 > h){
        alert ("Proszę wprowadzić poprawne współrzędne!");
        return false;
    }else if( (x1 - r1 < 0) || (x1 + r1 > w) || (y1 - r1 < 0) || (y1 + r1 > h)){
        alert ("Proszę zmniejszyć promień okręgu!");
        return false;
    }else{
        return true;
    }
}

function draw1(x , y, r, obszar){
    obszar.font = "bold 20px sans-serif";
    obszar.fillText("Obrazek canvas", 25, 390);
    obszar.beginPath();
    obszar.arc(x, y, r, 0, 2 * Math.PI);
    obszar.stroke();
}
function draw2(x , y, r, obszar){
    var c = "<circle cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\" stroke=\"blue\" fill=\"blue\" />";
    c += "<text x=\"25\" y=\"390\" fill=\"black\" class=\"svg_txt\">Obrazek SVG</text>"
    obszar.innerHTML = c;
}