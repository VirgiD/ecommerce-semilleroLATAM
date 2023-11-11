// Obtener elementos del DOM
let modal = document.getElementById("myModal");
let btnOpen = document.getElementById("openModal");
let btnClose = document.getElementsByClassName("close")[0];

// Abrir modal al hacer clic en el botón de apertura
btnOpen.onclick = function() {
  modal.style.display = "block";
}

// Cerrar modal al hacer clic en el botón de cierre
btnClose.onclick = function() {
  modal.style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}