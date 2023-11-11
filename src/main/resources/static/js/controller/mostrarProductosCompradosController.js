class Compra {

  constructor() {
    this.pedidos = JSON.parse(localStorage.getItem('stock')) || [];
  }

  mostrarProductosSeleccionadosPreviamente(pedidos) {
    crearCardsPedidos(pedidos);
  }

}

const compra = new Compra();

/*Esta fn se autoejecuta cuando ingreso a finalizarCompras.html
  Se busca que se muestren los productos seleccionados previamente.
*/
(function mostrarPedidosSeleccionados() {
  console.log(compra.pedidos);
  compra.mostrarProductosSeleccionadosPreviamente(compra.pedidos);
})();



/*LOGICA*/
function crearCardsPedidos(pedidos) {
  const $contenedor__pedidos = document.getElementById("contenedor__pedidos");

  for (let i = 0; i < pedidos.length; i++) {

    // Aqui creamos los contenedores mayores
    const $contenedor__pedidos__card = document.createElement('div');

    const $card__img = document.createElement('img');
    const $card__detalles = document.createElement('div');
    const $card__detalles__top = document.createElement('div');
    const $card__detalles__bottom = document.createElement('div');
    const $card__eliminar = document.createElement('div');

    //Asignamos algunas caracteristicas a card__img
    $card__img.src = obtenerFoto(pedidos[i]);
    $card__img.alt = 'foto.jpg';

    // Asignamos clases a los contenedores mayores
    $contenedor__pedidos__card.className = "contenedor__pedidos__card";
    $card__img.className = "card__img";
    $card__detalles.className = "card__detalles";
    $card__detalles__top.className = "card__detalles__top";
    $card__detalles__bottom.className = "card__detalles_bottom";
    $card__eliminar.className = "card__eliminar";


    //Append contenido secundarios a contenedores mayores
    // const p = document.createElement("p");
    // p.innerHTML = "X";
    // $card__eliminar.appendChild(p);

    const nombre = document.createElement("p");
    nombre.className = "nombre"
    nombre.innerHTML = `${pedidos[i].producto.nombre}`;
    const total = document.createElement("p");
    total.className = "total"
    const precioFormateado = (pedidos[i].producto.precio * pedidos[i].cantidad).toLocaleString(undefined,{style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
    total.innerHTML = `$${precioFormateado}`;

    const cantidadUnidades = document.createElement("p");
    cantidadUnidades.className="unidades";
    const valorUnidad = pedidos[i].producto.precio.toLocaleString(undefined, { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
    cantidadUnidades.innerText = `unidades: ${pedidos[i].cantidad} (valor/u : $ ${valorUnidad})`

    // const buttonQuitarProductos = document.createElement("button");
    // buttonQuitarProductos.className = "quitarProducto"
    // buttonQuitarProductos.innerText = "-"

    // const inputCantidad = document.createElement("input");
    // inputCantidad.disabled = true;
    // inputCantidad.value = `${pedidos[i].cantidad}`

    // const buttonSumarProducrtos = document.createElement("button");
    // buttonSumarProducrtos.className = "sumarProducto"
    // buttonSumarProducrtos.innerText = "+"


    $card__detalles__top.appendChild(nombre);
    $card__detalles__top.appendChild(total);
    $card__detalles__top.appendChild(cantidadUnidades);
    // $card__detalles__top.appendChild(buttonQuitarProductos);
    // $card__detalles__top.appendChild(inputCantidad);
    // $card__detalles__top.appendChild(buttonSumarProducrtos);


    const descripcion = document.createElement("p");
    descripcion.className ="descripcion_producto"
    descripcion.innerHTML = `${pedidos[i].producto.descripcion}`;
    $card__detalles__bottom.appendChild(descripcion);




    //Append detalle top y bottom en detalle
    $card__detalles.appendChild($card__detalles__top);
    $card__detalles.appendChild($card__detalles__bottom);

    //Append img y detalles en contenedor__pedidos_card
    $contenedor__pedidos__card.appendChild($card__img);
    $contenedor__pedidos__card.appendChild($card__detalles);
    $contenedor__pedidos__card.appendChild($card__eliminar);

    //Append a contenedor padre
    $contenedor__pedidos.appendChild($contenedor__pedidos__card)
  }

}

function obtenerFoto(pedidos) {
  const mime = 'image/jpeg';
  const dataURL = `data:${mime};base64,${pedidos.producto.foto.contenido}`;
  return dataURL;
}


