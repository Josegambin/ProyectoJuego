

//El canvas
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var puntos = 0;
var vidas = 3;
var nivel = 0;
var bala =[];
var shoot = false;
var audio = document.getElementById("audio");




//Leer Imagen
var image = new Image();
image.id = 'nave';
image.src = "img/jugadorBueno.png";

var imagen1 = new Image();
imagen1.src ="img/pulpo1.png";

var imagen2 = new Image();
imagen2.src ="img/pulpo2.png";

var bonus2 = new Image();
bonus2.src ="img/bonus2.png";

var bonus1 = new Image();
bonus1.src ="img/bonus1.png";


//Array
var nave = {
    X: 100,
    Y: 100,
    image: image
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
window.addEventListener("keyup", function(event) {

    //Arriba / W
    if(event.keyCode == 38 || event.keyCode == 87 ){
        if(nave.Y >0) {
            nave.Y -= 15;
        }
    }
    //Abajo / S
    if(event.keyCode == 40 || event.keyCode == 83){
        if(nave.Y <=510){
            nave.Y +=15;
        }
    }
    //Derecha / D
    if(event.keyCode == 39 || event.keyCode ==  68){
        if(nave.X <=720){
            nave.X +=15;
        }
    }
    //Izquierda / A
    if(event.keyCode == 37 || event.keyCode == 65){
        if(nave.X >=0){
            nave.X -=15;
        }
    }
    //Disparo
    if(event.keyCode == 32){
        shoot = true;
    }
    animation();

}, false);
window.addEventListener("keydown", function(event) {

    //Arriba / W
    if(event.keyCode == 38 || event.keyCode == 87 ){
        if(nave.Y >0) {
            nave.Y -= 15;
        }
    }
    //Abajo / S
    if(event.keyCode == 40 || event.keyCode == 83){
        if(nave.Y <=510){
            nave.Y +=15;
        }
    }
    //Derecha / D
    if(event.keyCode == 39 || event.keyCode ==  68){
        if(nave.X <=720){
            nave.X +=15;
        }
    }
    //Izquierda / A
    if(event.keyCode == 37 || event.keyCode == 65){
        if(nave.X >=0){
            nave.X -=15;
        }
    }
    //Disparo
    if(event.keyCode == 32){
        shoot = true;
    }
    animation();

}, true);

//Niveles de Juego

//Colisiones de disparo con jugador
function colisiones() {
        // compruebo colision disparos jugador

            for(var j=0;j<bala.length;j++){
                if(!enemigo1) continue;
                if(bala[j].y <= enemigo1.Y || bala[j].y >= enemigo1.Y){
                    if(bala[j].x >= enemigo1.X && bala[j].x <= enemigo1.X ) {
                        audio.play();
                        puntos += 10;
                        bala.splice(0, 1);
                    }
                }
            }
}

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

    if (enemigo1.X <= 0 ) {
        enemigo1.X = 900;
        enemigo1.Y = Math.floor((Math.random() * 650) + 1);
    }
    if (enemigo2.X <= 0 ) {
        enemigo2.X = 900;enemigo2.Y = Math.floor((Math.random() * 650) + 1);

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

    //Niveles del Juego
    if(puntos > 0 && puntos <=50){
        nivel = 0;
    }else if( puntos > 50 && puntos <=100){
        nivel =1;
        enemigo1.X -=1;
    }else if( puntos > 100 && puntos <=150) {
        nivel = 3;
        enemigo1.X -=2;
    }else if( puntos > 150 && puntos <= 200) {
        nivel = 4;
        enemigo1.X -=3;
    }else if( puntos > 200 && puntos <= 250) {
        nivel = 5;
        enemigo1.X -=4;
    }

    if(puntos == 250){
        alert("Has Ganado");

    }
     animation();

}

//Funcion para dibujar jugador, disparos y enemigos
function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(nave.image, nave.X, nave.Y);
    ctx.drawImage(enemigo1.imagen1, enemigo1.X, enemigo1.Y);
    //ctx.drawImage(enemigo2.imagen2, enemigo2.X, enemigo2.Y);
    //ctx.drawImage(enemigo3.imagen2, enemigo3.X, enemigo3.Y);
    //ctx.drawImage(enemigo4.imagen2, enemigo4.X, enemigo4.Y);
    //ctx.drawImage(bonus2.bonus2, bonus2.X, bonus2.Y);
    //ctx.drawImage(bonus1.bonus1, bonus1.X, bonus1.Y);

    // dibujo disparos jugador
    for(var i=0;i<bala.length;i++){
        ctx.fillStyle = bala[i].color;
        ctx.fillRect(bala[i].y, bala[i].x, 15, 6);
    }


    if(shoot == true){
        //Movimiento de la bala
        bala.push({'x':nave.Y +83 , 'y':nave.X + 139, 'color':'lime'});
        shoot = false;
    }

    for(var i=0;i<bala.length;i++){
        //Velocidad de la bala
        bala[i].y += 3;
    }

    // disparos enemigo fuera de canvas
    for(var i=0;i<bala.length;i++){
        if(bala[i].y >= 900){
            bala.splice(i, 1);
        }
    }

    // escribo puntos, vidas y nivel
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("PUNTOS: "+ puntos, 10, 15);
    ctx.fillText("VIDAS: "+ vidas, canvas.width -90, 15);
    ctx.fillText("- NIVEL: " + nivel, 90, 15);


   /* if(vidas = 0){
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText("se ha acabado!", 250, 250);
    }*/
    colisiones();

}
