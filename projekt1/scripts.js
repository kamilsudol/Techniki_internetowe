var AnimationFlag = false; //zmienna pomocnicza, uzywana w czasie klikniecia przycisku "stop"
var iter; //zmienna ustalajaca ilosc iteracji symulacji
var MuteFlag = true; //zmienna pomocnicza wlaczajaca/wylaczajaca dzwiek

var g = new Number(9.81); //warotsc przyspieszenia ziemskiego

class ThrowedThing{ //klasa reprezentujaca obiekt rzucany
    constructor(pos_x, pos_y){ //ctor domyslny
        this.x = pos_x;
        this.y = pos_y;
        this.velocityY = 0;
        this.velocityX = 0;
    }

    setXY(newX, newY){ //setter ustawiajacy podane wspolrzedne
        this.x = newX;
        this.y = newY;
    }
    setVelY(v){this.velocityY = v;} //setter wartosci pionowego wektora predkosci 
    setVelX(v){this.velocityX = v;} //setter wartosci poziomego wektora predkosci 

    updateVelY(dt){ //metoda aktualizjaca wartosc pionowego wektora predkosci w zaleznosci od czasu
        this.velocityY = this.velocityY + g*dt;
    }

    updatePosX(dt){ //metoda aktualizjaca wartosc wspolrzednej X-owej obiektu w zaleznosci od czasu
        this.x = this.x + this.velocityX*dt;
    }
    updatePosY(dt){ //metoda aktualizjaca wartosc wspolrzednej Y-owej obiektu w zaleznosci od czasu
        this.y = this.y + this.velocityY*dt;
    }

    get posX(){ //getter watosci wspolrzednej X-owej obiektu
        return this.x;
    }

    get posY(){ //getter watosci wspolrzednej Y-owej obiektu
        return this.y;
    }

    get getVelX(){return this.velocityX;} //getter wartosci poziomego wektora predkosci
    get getVelY(){return this.velocityY;} //getter wartosci pionowego wektora predkosci

    resetPos(){ //metoda resetujaca pozycje obiektu
        this.y = obszar1.height-20;
    }

    hitDetect(){ //metoda modyfikujaca wartosc pionowego wektora predkosci po wykryciu odbicia
        this.velocityY = -this.velocityY;
    }
    hitWall(){ //metoda modyfikujaca wartosc poziomego wektora predkosci po wykryciu odbicia
        this.velocityX = -this.velocityX;
    }
}

var Ball; //zmienna przechowujaca obiekt klasy ThowedThing
var obszar1; //zmienna przechowujaca referencje do obszaru canvas
var context; //zmienna przechowujaca referencje do kontekstu obszaru canvas

function InitialConditions(){ //funkcja ustawiajaca wartosci poczatkowe symulacji po wczytaniu okna przegladarki
    limitIterUpdate();
    Ball = new ThrowedThing(0,0);
    obszar1 = document.getElementById("obszar1");
    obszar1.width = 0.8*window.innerWidth;
    obszar1.height = 400;
    context = obszar1.getContext("2d");
    context.strokeStyle = "#FF0000";

    Ball.setXY(obszar1.width/2, obszar1.height/2);
    DrawBall();
    context.stroke();
    DefaultView();
}

window.onload = InitialConditions(); //podpiecie funkcji do zdarzenia okna

async function SubmitWrapper(){ //funkcja opakowujaca funckje Submit()
    AnimationFlag = true;
    Submit();
}

function limitIterUpdate(){ //funkcja pobierajaca liczbe iteracji symulacji
    iter = document.getElementById("limitIterID").value;
}


async function Submit(){ //funkcja przeprowadzajaca proces symulacji rzutu
    var hitOption = document.getElementById("przeszkodySelect").value;
    var t = new Number(0);

    for(var i = 0; i <= iter; i++){
        if(AnimationFlag){
            Ball.updateVelY(t);
            Ball.updatePosY(t);
            Ball.updatePosX(t);
            UpdateView();
            HitDetectionSwitch(hitOption);
            t += 0.001;
            await this.timeout(10);
        }else{
            break;
        }
    }
}

async function timeout(ms) { //funckja pomocnicza, spowalniajaca wykonywanie sie petli symulacji
    return new Promise(resolve => setTimeout(resolve, ms))
}

function ChangePos(event){ //funkcja realizujaca zmiane pozycji obiektu na obszarze canvas
    let newx = event.offsetX;
    let newy = event.offsetY;
    Ball.setXY(newx, newy);
    Ball.setVelY(0);
    UpdateView();
}


