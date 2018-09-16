

//El canvas
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var puntos = 0, vidas = 3, nivel = 0, shoot = false,  shootE = false, request = 0, modal, gameover, span, inicio;
var bala =[];
var balaE = [];
var enemigos = [];
var bonus =[];
var audio = document.getElementById("audio");
var vida = document.getElementById("vida");



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
    X: 900,
    Y: 500,
    imagen : imagen1,
};

var enemigo2 ={
    X:530,
    Y:200,
    imagen : imagen2
};

var enemigo3 ={
    X:700,
    Y:600,
    imagen : imagen2
};

var enemigo4 ={
    X:200,
    Y:500,
    imagen : imagen2
};

enemigos.push(enemigo1);
enemigos.push(enemigo2);
enemigos.push(enemigo3);
enemigos.push(enemigo4);

var bonus1 = {
    X: 500,
    Y: 115,
    bonus : bonus1
};

var bonus2 = {
    X: 400,
    Y: 650,
    bonus : bonus2
};

bonus.push(bonus2);
bonus.push(bonus1);

//Escucha de movimiento del mouse



load();

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
        shootE = true;
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

//Ventana fianl de ganador
document.addEventListener('DOMContentLoaded', function() {
    modal = document.getElementById('myModal');
    span = document.getElementsByClassName("close")[0];
}, false);

//Ventana de GAME OVER
document.addEventListener('DOMContentLoaded', function() {
    gameover = document.getElementById('gameover');
    span = document.getElementsByClassName("close")[0];
}, false);

//Ventana de inicio
function load(){
    document.addEventListener('DOMContentLoaded', function() {
        modal = document.getElementById('portada');
        modal.style.display = "block";
        inicio = document.getElementById('inicio');
        span = document.getElementsByClassName("close")[0];
        update();
    }, false);
}

//Colisiones de disparo con jugador
function colisiones() {

//Colision Bala Juegador con enemigo

    for(var i=0;i<enemigos.length;i++){
        for(var j=0;j<bala.length;j++){

            if(!enemigos[i]) continue;

            if(bala[j].y <= enemigos[i].Y + enemigos[i].imagen.height && bala[j].y >= enemigos[i].Y){
                if( (bala[j].x >= enemigos[i].X && bala[j].x <= enemigos[i].X + enemigos[i].imagen.width) ||
                    (bala[j].x + 2 >= enemigos[i].X && bala[j] + 2 <= enemigos[i].X + enemigos[i].imagen.width) ){
                    enemigos[i].X = 900;
                    enemigos[i].Y = Math.floor((Math.random() * 650) + 1);
                    audio.play();
                    bala.splice(1);
                    puntos +=10;

                }
            }
        }
    }


//Colision Cuerpo Jugador a Cuerpo enemigo

    for(var i=0;i<enemigos.length;i++){
        if((enemigos[i].Y + enemigos[i].imagen.height >= nave.Y) || ( nave.Y <= enemigos[i].Y   )){
            if( (enemigos[i].X >= nave.X && enemigos[i].X <= nave.X + nave.image.width) ||
                (enemigos[i].X + enemigos[i].imagen.width >= nave.X && enemigos[i].X + enemigos[i].imagen.width <= nave.X + nave.image.width) ){
                    enemigos[i].X = 900;
                    enemigos[i].Y = Math.floor((Math.random() * 650) + 1);
                    vidas--;
                    vida.play();
            }
        }
    }

//Colision de bala de enemigo con jugador
/*
    for(var i=0;i<balaE.length;i++){
        if(balaE[i].y >= nave.X){
            if( (balaE[i].x <= nave.X && balaE[i].x <= nave.X + nave.image.width) || (balaE[i].x  >= nave.X && balaE[i]  <= nave.X + nave.image.width) ){
                vidas--;
                balaE.splice(i, -1);
            }
        }
    }
 */

//Colision de bala con bonus.


 //Colision de enemigo con bonus
}

