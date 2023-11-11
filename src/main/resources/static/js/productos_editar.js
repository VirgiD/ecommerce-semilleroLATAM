const ENVIRONTMENT = 'dev'

let BASE_URL = 'http://t-puntoorganico.qi.local:30078';

if (ENVIRONTMENT === 'dev') {
 BASE_URL = "http://localhost:8080"
}

/*======FUNCIONES EDITAR PRODUCTOS==============================================*/
function abrirModalEditarProducto(button) {
  var $productoId = button.getAttribute('data-producto-id');
  var $producto_nombre = button.getAttribute('data-producto-nombre');
  var $producto_precio = button.getAttribute('data-producto-precio');
  var $producto_peso = button.getAttribute('data-producto-peso');
  var $producto_descripcion = button.getAttribute('data-producto-descripcion');
  var $producto_imagen = button.getAttribute('data-producto-imagen');

  document.getElementById('modalNombreEditar').value = $producto_nombre;
  document.getElementById('modalPrecioEditar').value = $producto_precio;
  document.getElementById('modalPesoEditar').value = $producto_peso;
  document.getElementById('modalDescripcionEditar').value = $producto_descripcion;
  document.getElementById('modalFotoEditar').src = $producto_imagen;

  console.log($productoId);
  document.getElementById('modalIdProducto').setAttribute('data-id', $productoId);

  const modal = document.getElementById('ModalEditar')
  modal.style.display = "flex";
}



function eliminarProducto(id) {
  console.log(id);
  fetch(`${BASE_URL}/productos/eliminar/${id}`)
  .then(()=>location.reload())
}

function guardarProducto(btnGuardar) {
  const productoId = btnGuardar.getAttribute('data-id');
  const nombre = document.getElementById('modalNombreEditar').value;
  const precio = document.getElementById('modalPrecioEditar').value;
  const peso = document.getElementById('modalPesoEditar').value;
  const descripcion = document.getElementById('modalDescripcionEditar').value;
  const fotoInput = document.getElementById('foto_editar_producto');

  var formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("precio", precio);
  formData.append("peso", peso);
  formData.append("descripcion", descripcion);

  if (fotoInput.files.length > 0) {
    const fotoFile = fotoInput.files[0];
    formData.append("foto", fotoFile, fotoFile.name);
  }

  fetch(`${BASE_URL}/productos/modificar/${productoId}`, {
    method: "POST",
    body: formData
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Solicitud enviada con éxito");
        console.log(response);
        location.reload();
      } else {
        console.error("Error en la solicitud Fetch. Código de estado:", response.status);
      }
    })
    .catch(function (error) {
      console.error("Error en la solicitud Fetch:", error);
    });
}


function agregarNuevaFoto() {
  console.log('agregando foto a nuevo producto');
  document.getElementById('foto_producto_nuevo').click();

}

function cambiarImagen(event) {
  var imagen = document.getElementById('imagen_nueva');
  var file = event.target.files[0];
  console.log(imagen);
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      imagen.src = e.target.result;
    }

    reader.readAsDataURL(file);
  }
}



function editarFoto() {
  console.log('agregando foto a nuevo producto');
  document.getElementById('foto_editar_producto').click();

}

function guardarNuevafoto(event) {
  var imagen = document.getElementById('modalFotoEditar');
  var file = event.target.files[0];
  console.log(file);
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      imagen.src = e.target.result;
    }

    reader.readAsDataURL(file);
  }
}



/*======FUNCION TOGGLE MODALES==============================================*/

function toggleModalDisplay(modalId) {
  const modal = document.getElementById(modalId);
  const modalDisplay = window.getComputedStyle(modal).display;
  modal.style.display = modalDisplay === 'none' ? 'flex' : 'none';
}
/*========================================================================*/



/*======FUNCION CONFIRMAR ELIMINACION=====================================*/

function confirmDelete(message, btn) {
  const $productoID = btn.getAttribute('data-producto-id')
  const $modal_confirm = document.querySelector('.modal_confirm');
  const $modal_confirm_container = document.createElement('div');

  const $modal_container_header = document.createElement('div');
  const $btn_closeModal = document.createElement('button');

  const $message = document.createElement('p');
  const $btn_container = document.createElement('div');
  const $btn_delete = document.createElement('button');
  const $btn_cancel = document.createElement('button');


  $modal_confirm.className = 'modal_confirm-active';
  $modal_confirm_container.classList = 'modal_container';
  $modal_container_header.classList = 'modal_container_header';


  $btn_closeModal.type = 'button';
  $btn_closeModal.classList = 'btn_modal_close '
  $btn_closeModal.innerHTML = 'X'

  $message.classList = 'message_confirm';
  $btn_container.classList = 'btn-container';

  switch (message) {
    case 'product':
      $message.textContent = '¿Deseas eliminar este producto de la tienda?';
      break;
  }

  $btn_closeModal.addEventListener('click', modalOff)
  $btn_cancel.addEventListener('click', modalOff)
  $btn_delete.addEventListener('click', ()=>eliminarProducto($productoID));

  function modalOff() {
    $modal_confirm.className = 'modal_confirm';
    $modal_confirm_container.remove();
  }

  $btn_delete.innerHTML = 'Eliminar';
  $btn_delete.classList = 'btn-primary';

  $btn_cancel.classList = 'btn-secondary';
  $btn_cancel.innerHTML = 'Cancelar';

  $modal_container_header.appendChild($btn_closeModal);
  $modal_confirm_container.appendChild($modal_container_header);

  $modal_confirm_container.appendChild($message);

  $btn_container.appendChild($btn_delete)
  $btn_container.appendChild($btn_cancel)
  $modal_confirm_container.appendChild($btn_container);

  $modal_confirm.appendChild($modal_confirm_container);
}

/*========================================================================*/
function formatearPrecio() {
  const precioSinFormato = document.getElementById('modalPrecioEditar').value;
  const precioNumerico = parseFloat(precioSinFormato);
  const precioFormateado = precioNumerico.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  document.getElementById('modalPrecioEditar').value = precioFormateado;
}

// function guardarProducto(btnGuardar) {
//   const productoId = btnGuardar.getAttribute('data-id');
//   const nombre = document.getElementById('modalNombreEditar').value;
//   const precio = document.getElementById('modalPrecioEditar').value;
//   const peso = document.getElementById('modalPesoEditar').value;
//   const descripcion = document.getElementById('modalDescripcionEditar').value;
//   const fotoInput = document.getElementById('foto_editar_producto');
// }