function directionSlidUpdate(){ //funckja pobierajaca wartosc ze slidera kierunku oraz rysujaca odpowiadnia strzalke od obiektu
    UpdateView();
    context.strokeStyle = "#FF0000";
    var an = new Number(document.getElementById("directionSlidID").value);
    var angle = new Number((an - 157)/100);
    
    var R = new Number(document.getElementById("velocitySlidID").value);
    var arrowLength = 0.5;
    var arrowR = 0.75*R;
    
    context.moveTo(Ball.posX, Ball.posY);
    context.lineTo(Ball.posX+R*Math.cos(angle),Ball.posY+ R*Math.sin(angle));

    context.moveTo(Ball.posX+R*Math.cos(angle),Ball.posY+ R*Math.sin(angle));
    context.lineTo(Ball.posX+arrowR*Math.cos(angle+arrowLength),Ball.posY+ arrowR*Math.sin(angle+arrowLength));

    context.moveTo(Ball.posX+R*Math.cos(angle),Ball.posY+ R*Math.sin(angle));
    context.lineTo(Ball.posX+arrowR*Math.cos(angle-arrowLength),Ball.posY+ arrowR*Math.sin(angle-arrowLength));

    Ball.setVelX(R*Math.cos(angle));
    Ball.setVelY(R*Math.sin(angle));
    context.stroke();
}

function velocitySlidUpdate(){ //funkcja przekierowujaca wartosc ze slidera ustawienia predkosci do funkcji directionSlidUpdate()
    UpdateView();
    directionSlidUpdate(document.getElementById("velocitySlidID").value);
}

function UpdateView(){ //funckja realizujaca odswiezanie klatki obrazu
    context.canvas.width = context.canvas.width;
    context.strokeStyle = "#FF0000";
    DrawBall();
    context.stroke();
    przeszkodySelectUpdate();
}

function RawUpdateView(){ //funkcja pomocnicza, niewyswietlajaca przeszkod w celu unikniecia wywolania rekurencyjnego
    context.canvas.width = context.canvas.width;
    context.strokeStyle = "#FF0000";
    DrawBall();
    context.stroke();
}

function DrawBall(){ //funkcja realizujaca wyswietlanie sie obrazka w miejsce wspolrzednych obiektu ThrowedThing
    var image = new Image();
    image.src = "ball.png";
    image.width = 20;
    image.height = 20;
    context.drawImage(image, new Number(Ball.posX) - image.width/2, new Number(Ball.posY) - image.height/2, image.width, image.height);
}

function Stop(){ //funkcja realizujaca zatrzymanie symulacji
    AnimationFlag = false;
}

function Reset(){ //funkcja resetujaca wartosci pol do wartosci domyslnych
    document.getElementById("directionSlidID").value = 0;
    document.getElementById("velocitySlidID").value = 50;
    document.getElementById("przeszkodySelect").value = 1;
    document.getElementById("limitIterID").value = 1000;
    Stop();
    InitialConditions();
}

function przeszkodySelectUpdate(){ //funkcja realizujaca wybor przeszkod dla naszego rzucanego obiektu
    RawUpdateView();
    var option = document.getElementById("przeszkodySelect").value;
    switch(option){
        case '1':
            DefaultView();
            break;
        case '2':
            BoxView();
            break;
        case '3':
            RightView();
            break;
        case '4':
            LeftView();
            break;
        case '5':
            BothView();
            break;
        case '6':
            BoxBothView();
            break;
        default:
            DefaultView();
    }
}

function DefaultView(){ //widok domyslny - samo podloze na otwartej rpzestrzeni
    context.fillRect(0,obszar1.height-10,obszar1.width,10);
    context.stroke();
}

function BoxView(){ //pudelko - obszar canvas ograniczony z kazdej strony
    context.fillRect(0,0,obszar1.width,10);
    context.fillRect(0,obszar1.height-10,obszar1.width,10);
    context.fillRect(0,0,10,obszar1.height);
    context.fillRect(obszar1.width-10,0,obszar1.width,obszar1.height);
    context.stroke();
}

function RightView(){ //slupek po prawej stronie - przeszkoda po prawej na otwatej przestrzeni
    DefaultView();
    context.fillRect(0.75*Number(obszar1.width), obszar1.height/2, 10, obszar1.height);
    context.stroke();
}

function LeftView(){ //slupek po lewej stronie - przeszkoda po lewej na otwatej przestrzeni
    DefaultView();
    context.fillRect(0.25*Number(obszar1.width)-10, obszar1.height/2, 10, obszar1.height);
    context.stroke();
}

function BothView(){ //slupki po lewej i prawej stronie - przeszkody na otwatej przestrzeni
    RightView();
    LeftView();
    context.stroke();
}

function BoxBothView(){ //slupki po lewej i prawej stronie ograniczone pudelkiem
    BoxView();
    BothView();
}

function HitDetectionSwitch(hitOption){ //funkcja realizujaca wybor funkcji detekcji odbicia
    switch(hitOption){
        case '1':
            DefaultHit();
            break;
        case '2':
            BoxHit();
            break;
        case '3':
            RightHit();
            break;
        case '4':
            LeftHit();
            break;
        case '5':
            BothHit();
            break;
        case '6':
            BoxBothHit();
            break;
    }
}

