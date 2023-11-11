var total_productos_comprados = 0;

// Html Elements
const $btns = document.querySelectorAll('.btnAddProduct')
const $total = document.getElementById('total')

$btns.forEach((btn) => {
  let id = btn.dataset.productId;
  btn.addEventListener('click', () => addProduct(id),)
})

function addProduct(id = '') {
  let products = JSON.parse(localStorage.getItem('productos'));

  if (!products) {
    const product = setProduct(id);
    saveProducts([product]);
  } else {
    const product = setProduct(id);
    products = [...products, product]
    saveProducts(products);
  }

}

function setProduct(id = '') {
  if (id) {
    let title = document.getElementById('titulo' + `${id}`).innerText;
    let price = document.getElementById('precio' + `${id}`).innerText;
    let gramos = document.getElementById('gramos' + `${id}`).innerText;
    let src = document.getElementById('imagen' + `${id}`).getAttribute('src')
    let producto = {
      title,
      price,
      gramos,
      src,
    }
    return producto;
  }
}

function saveProducts(product = [] || {}) {
//   localStorage.setItem('productos', JSON.stringify(product))
//   total_productos_comprados++;
//   $total.textContent = total_productos_comprados;
}



const detailsBag = [""]

function showDetailBag() {
  const $box_shopping = document.getElementById("box_shopping");
  if ($box_shopping.style.display === 'grid') {
    $box_shopping.style.display = 'none';
  } else {
    $box_shopping.style.display = 'grid';
    const $secondCol = document.getElementById("secondCol");
    const $thirdCol = document.getElementById("thirdCol");
    let products = JSON.parse(localStorage.getItem('productos'));

    
    // products && products.forEach((product) => {
    //   const $productContainer = document.createElement('div');
    //   $productContainer.className = 'border border-1 d-flex gap-4 align-items-center justify-contente-between';
    //   $productContainer.style.margin = '1rem 0'

    //   const $productInf = document.createElement('div');
    //   $productInf.style.width = '30rem'
    //   $productInf.style.height = '5rem' 
    //   $productInf.style.backgroundColor = 'red'

    //   const $productImage = document.createElement('img');
    //   $productImage.style.width = '3rem'
    //   $productImage.style.height = '3rem'
    //   $productImage.src = product.src;
    //   const $productTitle = document.createElement('p');
    //   $productTitle.textContent = product.title;
    //   const $productGramos = document.createElement('p');
    //   $productGramos.textContent = product.gramos;
    //   const $productPrice = document.createElement('p');
    //   $productPrice.textContent = product.price;
    //   const $prodcutRemove = document.createElement('p');
    //   $prodcutRemove.textContent = 'X';

    //   $productInf.append($productTitle);
    //   $productInf.append($productGramos);
    //   $productInf.append($productPrice);

    //   $productContainer.appendChild($productImage);
    //   $productContainer.append($productInf);
    //   $productContainer.append($prodcutRemove);

    //   $secondCol.append($productContainer);



    // })

  }

}

// window.addEventListener('load', function () {
//   let products = JSON.parse(localStorage.getItem('productos'));
//   if (products) {
//     total_productos_comprados = products.length;
//     $total.textContent = total_productos_comprados;
//   }
// })