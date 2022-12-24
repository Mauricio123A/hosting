PuntosInicio = 0;
MaxPuntos = localStorage.getItem("Puntos");
if (MaxPuntos != null && MaxPuntos != "" && MaxPuntos != false && MaxPuntos != undefined){
    MaxPuntos = JSON.parse(MaxPuntos)
} else{
    localStorage.setItem("Puntos", JSON.stringify(0));
}

document.getElementById("PuntosMaximos").textContent = "Record: " + MaxPuntos; // Puntos maximos


CantidadDePuntos = 0;
Puntos = document.getElementById("Puntos"); // Los puntos
function SumarAPuntos(Cantidad,i) {
    Puntos.style.boxShadow = "inset -15px -8px #af00ed, -15px -8px #afdded, -7px -3px 50px #000000";
    Puntos.style.backgroundColor = "#af55ed";
    setTimeout(AgregarUnoAPuntos, 10, Cantidad, i);
}
function AgregarUnoAPuntos(Cantidad,i){
    Puntos.textContent = parseInt(Puntos.textContent)+1;
    if (i<Cantidad-1){
        i=i+1;
        SumarAPuntos(Cantidad,i);
    } else{
        Puntos.style.boxShadow = "inset -15px -8px #af30ed, -15px -8px #afffed, -7px -3px 40px #000000";
        Puntos.style.backgroundColor = "#af88ed";
    }
}


Frame = document.getElementById("Frame") //Plantilla y frame para crear a la snake
Plantilla = document.getElementsByClassName("Block")[0]
Direccion = "Right"; // Direccion de la serpiente


Snake = []; // Array con la serpiente
i=0; // Crear las 5 partes de la serpiente
while (i<5){ // Crear cada parte del cuerpo en el lugar correspondiente
    let Cuerpo = Plantilla.cloneNode(true);
    Frame.appendChild(Cuerpo);
    Cuerpo.style.gridColumnStart = 10-(i+1);
    Cuerpo.style.gridColumnEnd = 11-(i+1);
    Cuerpo.style.gridRowStart = 10;
    Cuerpo.style.gridRowEnd = 11;
    Cuerpo.style.backgroundColor = "green";
    Snake.push(Cuerpo) // Agregar la nueva parte del cuerpo al array de snake
    i++;
}

Cabeza = Snake[0]; // Diferenciar la cabeza del cuerpo
Cabeza.style.backgroundColor = "greenyellow";


Plantilla.remove() // Eliminar la plantilla


