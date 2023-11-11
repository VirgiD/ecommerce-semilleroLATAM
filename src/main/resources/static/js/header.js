function ToggleMenu() {
  var modal = document.getElementById("Menu");
  var burger = document.getElementById("menuBurger");

  modal.style.transition = "left 1s ease";
  burger.style.transition = "all 1s ease";

  if (modal.style.left === "-100%") {
    modal.style.left = "0";
    burger.style.transform = "rotate(-90deg)";
  } else {
    modal.style.left = "-100%"
    burger.style.transform = "rotate(0deg)";
  }
}