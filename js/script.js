

//El canvas
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var puntos = 0;
var vidas =3;
var nivel = 0;

//Leer Imagen
var image = new Image();
image.src = "img/jugadorBueno.png";

var imagen1 = new Image();
imagen1.src ="img/pulpo1.png";


var imagen2 = new Image();
imagen2.src ="img/pulpo2.png";

var bonus2 = new Image();
bonus2.src ="img/bonus2.png";

var bonus1 = new Image();
bonus1.src ="img/bonus1.png";

var bala = new Image();
bala.src ="img/bala.png"

//Array
var nave = {
    X: 100,
    Y: 100,
    image: image
};

var bala = {
    X: 234,
    Y: 170,
    bala : bala,
};


var enemigo1 ={
    X: 700,
    Y: 300,
    imagen1 : imagen1,
};

var enemigo2 ={
    X:530,
    Y:200,
    imagen2 : imagen2
};

var enemigo3 ={
    X:700,
    Y:600,
    imagen2 : imagen2
};

var enemigo4 ={
    X:200,
    Y:500,
    imagen2 : imagen2
};

var bonus1 = {
    X: 500,
    Y: 115,
    bonus1 : bonus1
};

var bonus2 = {
    X: 400,
    Y: 650,
    bonus2 : bonus2
};

//Escucha de movimiento del mouse
window.addEventListener("onmousedown", function (ev) {

});

//Escucha de teclas de movimientos de la nave
window.addEventListener("keydown", function(event) {

    console.log(event.keyCode);

    if(event.keyCode == 38 || event.keyCode == 87 || event.o){
        if(nave.Y >0) {
            console.log("Flecha Arriba y W");
            nave.Y -= 15;

        }
    }
    if(event.keyCode == 40 || event.keyCode == 83){
        if(nave.Y <=510){
            console.log("Flecha abajo y S");
            nave.Y +=15;

        }
    }
    if(event.keyCode == 39 || event.keyCode ==  68){
        if(nave.X <=720){
            console.log("Flecha derecha y D");
            nave.X +=15;

        }
    }
    if(event.keyCode == 37 || event.keyCode == 65){
        if(nave.X >=0){
            console.log("izquierda y A");
            nave.X -=15;

        }
    }
    if(event.keyCode == 32){
        if(bala.X >0){
            bala.X +=15;
        }
    }
    animation();

}, false);


update();


function update() {
    //Movimiento Enemigos
    //Funcion para el repintado del enemigo y eliminacion del anterior para visualizar los movimientos
    requestAnimationFrame(update, canvas);
    //A la poscion X del enemigo restamos pixeles 1 a 1
    enemigo1.X--;
    enemigo2.X--;
    enemigo3.X--;
    enemigo4.X--;

    bonus1.X--;
    bonus2.X--;

    bala.X++;


    if (enemigo1.X <= 0 ) {
        enemigo1.X = 900;
        enemigo1.Y = Math.floor((Math.random() * 650) + 1);
    }

    if (enemigo2.X <= 0 ) {
        enemigo2.X = 900;
        enemigo2.Y = Math.floor((Math.random() * 650) + 1);

    }

    if (enemigo3.X <= 0 ) {
        enemigo3.X = 900;
        enemigo3.Y = Math.floor((Math.random() * 650) + 1);

    }

    if (enemigo4.X <= 0 ) {
        enemigo4.X = 900;
        enemigo4.Y = Math.floor((Math.random() * 650) + 1);
    }

    if (bonus1.X <= 0 ) {
        bonus1.X = 900;
        bonus1.Y =Math.floor((Math.random() * 670) + 1);

    }

    if (bonus2.X <= 0 ) {
        bonus2.X = 900;
        bonus2.Y =Math.floor((Math.random() * 670) + 1);
    }

    if (bala.X > 900) {
        bala.Y = nave.Y + 70;
        bala.X = nave.X + 90;
    }

    // muevo disparos jugador ...
    for(var x=0;x<bala.length;x++){
        bala[x].Y -= 5;
        bala.splice(2, 1, bala );

        // si disparo jugador se sale del canvas
      /*  if(bala[x].Y <= 0){
            bala.splice(x, l);
            continue;
        }
*/
    }

    animation();

}


//Funcion para dibujar jugador y enemigos
function animation() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(nave.image, nave.X, nave.Y);
    ctx.drawImage(bala.bala, bala.X, bala.Y);
    ctx.drawImage(enemigo1.imagen1, enemigo1.X, enemigo1.Y);
    ctx.drawImage(enemigo2.imagen2, enemigo2.X, enemigo2.Y);
    ctx.drawImage(enemigo3.imagen2, enemigo3.X, enemigo3.Y);
    ctx.drawImage(enemigo4.imagen2, enemigo4.X, enemigo4.Y);
    ctx.drawImage(bonus2.bonus2, bonus2.X, bonus2.Y);
    ctx.drawImage(bonus1.bonus1, bonus1.X, bonus1.Y);

    // escribo puntos, vidas y nivel
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "white";
    ctx.stroke()
    ctx.fillText("PUNTOS: "+ puntos, 10, 15);
    ctx.fillText("VIDAS: "+ vidas, canvas.width -90, 15);
    ctx.fillText("- NIVEL: " + nivel, 90, 15);

    if(vidas = 0){
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText("se ha acabado!", 250, 250);
    }




}




