const ENVIRONTMENT = 'dev'

let BASE_URL = 'http://t-puntoorganico.qi.local:30078';

if (ENVIRONTMENT === 'dev') {
  BASE_URL = "http://localhost:8080"
}


// function reiniciarLocalStorage() {
//   localStorage.removeItem('stock');
// }
// window.addEventListener('beforeunload', reiniciarLocalStorage);

/*===================*/
/*==MODELO CANASTAS==*/
/*===================*/
class Canasta {
  constructor() {
    this.productos = JSON.parse(localStorage.getItem('stock')) || [];
  }


  chequearSiTengoProdustosEnLocalStorage() {
    // console.log("chequeando local Storage");
    this.restablecerCantidadProductosEnBolsa(this.productos);
    this.habilitarBotones(this.productos);
    this.restablecerCantidadProductosEnInput(this.productos);
    this.restablecerCardsProductosEnBolsa(this.productos);
    this.actualizarTotalCard(this.productos, null, null);
    this.actualizarTotal();
  };

  habilitarBotones(productos) {
    /*vamos a determinar si estamos recibiendo un array o un solo producto*/

    if (productos.length > 0) {
      // obtener todo los botones realacionados a cada producto y habilitarlos
      for (let index = 0; index < productos.length; index++) {
        let btn = document.getElementById(productos[index].id);
        if (btn == null) break;
        for (let i = 0; i < btn.children.length; i++) {
          const element = btn.children[i];
          element.hidden = !element.hidden;
        }
      }
    }

  }

