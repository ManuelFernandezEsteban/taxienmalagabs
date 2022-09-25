class Sujeto{
    constructor(){
        this.observer=[];
    }
    subscribe(observer){
        this.observer.push(observer);
    }
    unsubscribe(observer){
        this.observer=this.observer.filter(o=>o!==observer);
    }

    notify(data){
        this.observer.forEach(e=>{
            e.refresh(data);
        });
    }
}

class SelectDestino extends Sujeto{
    constructor(){
        super();
        this.data=-1;
    }
    add(item){
        this.data=item;
        this.notify(this.data);
    }
}
class SelectOrigen extends Sujeto{
    constructor(){
        super();
        this.data=-1;
    }
    add(item){
        this.data=item;
        this.notify(this.data);
    }
}

class PaxNumber extends Sujeto{
    constructor(){
        super();
        this.data=1;
    }
    add(item){
        this.data=item;
        this.notify(this.data);
    }
}

class Observer{
    constructor(fn){
        this.fn=fn;
    }
    refresh(data){
        this.fn(data);
    }
}

let listaOrigenes=[];
let matrizPrecios=[];
const url = './assets/data/data.json';
const selectO = new SelectOrigen();
const selectD = new SelectDestino();
let indexDestino=-1;
let indexOrigen=-1;

const observerDestino = new Observer((opcion)=>{
    borrarOptions(destino); 
    actualizarPrecio(-1,-1);
    populateSelect(destino,listaOrigenes[opcion].destinos);
});

const observerPrecio = new Observer((opcion)=>{
    actualizarPrecio(indexOrigen,indexDestino)
 });
selectO.subscribe(observerDestino);
selectD.subscribe(observerPrecio);

pax.addEventListener('keydown',(event)=>{
    if (isNaN(event.key)){
        event.preventDefault()
        return;
    }
})

pax.addEventListener('change',(event)=>{  

    if(event.target.value>8||event.target.value<1){
        event.preventDefault();
        return;
    }

    actualizarPrecio(indexOrigen,indexDestino);
})

function actualizarPrecio(origen,destino){
   
    precio.value='';
    if (origen<0||destino<0){
        precio.value='0';

    }else{
        precio.value='';
        let valor = 0;
        if (pax.value<=4){
            valor = matrizPrecios[origen][destino].cuatroPlazas;
        }else{
            valor = matrizPrecios[origen][destino].ochoPlazas;
        }        

        precio.value=`${valor}`
      
    }
}

async function getLista(url){

    const response = await fetch(url);
    const lista = await response.json();
    return lista;
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
function borrarOptions(select){
    const listOptions = select.querySelectorAll('option');    
    listOptions.forEach(option => {
        if (option.value!=-1){
            option.remove();            
        }
    });    
}


 origen.addEventListener('change',(event)=>{   
    indexOrigen=event.target.value;    
    selectO.add(indexOrigen);
});


destino.addEventListener('change',(event)=>{ 
    indexDestino=event.target.value;    
    selectD.add(indexDestino);
});

function  getParametros(){
   
    const urlParams = location.href;
    
    const stringParams = urlParams.substring((urlParams.indexOf('?'))+1);

    const searchParam = new URLSearchParams(stringParams);
    const paramOrigen = parseInt(searchParam.get('origen'));
    const paramDestino = parseInt( searchParam.get('destino'));
    return {paramOrigen,paramDestino};    
}

async function crearMatriz(listaOrigenes){
    

    listaOrigenes.forEach(origen => {
        
        let listaDestinos=[];
        origen.destinos.forEach(destino => {            
            listaDestinos.push(destino.precio);  
        });        
        matrizPrecios.push(listaDestinos);        
    });       
}

const asignarTraslado=(traslado)=>{

    if (isNaN(traslado.paramDestino)||isNaN(traslado.paramOrigen)){
        return;
    }else{
        indexDestino=traslado.paramDestino;
        indexOrigen=traslado.paramOrigen
        origen.value=indexOrigen;
        borrarOptions(destino);         
        populateSelect(destino,listaOrigenes[indexOrigen].destinos); 
        destino.value=indexDestino;   
        actualizarPrecio(indexOrigen,indexDestino);
    }

}


const init = async ()=>{

    listaOrigenes= await getLista(url);
    crearMatriz(listaOrigenes);
    populateSelect(origen,listaOrigenes)
    const traslado  = getParametros();    
    asignarTraslado(traslado);
}