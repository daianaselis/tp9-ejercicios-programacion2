let pagina = 1; //aqui declaro una variable que se llama pagina que funciona como contador que se puede ir incrementando o decrementando dependiendo si va hacia adelante o hacia atras

const cargarPeliculas = async() => { //aqui uso una funcion de flecha asincrona con un try catch 
	try {
		const respuesta = await fetch(`https://62baf49a573ca8f8328f90d9.mockapi.io/peliculas`); //aqui declaro una constante y dentro de ella llamo un fetch para traer lo que yo necesito de la api 

		console.log(respuesta);

		// Si la respuesta es correcta me devuelve un status 200 que significa que todo esta correcto
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			let peliculas = '';
			for(let pelicula of datos){
				peliculas += `
					<a href="pelicula.html?pelicula=${pelicula.id}">
						<div class="pelicula" id="${pelicula.id}">
							<h3 class="titulo">${pelicula.titulo}</h3>
							<img class="poster" src="${pelicula.imagen}">
							<p>${pelicula.descripcion}</p>
							<button onclick="borrarPelicula(${pelicula.id})">Borrar</button>
						</div>
					</a>
				`;
			}

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

async function subirPelicula(){
	try{
		let pelicula = {
			titulo: document.getElementById('titulo').value,
			descripcion: document.getElementById('descripcion').value,
			portada: document.getElementById('portada').value,
			extreno: document.getElementById('estreno').value,
			imagen: document.getElementById('imagen').value,
		}
		const response = await fetch('https://62baf49a573ca8f8328f90d9.mockapi.io/peliculas', {
			method: 'POST',
			headers:{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(pelicula)
		});
		if(response.status == 201){
			alert('pelicula subida!')
			cargarPeliculas();
		}
	}catch(error){
		console.error(error)
	}
}

async function borrarPelicula(id){
	try{
		const response = await fetch('https://62baf49a573ca8f8328f90d9.mockapi.io/peliculas/'+id, {
			method: 'DELETE',
		});
		if(response.status == 200){
			alert('pelicula borrada!')
			cargarPeliculas();
		}
	}catch(error){
		console.error(error)
	}
}

cargarPeliculas();