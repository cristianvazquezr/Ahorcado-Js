/*Juego de ahorcado, lo primero que tengo que hace es determinar una lista de palabras, que es desde donde se va a tomar una de manera aleatoria para comenzar el juego*/

/*Lista de palabras*/

let listaPalabras=["microondas","heladera","televisor","completo","psicologo"]

/*Elijo la palabra, genero un indice aleatorio para el areglo*/

indice=Math.floor(Math.random()*listaPalabras.length)
let palabraElegida=listaPalabras[indice]

/*cuento la cantidad de letras q tiene la palabra para informarlo en el juego*/

numeroLetras=palabraElegida.length

/*Defino la cantidad de vidas o intentos que va a tener*/

vidas=6


/* Funcion que agrega a una lista la letra elegida por el usuario. llevo todo a minusculas para que no haya error y corroboro que el ingreso del usuario sea una letra*/
function elegirLetra(){
    let letraElegida=prompt("Elija una letra").toLowerCase();
    const regexp=/[a-z]/;
    validacionLetra=regexp.test(letraElegida);
    validacionCaracteres=letraElegida.length;
    while (validacionLetra==false || validacionCaracteres!=1){
        letraElegida=prompt("Usted no a elegido una letra o eligió mas de una. Ingrese una letra").toLowerCase();
        validacionLetra=regexp.test(letraElegida);
        validacionCaracteres=letraElegida.length;
    }
    return letraElegida
}

/*creo una funcion para que cree una lista de las letras elgidas*/
let listaUsuario=[]
function listaLetras(letraUsuario){
    listaUsuario.push(letraUsuario)
    return listaUsuario
}

/* creo una funcion que me vaya agregando las letras elegidas a la palabra */
let palabraArmada=[];
palabraArmada.length=palabraElegida.length
function completaPalabra(letra,palabraRandom){
    let coincidencia=0
    for (let j=0;j<palabraRandom.length;j++){
        if(letra==palabraRandom.split('')[j]){
            palabraArmada[j]=letra
            coincidencia++
        }
        else{
            continue
        }
    }
    /*completo los valores vacios con guiones*/
    for (let i=0;i<palabraArmada.length;i++){
        if (palabraArmada[i]==null){
            palabraArmada[i]="_"
        }
        else{
            continue
        }
    }
    let palabraCadena=palabraArmada.join(' ')
    return [palabraCadena,coincidencia]
}


/*defino una funcion que me vaya completando las letras que va adivinando*/

function PalabraGuiones(){
    let palabraIncompleta="";
    for(let i=0;i<numeroLetras;i++){
        palabraIncompleta = "_" + " " + palabraIncompleta;
    }
    return palabraIncompleta
}




/* comienzo a diseñar el juego, arranco por un mensaje introuctorio*/


function ahorcado(){
    alert("Hola, esta por comenzar a jugar al ahorcado, tenes 6 vidas. Suerte!!.")
    let gana=false
    let listLetraElegida=[];
    let letraElegida=""
    let palabraArmando=completaPalabra(letraElegida,palabraElegida)[0];
    let coincidencias= completaPalabra(letraElegida,palabraElegida)[1];
    console.log("La palabra elegida tiene " + numeroLetras + " letras.\n" + palabraArmando);
    /* tomo las variables para levantarlas en el HTML */
    let leElegidas = document.getElementById('letrasElegidas');
    leElegidas.innerHTML = listLetraElegida.join(", ");
    let palabraUsuario = document.getElementById('palabra');
    palabraUsuario.innerHTML = palabraArmando;
    document.getElementById('tituloLetras').innerHTML="Letras elegidas"
    
    while (vidas>0 && gana==false){
        letraElegida=elegirLetra();
        listLetraElegida=listaLetras(letraElegida);
        coincidencias = completaPalabra(letraElegida,palabraElegida)[1];
        palabraArmando = completaPalabra(letraElegida,palabraElegida)[0];
        if (coincidencias==0){
            vidas=vidas-1
            console.log("la letra elegida tiene " + coincidencias + " coincidencias\nTe quedan " + vidas + " vidas")
        }
        else{
            console.log("la letra elegida tiene " + coincidencias + " coincidencias\nContinua asi!!")
        }
        palabraUsuario.innerHTML = palabraArmando;
        leElegidas.innerHTML = "[" + listLetraElegida.join(", ")+"]";
        console.log(palabraArmando)
        /*si tiene guiones la palabra es por que aun no adivino por ende gana es false*/
        gana=!palabraArmando.includes("_");
        if(gana){
            console.log("ganaste el juego.\nTe sobraron "+ vidas + " vidas")
        }

        switch (vidas){
            case 6:
                document.getElementById("image").src = "./imagenes/ahorcado 0.png";
                break;
            case 5:
                document.getElementById("image").src = "./imagenes/ahorcado 1.png";
                break;
            case 4:
                document.getElementById("image").src = "./imagenes/ahorcado 2.png";
                break;
            case 3:
                document.getElementById("image").src = "./imagenes/ahorcado 3.png";
                break; 
            case 2:
                document.getElementById("image").src = "./imagenes/ahorcado 4.png";
                break;  
            case 1:
                document.getElementById("image").src = "./imagenes/ahorcado 5.png";
                break;  
            case 0:
                document.getElementById("image").src = "./imagenes/ahorcado.png";
                break;  

        }
        
    }
}