SnakeAnteriorFila = [[0,0],[0,0],[0,0],[0,0],[0,0]]; //Posicion anterior de la serpiente en la fila
SnakeAnteriorColumna = [[0,0],[0,0],[0,0],[0,0],[0,0]]; // Posicion anterior de la serpiente en la columna
AnteriorMovimiento = "Left";
DemasCuerpo = 4;
function CambiarAnteriorSnake(ParteDelCuerpo, i){
    SnakeAnteriorFila[i][0] = ParteDelCuerpo.style.gridRowStart;
    SnakeAnteriorFila[i][1] = ParteDelCuerpo.style.gridRowEnd;
    SnakeAnteriorColumna[i][0] = ParteDelCuerpo.style.gridColumnStart;
    SnakeAnteriorColumna[i][1] = ParteDelCuerpo.style.gridColumnEnd;
}
function SeguirAdelante(ParteDelCuerpo, i) {
    CambiarAnteriorSnake(ParteDelCuerpo, i);
    ParteDelCuerpo.style.gridRowStart = SnakeAnteriorFila[i-1][0];
    ParteDelCuerpo.style.gridRowEnd = SnakeAnteriorFila[i-1][1];
    ParteDelCuerpo.style.gridColumnStart = SnakeAnteriorColumna[i-1][0];
    ParteDelCuerpo.style.gridColumnEnd = SnakeAnteriorColumna[i-1][1];
}
function MoverSnake() {
    if (Direccion=="Right"){
        CambiarAnteriorSnake(Cabeza, 0);
        Cabeza.style.gridColumnStart = parseInt(Cabeza.style.gridColumnStart)+1;
        Cabeza.style.gridColumnEnd = parseInt(Cabeza.style.gridColumnEnd)+1;
        let i=1;
        while (i<=DemasCuerpo){
            ParteDelCuerpo = Snake[i];
            SeguirAdelante(ParteDelCuerpo, i)
            i++;
        }
         AnteriorMovimiento = "Right";
    }else if(Direccion=="Left"){
        CambiarAnteriorSnake(Cabeza, 0);
        Cabeza.style.gridColumnStart = parseInt(Cabeza.style.gridColumnStart)-1;
        Cabeza.style.gridColumnEnd = parseInt(Cabeza.style.gridColumnEnd)-1;
        let i=1;
        while (i<=DemasCuerpo){
            ParteDelCuerpo = Snake[i];
            SeguirAdelante(ParteDelCuerpo, i)
            i++;
        }
        AnteriorMovimiento = "Left";
    }else if(Direccion=="Down"){
        CambiarAnteriorSnake(Cabeza, 0);
        Cabeza.style.gridRowStart = parseInt(Cabeza.style.gridRowStart)+1;
        Cabeza.style.gridRowEnd = parseInt(Cabeza.style.gridRowEnd)+1;
        let i=1;
        while (i<=DemasCuerpo){
            ParteDelCuerpo = Snake[i];
            SeguirAdelante(ParteDelCuerpo, i)
            i++;
        }
        AnteriorMovimiento = "Down";
    }else if(Direccion=="Up"){
        CambiarAnteriorSnake(Cabeza, 0);
        Cabeza.style.gridRowStart = parseInt(Cabeza.style.gridRowStart)-1;
        Cabeza.style.gridRowEnd = parseInt(Cabeza.style.gridRowEnd)-1;
        let i=1;
        while (i<=DemasCuerpo){
            ParteDelCuerpo = Snake[i];
            SeguirAdelante(ParteDelCuerpo, i)
            i++;
        }
        AnteriorMovimiento = "Up";
    }
    if (Manzana.style.gridColumnStart ==  Cabeza.style.gridColumnStart && Manzana.style.gridRowStart == Cabeza.style.gridRowStart) {
        CantidadDePuntos = CantidadDePuntos+100;
        SumarAPuntos(100,0);
        MoverManzana();

        DemasCuerpo++; // Agregar un cuerpo
        SnakeAnteriorFila.push([0,0])
        SnakeAnteriorColumna.push([0,0])
        let Cuerpo = Plantilla.cloneNode(true);
        Frame.appendChild(Cuerpo);
        SeguirAdelante(Cuerpo, 5)
        Cuerpo.style.backgroundColor = "green";
        Snake.push(Cuerpo)
    }
    let i = 1;
    while (i < DemasCuerpo){
        if (Snake[i].style.gridColumnStart ==  Cabeza.style.gridColumnStart && Snake[i].style.gridRowStart == Cabeza.style.gridRowStart){
            Perder();
        }
        i++;
    }
    if (Cabeza.style.gridColumnStart == 21 || Cabeza.style.gridColumnStart == 0 || Cabeza.style.gridRowStart == 21 || Cabeza.style.gridRowStart == 0){
        Perder();
    }
}

setInterval(MoverSnake, 90); // Mover cada 0.1 segundos


document.onkeydown = function(event) { // Detectar teclas
        switch(event.keyCode){
            case 65:
                if (AnteriorMovimiento != "Right"){
                    Direccion = "Left";
                }
                break;
            case 87:
                if (AnteriorMovimiento != "Down"){
                    Direccion = "Up";
                }
                break;
            case 68:
                if (AnteriorMovimiento != "Left"){
                    Direccion = "Right";
                }
                break;
            case 83:
                if (AnteriorMovimiento != "Up")
                {
                    Direccion = "Down";
                }
                break;
        }
}


function MoverManzana() { // Mover la manza
    let i = 0;
    Manzana.style.gridColumnStart = Math.floor(Math.random() * 19) +1;
    Manzana.style.gridColumnEnd = parseInt(Manzana.style.gridColumnStart)+1;
    Manzana.style.gridRowStart = Math.floor(Math.random() * 19)+1;
    Manzana.style.gridRowEnd = parseInt(Manzana.style.gridRowStart)+1;
    while (i < DemasCuerpo){
        if (Snake[i].style.gridColumnStart ==  Manzana.style.gridColumnStart && Snake[i].style.gridRowStart == Manzana.style.gridRowStart){
            MoverManzana();
            return;
        }
        i++;
    }
}

function Perder() {
    if (parseInt(MaxPuntos) < parseInt(Puntos.textContent)){
        localStorage.setItem("Puntos", JSON.stringify(CantidadDePuntos));
    }
    location.reload();
}


Manzana = document.createElement("div"); // Crear la manzana y moverla
Frame.appendChild(Manzana);
Manzana.style.backgroundColor = "red";
MoverManzana();