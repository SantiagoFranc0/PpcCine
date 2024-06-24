let url = 'https://6671dc8ae083e62ee43d5871.mockapi.io/Api/C007/C3/TpEspecial/SantiagoFranco/Peliculas';

async function agregar_elementos() {
    try {
        let res = await fetch(url);
        let peliculas = await res.json();
        let tabla = document.querySelector("#tabla_opiniones tbody");

        // Limpiamos el contenido actual de la tabla
        tabla.innerHTML = '';

        // Iteramos sobre las películas y las añadimos al final de la tabla
        peliculas.forEach(pelicula => {
            let fila = `
                <tr>
                    <td>${pelicula.Nombre}</td> 
                    <td>${pelicula.id}</td>
                    <td>${pelicula.Edad}</td>
                    <td>${pelicula.Pelicula}</td>
                    <td>${pelicula.Opinion}</td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });

    } catch (error) {
        console.error('Error al obtener y mostrar las películas:', error);
    }
}

async function enviar_opinion(event) {
    event.preventDefault();

    let nombre = document.querySelector("#nombreinput").value;
    let edad = document.querySelector("#edadinput").value;
    let pelicula = document.querySelector("#peliculainput").value;
    let opinion = document.querySelector("#opinioninput").value;

    let opiniones = {
        "Nombre": nombre,
        "Edad": edad,
        "Pelicula": pelicula,
        "Opinion": opinion
    };

    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opiniones)
        });

        if (res.ok) {
            console.log("Opinión creada con éxito!");
            agregar_elementos();
        } else {
            console.error("Error al crear la opinión:", res.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}




async function editar_fila(event) {
    event.preventDefault();

    let filaId = document.querySelector("#filaeditar").value; // Obtener el ID de la fila a editar
    let nombre = document.getElementById('nombreinput').value;
    let opinion = document.getElementById('opinioninput').value;
    let edad = document.querySelector("#edadinput").value;
    let pelicula = document.querySelector("#peliculainput").value;

    let usuario = {
        "Nombre": nombre,
        "Edad": edad,
        "Pelicula": pelicula,
        "Opinion": opinion
    };

    try {
        let res = await fetch(`${url}/${filaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (res.ok) {
            console.log("Opinión editada con éxito!");
            agregar_elementos(); // Actualizar la tabla después de editar
        } else {
            console.error("Error al editar la opinión:", res.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

async function borrarFila() {
    let fila = document.getElementById('filaquitar').value;

    try {
        let res = await fetch(`${url}/${fila}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            console.log("Opinión eliminada con éxito!");
            agregar_elementos();
        } else {
            console.error("Error al intentar eliminar la opinión:", res.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}


// Cargar datos al inicio
agregar_elementos();

// Event Listener para enviar opinión
document.querySelector("#opinionForm").addEventListener("submit", enviar_opinion);

// Event Listener para eliminar opinión
document.querySelector("#quitar").addEventListener("click", borrarFila);

document.querySelector("#editar").addEventListener("click", editar_fila);