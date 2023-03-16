function ahorcado(){
    /*Juego de ahorcado, lo primero que tengo que hace es determinar una lista de palabras, que es desde donde se va a tomar una de manera aleatoria para comenzar el juego*/

    /*Lista de palabras*/

/*creo una clase palabras para ir creando estas y definirle una categoria y una dificultad*/
    class palabras{
        constructor(categoria,dificultad,palabras){
        this.categoria=categoria
        this.dificultad=dificultad
        this.palabras=palabras
        }
    }

    /*voy agregando los objetos a una lista de objetos palabras */
    const listaPalabras=[]

    listaPalabras.push(new palabras("frutas","facil","Lechuga"))
    listaPalabras.push(new palabras("frutas","facil","papa"))
    listaPalabras.push(new palabras("frutas","dificil","mangostino"))
    listaPalabras.push(new palabras("electrodomesticos","dificil","microondas"))
    listaPalabras.push(new palabras("electrodomesticos","dificil","heladera"))
    listaPalabras.push(new palabras("electrodomesticos","facil","radio"))
    listaPalabras.push(new palabras("ciencia","dificil","mercurio"))
    listaPalabras.push(new palabras("ciencia","dificil","otorrinolaringologia"))
    listaPalabras.push(new palabras("ciencia","dificil","alcalinidad"))


    /*creo una funcion que me permita elegir la dificultad de las palabras. Aca incluyo el saludo al iniciar el juego */

    function palabraDificultad(){
        let dificultad=parseInt(prompt("Hola, esta por comenzar a jugar al ahorcado.Ingrese la dificultad:\n-(1) facil\n-(2) dificil"))

        while (!(dificultad==1 || dificultad==2)){
            dificultad=parseInt(prompt("ingrese una opción válida"));
        }
        let dificultadPalabra="";
        if (dificultad===1){
            dificultadPalabra="facil"
        }
        else{
            dificultadPalabra="dificil"
        }
        let listaPalabrasDificultad=[]
        listaPalabras.forEach((palabritas) => {
            if (palabritas.dificultad==dificultadPalabra){
            listaPalabrasDificultad.push(palabritas.palabras)}      
        });
        return listaPalabrasDificultad
    }

   let listaPalabraPorDificultad=palabraDificultad()
    /*Elijo la palabra, genero un indice aleatorio para el areglo*/

    let indice=Math.floor(Math.random()*listaPalabraPorDificultad.length)
    let palabraElegida=listaPalabraPorDificultad[indice]
    

    /* Busco la categoria de la palabra random elegida */
    let categoria=""
    let dificultadElegida=""
    listaPalabras.forEach((palabra)=>{
        if(palabra.palabras==palabraElegida){
            categoria=palabra.categoria
            dificultadElegida=palabra.dificultad
        }
    })


    /*cuento la cantidad de letras q tiene la palabra para informarlo en el juego*/

    const numeroLetras=palabraElegida.length

    /*Defino la cantidad de vidas o intentos que va a tener*/

    let vidas=6


    /* Funcion que agrega a una lista la letra elegida por el usuario. llevo todo a minusculas para que no haya error y corroboro que el ingreso del usuario sea una letra*/
    function elegirLetra(){
        let letraElegida=prompt("Elija una letra").toLowerCase();
        const regexp=/[a-z]/;
        let validacionLetra=regexp.test(letraElegida);
        let validacionCaracteres=letraElegida.length;
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
    const palabraArmada=Array(numeroLetras);
    function completaPalabra(letra,palabraRandom){
        let coincidencia=0
        for (let j=0;j<palabraRandom.length;j++){
            if(letra==palabraRandom.split('')[j]){
                palabraArmada[j]=letra
                coincidencia++
            }
            else if(palabraArmada[j]==null) {
                palabraArmada[j]="_"
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


    /* Luego de dar la bienvenida al juego, arranco por un mensaje introuctorio*/

    alert(`Usted tiene 6 vidas y la dificultad elegida fue ${dificultadElegida}. Mucha Suerte!`)

    /*inicio el jugo y vuelvo al inicio las imagenes y los textos del html*/
    document.getElementById("image").src = "./imagenes/ahorcado 0.png";
    let leElegidas = document.getElementById('letrasElegidas');
    let palabraUsuario = document.getElementById('palabra');
    document.getElementById('tituloLetras').innerHTML="";
    leElegidas.innerHTML = "";
    palabraUsuario.innerHTML = "";
    let gana=false
    let listLetraElegida=[];
    let letraElegida=""
    let palabraArmando=completaPalabra(letraElegida,palabraElegida)[0];
    let coincidencias= completaPalabra(letraElegida,palabraElegida)[1];
    console.log("La palabra elegida tiene " + numeroLetras + " letras.\nPertenece a la categoria " + categoria + "\n" + palabraArmando);
      
    while (vidas>0 && gana==false){
        letraElegida=elegirLetra();
        listLetraElegida=listaLetras(letraElegida);
        coincidencias = completaPalabra(letraElegida,palabraElegida)[1];
        palabraArmando = completaPalabra(letraElegida,palabraElegida)[0];
        /* tomo las variables para levantarlas en el HTML */
        leElegidas.innerHTML = listLetraElegida.join(", ");
        palabraUsuario.innerHTML = palabraArmando;
        document.getElementById('tituloLetras').innerHTML="Letras elegidas"
        if (coincidencias==0){
            vidas=vidas-1
            console.log("la letra elegida tiene " + coincidencias + " coincidencias\nTe quedan " + vidas + " vidas\nLETRAS ELEGIDAS: [" + listLetraElegida.join(", ")+"]")
        }
        else{
            console.log("la letra elegida tiene " + coincidencias + " coincidencias\nContinua asi!!\nLETRAS ELEGIDAS: [" + listLetraElegida.join(", ")+"]")
        }
        palabraUsuario.innerHTML = palabraArmando;
        leElegidas.innerHTML = "[" + listLetraElegida.join(", ")+"]";
        console.log(palabraArmando)
        /*si tiene guiones la palabra es por que aun no adivino por ende gana es false*/
        gana=!palabraArmando.includes("_");
        if(gana){
            console.log("ganaste el juego.\nTe sobraron "+ vidas + " vidas")
        }
        if (vidas==0){
            console.log("PERDISTE!! Te has quedado sin vidas")
        }

        /*creo un switch para que elija de acuerdo a la cantidad de vidas la imagen que debe mostrar */
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
