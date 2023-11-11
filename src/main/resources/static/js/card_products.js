

const container = document.querySelector('.mas_vendidos');
const carrusel = document.querySelector('.container_card_home');

const containerWidth = container.offsetWidth;
const carruselWidth = carrusel.offsetWidth;
const cardWidth = carrusel.children[0].offsetWidth;

let currentPosition = 0;

const prevBtn = document.querySelector('.btn-left');
const nextBtn = document.querySelector('.btn-right');


if (nextBtn !== null) {
  
nextBtn.addEventListener('click', () => {
  currentPosition += cardWidth;
  if (currentPosition < (carruselWidth - containerWidth + cardWidth)) {
    carrusel.style.transform = `translateX(-${currentPosition}px)`;
  }else{
    currentPosition = 0
    carrusel.style.transform = `translateX(${currentPosition}px)`;
  }
});
}

if (prevBtn !== null) {
prevBtn.addEventListener('click', () => {
  currentPosition -= cardWidth;
  if (currentPosition >= 0) {
    carrusel.style.transform = `translateX(-${currentPosition}px)`;
  }else{
    return
  }

});
}