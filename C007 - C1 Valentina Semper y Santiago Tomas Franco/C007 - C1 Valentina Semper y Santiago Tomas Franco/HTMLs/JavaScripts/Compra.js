//Esta es la funcion para generar la simulación del captcha
function generarCaptcha() {
    const numero1 = Math.floor(Math.random() * 10) + 1;
    const numero2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById("numero1").textContent = numero1;
    document.getElementById("numero2").textContent = numero2;
    const respuestaCorrecta = numero1 + numero2;
    sessionStorage.setItem("captchaRespuesta", respuestaCorrecta);
}

document.addEventListener("DOMContentLoaded", generarCaptcha);


document.getElementById("miBoton").addEventListener("click", boton);

function boton(event) {

    event.preventDefault();

    // Verifica el CAPTCHA
    const respuestaUsuario = document.getElementById("captcha-respuesta").value;
    const respuestaCorrecta = sessionStorage.getItem("captchaRespuesta");
    if (respuestaUsuario != respuestaCorrecta) {

        //Mensjae de error CAPTCHA
        mensajeError.textContent = "Captcha incorrecto. Por favor, inténtelo de nuevo.";
        document.getElementById("captcha-respuesta").classList.add("captcha-incorrecto");
        return;
    } else {

        document.getElementById("captcha-respuesta").classList.remove("captcha-incorrecto");
    }


    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let idioma = document.getElementById("idioma").value;

    document.querySelector("#datosPersonales #nombre").textContent = "Comprador: " + nombre;
    document.querySelector("#datosPersonales #email").textContent = "Contacto: " + email;
    document.querySelector("#datosPersonales #fecha").textContent = "Fecha: " + fecha;
    document.querySelector("#datosPersonales #hora").textContent = "Hora: " + hora;
    document.querySelector("#datosPersonales #idioma").textContent = "Idioma: " + idioma;
}
