let $menu_option = document.getElementById("menu_options");
let $btn = document.getElementById("menu_icon");
let isOpen = false;
let $bag = document.getElementById("bag");

$btn.addEventListener('click', toggleMenu);
document.addEventListener('click', closeMenu);

const urlSection = window.location.href.split('/').pop();

if (urlSection === 'editar' || urlSection === 'login') {
  $bag.style.display = 'none'
}

function toggleMenu() {
  isOpen = !isOpen;
  $menu_option.style.left = isOpen ? "0px" : "-100%";
  $btn.style.transform = isOpen ? "rotate(-90deg)" : "rotate(0deg)";
  $menu_option.style.transition = 'left 0.5s, transform 0.5s';
  $btn.style.transition = 'left 0.5s, transform 0.5s';
}

function closeMenu(event) {
  if (isOpen && !event.target.closest('#menu_options') && !event.target.closest('#menu_icon')) {
    toggleMenu();
  }
}





function toggleShopingBAG() {
  const boxShopping = document.getElementById("box_shopping");
  if (boxShopping.className === "shoppingcard-container") boxShopping.classList = 'shoppingcard-container-active'
  else boxShopping.classList = 'shoppingcard-container'
}