
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

/*

  async function  getParametros(){
   
    const urlParams = location.href;
    
    const stringParams = urlParams.substring((urlParams.indexOf('?'))+1);

    const searchParam = new URLSearchParams(stringParams);
    const origen = parseInt(searchParam.get('origen'));
    const destino = parseInt( searchParam.get('destino'));
    
    if( isNaN(origen) || isNaN(destino)){
      return null;   
    }

    
    return listaTraslados[origen].destinos[destino];
    
  }
  function populateSelect(select,list){
    list.forEach(item=>{
        const option = document.createElement('option');        
        option.classList.add('ff-text');
        option.value=item.id;
        option.text=item.lugar;
        select.appendChild(option);
    });

  }

  const observerDestino = new Observer((opcion)=>{
    borrarOptions(selectDestinos); 
    populateSelect(selectDestinos,listaOrigenes[opcion].destinos);
  });


  recogida.addEventListener('change',(event)=>{   
    
    selectO.add(indexOrigen);
  });


  const seleccionarTraslado=(traslado)=>{

  }

  const init = async ()=>{

    await getLista(url);
    const traslado = getParametros();
    populateSelect(recogida,listaTraslados)
    if (traslado!=null){
      seleccionarTraslado(traslado);
    }
  }*/