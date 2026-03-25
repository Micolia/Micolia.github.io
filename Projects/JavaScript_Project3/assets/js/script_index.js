import {propiedadesAlquiler, propiedadesVenta} from './data/propriedades.js'

const mostrarPropriedades = (propriedades, containerID) => {
const container = document.getElementById(containerID)
const selectionPropriedades = propriedades.slice (0,3) //corta arreglo

//iterar array
for (const propriedad of selectionPropriedades) {
const card = document.createElement('div')
card.className = 'col-md-4 mb-4'
const cardContent = `
            <div class="card">
              <img src="${propriedad.src}" class="card-img-top" alt="Imagen del departamento"/>
              <div class="card-body">
                <h5 class="card-title">${propriedad.nombre}</h5>
                <p class="card-text">${propriedad.descripcion}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${propriedad.ubicacion}</p>
                <p><i class="fas fa-bed"></i> ${propriedad.habitaciones} Habitaciones | <i class="fas fa-bath"></i> ${propriedad.baños} Baños</p>
                <p><i class="fas fa-dollar-sign"></i> ${propriedad.costo}</p>
                <p class=" ${propriedad.smoke ? 'text-success' : 'text-danger'}"><i class="${propriedad.smoke ? 'fas fa-smoking' : 'fas fa-smoking-ban'}"></i> ${propriedad.smoke ? 'Permitido fumar' : 'No se permite fumar'}</p>
                <p class=" ${propriedad.pets ? 'text-success' : 'text-danger'}"><i class="${propriedad.pets ? 'fas fa-paw' : 'fa-solid fa-ban'}"></i> ${propriedad.pets ? 'Mascotas permitidas' : 'No se permiten mascotas'}</p>
              </div>
`
card.innerHTML = cardContent
container.appendChild(card)
}
}

mostrarPropriedades (propiedadesVenta,'containerVenta')
mostrarPropriedades (propiedadesAlquiler,'containerAlquiler')


