
const checkboxEfectivo = document.getElementById('checkbox-efectivo');
const checkboxTransferencia = document.getElementById('checkbox-transferencia');
const checkboxMP = document.getElementById('checkboxMP');
const checkboxRetiro = document.getElementById('checkbox-retiro');
const checkboxEnvio = document.getElementById('checkbox-envio');

const checkmarkEfectivo = document.querySelector('.checkmark.efectivo');
const checkmarkTransferencia = document.querySelector('.checkmark.transferencia');
const checkmarkMP = document.querySelector('.checkmark.mp');
const checkmarkRetiro = document.querySelector('.checkmark.retiro');
const checkmarkEnvio = document.querySelector('.checkmark.envio');

const metodosPago = document.querySelectorAll('[name="metodo-pago"]');
const modosEntrega = document.querySelectorAll('[name="modo-entrega"]');

const costoTotal = document.getElementById('total')
const finalizarCompraBtn = document.getElementById("finalizarCompraBtn")
const local = JSON.parse(localStorage.getItem('stock'))



checkboxEfectivo.addEventListener('change', function () {
  if (checkboxEfectivo.checked) {
    checkmarkEfectivo.style.backgroundColor = '#C4C754';
  } else {
    checkmarkEfectivo.style.backgroundColor = '#FFFFFF';
  }
});

checkboxTransferencia.addEventListener('change', function() {
  if (checkboxTransferencia.checked) {
    checkmarkTransferencia.style.backgroundColor = '#C4C754';
  } else {
    checkmarkTransferencia.style.backgroundColor = '#FFFFFF';
  }
});

checkboxMP.addEventListener('change', function() {
  if (checkboxMP.checked) {
    checkmarkMP.style.backgroundColor = '#C4C754';
  } else {
    checkmarkMP.style.backgroundColor = '#FFFFFF';
  }
});


checkboxRetiro.addEventListener('change', function() {
  if (checkboxRetiro.checked) {
    checkmarkRetiro.style.backgroundColor = '#C4C754';
  } else {
    checkmarkRetiro.style.backgroundColor = '#FFFFFF';
  }
});

checkboxEnvio.addEventListener('change', function() {
  if (checkboxEnvio.checked) {
    checkmarkEnvio.style.backgroundColor = '#C4C754';
  } else {
    checkmarkEnvio.style.backgroundColor = '#FFFFFF';
  }
});


//-------------FUNCIONES PARA QUE SE SELECCIONE SOLO UNA OPCION----------------
function gestionarCambioMetodoPago(checkboxSeleccionado) {
  metodosPago.forEach(checkbox => {
    if (checkbox !== checkboxSeleccionado) {
      checkbox.checked = false;
      checkbox.parentElement.querySelector('.checkmark').style.backgroundColor = '#FFFFFF';
    }
  });

  if (checkboxSeleccionado.checked) {
    checkboxSeleccionado.parentElement.querySelector('.checkmark').style.backgroundColor = '#C4C754';
  } else {
    checkboxSeleccionado.parentElement.querySelector('.checkmark').style.backgroundColor = '#FFFFFF';
  }
}

function gestionarCambioModoEntrega(checkboxSeleccionado) {
  modosEntrega.forEach(checkbox => {
    if (checkbox !== checkboxSeleccionado) {
      checkbox.checked = false;
      checkbox.parentElement.querySelector('.checkmark').style.backgroundColor = '#FFFFFF';
    }
  });

  if (checkboxSeleccionado.checked) {
    checkboxSeleccionado.parentElement.querySelector('.checkmark').style.backgroundColor = '#C4C754';
  } else {
    checkboxSeleccionado.parentElement.querySelector('.checkmark').style.backgroundColor = '#FFFFFF';
  }
}

metodosPago.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    gestionarCambioMetodoPago(this);
    comprobarHabilitarBoton()
  });
});

modosEntrega.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    gestionarCambioModoEntrega(this);
    comprobarHabilitarBoton()
  });
});

function calcularTotal(localStorage) {
  let total = 0
  if (local.length != 0) {
    localStorage.map(prod => {
      total += prod.cantidad * prod.producto.precio
    })
  }
  return `Total: $${total.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}`
}

costoTotal.innerText = calcularTotal(local)


//-----------------------FINALIZAR COMPRA------------------------------
let metodoPagoSeleccionado
let modoEntregaSeleccionado
let entregaSeleccionada
let pagoSeleccionado

function comprobarHabilitarBoton() {
  entregaSeleccionada = false
  pagoSeleccionado = false

  metodosPago.forEach(check => {
    if (check.checked) {
      metodoPagoSeleccionado = check.value
      pagoSeleccionado = true
    }
  })

  modosEntrega.forEach(check => {
    if (check.checked) {
      modoEntregaSeleccionado = check.getAttribute("data-label")
      entregaSeleccionada = true
    }
  })

  if (pagoSeleccionado && entregaSeleccionada) {
    finalizarCompraBtn.removeAttribute('disabled')
  } else {
    finalizarCompraBtn.setAttribute('disabled', 'true')
  }
}



function finalizarCompra() {
  const productos = local.map(prod => { return { id: prod.id, nombre: prod.producto.nombre, precio: prod.producto.precio, cantidad: prod.cantidad } });

  const metodoPago = metodoPagoSeleccionado;
  const metodoEntrega = modoEntregaSeleccionado;

  if (metodoPago === undefined || metodoEntrega === undefined) {
    alert("Debes seleccionar un método de pago y entrega para finalizar tu compra");
    return;
  }

  const carrito = {
    productos: productos,
    metodoPago: metodoPago,
    metodoEntrega: metodoEntrega
  };

  let total = 0;
  let productoCargado = "";

  carrito.productos.forEach(producto => {
    const id = producto.id;
    const cantidad = producto.cantidad;
    const subtotal = producto.precio * cantidad;
    const nombre= producto.nombre
    console.log(nombre);
    productoCargado += `- ${cantidad} -  ${producto.nombre}, Subtotal: $${subtotal}\n`;
    total += subtotal;
    });

  const mensajeWhatsApp = `Hola Punto Orgánico! Quiero comprar los siguientes productos:\n${productoCargado}\nTotal de la compra: $ ${total}\nMétodo de Pago: ${metodoPago}\nModo de Entrega: ${metodoEntrega}`;
  console.log(mensajeWhatsApp);

  const tel = "+5492615940591";
  const encodedMensaje = encodeURIComponent(mensajeWhatsApp);
  const urlWp = `https://wa.me/${tel}?text=${encodedMensaje}`;
  window.open(urlWp);
  window.location.href = "/";
  localStorage.removeItem('stock')
}