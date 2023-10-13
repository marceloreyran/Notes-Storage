//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Event Listeners

eventListeners();

function eventListeners() {

   //Cuando el usuario agrega un nuevo mensaje 
  formulario.addEventListener("submit", agregarTweet);

  //Cuando el documento esta listo 
  document.addEventListener('DOMContentLoaded', () => {

    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    console.log(tweets);

    crearHTML();
  });
}

//Funciones

function agregarTweet(e) {
  e.preventDefault();

  //Textarea donde el usuarion escribe
  const tweet = document.querySelector("#tweet").value;

  //Validación

  if (tweet === "") {
    mostrarError("This is an empty message");

    return; // Evita que se ejecuten más líneas de codigo
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  //Añadir al arreglo de mensajes...
  tweets = [...tweets, tweetObj];

  //Una vez agregado vamos a crear el HMTL
  crearHTML();

  //Resetear el Formulario 
  formulario.reset();
}

 //Mostar un mensaje de error
function mostrarError(error) {
  const mensajeEerror = document.createElement("p");
  mensajeEerror.textContent = error;
  mensajeEerror.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeEerror);

  //Elimina la alerta despues de 3 segundos
  setTimeout(() => {
    mensajeEerror.remove();
  }, 3000);
}

//Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0 ){

        tweets.forEach( tweet => {
            
            //Agregar un boton de eliminar

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //Añadir la funcion de eliminar 
            btnEliminar.onclick = () => {
              borrarTweet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('li');

            //Añadir el texto 
            li.innerText = tweet.tweet;

            //Asignar el Bóton
            li.appendChild(btnEliminar);

            //Insertarlo en el HTML
            listaTweets.appendChild(li);

        });
    }
    sincronizarStorage();
}

//Agregar los mensajes actuales a LocalStorage
function sincronizarStorage(){

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML(){
    localStorage.setItem('tweets', JSON.stringify('tweets'));

}

//Eliminar un mensaje

function borrarTweet (id){

  tweets = tweets.filter(tweet => tweet.id !== id );

  crearHTML();
  
}

//Limpiar el HTML

function limpiarHTML(){

    while(listaTweets.firstChild){

        listaTweets.removeChild(listaTweets.firstChild);
    }
}