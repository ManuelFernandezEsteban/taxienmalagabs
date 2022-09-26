
const url = '../assets/data/data.json';


async function getLista(url) {

    const response = await fetch(url);
    const lista = await response.json();    
    return lista;
}

const dibujarTraslados = async ()=>{

    traslados.innerHTML='';
    const listaTraslados = await getLista(url);

    const destinosDesdeAeropuerto= listaTraslados[1].destinos;
    
    destinosDesdeAeropuerto.forEach(destino => {
        creaTraslado(destino,'Aeropuerto');
    });

}

const creaTraslado= (destino,lugar)=>{


    const anchor = document.createElement('a');
    const li = document.createElement('li');      
    const colSup = document.createElement('div');
    colSup.classList.add('col');
    anchor.appendChild(colSup);
    const spanOrigen = document.createElement('span');
    spanOrigen.textContent=lugar;
    const iArrow = document.createElement('i');
    iArrow.classList.add('bi');
    iArrow.classList.add('bi-arrow-right');
    const spanDestino = document.createElement('span');
    spanDestino.textContent=destino.lugar;
    colSup.appendChild(spanOrigen);
    colSup.appendChild(iArrow);
    colSup.appendChild(spanDestino);
    const colInf = document.createElement('div');
    colInf.classList.add('col');
    const spanPrecio = document.createElement('span');
    spanPrecio.textContent=destino.precio.cuatroPlazas;
    const spanEuro = document.createElement('span');
    spanEuro.textContent='€';
    colInf.appendChild(spanPrecio);
    colInf.appendChild(spanEuro);
    anchor.appendChild(colInf);    
    li.appendChild(document.createElement('hr'));
    
    traslados.appendChild(li);
    anchor.classList.add('pointer');
    anchor.classList.add('anchor');
    const href = `./traslados.html?origen=1&destino=${destino.id}`;
    anchor.setAttribute('href',href);
    
    li.appendChild(anchor);
}


aprivacidad.addEventListener('click',()=>{
    const modal = new bootstrap.Modal('#modalPoliticaDePrivacidad',{});
    modal.show(modal);
})