  actualizarTotalCard(productoEnCanasta, cantidad, idProducto) {

    if (cantidad !== null) {
      const nuevoTotalProducto = productoEnCanasta.producto.precio * cantidad;
      const precioActual = document.getElementById(`prec-${idProducto}-span`);
      const total = `$${nuevoTotalProducto.toLocaleString(undefined, { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      precioActual.innerHTML = total;
    } else {

      productoEnCanasta.forEach(
        product => {
          const nuevoTotalProducto = product.producto.precio * product.cantidad;
          const precioActual = document.getElementById(`prec-${product.id}-span`);
          const total = `$${nuevoTotalProducto.toLocaleString(undefined, { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          precioActual.innerHTML = total;
        }
      )

    }

  }

  actualizarTotal() {
    let total = 0;
    this.productos.forEach((prod) => {
      total += prod.cantidad * prod.producto.precio;
    })
    const MontoPagar = document.getElementById('thirdCol');


    MontoPagar.innerHTML = `Total: $${total.toLocaleString(undefined, { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })} `;
  }


  restablecerCantidadProductosEnBolsa(productos) {
    // 0. buscamos la shoppinmgBAG
    const shopingBag = document.getElementById('shoppingBAG');
    // 1. recibo todo los productos y tengo que calcular la cantidad de productos que tengo
    let cantidad_de_productos_acumulados = 0;
    for (let i = 0; i < productos.length; i++) {
      cantidad_de_productos_acumulados = cantidad_de_productos_acumulados + productos[i].cantidad;
    }
    // 2. actualizar el valor de productos que tiene la bolsa de compas
    shopingBag.innerHTML = cantidad_de_productos_acumulados;


  }


  restablecerCantidadProductosEnInput(productos) {
    // 0. buscar los input que coincidan con el id del producto ejemplo inpc-1447bdb4-a459-42d2-9455-09f845f96394
    // 1. actualiar los valores de los input
    if (productos.length > 0) {
      for (let index = 0; index < productos.length; index++) {
        let input = document.getElementById(`inpc-${productos[index].id}`);
        if (input == null) break;
        input.value = productos[index].cantidad;
      }
    }
  }


  restablecerCardsProductosEnBolsa(productos) {

    const contenedorShopping = document.getElementById('secondCol');
    if (contenedorShopping === null) {
      return;
    }
    agregarCardsProductosEnBolsa(productos);
    this.actualizarMensajeShoppingBAF();


  }



  agregarProducto(producto) {
    // console.log("Se agrego un producto por priemra vez!");
    const productoEnCanasta = this.productos.find(p => p.id === producto.id);

    if (!productoEnCanasta) {

      const nuevoProducto = {
        cantidad: 1,
        id: producto.id,
        producto,
      };

      this.productos.push(nuevoProducto);

      this.actualizarLocalStorage();
      this.actualizarContadorShoppingBAG(1);
      this.setearBoton(producto.id);
      // this.habilitarBotones(producto);
      agregarCardsProductosEnBolsa(nuevoProducto);
      this.actualizarMensajeShoppingBAF();
      this.actualizarTotal();
      // this.agregarAShoppingCart(nuevoProducto)
    }
  }





  actualizarCantidad(idProducto, cantidad) {
    const productoEnCanasta = this.productos.find(p => p.id === idProducto);

    if (productoEnCanasta) {
      // const total = productoEnCanasta.producto.precio * cantidad;
      this.actualizarTotalCard(productoEnCanasta, cantidad, idProducto);
      productoEnCanasta.cantidad = cantidad;
      this.actualizarLocalStorage();
      this.actualizarTotal();
    }
  }


  eliminarProducto(idProducto, cantidad) {
    // console.log(idProducto);
    // console.log(cantidad);
    const index = this.productos.findIndex(p => p.id === idProducto);

    if (index !== -1) {
      this.productos.splice(index, 1);
      this.actualizarLocalStorage();
      this.actualizarContadorShoppingBAG(- cantidad);
      this.setearBoton(idProducto);
      this.actualizaContadores(0, idProducto)
      this.quitarProductoDeCart(idProducto)
      this.actualizarMensajeShoppingBAF()
      this.actualizarTotal();
    }
  }


  actualizarLocalStorage() {
    localStorage.setItem('stock', JSON.stringify(this.productos));
  }

  actualizarMensajeShoppingBAF() {
    // console.log("actualizando mensaje");
    const mensaje = document.getElementById('no_hay_productos_mensaje');
    const container = document.getElementById('secondCol');

    if (mensaje) {
      mensaje.remove()
    }

    // if (this.productos.length !== 0) {
    if (container.childElementCount === 0) {
      const mensaje = `<div id="no_hay_productos_mensaje" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <p style="opacity: 40%;">NO HAY PRODUCTOS AGREGADOS</p>
      </div>
      `
      container.innerHTML = mensaje;

    }
  }

  actualizarContadorShoppingBAG(cantidad) {
    const shopingBag = document.getElementById('shoppingBAG');
    const cantidadActual = parseInt(shopingBag.innerHTML);
    shopingBag.innerHTML = cantidadActual + cantidad;
  }

  actualizaContadores(values, id) {
    const input = document.getElementById(`inpc-${id}`);
    const inputCart = document.getElementById(`cart-${id}`);
    if (input !== null) {
      input.value = 1;
    }
    inputCart.value = values;
  }

  quitarProductoDeCart(id) {
    const shoping_card = document.getElementById(`prod-${id}`);
    shoping_card.remove();
  }

  setearBoton(idProducto) {
    let btn = document.getElementById(idProducto);
    console.log(btn);

    if (btn !== null) {
      for (let i = 0; i < btn.children.length; i++) {
        const element = btn.children[i];
        element.hidden = !element.hidden;
      }
    }

  }

}



/*===================*/
/*====SERVICE=====*/
/*===================*/
const canasta = new Canasta();

/*
  Esta funcion analiza si existen productos en la bosla para actualizar todo el Dom y
  dejarlo disponible para el usuario.
*/
(function chequearSiExistenProductosEnLocalStorage() {
  if (canasta.productos.length === 0) {
    return;
  }
  canasta.chequearSiTengoProdustosEnLocalStorage();
})();



function agregandoProductosCanasta(producto) {
  canasta.agregarProducto(producto);
}



function agrearQuitarCantidad(span) {
  const { accion, input, inputCart, value, idProducto } = obteniendoVariables(span);

  // console.log(input);

  if (accion !== '+' && accion !== '-') return;

  let nuevaCantidad = value;
  if (accion === '+') {
    nuevaCantidad = value + 1;
    canasta.actualizarContadorShoppingBAG(1);
  }

  if (accion === '-') {
    nuevaCantidad = value - 1;
    if (nuevaCantidad < 1) return;
    // if (nuevaCantidad === 0) canasta.quitarProductoDeCart(idProducto);
    canasta.actualizarContadorShoppingBAG(-1);
  }
  if (inputCart !== null) {
    inputCart.value = nuevaCantidad
  }

  if (input !== null) {
    input.value = nuevaCantidad;
  }
  canasta.actualizarCantidad(idProducto, nuevaCantidad);
}


function quitarProductoDeCart(id, cantidad) {
  canasta.eliminarProducto(id, cantidad);
}


function verPedido() {
  const url = `${BASE_URL}/productos/finalizarCompra`
  window.open(url, "_blank")
}


const obteniendoVariables = (span) => {
  const accion = span.innerText;
  const contenedor = span.closest('.container_cantidad');

  let input = contenedor.querySelector('.producto-seleccionado[type="number"]');
  let inputCart = contenedor.querySelector('.producto-cart')

  let value;
  let idProducto;

  if (input !== null) {
    value = parseInt(input.value, 10);
    idProducto = input.id.substring(5, input.id.length);
    inputCart = document.getElementById(`cart-${idProducto}`);

  }

  if (inputCart !== null) {
    value = parseInt(inputCart.value, 10);
    idProducto = inputCart.id.substring(5, inputCart.id.length);
    input = document.getElementById(`inpc-${idProducto}`);
  }

  return {
    accion,
    input,
    value,
    idProducto,
    inputCart,
  }
}



function agregarCardsProductosEnBolsa(products) {

  const auxArr = [];

  if (!Array.isArray(products)) {
    auxArr.push(products);
  } else {
    products.forEach(element => {
      auxArr.push(element)
    });
  }

  // console.log("agregando producto a la bolsa");

  for (let i = 0; i < auxArr.length; i++) {
    const contenedorShopping = document.getElementById('secondCol');

    // Aqui creamos los contenedores mayores
    const img = document.createElement('img')
    const shoping_card = document.createElement('div')
    const shoping_card_details = document.createElement('div')
    const shoping_card_amount = document.createElement('div')
    const shoping_card_delete = document.createElement('div')

    // Damos clases a los contenedores anteriores
    img.src = obtenerFoto(auxArr[i]);
    img.width = '16px'
    shoping_card.className = "shoping_card";
    shoping_card.id = `prod-${auxArr[i].id}`;
    shoping_card_details.className = "shoping_card-details";
    shoping_card_amount.className = "shoping_card-amount";
    shoping_card_delete.className = "shoping_card-delete";

    // Creamos el titulo de la card y lo apendiamos al shopping_details
    const productoTitle = document.createElement('span');
    productoTitle.innerHTML = auxArr[i].producto.nombre;
    shoping_card_details.appendChild(productoTitle);

    // Creamos el contenedor de precio y gramos y luego apendiamos a shopingcard details
    const precioGramosContainer = document.createElement('div');
    const precio = document.createElement('span');
    precio.id = `prec-${auxArr[i].id}-span`
    const gramos = document.createElement('span');
    const precioFormateado = auxArr[i].producto.precio.toLocaleString(undefined, { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })
    precio.innerHTML = `$${precioFormateado}`;
    // precio.gramos = `${product.grm}`;
    precioGramosContainer.appendChild(precio);
    precioGramosContainer.appendChild(gramos);
    shoping_card_details.appendChild(precioGramosContainer);


    // Creacion de botones para Aumentar o disminuir cantida de unidades
    const container_cantidad = document.createElement('div');
    container_cantidad.className = 'container_cantidad';
    container_cantidad.style.userSelect = 'none'
    const Increment = document.createElement('span');
    const Decrement = document.createElement('span');
    Increment.innerHTML = "+"
    Decrement.innerHTML = "-"
    Increment.style.cursor = "pointer"
    Decrement.style.cursor = "pointer"
    Increment.addEventListener('click', () => agrearQuitarCantidad(Increment))
    Decrement.addEventListener('click', () => agrearQuitarCantidad(Decrement))

    const inputCantidad = document.createElement('input');
    inputCantidad.className = 'producto-cart'
    inputCantidad.type = 'number'
    inputCantidad.id = `cart-${auxArr[i].id}`
    inputCantidad.value = auxArr[i].cantidad
    inputCantidad.readOnly = true;
    inputCantidad.disabled = true;

    container_cantidad.appendChild(Decrement);
    container_cantidad.appendChild(inputCantidad);
    container_cantidad.appendChild(Increment);
    shoping_card_amount.appendChild(container_cantidad)


    // Crear X de eliminar producto
    const eliminarProducto = document.createElement('span');
    eliminarProducto.innerHTML = "X";
    eliminarProducto.addEventListener('click', () => quitarProductoDeCart(auxArr[i].id, auxArr[i].cantidad))
    shoping_card_delete.appendChild(eliminarProducto)

    // Apendiamos los contenedores mayores a el contenedor madre shoping
    shoping_card.appendChild(img);
    shoping_card.appendChild(shoping_card_details);
    shoping_card.appendChild(shoping_card_amount);
    shoping_card.appendChild(shoping_card_delete);
    contenedorShopping.appendChild(shoping_card)


    //Actualizar total a pagar 

  }

}


function obtenerFoto(pedidos) {
  const mime = 'image/jpeg';
  const dataURL = `data:${mime};base64,${pedidos.producto.foto.contenido}`;
  return dataURL;
}