function DefaultHit(){ //detekcja uderzen na otwartej przestrzeni
    var bottom = new Number(obszar1.height-20);
    if(Ball.posY>bottom){
        HitSound();
        Ball.hitDetect();
        Ball.resetPos();
    }
}

function BoxHit(){ //detekcja uderzen w pudelku
    var top = new Number(20);
    var left = new Number(20);
    var right = new Number(obszar1.width-20);
    
    DefaultHit();

    if(Ball.posY<top){
        HitSound();
        Ball.hitDetect();
        Ball.setXY(Ball.posX, top);
    }else if(Ball.posX<left){
        HitSound();
        Ball.hitWall();
        Ball.setXY(left, Ball.posY);
    }else if(Ball.posX>right){
        HitSound();
        Ball.hitWall();
        Ball.setXY(right, Ball.posY);
    }
}

function RightHit(){ //detekcja uderzen przy slupku po prawej stronie na otwartej przestrzeni
    DefaultHit();

    var leftSide = new Number(0.75*Number(obszar1.width)-10);
    var rightSide = new Number(0.75*Number(obszar1.width)+20);
    var height = new Number(obszar1.height/2-10);
    var by= new Number(Ball.posY);
    var h = height - by;

    if(Ball.posY>height && Ball.posX>leftSide && Ball.posX<rightSide){
        if(h == 0){
            HitSound();
            Ball.hitDetect();
            Ball.setXY(Ball.posX, height);
        }else if(Ball.getVelX>0){
            HitSound();
            Ball.hitWall();
            Ball.setXY(leftSide, Ball.posY);
        }else{
            HitSound();
            Ball.hitWall();
            Ball.setXY(rightSide, Ball.posY);
        }
    }
}

function LeftHit(){  //detekcja uderzen przy slupku po lewej stronie na otwartej przestrzeni
    DefaultHit();

    var leftSide = new Number(0.25*Number(obszar1.width)-20);
    var rightSide = new Number(0.25*Number(obszar1.width)+10);
    var height = new Number(obszar1.height/2-10);
    var by= new Number(Ball.posY);
    var h = height - by;

    if(Ball.posY>height && Ball.posX>leftSide && Ball.posX<rightSide){
        if(h == 0){
            HitSound();
            Ball.hitDetect();
            Ball.setXY(Ball.posX, height);
        }else if(Ball.getVelX>0){
            HitSound();
            Ball.hitWall();
            Ball.setXY(leftSide, Ball.posY);
        }else{
            HitSound();
            Ball.hitWall();
            Ball.setXY(rightSide, Ball.posY);
        }
    }
}

function BothHit(){ //detekcja uderzen przy slupkach po obu stronach na otwartej przestrzeni
    LeftHit();
    RightHit();
}

function BoxBothHit(){ //detekcja uderzen przy slupkach po obu stronach ograniczonych pudelkiem
    BoxHit();
    BothHit();
}

function DescriptionShow(){ //funkcja wstawiajaca instrukcje obslugi projektu w miejscie tagu <div> o id "opisShow"
    document.getElementById("opisShow").innerHTML = "<h3>Poniżej przedstawiono krótki opis funkcjonalości projektu:</h3> <li>pierwszy slider pozwala nam na dogodne ustawienie kąta rzutu piłki (przyjmuje wartości od 0 do 360 stopni),</li><li>drugi slider umożliwia nam zmianę prędkości piłki (przyjmuje wartości od 0 do 100),</li><li>kolejne okienko umożliwia nam ustawienie liczby kroków symulacji (defaultowo ustawiono tą wartość na 1000 iteracji),</li><li>znajdująca się poniżej lista umożliwia wybór zestawu przeszkód dla naszej piłki, aby urozmaicić symulacje,</li><li>ostatnie 4 guziki oznaczają kolejno rozpoczęcie symulacji, zastopowanie symulacji wedle naszego życzenia, zresetowanie symulacji do ustawień defaultowych oraz wyciszenie dzwieku.</li>Aby zmienić współrzędne położenia piłki, wystarczy kliknąc na planszy interesujące nas miejsce.<br><br>";
}

function HitSound(){ //funkcja odtwarzajaca dzwiek w czasie odbijania sie naszego obiektu
    var audio = new Audio('hit.mp3');
    if(MuteFlag){
        audio.play(); 
    }
}

function Mute(){ //funkcja wyciszajaca dzwiek uderzen
    MuteFlag = false;
    document.getElementById("muteButton").innerHTML="<input type=\"button\" value=\"Wyłącz wyciszenie\" onclick=\"unMute()\"> <br>"
}

function unMute(){ //funkcja wylaczajaca wyciszenie dzwieku uderzen
    MuteFlag = true;
    document.getElementById("muteButton").innerHTML="<input type=\"button\" value=\"Wycisz\" onclick=\"Mute()\"> <br>"
}