update();
function update() {


    //Movimiento Enemigos
    //Funcion para el repintado del enemigo y eliminacion del anterior para visualizar los movimientos
    request = requestAnimationFrame(update, canvas);
    //A la poscion X del enemigo restamos pixeles 1 a 1

    enemigo1.X--;
    enemigo2.X--;
    enemigo3.X--;
    enemigo4.X--;
    bonus1.X--;
    bonus2.X--;


 if (enemigo1.X < 0 ) {
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



    if(puntos >=100){
        modal.style.display = "block";
        //Pausa la animacion
        cancelAnimationFrame(request);
    }
    if(vidas > -1 && vidas < 1){
        gameover.style.display = "block";
        cancelAnimationFrame(request);
    }

    animation();
    colisiones();

}

//Funcion para dibujar jugador, disparos y enemigos
function animation() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(nave.image, nave.X, nave.Y);


    //Dibujo enemigos
    for(var i = 0; i <enemigos.length ; i++){
        ctx.drawImage(enemigos[i].imagen, enemigos[i].X, enemigos[i].Y);
    }

   //Dibujo bonus
    for(var i =0; i< bonus.length;i++){
        ctx.drawImage(bonus[i].bonus, bonus[i].X, bonus[i].Y);
    }

    // dibujo disparos jugador
    for (var i = 0; i < bala.length; i++) {
        bala[i].x +=3;
        ctx.fillStyle = bala[i].color;
        ctx.fillRect( bala[i].x, bala[i].y, 15, 6);
    }
    //dibujo disparos de enemigo
    for (var i = 0; i < balaE.length; i++) {
        balaE[i].x -= 3;
        ctx.fillStyle = balaE[i].color;
        ctx.fillRect( balaE[i].x, balaE[i].y ,15, 6);
    }

    //Posicion de Donde sale la bala del jugador
    if (shoot == true) {
        //Movimiento de la bala
        bala.push({ 'x': nave.X + 139, 'y': nave.Y + 83, 'color': 'lime'});
        shoot = false;
    }

    //Posicion de Donde sale la bala del enemigo1


    if (shootE == true) {
        //Movimiento de la bala
        balaE.push({'x': enemigo1.X + 5, 'y': enemigo1.Y + 48, 'color': 'pink'});
        balaE.push({ 'x': enemigo2.X +40,'y': enemigo2.Y + 70 , 'color': 'pink'});
        balaE.push({ 'x': enemigo3.X +40,'y': enemigo3.Y + 70, 'color': 'pink'});
        balaE.push({ 'x': enemigo4.X +40,'y': enemigo4.Y + 70, 'color': 'pink'});
        shootE = false;
    }


    // disparos  de jugador fuera de canvas
    for(var i=0;i<bala.length;i++){
        if(bala[i].x >=900){
            bala.splice(i, 1);
        }
    }
    //Disparo enemigo fuera del canvas
    for(var i=0;i<balaE.length;i++){
        if(balaE[i].x < 0){
            balaE.splice(i, 1);

        }
    }
    // escribo puntos, vidas y nivel
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("PUNTOS: "+ puntos, 400, 15);
    ctx.fillText("VIDAS: "+ vidas, canvas.width -90, 15);
    ctx.fillText("NIVEL: " + nivel, 10, 15);
}


function f(a) {
    document.getElementById('portada').style.display='none';
}

document.getElementById("canvas").addEventListener("onmousemove", function(event) {
    myFunction(event);
});


window.onload = function(){

    document.getElementById("canvas").onmousemove = function (e) {
        if((e.movementX >=0 )|| (e.movementX < 900)) {
            nave.X += 4;
        }
        if(e.movementX <= 510) {
            nave.X += -4;
        }
        if(e.movementY <= 510) {
            nave.Y += -4;
        }
        if(e.movementY <= 510) {
            nave.Y += -4;
        }
    }

};

//Movimiento del raton
function myFunction(e) {
    cancelAnimationFrame(request);

    var x = e.clientX ;
    var y = e.clientY ;

    nave.X = x;
    nave.Y = y;

}

