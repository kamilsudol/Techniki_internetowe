startx = 30;
starty = 350;
endx = 400;
endy = 50;

context.beginPath();
context.moveTo(startx, starty);
context.lineTo(endx, endy);
context.strokeStyle = "black";
context.stroke();

context.font = "bold 20px sans-serif";
context.fillText("y = ax + b", 280, 220);